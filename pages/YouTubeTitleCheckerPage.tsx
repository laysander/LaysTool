import React, { useState, useEffect } from 'react';
import InputSection from '../components/youtube-checker/InputSection';

type Field = 'title' | 'description' | 'bio';
type StoredContent = Record<Field, string>;

const YouTubeTitleCheckerPage: React.FC = () => {
  const [content, setContent] = useState<StoredContent>({
    title: '',
    description: '',
    bio: '',
  });

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedContent = localStorage.getItem('youtubeCheckerContent');
      if (savedContent) {
        const parsedContent = JSON.parse(savedContent);
        // Load content, falling back for each property to prevent errors
        setContent({
            title: parsedContent.title || '',
            description: parsedContent.description || '',
            bio: parsedContent.bio || '',
        });
      }
    } catch (error) {
      console.error("Failed to load content from localStorage", error);
    }
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem('youtubeCheckerContent', JSON.stringify(content));
    } catch (error) {
      console.error("Failed to save content to localStorage", error);
    }
  }, [content]);

  const handleContentChange = (field: Field, value: string) => {
    setContent(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-5xl font-black mb-2 mt-12">YouTube Title Length Checker</h1>
        <p className="text-xl text-gray-600">Optimize your YouTube content for maximum engagement.</p>
      </header>

      <div className="space-y-8">
        <InputSection
          fieldId="title"
          label="Video Title"
          value={content.title}
          onChange={(e) => handleContentChange('title', e.target.value)}
          limit={100}
          truncateLimit={70}
          placeholder="Enter your engaging video title here..."
        />
        <InputSection
          fieldId="description"
          label="Video Description"
          value={content.description}
          onChange={(e) => handleContentChange('description', e.target.value)}
          limit={5000}
          isTextarea
          placeholder="Paste your video description. You can include links and hashtags."
        />
        <InputSection
          fieldId="bio"
          label="Channel Bio"
          value={content.bio}
          onChange={(e) => handleContentChange('bio', e.target.value)}
          limit={1000}
          isTextarea
          placeholder="Describe what your channel is about."
        />
      </div>
    </div>
  );
};

export default YouTubeTitleCheckerPage;