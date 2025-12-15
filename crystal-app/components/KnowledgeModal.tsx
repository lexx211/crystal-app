import React, { useState } from 'react';
import { X, Sparkles, Droplets, Flame, Mountain, Hammer, Info, Lightbulb } from 'lucide-react';
import { Language } from '../types';
import { getTranslation } from '../utils/translations';

interface KnowledgeModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const KnowledgeModal: React.FC<KnowledgeModalProps> = ({ isOpen, onClose, lang }) => {
  const t = getTranslation(lang);
  const [activeTab, setActiveTab] = useState<string>('intro');

  if (!isOpen) return null;

  const tabs = [
    { id: 'intro', label: 'Intro', icon: Info, color: 'text-purple-300' },
    { id: 'metal', label: '金', icon: Hammer, color: 'text-slate-300' },
    { id: 'wood', label: '木', icon: Sparkles, color: 'text-green-400' }, // Using Sparkles as generic for nature/wood if Tree icon not available in standard Lucide import map set
    { id: 'water', label: '水', icon: Droplets, color: 'text-blue-400' },
    { id: 'fire', label: '火', icon: Flame, color: 'text-red-400' },
    { id: 'earth', label: '土', icon: Mountain, color: 'text-amber-500' },
  ];

  const renderContent = () => {
    if (activeTab === 'intro') {
      return (
        <div className="space-y-4 animate-fade-in">
          <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-yellow-300" />
            {t.knowledgeBase.intro.title}
          </h3>
          <p className="text-purple-100 leading-loose text-justify text-lg">
            {t.knowledgeBase.intro.content}
          </p>
          <div className="mt-8 p-4 bg-white/5 rounded-xl border border-white/10">
             <div className="flex justify-around items-center text-3xl opacity-50">
                <span>🪙</span><span>🌳</span><span>💧</span><span>🔥</span><span>⛰️</span>
             </div>
          </div>
        </div>
      );
    }

    const elementInfo = t.knowledgeBase.elements.find(e => e.key === activeTab);
    if (!elementInfo) return null;

    return (
      <div className="space-y-6 animate-fade-in pb-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-3xl font-serif font-bold text-white">{elementInfo.name}</h3>
          <span className="px-3 py-1 bg-white/10 rounded-full text-sm text-purple-200 border border-white/10">
            {elementInfo.traits}
          </span>
        </div>
        
        <div className="bg-gradient-to-br from-black/20 to-transparent p-5 rounded-2xl border border-white/5">
           <div className="mb-4">
             <span className="text-xs uppercase tracking-widest text-purple-400 block mb-1">Color Energy</span>
             <p className="text-lg text-white font-medium">{elementInfo.color}</p>
           </div>
           <div>
             <span className="text-xs uppercase tracking-widest text-purple-400 block mb-1">Representative Crystals</span>
             <p className="text-lg text-white font-medium">{elementInfo.crystals}</p>
           </div>
        </div>

        <p className="text-purple-100 leading-relaxed text-lg">
          {elementInfo.desc}
        </p>

        {/* Lucky Advice Section */}
        <div className="mt-6 p-5 bg-gradient-to-r from-purple-900/40 to-indigo-900/40 rounded-xl border border-purple-500/30 relative overflow-hidden">
           <div className="absolute top-0 right-0 p-4 opacity-5">
             <Lightbulb className="w-24 h-24 text-white" />
           </div>
           <h4 className="text-yellow-200 font-bold mb-3 flex items-center gap-2 relative z-10">
             <Lightbulb className="w-5 h-5 text-yellow-400" />
             {t.knowledgeBase.adviceTitle}
           </h4>
           <p className="text-purple-50 text-base leading-relaxed relative z-10">
             {elementInfo.advice}
           </p>
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-2xl bg-[#1a1625] bg-opacity-95 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
          <h2 className="text-xl font-bold text-white tracking-wide">
            {t.knowledgeBase.title}
          </h2>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 transition-colors text-white/70 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Body Container */}
        <div className="flex flex-col md:flex-row flex-grow overflow-hidden">
           
           {/* Sidebar / Navigation */}
           <div className="w-full md:w-24 bg-black/20 p-2 flex md:flex-col gap-2 overflow-x-auto md:overflow-visible shrink-0 border-b md:border-b-0 md:border-r border-white/10 no-scrollbar">
             {tabs.map((tab) => {
               const Icon = tab.icon;
               const isActive = activeTab === tab.id;
               return (
                 <button
                   key={tab.id}
                   onClick={() => setActiveTab(tab.id)}
                   className={`flex flex-col items-center justify-center p-3 rounded-xl transition-all min-w-[4rem] md:w-full aspect-square ${
                     isActive 
                       ? 'bg-purple-600 shadow-lg shadow-purple-900/50 text-white scale-105' 
                       : 'hover:bg-white/5 text-slate-400 hover:text-white'
                   }`}
                 >
                   <Icon className={`w-6 h-6 mb-1 ${isActive ? 'text-white' : tab.color}`} />
                   <span className="text-[10px] font-medium">{tab.label}</span>
                 </button>
               );
             })}
           </div>

           {/* Content Area */}
           <div className="flex-grow p-6 md:p-8 overflow-y-auto">
             {renderContent()}
           </div>

        </div>
      </div>
    </div>
  );
};