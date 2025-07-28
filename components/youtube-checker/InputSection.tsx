import React from 'react';
import Button from '../Button';

interface InputSectionProps {
  fieldId: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  limit: number;
  truncateLimit?: number;
  isTextarea?: boolean;
  placeholder?: string;
}

const getCounterColor = (current: number, limit: number): string => {
  if (current > limit) return 'text-red-600';
  if (current >= limit * 0.9 && current <= limit) return 'text-yellow-600';
  return 'text-green-600';
};

const InputSection: React.FC<InputSectionProps> = ({
  label,
  value,
  onChange,
  limit,
  truncateLimit,
  isTextarea = false,
  placeholder,
}) => {
  const currentLength = value.length;

  const handleCopy = () => {
    navigator.clipboard.writeText(value).catch(err => {
        console.error("Failed to copy text:", err);
    });
  };

  const renderTruncationPreview = () => {
    if (truncateLimit === undefined) return null;

    const isTruncated = currentLength > truncateLimit;
    const truncatedText = isTruncated ? `${value.substring(0, truncateLimit)}...` : value;

    return (
      <div className="mt-2 p-2 border-2 border-dashed border-black bg-gray-50">
        <p className="text-sm font-bold text-gray-700">Preview (truncated at {truncateLimit} chars):</p>
        <p className="font-mono text-sm truncate">{truncatedText || " "}</p>
      </div>
    );
  };

  const mainCounterColor = getCounterColor(currentLength, limit);
  const truncCounterColor = truncateLimit !== undefined ? getCounterColor(currentLength, truncateLimit) : '';

  return (
    <div className="bg-white p-6 border-4 border-black shadow-[8px_8px_0_#0b0b0b]">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-2xl font-black">{label}</h2>
        <Button onClick={handleCopy} variant="secondary" className="!px-4 !py-1 text-sm flex-shrink-0">
          Copy
        </Button>
      </div>

      {isTextarea ? (
        <textarea
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={5}
          className="w-full p-4 border-2 border-black bg-white focus:outline-none focus:ring-2 focus:ring-[#551EFD] text-base resize-y"
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full p-4 border-2 border-black bg-white focus:outline-none focus:ring-2 focus:ring-[#551EFD] text-base"
        />
      )}

      <div className="flex justify-end items-center gap-4 mt-2 font-mono text-sm flex-wrap">
        {truncateLimit !== undefined && (
          <span className={`${truncCounterColor} font-bold`}>
            Truncation: {currentLength}/{truncateLimit}
          </span>
        )}
        <span className={`${mainCounterColor} font-bold`}>
          Limit: {currentLength}/{limit}
        </span>
      </div>

      {renderTruncationPreview()}
    </div>
  );
};

export default InputSection;
