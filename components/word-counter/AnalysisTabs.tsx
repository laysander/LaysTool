import React, { useState } from 'react';
import type { TextAnalysis } from '../../utils/textAnalysis';
import Button from '../Button';

interface AnalysisTabsProps {
  analysis: TextAnalysis;
}

const SocialMediaLimit: React.FC<{ name: string; limit: number; current: number }> = ({ name, limit, current }) => {
    const percentage = Math.min((current / limit) * 100, 100);
    const isOver = current > limit;
    
    return (
        <div>
            <div className="flex justify-between items-center mb-1">
                <span className="font-bold">{name}</span>
                <span className={`text-sm font-mono ${isOver ? 'text-red-600' : 'text-gray-600'}`}>{current} / {limit}</span>
            </div>
            <div className="w-full bg-gray-200 h-4 border-2 border-black">
                <div className={`h-full ${isOver ? 'bg-red-500' : 'bg-[#E1FF01]'}`} style={{ width: `${percentage}%` }}></div>
            </div>
        </div>
    )
};


const AnalysisTabs: React.FC<AnalysisTabsProps> = ({ analysis }) => {
  const [activeTab, setActiveTab] = useState('keywords');

  const tabClass = (tabName: string) => 
    `px-4 py-2 font-bold border-2 border-b-0 border-black transition-colors duration-200 -mb-px
     ${activeTab === tabName ? 'bg-[#E1FF01]' : 'bg-gray-200 hover:bg-[#E1FF01]/50'}`;

  const downloadCSV = () => {
    const headers = "Keyword,Count,Percentage (%)";
    const rows = analysis.keywords.map(k => `${k.word},${k.count},${k.percentage}`);
    const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "keyword_density_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <div className="bg-white border-4 border-black p-4 shadow-[8px_8px_0_#551EFD]">
      <div className="border-b-4 border-black flex">
        <button onClick={() => setActiveTab('keywords')} className={tabClass('keywords')}>Keyword Density</button>
        <button onClick={() => setActiveTab('social')} className={tabClass('social')}>Social Media</button>
      </div>
      <div className="pt-4">
        {activeTab === 'keywords' && (
          <div>
            {analysis.keywords.length > 0 ? (
                <>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr>
                                    <th className="p-2 border-2 border-black bg-[#E1FF01] font-bold text-black">Keyword</th>
                                    <th className="p-2 border-2 border-black bg-[#E1FF01] font-bold text-black">Count</th>
                                    <th className="p-2 border-2 border-black bg-[#E1FF01] font-bold text-black">%</th>
                                </tr>
                            </thead>
                            <tbody>
                                {analysis.keywords.map(kw => (
                                <tr key={kw.word}>
                                    <td className="p-2 border-2 border-black font-bold text-black">{kw.word}</td>
                                    <td className="p-2 border-2 border-black text-black">{kw.count}</td>
                                    <td className="p-2 border-2 border-black text-black">{kw.percentage}</td>
                                </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <Button onClick={downloadCSV} variant="secondary" className="mt-4 w-full">Download as CSV</Button>
                </>
            ) : (
              <p className="text-gray-500 text-center p-4">Start typing to see keyword analysis.</p>
            )}
          </div>
        )}
        {activeTab === 'social' && (
          <div className="space-y-4">
             <SocialMediaLimit name="X (Twitter)" limit={280} current={analysis.characters} />
             <SocialMediaLimit name="Instagram Caption" limit={2200} current={analysis.characters} />
             <SocialMediaLimit name="LinkedIn Post" limit={3000} current={analysis.characters} />
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalysisTabs;