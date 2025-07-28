import React, { useState, useEffect, useMemo } from 'react';
import confetti from 'canvas-confetti';
import Button from '../components/Button';

type ReplacePair = {
  id: number;
  find: string;
  replace: string;
};

type ReplaceOptions = {
  caseSensitive: boolean;
  wholeWords: boolean;
  useRegex: boolean;
};

const FindReplacePage: React.FC = () => {
  const [text, setText] = useState('');
  const [result, setResult] = useState('');
  const [pairs, setPairs] = useState<ReplacePair[]>([]);
  const [options, setOptions] = useState<ReplaceOptions>({
    caseSensitive: false,
    wholeWords: false,
    useRegex: false,
  });
  const [stats, setStats] = useState({ replacements: 0, pairsUsed: 0 });
  
  // Load initial state from localStorage
  useEffect(() => {
    try {
      const savedPairs = localStorage.getItem('findReplacePairs');
      const savedOptions = localStorage.getItem('findReplaceOptions');
      if (savedPairs) {
        const parsedPairs = JSON.parse(savedPairs);
        if (Array.isArray(parsedPairs) && parsedPairs.length > 0) {
            setPairs(parsedPairs);
        } else {
            setPairs([{ id: Date.now(), find: '', replace: '' }]);
        }
      } else {
        setPairs([{ id: Date.now(), find: '', replace: '' }]);
      }
      if (savedOptions) {
        setOptions(JSON.parse(savedOptions));
      }
    } catch (error) {
      console.error("Failed to load state from localStorage", error);
      setPairs([{ id: Date.now(), find: '', replace: '' }]);
    }
  }, []);

  // Save state to localStorage
  useEffect(() => {
    try {
        if(pairs.length > 0) {
            localStorage.setItem('findReplacePairs', JSON.stringify(pairs));
        }
      localStorage.setItem('findReplaceOptions', JSON.stringify(options));
    } catch (error) {
      console.error("Failed to save state to localStorage", error);
    }
  }, [pairs, options]);

  const previewCount = useMemo(() => {
    if (!text) return 0;
    let totalMatches = 0;
    pairs.forEach(pair => {
      if (!pair.find) return;
      try {
        const flags = options.caseSensitive ? 'g' : 'gi';
        let findPattern = options.useRegex ? pair.find : pair.find.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        if (options.wholeWords && !options.useRegex) {
          findPattern = `\\b${findPattern}\\b`;
        }
        const regex = new RegExp(findPattern, flags);
        const matches = text.match(regex);
        if (matches) {
          totalMatches += matches.length;
        }
      } catch (e) {
        // Ignore invalid regex during preview
      }
    });
    return totalMatches;
  }, [text, pairs, options]);

  const handleAddPair = () => {
    setPairs([...pairs, { id: Date.now(), find: '', replace: '' }]);
  };

  const handleRemovePair = (id: number) => {
    setPairs(pairs.filter(p => p.id !== id));
  };

  const handlePairChange = (id: number, field: 'find' | 'replace', value: string) => {
    setPairs(pairs.map(p => (p.id === id ? { ...p, [field]: value } : p)));
  };

  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setOptions({ ...options, [name]: checked });
  };

  const handleProcessText = () => {
    let processedText = text;
    let totalReplacements = 0;
    let pairsUsed = 0;

    pairs.forEach(pair => {
      if (pair.find) {
        try {
            const flags = options.caseSensitive ? 'g' : 'gi';
            let findPattern = options.useRegex ? pair.find : pair.find.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            if(options.wholeWords && !options.useRegex) {
                findPattern = `\\b${findPattern}\\b`;
            }
            const regex = new RegExp(findPattern, flags);
            const initialLength = (processedText.match(regex) || []).length;
            if (initialLength > 0) {
                processedText = processedText.replace(regex, pair.replace);
                totalReplacements += initialLength;
                pairsUsed++;
            }
        } catch (e) {
            alert(`Invalid regular expression: /${pair.find}/\n\n${e}`);
            return;
        }
      }
    });

    setResult(processedText);
    setStats({ replacements: totalReplacements, pairsUsed });
  };

  const handleReset = () => {
    setText('');
    setResult('');
    setPairs([{ id: Date.now(), find: '', replace: '' }]);
    setOptions({ caseSensitive: false, wholeWords: false, useRegex: false });
    setStats({ replacements: 0, pairsUsed: 0 });
    localStorage.removeItem('findReplacePairs');
  };

  const handleCopy = () => {
    if (result) {
      navigator.clipboard.writeText(result).then(() => {
        // On success, trigger confetti
        confetti({
          particleCount: 150,
          spread: 80,
          origin: { y: 0.6 },
          zIndex: 9999, // Ensure it's on top of other UI elements
        });
      }).catch(err => {
        console.error('Failed to copy text: ', err);
        alert('Could not copy text to clipboard.');
      });
    }
  };

  const handleDownload = () => {
    if (result) {
        const blob = new Blob([result], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'processed_text.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
  };
  
  const charCount = text.length;
  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-5xl font-black mb-2 mt-12">Find & Replace Text</h1>
        <p className="text-xl text-gray-600">Perform multiple find and replace operations simultaneously.</p>
      </header>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column: Input and Controls */}
        <div className="space-y-8">
            <div className="bg-white p-6 border-4 border-black shadow-[8px_8px_0_#0b0b0b]">
                <h2 className="text-2xl font-black mb-4">Input Text</h2>
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Paste your text or article here..."
                    className="w-full h-[300px] p-4 border-2 border-black bg-white focus:outline-none focus:ring-2 focus:ring-[#551EFD] text-base resize-y"
                />
                <p className="text-right text-sm text-gray-500 font-mono mt-2">{charCount} characters / {wordCount} words</p>
            </div>

            <div className="bg-white p-6 border-4 border-black shadow-[8px_8px_0_#0b0b0b]">
                <h2 className="text-2xl font-black mb-4">Find & Replace Pairs</h2>
                <div className="space-y-3 mb-4">
                {pairs.map((pair, index) => (
                    <div key={pair.id} className="flex items-center gap-2">
                        <input
                            type="text"
                            placeholder="Find..."
                            value={pair.find}
                            onChange={(e) => handlePairChange(pair.id, 'find', e.target.value)}
                            className="w-full p-2 border-2 border-black bg-white focus:outline-none focus:ring-2 focus:ring-[#551EFD]"
                        />
                        <span className="font-bold text-xl">&rarr;</span>
                        <input
                            type="text"
                            placeholder="Replace with..."
                            value={pair.replace}
                            onChange={(e) => handlePairChange(pair.id, 'replace', e.target.value)}
                            className="w-full p-2 border-2 border-black bg-white focus:outline-none focus:ring-2 focus:ring-[#551EFD]"
                        />
                        <button onClick={() => handleRemovePair(pair.id)} className="p-2 border-2 border-black font-bold text-red-500 hover:bg-red-100 aspect-square" aria-label="Remove pair">
                           &times;
                        </button>
                    </div>
                ))}
                </div>
                <Button onClick={handleAddPair} variant="secondary" className="w-full">Add New Pair</Button>
            </div>
            
            <div className="bg-white p-6 border-4 border-black shadow-[8px_8px_0_#0b0b0b]">
                <h2 className="text-2xl font-black mb-4">Options</h2>
                <div className="flex flex-col sm:flex-row gap-4">
                    <label className="font-bold flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" name="caseSensitive" checked={options.caseSensitive} onChange={handleOptionChange} className="w-5 h-5 accent-[#551EFD]" />
                        Case Sensitive
                    </label>
                    <label className="font-bold flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" name="wholeWords" checked={options.wholeWords} onChange={handleOptionChange} className="w-5 h-5 accent-[#551EFD]" disabled={options.useRegex} />
                        Whole Words Only
                    </label>
                     <label className="font-bold flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" name="useRegex" checked={options.useRegex} onChange={handleOptionChange} className="w-5 h-5 accent-[#551EFD]" />
                        Use Regular Expressions
                    </label>
                </div>
                 {options.useRegex && options.wholeWords && <p className="text-sm text-yellow-700 mt-2 font-bold">"Whole Words Only" is disabled when using Regular Expressions. Please use word boundaries (`\b`) in your pattern.</p>}
            </div>

            <div className="text-center">
                 <Button onClick={handleProcessText} disabled={!text || pairs.every(p => !p.find)} className="w-full lg:w-auto">
                    Process Text ({previewCount} replacements)
                </Button>
            </div>
        </div>
        
        {/* Right Column: Results */}
        <div className="space-y-6">
            <div className="bg-white p-6 border-4 border-black shadow-[8px_8px_0_#551EFD] h-full flex flex-col">
                <h2 className="text-2xl font-black mb-4">Result</h2>
                <textarea
                    readOnly
                    value={result}
                    placeholder="Processed text will appear here..."
                    className="w-full flex-grow h-[300px] p-4 border-2 border-black bg-gray-100 focus:outline-none text-base resize-y"
                />
                 <p className="text-right text-sm text-gray-500 font-mono mt-2">
                    {stats.replacements > 0 
                     ? `Made ${stats.replacements} replacements across ${stats.pairsUsed} pairs.`
                     : 'No replacements made yet.'
                    }
                 </p>
                 <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-4 pt-4 border-t-2 border-dashed border-black">
                     <Button onClick={handleCopy} disabled={!result} variant="secondary">Copy Result</Button>
                     <Button onClick={handleDownload} disabled={!result} variant="secondary">Download .txt</Button>
                     <Button onClick={handleReset} className="bg-gray-200 text-black shadow-[4px_4px_0_#0b0b0b] hover:shadow-[2px_2px_0_#0b0b0b]">Reset</Button>
                 </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default FindReplacePage;