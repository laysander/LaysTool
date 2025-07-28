import React from 'react';
import { Link } from 'react-router-dom';

interface ToolCardProps {
  to: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const ToolCard: React.FC<ToolCardProps> = ({ to, title, description, icon }) => {
  return (
    <Link 
      to={to} 
      className="block bg-white p-6 border-4 border-black shadow-[8px_8px_0_#551EFD] hover:shadow-[4px_4px_0_#551EFD] hover:translate-x-1 hover:translate-y-1 transition-all duration-200"
    >
      <div className="flex items-center mb-4">
        <div className="text-4xl mr-4">{icon}</div>
        <h2 className="text-3xl font-black">{title}</h2>
      </div>
      <p className="text-lg">{description}</p>
    </Link>
  );
};

export default ToolCard;
