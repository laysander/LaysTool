import React from 'react';

interface StatCardProps {
  label: string;
  value: string | number;
}

const StatCard: React.FC<StatCardProps> = ({ label, value }) => {
  return (
    <div className="bg-white p-4 border-2 border-black shadow-[4px_4px_0_#0b0b0b]">
      <p className="text-gray-600 text-sm font-bold uppercase tracking-wider">{label}</p>
      <p className="text-3xl font-black text-[#551EFD]">{value}</p>
    </div>
  );
};

export default StatCard;