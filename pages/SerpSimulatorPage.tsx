import React, { useState } from 'react';
import SerpPreview from '../components/serp-simulator/SerpPreview';

type ViewMode = 'desktop' | 'mobile';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    value: string;
    maxLength: number;
}

interface FormTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label: string;
    value: string;
    maxLength: number;
}

const FormInput: React.FC<FormInputProps> = ({ label, value, maxLength, ...props }) => {
    const isOverLimit = value.length > maxLength;
    return (
        <div>
            <label className="block text-lg font-bold mb-2">{label}</label>
            <input
                {...props}
                value={value}
                className="w-full p-3 border-2 border-black font-bold bg-white focus:outline-none focus:ring-2 focus:ring-[#551EFD]"
            />
            <p className={`text-right text-sm font-mono mt-1 ${isOverLimit ? 'text-red-600 font-bold' : 'text-gray-500'}`}>
                {value.length}/{maxLength}
            </p>
        </div>
    );
};

const FormTextarea: React.FC<FormTextareaProps> = ({ label, value, maxLength, ...props }) => {
    const isOverLimit = value.length > maxLength;
    return (
        <div>
            <label className="block text-lg font-bold mb-2">{label}</label>
            <textarea
                {...props}
                value={value}
                rows={4}
                className="w-full p-3 border-2 border-black font-bold bg-white focus:outline-none focus:ring-2 focus:ring-[#551EFD] resize-y"
            />
            <p className={`text-right text-sm font-mono mt-1 ${isOverLimit ? 'text-red-600 font-bold' : 'text-gray-500'}`}>
                {value.length}/{maxLength}
            </p>
        </div>
    );
};

const SerpSimulatorPage: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('desktop');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [siteName, setSiteName] = useState('');
  
  const TITLE_LIMIT = 60;
  const DESC_LIMIT = 160;

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-5xl font-black mb-2 mt-12">Google SERP Simulator</h1>
        <p className="text-xl text-gray-600">Preview how your page will look in Google search results.</p>
      </header>
      
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Left Column: Controls */}
        <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-6 border-4 border-black shadow-[8px_8px_0_#0b0b0b]">
                <h2 className="text-2xl font-black mb-4">Content</h2>
                 <div className="space-y-4">
                    <FormInput
                        label="Page Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        maxLength={TITLE_LIMIT}
                        placeholder="Your Page Title"
                    />
                    <FormTextarea
                        label="Meta Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        maxLength={DESC_LIMIT}
                        placeholder="Your meta description..."
                    />
                     <FormInput
                        label="Display URL"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        maxLength={90}
                        placeholder="example.com/page"
                    />
                     <FormInput
                        label="Site Name / Brand"
                        value={siteName}
                        onChange={(e) => setSiteName(e.target.value)}
                        maxLength={40}
                        placeholder="Your Brand"
                    />
                </div>
            </div>
            <div className="bg-white p-6 border-4 border-black shadow-[8px_8px_0_#0b0b0b]">
                 <h2 className="text-2xl font-black mb-4">Preview Mode</h2>
                 <div className="flex gap-2">
                    <button 
                        onClick={() => setViewMode('desktop')}
                        className={`w-full px-4 py-2 border-2 border-black font-bold transition-colors ${viewMode === 'desktop' ? 'bg-[#E1FF01] shadow-[2px_2px_0_#0b0b0b]' : 'bg-white hover:bg-gray-100'}`}
                    >
                        Desktop
                    </button>
                    <button 
                        onClick={() => setViewMode('mobile')}
                        className={`w-full px-4 py-2 border-2 border-black font-bold transition-colors ${viewMode === 'mobile' ? 'bg-[#E1FF01] shadow-[2px_2px_0_#0b0b0b]' : 'bg-white hover:bg-gray-100'}`}
                    >
                        Mobile
                    </button>
                 </div>
            </div>
        </div>
        
        {/* Right Column: Preview */}
        <div className="lg:col-span-3">
          <SerpPreview 
            title={title}
            description={description}
            url={url}
            siteName={siteName}
            viewMode={viewMode}
            titleLimit={TITLE_LIMIT}
            descriptionLimit={DESC_LIMIT}
          />
        </div>
      </div>
    </div>
  );
};

export default SerpSimulatorPage;