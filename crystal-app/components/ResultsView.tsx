import React from 'react';
import { BaziResult, CrystalRecommendation, Language } from '../types';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { RefreshCw, Hexagon, ShieldCheck, BookOpen } from 'lucide-react';
import { getTranslation } from '../utils/translations';

interface ResultsViewProps {
  result: BaziResult;
  onReset: () => void;
  lang: Language;
}

const COLORS = {
  metal: '#94a3b8', // slate-400
  wood: '#4ade80',  // green-400
  water: '#60a5fa', // blue-400
  fire: '#f87171',  // red-400
  earth: '#d97706', // amber-600
};

const ElementBadge: React.FC<{ element: string; label: string; highlight?: boolean }> = ({ element, label, highlight }) => (
  <div className={`flex flex-col items-center p-3 rounded-xl border ${highlight ? 'bg-white/20 border-yellow-300/50 shadow-[0_0_15px_rgba(253,224,71,0.3)]' : 'bg-white/5 border-white/10'}`}>
    <span className="text-xs text-purple-200 mb-1">{label}</span>
    <span className="text-lg font-bold text-white font-serif">{element}</span>
  </div>
);

export const ResultsView: React.FC<ResultsViewProps> = ({ result, onReset, lang }) => {
  const t = getTranslation(lang);
  const chartData = [
    { name: lang === 'zh' ? '金' : 'Metal', value: result.elementDistribution.metal, color: COLORS.metal },
    { name: lang === 'zh' ? '木' : 'Wood', value: result.elementDistribution.wood, color: COLORS.wood },
    { name: lang === 'zh' ? '水' : 'Water', value: result.elementDistribution.water, color: COLORS.water },
    { name: lang === 'zh' ? '火' : 'Fire', value: result.elementDistribution.fire, color: COLORS.fire },
    { name: lang === 'zh' ? '土' : 'Earth', value: result.elementDistribution.earth, color: COLORS.earth },
  ];

  // Filter out any crystal recommendations that might be malformed or empty
  const validRecommendations = result.recommendations.filter(
    (crystal) => crystal && crystal.name && crystal.name.trim() !== ''
  );

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8 animate-fade-in-up pb-12">
      
      {/* Top Section: Bazi & Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Bazi Pillars */}
        <div className="md:col-span-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Hexagon className="w-32 h-32 text-white" />
          </div>
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="w-1 h-6 bg-pink-500 rounded-full"></span>
            {t.results.pillars}
          </h3>
          <div className="grid grid-cols-4 gap-2 text-center">
            {Object.entries(result.pillars).map(([key, value]) => (
              <div key={key} className="bg-black/20 rounded-lg p-3">
                <div className="text-xs text-purple-300 uppercase mb-1 tracking-wider">
                  {key === 'year' && t.results.year}
                  {key === 'month' && t.results.month}
                  {key === 'day' && t.results.day}
                  {key === 'hour' && t.results.hour}
                </div>
                <div className="text-xl md:text-2xl font-serif font-bold text-white tracking-widest">{value}</div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 pt-6 border-t border-white/10">
             <h4 className="text-lg font-bold text-white mb-3">{t.results.analysis}</h4>
             <p className="text-purple-100 leading-relaxed text-sm md:text-base text-justify">
               {result.analysis}
             </p>
          </div>
        </div>

        {/* Element Distribution */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 flex flex-col items-center justify-center">
           <h3 className="text-lg font-bold text-white mb-2 self-start">{t.results.distribution}</h3>
           <div className="w-full h-48">
             <ResponsiveContainer width="100%" height="100%">
               <PieChart>
                 <Pie
                   data={chartData}
                   innerRadius={30}
                   outerRadius={50}
                   paddingAngle={5}
                   dataKey="value"
                 >
                   {chartData.map((entry, index) => (
                     <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                   ))}
                 </Pie>
                 <Tooltip 
                    contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: 'none', borderRadius: '8px' }}
                    itemStyle={{ color: '#fff' }}
                 />
                 <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '12px', color: '#fff' }}/>
               </PieChart>
             </ResponsiveContainer>
           </div>
           
           <div className="grid grid-cols-3 gap-2 w-full mt-2">
              <ElementBadge element={result.dominantElement} label={t.results.strongest} />
              <ElementBadge element={result.missingElement} label={t.results.weakest} />
              <ElementBadge element={result.luckyElement} label={t.results.lucky} highlight={true} />
           </div>
        </div>
      </div>

      {/* Recommendations Section */}
      <div>
        <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2 pl-2">
           <SparklesIcon />
           {t.results.recommendation}
        </h3>
        {/* Changed from grid to flex wrap to better handle cases with <3 items gracefully */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {validRecommendations.map((crystal, idx) => (
            <CrystalCard key={idx} crystal={crystal} index={idx} label={t.results.element} />
          ))}
          {/* Fallback if no valid recommendations found (rare) */}
          {validRecommendations.length === 0 && (
             <div className="col-span-3 p-8 text-center bg-white/5 rounded-xl border border-white/10">
               <p className="text-purple-200">No specific crystal recommendations available for this chart.</p>
             </div>
          )}
        </div>
      </div>

      {/* Crystal Knowledge Section */}
      <div className="bg-gradient-to-br from-indigo-900/40 to-purple-900/40 backdrop-blur-xl border border-purple-300/20 rounded-2xl p-6 relative">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-purple-500/20 rounded-xl hidden md:block">
            <BookOpen className="w-6 h-6 text-purple-200" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
               <BookOpen className="w-5 h-5 text-purple-200 md:hidden" />
               {t.results.knowledgeTitle} <span className="text-purple-300 mx-2">|</span> {result.crystalKnowledge.title}
            </h3>
            <p className="text-purple-100 leading-relaxed text-sm md:text-base">
              {result.crystalKnowledge.content}
            </p>
          </div>
        </div>
      </div>

      <div className="text-center pt-8">
        <button
          onClick={onReset}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-all backdrop-blur-md"
        >
          <RefreshCw className="w-4 h-4" />
          {t.results.reset}
        </button>
      </div>
    </div>
  );
};

const CrystalCard: React.FC<{ crystal: CrystalRecommendation; index: number; label: string }> = ({ crystal, index, label }) => {
  // Use Pollinations.ai for on-the-fly image generation based on the crystal name
  // This provides a high-quality, relevant visual without needing a database of images
  const prompt = `close up product shot of ${crystal.englishName || crystal.name} crystal gemstone, ${crystal.color}, mystical lighting, professional photography, 8k, high detail, studio lighting`;
  const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=600&height=400&nologo=true&seed=${index}${crystal.name}`;

  return (
    <div 
      className="group bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden hover:transform hover:-translate-y-2 transition-all duration-300 shadow-xl flex flex-col h-full relative"
      style={{ animationDelay: `${index * 150}ms` }}
    >
      <div className="h-48 relative overflow-hidden bg-gray-900">
         <img 
            src={imageUrl} 
            alt={crystal.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
            loading="lazy"
            onError={(e) => {
              // Fallback if image fails
              (e.target as HTMLImageElement).style.display = 'none';
            }}
         />
         {/* Gradient Overlay for Text Readability */}
         <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
         
         {/* Number Badge */}
         <div className="absolute top-3 right-3 z-20">
            <div className="flex flex-col items-center justify-center w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white shadow-lg">
                <span className="text-[0.6rem] opacity-80 uppercase leading-none">NO.</span>
                <span className="text-lg font-serif font-bold leading-none">{index + 1}</span>
            </div>
         </div>

         <div className="absolute bottom-0 left-0 p-4 z-10 w-full">
           <div className="flex justify-between items-end">
             <div>
               <span className="inline-block px-2 py-1 bg-white/20 backdrop-blur-md rounded text-xs text-white mb-2 border border-white/10">
                 {label}{crystal.element}
               </span>
               <h4 className="text-2xl font-serif font-bold text-white text-shadow-md">{crystal.name}</h4>
             </div>
           </div>
         </div>
      </div>
      
      <div className="p-5 flex-grow flex flex-col">
        <p className="text-sm text-purple-200 mb-4 italic min-h-[3rem]">"{crystal.description}"</p>
        
        <div className="mt-auto pt-4 border-t border-white/10">
          <div className="flex items-start gap-2">
            <ShieldCheck className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
            <p className="text-sm text-gray-100">{crystal.benefits}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const SparklesIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L14.3175 9.68253L22 12L14.3175 14.3175L12 22L9.68253 14.3175L2 12L9.68253 9.68253L12 2Z" fill="#F472B6" />
  </svg>
);