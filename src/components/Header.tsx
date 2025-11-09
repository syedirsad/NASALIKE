import React from 'react';

interface HeaderProps {
    isMenuOpen: boolean;
    setIsMenuOpen: (isOpen: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ isMenuOpen, setIsMenuOpen }) => {
    return (
        <header className="bg-space-light/80 backdrop-blur-md border-b border-nasa-light-gray/20 py-4 sticky top-0 z-50">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-nasa-dark-blue flex items-center justify-center border-2 border-nasa-light-gray/30">
                        <img src="https://cdn.jsdelivr.net/gh/syedirsad/CHAP1@main/logo.png" alt="NPG Logo" className="w-10 h-10 object-cover rounded-full" />
                    </div>
                    <div className="text-nasa-white">
                        <h1 className="font-sans text-xl sm:text-2xl font-bold tracking-wider">NEET PHYSICS GUJARATI</h1>
                        <p className="text-sm opacity-90 font-light tracking-wide">BY IRSHAD SIR</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="hidden sm:block">
                        <a href="https://syedirsad.github.io/march2026tips/" target="_blank" rel="noopener noreferrer" className="bg-nasa-blue text-white font-bold py-2 px-5 rounded-md transition-transform duration-300 hover:scale-105 hover:bg-nasa-dark-blue flex items-center gap-2 shadow-md shadow-nasa-blue/30">
                            <i className="fas fa-rocket"></i>
                            <span>Strategy 2026</span>
                        </a>
                    </div>
                    <button
                        className="sm:hidden text-nasa-white text-2xl w-8 h-8"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle menu"
                        aria-expanded={isMenuOpen}
                    >
                        <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
