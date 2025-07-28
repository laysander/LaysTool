import React from 'react';

interface ColorPickerProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  id: string;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ label, value, onChange, id }) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-bold mb-1">{label}</label>
      <div className="flex items-center gap-2 p-1 border-2 border-black bg-white">
        <input
          id={id}
          type="color"
          value={value}
          onChange={onChange}
          className="w-8 h-8 p-0 border-none bg-transparent cursor-pointer"
          title={`Select color for ${label}`}
        />
        <span className="font-mono text-sm uppercase">{value}</span>
      </div>
    </div>
  );
};

export default ColorPicker;