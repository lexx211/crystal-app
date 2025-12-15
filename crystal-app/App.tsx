import React, { useState, useMemo, useEffect } from 'react';
import { AppState, UserProfile, Language } from './types';
import { analyzeDestiny } from './services/geminiService';
import { InputForm } from './components/InputForm';
import { ResultsView } from './components/ResultsView';
import { KnowledgeModal } from './components/KnowledgeModal';
import { ChatModal } from './components/ChatModal';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { getTranslation } from './utils/translations';
import { Globe, BookOpen, MessageCircleQuestion, Heart, Download, Shield } from 'lucide-react';

// Background Image: Colorful Aura Quartz Crystal Cluster
const BG_IMAGE = "https://images.unsplash.com/photo-1629196914375-f7e48f477b6d?q=80&w=1080&auto=format&fit=crop";

function App() {
  const [lang, setLang] = useState<Language>('zh');
  const [showKnowledge, setShowKnowledge] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const t = getTranslation(lang);
  
  // Handle PWA Install Prompt
  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  // Handle Hash Navigation for Privacy Policy (Required for Play Store Link)
  useEffect(() => {
    if (window.location.hash === '#privacy') {
      setShowPrivacy(true);
    }
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === 'accepted') {
          setDeferredPrompt(null);
        }
      });
    }
  };
  
  // Memoize the random quote so it stays stable during re-renders but changes when lang changes (or app refreshes)
  const randomFooterQuote = useMemo(() => {
    const quotes = t.footerQuotes;
    return quotes[Math.floor(Math.random() * quotes.length)];
  }, [lang]);

  const [state, setState] = useState<AppState>({
    step: 'input',
    profile: null,
    result: null,
    error: null,
  });

  const handleAnalysis = async (profile: UserProfile, specificLang?: Language) => {
    // Use specificLang if provided (for language toggle), otherwise use current state lang
    const languageToUse = specificLang || lang;
    
    setState(prev => ({ ...prev, step: 'loading', profile, error: null }));
    
    try {
      const result = await analyzeDestiny(profile, languageToUse);
      setState(prev => ({ ...prev, step: 'results', result }));
    } catch (err) {
      setState(prev => ({ 
        ...prev, 
        step: 'input', 
        error: t.error 
      }));
    }
  };

  const toggleLanguage = () => {
    const newLang = lang === 'zh' ? 'en' : 'zh';
    setLang(newLang);
    
    // If we are currently viewing results and have a profile, re-analyze to translate content
    if (state.step === 'results' && state.profile) {
      handleAnalysis(state.profile, newLang);
    }
  };

  const reset = () => {
    setState({
      step: 'input',
      profile: null,
      result: null,
      error: null
    });
  };

  return (
    <div className="relative min-h-screen text-white overflow-x-hidden font-sans bg-gray-900">
      <KnowledgeModal 
        isOpen={showKnowledge} 
        onClose={() => setShowKnowledge(false)} 
        lang={lang} 
      />
      
      <ChatModal
        isOpen={showChat}
        onClose={() => setShowChat(false)}
        lang={lang}
      />

      <PrivacyPolicy
        isOpen={showPrivacy}
        onClose={() => setShowPrivacy(false)}
        lang={lang}
      />

      {/* Background Layer */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-105 bg-gray-900"
        style={{ backgroundImage: `url(${BG_IMAGE})` }}
      >
        {/* Dark overlay for contrast - Critical for readability on colorful backgrounds */}
        <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-[2px]"></div>
        {/* Gradient overlay for color pop */}
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/30 to-black/60"></div>
      </div>

      {/* Content Layer */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header - Responsive Layout */}
        <header className="p-4 md:p-6 relative flex justify-between md:justify-center items-center max-w-7xl mx-auto w-full z-20">
          <div className="flex items-center gap-2 md:gap-3 z-10">
            {/* Logo Icon */}
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/20 shrink-0">
               <span className="text-lg md:text-xl font-serif font-bold">晶</span>
            </div>
            <h1 className="text-lg md:text-2xl font-serif font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-white to-purple-200 whitespace-nowrap">
              {t.appTitle}
            </h1>
          </div>
          
          <div className="flex md:absolute md:right-6 md:top-1/2 md:-translate-y-1/2 items-center gap-2 z-10 ml-auto pl-2">
             {/* Install App Button - Only visible if installable */}
             {deferredPrompt && (
               <button 
                onClick={handleInstallClick}
                className="flex items-center justify-center w-8 h-8 md:w-9 md:h-9 rounded-full bg-pink-500/80 hover:bg-pink-500 border border-pink-400/50 transition-all group shrink-0 animate-pulse"
                title={lang === 'zh' ? "安装应用" : "Install App"}
              >
                <Download className="w-4 h-4 text-white" />
              </button>
             )}

             <button 
              onClick={() => setShowChat(true)}
              className="flex items-center justify-center w-8 h-8 md:w-9 md:h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 transition-all group shrink-0"
              title={lang === 'zh' ? "水晶顾问" : "Crystal Consultant"}
            >
              <MessageCircleQuestion className="w-4 h-4 text-purple-200 group-hover:text-white" />
            </button>

            <button 
              onClick={() => setShowKnowledge(true)}
              className="flex items-center justify-center w-8 h-8 md:w-9 md:h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 transition-all group shrink-0"
              title={lang === 'zh' ? "水晶百科" : "Crystal Encyclopedia"}
            >
              <BookOpen className="w-4 h-4 text-purple-200 group-hover:text-white" />
            </button>
            
            <button 
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 transition-all text-xs md:text-sm font-medium shrink-0"
            >
              <Globe className="w-3.5 h-3.5 md:w-4 md:h-4" />
              <span>{lang === 'zh' ? 'EN' : '中'}</span>
            </button>
          </div>
        </header>

        <main className="flex-grow flex flex-col items-center justify-center p-4 md:p-8">
          
          {state.error && (
            <div className="mb-6 bg-red-500/80 backdrop-blur-md text-white px-6 py-3 rounded-lg shadow-lg max-w-md mx-auto animate-bounce">
              {state.error}
            </div>
          )}

          {state.step === 'input' && (
            <div className="w-full flex flex-col items-center animate-fade-in-up">
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-center mb-4 text-white drop-shadow-lg leading-tight">
                {t.heroTitle[0]} <span className="text-pink-400">{t.heroTitle[1]}</span> {t.heroTitle[2]}
              </h1>
              <p className="text-lg text-purple-200 text-center mb-10 max-w-xl">
                {t.heroSubtitle}
              </p>
              <InputForm onSubmit={(p) => handleAnalysis(p)} isLoading={false} lang={lang} />
            </div>
          )}

          {state.step === 'loading' && (
            <InputForm onSubmit={() => {}} isLoading={true} lang={lang} />
          )}

          {state.step === 'results' && state.result && (
            <ResultsView result={state.result} onReset={reset} lang={lang} />
          )}
        </main>

        <footer className="p-6 text-center text-purple-200/50 text-[10px]">
          <p className="font-serif italic text-sm md:text-base text-purple-100 mb-2 flex items-center justify-center gap-2">
            <Heart className="w-3 h-3 text-pink-400" fill="currentColor" />
            {randomFooterQuote}
            <Heart className="w-3 h-3 text-pink-400" fill="currentColor" />
          </p>
          <div className="flex items-center justify-center gap-4 mt-2">
             <p className="opacity-60">{t.footerDisclaimer}</p>
             <button onClick={() => setShowPrivacy(true)} className="opacity-60 hover:opacity-100 hover:underline flex items-center gap-1">
               <Shield className="w-3 h-3" /> Privacy Policy
             </button>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;