import React from 'react';
import Button from '../Button';
import type { TextAnalysis } from '../../utils/textAnalysis';

// Declare jsPDF types to avoid TypeScript errors with CDN loading
declare const jspdf: any;
// autoTable is a plugin on the jsPDF instance, not a global variable.

interface ToolbarProps {
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  analysis: TextAnalysis;
}

const Toolbar: React.FC<ToolbarProps> = ({ text, setText, analysis }) => {

  const handleFormat = (formatType: 'upper' | 'lower' | 'title' | 'clean') => {
    switch (formatType) {
      case 'upper':
        setText(text.toUpperCase());
        break;
      case 'lower':
        setText(text.toLowerCase());
        break;
      case 'title':
        setText(text.toLowerCase().replace(/\b\w/g, s => s.toUpperCase()));
        break;
      case 'clean':
        setText(text.trim().replace(/\s+/g, ' '));
        break;
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here for better UX
  };
  
  const handleDownloadTxt = () => {
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = 'document.txt';
    link.href = url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownloadPdf = () => {
    const { jsPDF } = jspdf;
    const doc = new jsPDF();
    
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text("Text Analysis Report", 14, 20);
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 26);
    
    const summaryData = [
        ['Words', analysis.words],
        ['Characters', analysis.characters],
        ['Sentences', analysis.sentences],
        ['Paragraphs', analysis.paragraphs],
        ['Reading Time', analysis.readingTime]
    ];
    
    // The autoTable plugin adds a method to the jsPDF instance.
    // We cast to `any` because the base type definition doesn't know about the plugin.
    (doc as any).autoTable({
        startY: 35,
        head: [['Metric', 'Value']],
        body: summaryData,
        theme: 'grid',
        headStyles: { fillColor: '#E1FF01', textColor: '#000' }
    });
    
    const keywordData = analysis.keywords.map(k => [k.word, k.count, `${k.percentage}%`]);

    (doc as any).autoTable({
        startY: (doc as any).lastAutoTable.finalY + 10,
        head: [['Keyword', 'Count', 'Percentage']],
        body: keywordData.length > 0 ? keywordData : [['No keywords found.', '', '']],
        theme: 'grid',
        headStyles: { fillColor: '#E1FF01', textColor: '#000' }
    });

    doc.addPage();
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("Full Text", 14, 20);
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    const splitText = doc.splitTextToSize(analysis.text, 180);
    doc.text(splitText, 14, 30);
    
    doc.save("text-analysis-report.pdf");
  };

  return (
    <div className="mt-8">
      <div className="bg-white border-4 border-black p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
                <h3 className="font-black text-xl mb-4">Formatting Tools</h3>
                <div className="grid grid-cols-2 gap-2">
                    <Button variant="secondary" onClick={() => handleFormat('upper')}>UPPERCASE</Button>
                    <Button variant="secondary" onClick={() => handleFormat('lower')}>lowercase</Button>
                    <Button variant="secondary" onClick={() => handleFormat('title')}>Title Case</Button>
                    <Button variant="secondary" onClick={() => handleFormat('clean')}>Clean Whitespace</Button>
                </div>
            </div>
             <div>
                <h3 className="font-black text-xl mb-4">Export</h3>
                <div className="grid grid-cols-2 gap-2">
                    <Button variant="secondary" onClick={handleCopy}>Copy Text</Button>
                    <Button variant="secondary" onClick={handleDownloadTxt}>Download .txt</Button>
                    <Button variant="primary" className="col-span-2" onClick={handleDownloadPdf}>Download Full Report (.pdf)</Button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Toolbar;