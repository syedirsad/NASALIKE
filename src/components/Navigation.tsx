import React from 'react';
import { ViewType } from '../types';

interface NavigationProps {
    currentView: ViewType;
    setView: (view: ViewType) => void;
    isMenuOpen: boolean;
}

const NavItem: React.FC<{
    label: string;
    icon: string;
    isActive: boolean;
    onClick: () => void;
}> = ({ label, icon, isActive, onClick }) => (
    <button
        onClick={onClick}
        className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-full font-semibold transition-all duration-300 transform btn-glossy ${
            isActive 
            ? 'active' 
            : ''
        }`}
    >
        <i className={icon}></i>
        <span className="text-sm sm:text-base">{label}</span>
    </button>
);

const Navigation: React.FC<NavigationProps> = ({ currentView, setView, isMenuOpen }) => {
    const navLinks = [
        { label: "Home", icon: "fas fa-home", view: 'home' as ViewType },
        { label: "Quizzes", icon: "fas fa-question-circle", view: 'quizzes' as ViewType },
        { label: "Materials", icon: "fas fa-book-open", view: 'materials' as ViewType },
        { label: "Question Bank", icon: "fas fa-archive", view: 'question-bank' as ViewType },
        { label: "Simulations", icon: "fas fa-flask", view: 'simulations' as ViewType },
    ];

    return (
        <nav className="glass-nav sticky top-[80px] sm:top-[84px] z-40">
            {/* Desktop Navigation */}
            <div className="max-w-[1400px] mx-auto px-2 sm:px-6 lg:px-8">
                <div className="hidden sm:flex justify-around sm:justify-start py-2 space-x-0 sm:space-x-2">
                    {navLinks.map((link) => (
                        <NavItem 
                            key={link.view}
                            label={link.label} 
                            icon={link.icon} 
                            isActive={currentView === link.view} 
                            onClick={() => setView(link.view)} 
                        />
                    ))}
                </div>
            </div>

            {/* Mobile Navigation Menu */}
            {isMenuOpen && (
                 <div className="sm:hidden border-t border-white/10">
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        {navLinks.map((link) => (
                           <button
                                key={link.view}
                                onClick={() => setView(link.view)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-md font-medium text-left transition-colors duration-200 ${
                                    currentView === link.view
                                    ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md'
                                    : 'text-white/80 hover:bg-white/10'
                                }`}
                            >
                                <i className={`${link.icon} w-5 text-center`}></i>
                                <span>{link.label}</span>
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navigation;
