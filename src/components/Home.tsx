import React from 'react';
import { ViewType, MaterialScreen } from '../types';

interface HomeProps {
    setView: (view: ViewType, materialScreen?: MaterialScreen) => void;
}

const ActionButton: React.FC<{ onClick?: () => void; href?: string; children: React.ReactNode; className?: string; type?: 'primary' | 'secondary' }> = ({ onClick, href, children, className = '', type = 'primary' }) => {
    const baseClasses = `w-full text-white font-bold py-3 px-4 rounded-md flex items-center justify-center gap-2 group transition-all duration-300`;
    const typeClasses = type === 'primary'
        ? 'bg-nasa-blue hover:bg-nasa-dark-blue shadow-md shadow-nasa-blue/30'
        : 'bg-space-light hover:bg-nasa-light-gray/20 border border-nasa-light-gray/30';
    const commonClasses = `${baseClasses} ${typeClasses} ${className}`;

    if (href) {
        return (
            <a href={href} target="_blank" rel="noopener noreferrer" className={commonClasses}>
                {children}
            </a>
        );
    }

    return (
        <button onClick={onClick} className={commonClasses}>
            {children}
        </button>
    );
};

const ResourceCard: React.FC<{
    title: string;
    description: string;
    icon: string;
    iconBgClass: string;
    buttonText?: string;
    badge?: string;
    badgeBgClass?: string;
    onClick?: () => void;
    href?: string;
    children?: React.ReactNode;
}> = ({ title, description, icon, iconBgClass, buttonText, badge, badgeBgClass, onClick, href, children }) => (
    <div className="bg-space-light border border-nasa-light-gray/20 rounded-lg flex flex-col p-6 transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-nasa-blue/20">
        <div className="flex items-start justify-between mb-4">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-white text-2xl ${iconBgClass}`}>
                <i className={icon}></i>
            </div>
            {badge && <div className={`px-3 py-1 rounded-full text-xs font-bold ${badgeBgClass}`}>{badge}</div>}
        </div>
        <div className="flex-grow text-left">
            <h3 className="font-sans text-xl font-bold text-nasa-white mb-2">{title}</h3>
            <p className="text-nasa-light-gray mb-4 text-sm leading-relaxed">{description}</p>
        </div>
        <div className="mt-auto">
            {children}
            {buttonText && (
                <ActionButton onClick={onClick} href={href}>
                    <span>{buttonText}</span>
                    <i className="fas fa-arrow-right transform group-hover:translate-x-1 transition-transform"></i>
                </ActionButton>
            )}
        </div>
    </div>
);

const CommunityCard: React.FC<{
    title: string;
    description: string;
    icon: string;
    buttonText: string;
    link: string;
    iconBgClass: string;
    buttonBgClass: string;
}> = ({ title, description, icon, buttonText, link, iconBgClass, buttonBgClass }) => (
    <div className="bg-space-light border border-nasa-light-gray/20 rounded-lg flex flex-col text-center p-6 transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-nasa-blue/20">
        <div className="mx-auto mb-4">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white text-3xl ${iconBgClass}`}>
                <i className={icon}></i>
            </div>
        </div>
        <div className="flex-grow">
            <h3 className="font-sans text-xl font-bold text-nasa-white mb-2">{title}</h3>
            <p className="text-nasa-light-gray mb-6 text-sm">{description}</p>
        </div>
        <div className="mt-auto">
            <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full text-white font-bold py-3 px-4 rounded-md transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 group ${buttonBgClass}`}
            >
                <span>{buttonText}</span>
                <i className="fas fa-external-link-alt transform group-hover:scale-110 transition-transform"></i>
            </a>
        </div>
    </div>
);

const Home: React.FC<HomeProps> = ({ setView }) => {
    return (
        <div>
            <section className="text-center py-20 sm:py-28 relative">
                <div className="absolute inset-0 flex items-center justify-center opacity-5" aria-hidden="true">
                    <img src="https://cdn.jsdelivr.net/gh/syedirsad/CHAP1@main/logo.png" alt="" className="w-48 h-48 sm:w-64 sm:h-64 object-contain" />
                </div>
                <div className="relative z-10">
                    <h1 className="font-sans text-5xl sm:text-7xl font-extrabold mb-4 text-nasa-white" style={{ textShadow: '0 0 15px rgba(255, 255, 255, 0.3)' }}>
                        NEET PHYSICS GUJARATI
                    </h1>
                    <p className="text-xl sm:text-2xl text-nasa-light-gray font-light max-w-3xl mx-auto">
                        Learn Smarter
                    </p>
                </div>
            </section>

            <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
                <ResourceCard
                    title="Chapterwise Quizzes"
                    description="Test your knowledge with quizzes for every chapter of Class 11 & 12."
                    icon="fas fa-question-circle"
                    iconBgClass="bg-nasa-blue"
                    buttonText="Start Practicing"
                    onClick={() => setView('quizzes')}
                />
                <ResourceCard
                    title="NEET Materials"
                    description="Complete chapter-wise NEET preparation materials for Class 11 & 12."
                    icon="fas fa-graduation-cap"
                    iconBgClass="bg-nasa-red"
                    badge="NEET"
                    badgeBgClass="bg-nasa-red/20 text-nasa-red"
                    buttonText="Explore Materials"
                    onClick={() => setView('materials', 'neet')}
                />
                <ResourceCard
                    title="NCERT Materials"
                    description="Complete NCERT Physics notes for Class 11 & 12 in English Medium."
                    icon="fas fa-book"
                    iconBgClass="bg-nasa-dark-blue"
                    badge="PDF"
                    badgeBgClass="bg-nasa-blue/20 text-nasa-blue"
                    buttonText="View Materials"
                    onClick={() => setView('materials', 'ncert')}
                />
                <ResourceCard
                    title="GSEB Question Bank"
                    description="Solve official board question banks with detailed, section-wise solutions."
                    icon="fas fa-university"
                    iconBgClass="bg-nasa-light-gray"
                    buttonText="View Solutions"
                    onClick={() => setView('question-bank')}
                />
                <ResourceCard
                    title="GSEB Blueprint 2026"
                    description="Complete Exam Blueprint & Strategy for the Class 12 Physics Exam."
                    icon="fas fa-chart-line"
                    iconBgClass="bg-green-500"
                    badge="Essential"
                    badgeBgClass="bg-green-500/20 text-green-300"
                    buttonText="View Blueprint"
                    href="https://syedirsad.github.io/march2026tips/"
                />
                <ResourceCard
                    title="Board Exam Papers"
                    description="GSEB Physics Papers (2018-2025) for English & Gujarati medium."
                    icon="fas fa-file-alt"
                    iconBgClass="bg-gray-600"
                    badge="Download"
                    badgeBgClass="bg-gray-400/20 text-gray-300"
                >
                    <div className="space-y-3">
                        <ActionButton href="https://github.com/syedirsad/allpdf/raw/main/EM%20PHYSICS%20BOARDS%20PAPER.pdf" type="secondary">
                            <i className="fas fa-download"></i><span>English Medium</span>
                        </ActionButton>
                        <ActionButton href="https://github.com/syedirsad/allpdf/raw/main/GM%20PHYSICS%20BOARDS%20PAPER.pdf" type="secondary">
                            <i className="fas fa-download"></i><span>ગુજરાતી માધ્યમ</span>
                        </ActionButton>
                    </div>
                </ResourceCard>
            </section>

            <div className="border-t border-nasa-light-gray/20 my-16"></div>

            <section>
                <div className="text-center mb-12">
                    <h2 className="font-sans text-4xl sm:text-5xl font-bold text-nasa-white">Join Our Learning Community</h2>
                    <p className="text-lg text-nasa-light-gray mt-2">Connect with thousands of NEET aspirants and get your doubts solved.</p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <CommunityCard
                        title="YouTube"
                        description="Watch NEET Physics content, live sessions, and PYQ walkthroughs."
                        icon="fab fa-youtube"
                        buttonText="Subscribe Now"
                        link="https://www.youtube.com/@npgujarati"
                        iconBgClass="bg-red-600"
                        buttonBgClass="bg-red-600 hover:bg-red-700"
                    />
                    <CommunityCard
                        title="WhatsApp"
                        description="Join our active study group for peer discussions and important updates."
                        icon="fab fa-whatsapp"
                        buttonText="Join Group"
                        link="https://chat.whatsapp.com/LGeExJ4a5562e13B04uuQm"
                        iconBgClass="bg-green-500"
                        buttonBgClass="bg-green-500 hover:bg-green-600"
                    />
                    <CommunityCard
                        title="Telegram"
                        description="Get instant updates, study materials, and important notices."
                        icon="fab fa-telegram"
                        buttonText="Join Channel"
                        link="https://t.me/neet_physics_gujarati"
                        iconBgClass="bg-sky-500"
                        buttonBgClass="bg-sky-500 hover:bg-sky-600"
                    />
                    <CommunityCard
                        title="Instagram"
                        description="Follow for quick tips, visual learning content, and daily motivation."
                        icon="fab fa-instagram"
                        buttonText="Follow Us"
                        link="https://instagram.com/neet_physics.gujarati"
                        iconBgClass="bg-pink-600"
                        buttonBgClass="bg-pink-600 hover:bg-pink-700"
                    />
                </div>
            </section>
        </div>
    );
};

export default Home;
