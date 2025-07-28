import React, { useState, useMemo } from 'react';
import { analyzeText, TextAnalysis } from '../utils/textAnalysis';
import StatCard from '../components/word-counter/StatCard';
import Toolbar from '../components/word-counter/Toolbar';
import AnalysisTabs from '../components/word-counter/AnalysisTabs';

const WordCounterPage: React.FC = () => {
  const [text, setText] = useState('');

  const analysis: TextAnalysis = useMemo(() => analyzeText(text), [text]);

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-5xl font-black mb-2 mt-12">Advanced Word Counter</h1>
        <p className="text-xl text-gray-600">Analyze your text in real-time with detailed statistics.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="flex flex-col">
           <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste your text here..."
            className="w-full h-full min-h-[400px] p-4 border-4 border-black bg-white focus:outline-none focus:ring-4 focus:ring-[#551EFD]/50 text-lg leading-relaxed resize-y"
            aria-label="Text input for analysis"
          />
        </div>
        <div className="flex flex-col gap-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <StatCard label="Words" value={analysis.words} />
            <StatCard label="Characters" value={analysis.characters} />
            <StatCard label="Sentences" value={analysis.sentences} />
            <StatCard label="Paragraphs" value={analysis.paragraphs} />
            <StatCard label="Reading Time" value={analysis.readingTime} />
            <StatCard label="Avg. Word" value={`${analysis.avgWordLength} chars`} />
          </div>
          <AnalysisTabs analysis={analysis} />
        </div>
      </div>
       <Toolbar text={text} setText={setText} analysis={analysis} />
    </div>
  );
};

export default WordCounterPage;