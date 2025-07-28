import React from 'react';

interface CalloutProps {
    children: React.ReactNode;
    variant?: 'info' | 'warning';
}

const Callout: React.FC<CalloutProps> = ({ children, variant = 'info' }) => {
    const variants = {
        info: 'bg-[#E1FF01]/30 border-[#a5b801]',
        warning: 'bg-yellow-400/30 border-yellow-500'
    };
    return (
        <div className={`p-4 border-l-4 ${variants[variant]}`}>
            <div className="font-bold text-black">{children}</div>
        </div>
    );
}

export default Callout;