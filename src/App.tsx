import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Home from './components/Home';
import QuizView from './components/QuizView';
import MaterialsView from './components/MaterialsView';
import QuestionBankView from './components/QuestionBankView';
import SimulationsView from './components/SimulationsView';
import Footer from './components/Footer';
import { ViewType, MaterialScreen } from './types';

const FloatingObjects: React.FC = () => {
    const objects = [
        { icon: 'fas fa-atom', top: '10%', left: '10%', animationDuration: '12s' },
        { icon: 'fas fa-satellite-dish', top: '20%', left: '80%', animationDuration: '15s' },
        { icon: 'fas fa-wave-square', top: '70%', left: '5%', animationDuration: '10s' },
        { icon: 'fas fa-bolt', top: '80%', left: '90%', animationDuration: '13s' },
        { icon: 'fas fa-project-diagram', top: '50%', left: '50%', animationDuration: '11s' },
        { icon: 'fas fa-globe', top: '30%', left: '20%', animationDuration: '14s' },
        { icon: 'fas fa-magnet', top: '90%', left: '30%', animationDuration: '16s' },
        { symbol: 'E=mc²', top: '5%', left: '40%', animationDuration: '18s' },
        { symbol: '∫', top: '85%', left: '60%', animationDuration: '9s' },
        { symbol: 'λ', top: '40%', left: '85%', animationDuration: '17s' },
        { symbol: 'Ω', top: '60%', left: '25%', animationDuration: '14s' },

    ];

    return (
        <div className="floating-objects-container">
            {objects.map((obj, index) => (
                <div 
                    key={index}
                    className="floating-object"
                    style={{ 
                        top: obj.top, 
                        left: obj.left, 
                        animationDuration: obj.animationDuration,
                        animationDelay: `${index * 1.5}s`
                    }}
                    aria-hidden="true"
                >
                    {obj.icon ? <i className={obj.icon}></i> : <span style={{ fontFamily: 'serif' }}>{obj.symbol}</span>}
                </div>
            ))}
        </div>
    );
};


const App: React.FC = () => {
    const [view, setView] = useState<ViewType>('home');
    const [initialMaterialScreen, setInitialMaterialScreen] = useState<MaterialScreen>('main');
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const parallaxElements = document.querySelectorAll<HTMLElement>('.parallax-section');
            parallaxElements.forEach(el => {
                const speed = parseFloat(el.dataset.parallaxSpeed || '0.15');
                const offset = window.scrollY * speed;
                el.style.transform = `translateY(${offset}px)`;
            });
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleSetView = (newView: ViewType, materialScreen: MaterialScreen = 'main') => {
        setView(newView);
        setInitialMaterialScreen(materialScreen);
        setIsMenuOpen(false); // Close mobile menu on navigation
        window.scrollTo(0, 0); // Scroll to top on view change
    };

    const renderView = () => {
        switch (view) {
            case 'quizzes':
                return <QuizView />;
            case 'materials':
                return <MaterialsView initialScreen={initialMaterialScreen} />;
            case 'question-bank':
                return <QuestionBankView />;
            case 'simulations':
                return <SimulationsView />;
            case 'home':
            default:
                return <Home setView={handleSetView} />;
        }
    };

    return (
        <div className="min-h-screen flex flex-col font-sans relative overflow-x-hidden">
            <FloatingObjects />
            <div className="relative z-10 flex flex-col min-h-screen">
                <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
                <Navigation currentView={view} setView={handleSetView} isMenuOpen={isMenuOpen} />
                <main className="flex-grow max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 w-full py-8">
                    {renderView()}
                </main>
                <Footer />
            </div>
        </div>
    );
};

export default App;
