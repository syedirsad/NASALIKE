import React, { useState } from 'react';
import { questionBanksData } from '../data/questionBanks';
import { QuestionBank } from '../types';

type ViewStep = 'class' | 'bank';
type ClassNumber = '11' | '12';

const QuestionBankView: React.FC = () => {
    const [step, setStep] = useState<ViewStep>('class');
    const [selectedClass, setSelectedClass] = useState<ClassNumber | null>(null);

    const handleClassSelect = (classNum: ClassNumber) => {
        setSelectedClass(classNum);
        setStep('bank');
    };

    const handleBack = () => {
        setStep('class');
        setSelectedClass(null);
    };

    const renderContent = () => {
        switch (step) {
            case 'bank':
                return selectedClass && <BankSelection classNum={selectedClass} onBack={handleBack} />;
            case 'class':
            default:
                return <ClassSelection onSelect={handleClassSelect} />;
        }
    };

    return <div>{renderContent()}</div>;
};

const ViewHeader: React.FC<{ title: string, subtitle: string, onBack?: () => void }> = ({ title, subtitle, onBack }) => (
    <div className="mb-12">
        {onBack && (
            <button onClick={onBack} className="text-nasa-light-gray hover:text-nasa-white transition-colors duration-300 flex items-center gap-2 font-semibold mb-6">
                <i className="fas fa-arrow-left"></i>
                <span>Back</span>
            </button>
        )}
        <div className="text-center">
            <h1 className="font-sans text-4xl sm:text-5xl font-bold text-nasa-white mb-4">{title}</h1>
            <p className="text-lg sm:text-xl text-nasa-light-gray">{subtitle}</p>
        </div>
    </div>
);

const SelectionCard: React.FC<{ title: string, description: string, icon: string, onClick: () => void }> = ({ title, description, icon, onClick }) => (
    <div onClick={onClick} className="bg-space-light border border-nasa-light-gray/20 rounded-lg p-8 flex flex-col items-center text-center cursor-pointer transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-nasa-blue/20">
        <div className="w-20 h-20 rounded-full flex items-center justify-center text-white text-4xl bg-nasa-blue mb-6">
            <i className={icon}></i>
        </div>
        <h3 className="font-sans text-2xl font-bold mb-2 text-nasa-white">{title}</h3>
        <p className="text-nasa-light-gray">{description}</p>
    </div>
);

const ClassSelection: React.FC<{ onSelect: (classNum: ClassNumber) => void }> = ({ onSelect }) => (
    <div>
        <ViewHeader title="GSEB Question Banks" subtitle="Select your class to begin." />
        <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            <SelectionCard title="Class 11" description="View question banks for Standard 11" icon="fas fa-book" onClick={() => onSelect('11')} />
            <SelectionCard title="Class 12" description="View question banks for Standard 12" icon="fas fa-graduation-cap" onClick={() => onSelect('12')} />
        </div>
    </div>
);

const BankCard: React.FC<{ bank: QuestionBank }> = ({ bank }) => {
    const buttonClass = "w-full text-white font-bold py-3 px-4 rounded-md flex items-center justify-center gap-2 bg-space-light hover:bg-nasa-light-gray/20 border border-nasa-light-gray/30 transition-colors";

    return (
        <div className="bg-space-light border border-nasa-light-gray/20 rounded-lg p-8 flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-full flex items-center justify-center text-white text-4xl bg-nasa-dark-blue mb-6">
                <i className="fas fa-archive"></i>
            </div>
            <h3 className="font-sans text-2xl font-bold mb-2 text-nasa-white">{bank.title}</h3>
            <p className="text-nasa-light-gray mb-6 flex-grow">{bank.description}</p>
            <div className="w-full space-y-3 mt-auto">
                <a href={bank.solutionLinks.en} target="_blank" rel="noopener noreferrer" className={buttonClass}>
                    <i className="fas fa-download text-nasa-red"></i>
                    <span>English Medium PDF</span>
                </a>
                <a href={bank.solutionLinks.gu} target="_blank" rel="noopener noreferrer" className={buttonClass}>
                    <i className="fas fa-download text-green-400"></i>
                    <span className="font-gujarati">ગુજરાતી માધ્યમ PDF</span>
                </a>
            </div>
        </div>
    );
};

const BankSelection: React.FC<{ classNum: ClassNumber, onBack: () => void }> = ({ classNum, onBack }) => {
    const banks = questionBanksData[classNum];

    if (banks.length === 0) {
        return (
            <div>
                <ViewHeader title={`Class ${classNum} Question Banks`} subtitle="No question banks available yet." onBack={onBack} />
                <p className="text-center text-nasa-light-gray">Please check back later for updates.</p>
            </div>
        )
    }

    return (
        <div>
            <ViewHeader title={`Class ${classNum} Question Banks`} subtitle="Download the PDF solutions for your selected question bank." onBack={onBack} />
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {banks.map(bank => (
                    <BankCard key={bank.id} bank={bank} />
                ))}
            </div>
        </div>
    );
};

export default QuestionBankView;
