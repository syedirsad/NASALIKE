import React from 'react';
import { class11Quizzes, class12Quizzes } from '../data/quizzes';
import { Quiz } from '../types';

const QuizCard: React.FC<{ quiz: Quiz }> = ({ quiz }) => (
    <div className={`bg-space-light border border-nasa-light-gray/20 rounded-lg p-6 flex flex-col transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-nasa-blue/20 ${quiz.isComingSoon ? 'opacity-70' : ''}`}>
        <div className="flex items-start justify-between mb-4">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-white text-2xl ${quiz.iconBgClass}`}>
                <i className={quiz.icon}></i>
            </div>
            {quiz.isComingSoon && <div className="px-3 py-1 rounded-full bg-nasa-light-gray/20 text-nasa-light-gray text-xs font-bold">Coming Soon</div>}
        </div>
        <div className="flex-grow">
            <h3 className="font-sans text-xl font-bold mb-2 text-nasa-white">{quiz.title}</h3>
            <p className="text-nasa-light-gray mb-1 text-sm">{quiz.description}</p>
            <span className="text-sm text-nasa-light-gray/80 font-medium">{quiz.chapterInfo}</span>
        </div>
        <div className="mt-6">
            <a
                href={quiz.isComingSoon ? undefined : quiz.link}
                target={quiz.isComingSoon ? undefined : "_blank"}
                rel={quiz.isComingSoon ? undefined : "noopener noreferrer"}
                className={`w-full font-bold py-3 px-4 rounded-md flex items-center justify-center gap-2 group transition-all duration-300 ${
                    quiz.isComingSoon
                    ? 'bg-space-light text-nasa-light-gray/50 cursor-not-allowed'
                    : 'bg-nasa-blue hover:bg-nasa-dark-blue text-white'
                }`}
                onClick={(e) => quiz.isComingSoon && e.preventDefault()}
            >
                <span>{quiz.isComingSoon ? 'Coming Soon' : 'Start Quiz'}</span>
                <i className={quiz.isComingSoon ? 'fas fa-clock' : 'fas fa-play'}></i>
            </a>
        </div>
    </div>
);

const QuizSection: React.FC<{ title: string, quizzes: Quiz[] }> = ({ title, quizzes }) => (
    <section className="mb-16">
        <h2 className="font-sans text-4xl font-bold text-nasa-white text-center mb-8">{title}</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {quizzes.map((quiz) => (
                <QuizCard key={quiz.title} quiz={quiz} />
            ))}
        </div>
    </section>
);

const QuizView: React.FC = () => {
    return (
        <div>
            <section className="text-center py-12 sm:py-16">
                <h1 className="font-sans text-5xl sm:text-6xl font-extrabold text-nasa-white mb-4">
                    NEET/JEE Chapterwise Quizzes
                </h1>
                <p className="text-lg sm:text-xl text-nasa-light-gray">
                    Select your class to start practicing with our chapter-specific quizzes.
                </p>
            </section>

            <div className="space-y-16">
                <QuizSection title="Class 11 Quizzes" quizzes={class11Quizzes} />
                <QuizSection title="Class 12 Quizzes" quizzes={class12Quizzes} />
            </div>
        </div>
    );
};

export default QuizView;
