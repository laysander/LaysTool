import React, { useRef } from 'react';

interface AddMoreCardProps {
  onFilesAdded: (files: FileList) => void;
}

const AddMoreCard: React.FC<AddMoreCardProps> = ({ onFilesAdded }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      onFilesAdded(e.target.files);
    }
  };

  const onCardClick = () => {
    inputRef.current?.click();
  };

  return (
    <div
      onClick={onCardClick}
      className="flex flex-col items-center justify-center border-4 border-dashed border-black h-full min-h-[300px] bg-gray-50 hover:bg-[#E1FF01]/50 transition-colors duration-200 cursor-pointer"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if(e.key === 'Enter' || e.key === ' ') onCardClick() }}
      aria-label="Add more images"
    >
      <input
        ref={inputRef}
        type="file"
        multiple
        accept="image/*"
        onChange={handleChange}
        className="hidden"
      />
      <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
      </svg>
      <p className="mt-2 font-bold text-gray-700">Add More</p>
    </div>
  );
};

export default AddMoreCard;