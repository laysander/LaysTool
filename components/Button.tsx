import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
}

const Button: React.FC<ButtonProps> = ({ children, className, variant = 'primary', ...props }) => {
  const baseClasses = "px-6 py-3 border-2 border-black font-bold transition-all duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none disabled:translate-y-0 disabled:translate-x-0";
  
  const variantClasses = {
    primary: "bg-[#E1FF01] text-black shadow-[4px_4px_0_#0b0b0b] hover:shadow-[2px_2px_0_#0b0b0b] active:shadow-none hover:-translate-x-px hover:-translate-y-px active:translate-x-1 active:translate-y-1",
    secondary: "bg-white text-black shadow-[4px_4px_0_#551EFD] hover:shadow-[2px_2px_0_#551EFD] active:shadow-none hover:-translate-x-px hover:-translate-y-px active:translate-x-1 active:translate-y-1",
  };

  return (
    <button className={`${baseClasses} ${variantClasses[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
