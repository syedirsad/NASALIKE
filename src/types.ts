export interface Material {
    title: string;
    subTitle: string;
    description: string;
    type: string;
    size: string;
    link: string;
    icon: string;
}

export interface Quiz {
    icon: string;
    title: string;
    description: string;
    chapterInfo: string;
    link: string;
    iconBgClass: string;
    isComingSoon?: boolean;
}

export type ViewType = 'home' | 'quizzes' | 'materials' | 'question-bank' | 'simulations';

export type MaterialType = 'ncert' | 'neet';

export type MaterialScreen = 'main' | 'ncert' | 'neet';

export type NeetMaterialSubView = 'main' | 'class11-english' | 'class12-english' | 'class11-gujarati' | 'class12-gujarati';

// Defines the structure for a single question bank entry
export interface QuestionBank {
    id: string;
    title: string;
    description: string;
    solutionLinks: {
        en: string;
        gu: string;
    };
}

// Organizes question banks by class number
export interface ClassQuestionBanks {
    '11': QuestionBank[];
    '12': QuestionBank[];
}

// Defines the structure for a single simulation
export interface Simulation {
    topic: string;
    link: string;
}

// Defines a unit containing multiple simulations
export interface SimulationUnit {
    unitName: string;
    simulations: Simulation[];
}

// Organizes simulation units by class number
export interface ClassSimulations {
    '11': SimulationUnit[];
    '12': SimulationUnit[];
}
