import React from 'react';

const SectionHeader: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <h2 className="text-3xl md:text-4xl font-black border-b-4 border-black pb-2 mb-4">
      {children}
    </h2>
  );
};

export default SectionHeader;