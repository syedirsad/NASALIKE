import React, { useState } from 'react';
import type { MaterialScreen, NeetMaterialSubView, Material } from '../types';
import {
    ncertMaterials,
    neetClass11English, neetClass12English,
    neetClass11Gujarati, neetClass12Gujarati
} from '../data/materials';

interface MaterialsViewProps {
    initialScreen: MaterialScreen;
}

const MaterialCard: React.FC<{ material: Material }> = ({ material }) => (
    <div className="bg-space-light border border-nasa-light-gray/20 rounded-lg flex flex-col p-6 transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-nasa-blue/20">
        <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 flex-shrink-0 rounded-lg flex items-center justify-center text-white text-xl bg-nasa-dark-blue">
                <i className={material.icon}></i>
            </div>
            <div>
                <h3 className="font-sans text-lg font-bold leading-tight text-nasa-white">{material.title}</h3>
                <p className="text-sm text-nasa-light-gray">{material.subTitle}</p>
            </div>
        </div>
        <p className="text-nasa-light-gray leading-relaxed flex-grow mb-4 text-sm">{material.description}</p>
        <div className="text-xs text-nasa-light-gray flex justify-between items-center bg-space-dark px-3 py-2 rounded-md mb-4">
            <span className="uppercase font-semibold tracking-wider">{material.type}</span>
            <span>{material.size}</span>
        </div>
        <a href={material.link} target="_blank" rel="noopener noreferrer" className="w-full text-white font-bold py-3 px-4 rounded-md flex items-center justify-center gap-2 group mt-auto bg-nasa-blue hover:bg-nasa-dark-blue">
            <span>View PDF</span><i className="fas fa-external-link-alt transform group-hover:scale-110 transition-transform"></i>
        </a>
    </div>
);

const CategoryCard: React.FC<{ title: string, description: string, badge: string, icon: string, iconBg: string, onClick: () => void }> = ({ title, description, badge, icon, iconBg, onClick }) => (
    <div onClick={onClick} className="bg-space-light border border-nasa-light-gray/20 rounded-lg flex flex-col p-6 cursor-pointer transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-nasa-blue/20">
        <div className="flex items-start justify-between mb-4">
            <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-white text-2xl ${iconBg}`}>
                <i className={icon}></i>
            </div>
            {badge && <div className="px-3 py-1 rounded-full bg-nasa-blue/20 text-nasa-blue text-xs font-bold">{badge}</div>}
        </div>
        <div className="flex-grow">
            <h3 className="font-sans text-xl font-bold mb-2 text-nasa-white">{title}</h3>
            <p className="text-nasa-light-gray mb-1 text-sm">{description}</p>
        </div>
        <div className="mt-6">
            <button className="w-full text-white font-bold py-3 px-4 rounded-md flex items-center justify-center gap-2 group bg-space-light hover:bg-nasa-light-gray/20 border border-nasa-light-gray/30">
                <span>View Materials</span><i className="fas fa-arrow-right transform group-hover:translate-x-1 transition-transform"></i>
            </button>
        </div>
    </div>
);

type MaterialViewScreen = MaterialScreen | NeetMaterialSubView;

const MaterialsView: React.FC<MaterialsViewProps> = ({ initialScreen }) => {
    const [screen, setScreen] = useState<MaterialViewScreen>(initialScreen);

    const renderContent = () => {
        switch (screen) {
            case 'ncert':
                return <MaterialList title="NCERT Materials" description="Complete NCERT Physics materials available online" materials={ncertMaterials} onBack={() => setScreen('main')} />;
            case 'neet':
                return <NeetCategorySelection setNeetSubView={(view) => setScreen(view)} onBack={() => setScreen('main')} />;
            case 'class11-english':
                return <MaterialList title="Class 11 NEET Materials - English" description="17 PDF materials available online" materials={neetClass11English} onBack={() => setScreen('neet')} />;
            case 'class12-english':
                return <MaterialList title="Class 12 NEET Materials - English" description="14 PDF materials available online" materials={neetClass12English} onBack={() => setScreen('neet')} />;
            case 'class11-gujarati':
                return <MaterialList title="Class 11 NEET Materials - ગુજરાતી" description="14 PDF materials available online" materials={neetClass11Gujarati} onBack={() => setScreen('neet')} />;
            case 'class12-gujarati':
                return <MaterialList title="Class 12 NEET Materials - ગુજરાતી" description="14 PDF materials available online" materials={neetClass12Gujarati} onBack={() => setScreen('neet')} />;
            case 'main':
            default:
                return <MainCategorySelection setScreen={setScreen} />;
        }
    }

    return <div>{renderContent()}</div>;
};

const MainCategorySelection: React.FC<{ setScreen: (screen: MaterialScreen) => void }> = ({ setScreen }) => (
    <div>
        <div className="text-center mb-12">
            <h2 className="font-sans text-4xl sm:text-5xl font-bold text-nasa-white">Study Materials</h2>
            <p className="text-lg text-nasa-light-gray mt-2">Select a category to view the materials.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            <CategoryCard title="NCERT Materials" description="Complete notes for Class 11 & 12" badge="2 PDFs" icon="fas fa-book" iconBg="bg-nasa-dark-blue" onClick={() => setScreen('ncert')} />
            <CategoryCard title="NEET Materials" description="Chapter-wise materials for competitive exams" badge="60+ PDFs" icon="fas fa-graduation-cap" iconBg="bg-nasa-red" onClick={() => setScreen('neet')} />
        </div>
    </div>
);

const NeetCategorySelection: React.FC<{ setNeetSubView: (subView: NeetMaterialSubView) => void, onBack: () => void }> = ({ setNeetSubView, onBack }) => (
    <div>
        <div className="mb-12">
            <button onClick={onBack} className="text-nasa-light-gray hover:text-nasa-white transition-colors duration-300 flex items-center gap-2 font-semibold mb-4">
                <i className="fas fa-arrow-left"></i>
                <span>Back to Categories</span>
            </button>
            <div className="text-center">
                <h2 className="font-sans text-4xl sm:text-5xl font-bold text-nasa-white">NEET Materials</h2>
                <p className="text-lg text-nasa-light-gray mt-2">Choose your class and medium</p>
            </div>
        </div>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <CategoryCard title="Class 11 English" description="NEET Physics materials for Class 11 in English Medium" badge="17 PDFs" icon="fas fa-book" iconBg="bg-nasa-dark-blue" onClick={() => setNeetSubView('class11-english')} />
            <CategoryCard title="Class 12 English" description="NEET Physics materials for Class 12 in English Medium" badge="14 PDFs" icon="fas fa-graduation-cap" iconBg="bg-nasa-blue" onClick={() => setNeetSubView('class12-english')} />
            <CategoryCard title="Class 11 ગુજરાતી" description="NEET Physics materials for Class 11 in Gujarati Medium" badge="14 PDFs" icon="fas fa-language" iconBg="bg-nasa-red" onClick={() => setNeetSubView('class11-gujarati')} />
            <CategoryCard title="Class 12 ગુજરાતી" description="NEET Physics materials for Class 12 in Gujarati Medium" badge="14 PDFs" icon="fas fa-atom" iconBg="bg-green-500" onClick={() => setNeetSubView('class12-gujarati')} />
        </div>
    </div>
)

const MaterialList: React.FC<{ title: string, description: string, materials: Material[], onBack?: () => void }> = ({ title, description, materials, onBack }) => (
    <div>
        <div className="mb-12">
            {onBack && (
                <button onClick={onBack} className="text-nasa-light-gray hover:text-nasa-white transition-colors duration-300 flex items-center gap-2 font-semibold mb-6">
                    <i className="fas fa-arrow-left"></i>
                    <span>Back</span>
                </button>
            )}
            <div className="text-center">
                <h2 className="font-sans text-4xl sm:text-5xl font-bold text-nasa-white">{title}</h2>
                <p className="text-lg text-nasa-light-gray mt-2">{description}</p>
            </div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {materials.map((material, index) => <MaterialCard key={index} material={material} />)}
        </div>
    </div>
)

export default MaterialsView;
