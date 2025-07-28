import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import Footer from './Footer';
import Breadcrumbs from './common/Breadcrumbs';

const Header: React.FC = () => {
  const activeLinkClass = "bg-[#E1FF01]";
  const linkClass = "px-4 py-2 border-2 border-black font-bold hover:bg-[#E1FF01] transition-colors duration-200";
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Effect to close the menu when the route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const mobileLinkClass = "block w-full text-center px-4 py-4 text-lg font-bold hover:bg-[#E1FF01] transition-colors duration-200";

  return (
    // The `relative` positioning is key for the absolute positioning of the mobile menu
    <header className="bg-white border-b-4 border-black p-4 relative z-10">
      <div className="container mx-auto flex justify-between items-center">
        <NavLink to="/" className="text-4xl font-black text-black">
          LayTools
        </NavLink>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-2">
           <NavLink to="/image-editor" className={({isActive}) => `${linkClass} ${isActive ? activeLinkClass : ''}`}>Image Editor</NavLink>
           <NavLink to="/word-counter" className={({isActive}) => `${linkClass} ${isActive ? activeLinkClass : ''}`}>Word Counter</NavLink>
           <NavLink to="/qr-code-generator" className={({isActive}) => `${linkClass} ${isActive ? activeLinkClass : ''}`}>QR Generator</NavLink>
           <NavLink to="/find-replace" className={({isActive}) => `${linkClass} ${isActive ? activeLinkClass : ''}`}>Find & Replace</NavLink>
           <NavLink to="/serp-simulator" className={({isActive}) => `${linkClass} ${isActive ? activeLinkClass : ''}`}>SERP Simulator</NavLink>
           <NavLink to="/youtube-title-checker" className={({isActive}) => `${linkClass} ${isActive ? activeLinkClass : ''}`}>YouTube Checker</NavLink>
        </nav>

        {/* Hamburger Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="w-8 h-6 flex flex-col justify-between"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            <span className={`block w-full h-1 bg-black rounded-full transition-all duration-300 ease-in-out ${isMenuOpen ? 'transform rotate-45 translate-y-2' : ''}`}></span>
            <span className={`block w-full h-1 bg-black rounded-full transition-opacity duration-300 ease-in-out ${isMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block w-full h-1 bg-black rounded-full transition-all duration-300 ease-in-out ${isMenuOpen ? 'transform -rotate-45 -translate-y-2' : ''}`}></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <div 
        id="mobile-menu" 
        className={`md:hidden absolute top-full left-0 w-full bg-white border-b-4 border-black shadow-lg transition-transform duration-300 ease-in-out ${isMenuOpen ? 'transform translate-y-0' : 'transform -translate-y-[150%]'}`}
      >
          <nav className="flex flex-col divide-y-2 divide-black">
            <NavLink to="/image-editor" className={({isActive}) => `${mobileLinkClass} ${isActive ? activeLinkClass : ''}`}>Image Editor</NavLink>
            <NavLink to="/word-counter" className={({isActive}) => `${mobileLinkClass} ${isActive ? activeLinkClass : ''}`}>Word Counter</NavLink>
            <NavLink to="/qr-code-generator" className={({isActive}) => `${mobileLinkClass} ${isActive ? activeLinkClass : ''}`}>QR Generator</NavLink>
            <NavLink to="/find-replace" className={({isActive}) => `${mobileLinkClass} ${isActive ? activeLinkClass : ''}`}>Find & Replace</NavLink>
            <NavLink to="/serp-simulator" className={({isActive}) => `${mobileLinkClass} ${isActive ? activeLinkClass : ''}`}>SERP Simulator</NavLink>
            <NavLink to="/youtube-title-checker" className={({isActive}) => `${mobileLinkClass} ${isActive ? activeLinkClass : ''}`}>YouTube Checker</NavLink>
          </nav>
      </div>
    </header>
  );
};


const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="bg-white text-[#0b0b0b] min-h-screen flex flex-col">
      <Header />
      <Breadcrumbs />
      <main className="container mx-auto px-6 md:px-10 flex-grow mb-20">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;