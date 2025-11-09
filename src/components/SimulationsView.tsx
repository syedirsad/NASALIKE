import React, { useState } from 'react';
import { simulationData } from '../data/simulations';
import { SimulationUnit } from '../types';

type ViewStep = 'class' | 'simulations';
type ClassNumber = '11' | '12';

const SimulationsView: React.FC = () => {
    const [step, setStep] = useState<ViewStep>('class');
    const [selectedClass, setSelectedClass] = useState<ClassNumber | null>(null);

    const handleClassSelect = (classNum: ClassNumber) => {
        setSelectedClass(classNum);
        setStep('simulations');
    };

    const handleBack = () => {
        setStep('class');
        setSelectedClass(null);
    };

    const renderContent = () => {
        switch (step) {
            case 'simulations':
                return selectedClass && <SimulationList classNum={selectedClass} onBack={handleBack} />;
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
                <span>Back to Class Selection</span>
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
        <div className="w-20 h-20 rounded-full flex items-center justify-center text-white text-4xl bg-green-500 mb-6">
            <i className={icon}></i>
        </div>
        <h3 className="font-sans text-2xl font-bold mb-2 text-nasa-white">{title}</h3>
        <p className="text-nasa-light-gray">{description}</p>
    </div>
);

const ClassSelection: React.FC<{ onSelect: (classNum: ClassNumber) => void }> = ({ onSelect }) => (
    <div>
        <ViewHeader title="Physics Simulations" subtitle="Select your class to explore interactive PhET simulations." />
        <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            <SelectionCard title="Class 11" description="Explore simulations for Standard 11 topics" icon="fas fa-atom" onClick={() => onSelect('11')} />
            <SelectionCard title="Class 12" description="Explore simulations for Standard 12 topics" icon="fas fa-bolt" onClick={() => onSelect('12')} />
        </div>
    </div>
);

const SimulationList: React.FC<{ classNum: ClassNumber, onBack: () => void }> = ({ classNum, onBack }) => {
    const units = simulationData[classNum];

    return (
        <div>
            <ViewHeader
                title={`Class ${classNum} Simulations`}
                subtitle="Interactive simulations organized by NCERT units."
                onBack={onBack}
            />
            <div className="space-y-8">
                {units.map((unit: SimulationUnit) => (
                    <div key={unit.unitName} className="bg-space-light border border-nasa-light-gray/20 rounded-lg p-6">
                        <h3 className="font-sans text-2xl font-bold mb-4 text-nasa-white border-b-2 border-nasa-blue/50 pb-3">{unit.unitName}</h3>
                        <ul className="space-y-3">
                            {unit.simulations.map(sim => (
                                <li key={sim.topic} className="flex items-center justify-between p-3 rounded-lg transition-colors hover:bg-space-dark/50 group">
                                    <span className="font-semibold text-nasa-white/90 transition-colors duration-300 group-hover:text-nasa-blue">{sim.topic}</span>
                                    <a
                                        href={sim.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-white font-bold py-2 px-5 rounded-md text-sm flex items-center justify-center gap-2 group bg-nasa-blue hover:bg-nasa-dark-blue"
                                    >
                                        <span>Launch</span>
                                        <i className="fas fa-external-link-alt transform group-hover:scale-110 transition-transform"></i>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SimulationsView;
