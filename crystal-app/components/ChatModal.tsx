import React, { useState, useRef, useEffect } from 'react';
import { X, Send, MessageCircleQuestion, Sparkles, User } from 'lucide-react';
import { Language, ChatMessage } from '../types';
import { getTranslation } from '../utils/translations';
import { askCrystalExpert } from '../services/geminiService';

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const ChatModal: React.FC<ChatModalProps> = ({ isOpen, onClose, lang }) => {
  const t = getTranslation(lang);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: t.chat.welcome }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  if (!isOpen) return null;

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      // In a real app, we might pass previous history to the service for context
      const responseText = await askCrystalExpert(input, lang);
      const aiMsg: ChatMessage = { role: 'assistant', content: responseText };
      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: t.error }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-lg bg-[#1a1625] bg-opacity-95 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[600px] max-h-[85vh] animate-fade-in-up">
        
        {/* Header */}
        <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/5">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center">
                <MessageCircleQuestion className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-lg font-bold text-white tracking-wide">
              {t.chat.title}
            </h2>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 transition-colors text-white/70 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-grow p-4 overflow-y-auto space-y-4">
          {messages.map((msg, index) => (
            <div 
              key={index} 
              className={`flex items-start gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              {/* Avatar */}
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border border-white/10 ${
                msg.role === 'user' ? 'bg-white/10' : 'bg-purple-600/50'
              }`}>
                {msg.role === 'user' ? <User className="w-4 h-4 text-white" /> : <Sparkles className="w-4 h-4 text-yellow-200" />}
              </div>
              
              {/* Bubble */}
              <div className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed ${
                msg.role === 'user' 
                  ? 'bg-purple-600 text-white rounded-tr-none' 
                  : 'bg-white/10 text-purple-100 rounded-tl-none border border-white/5'
              }`}>
                {msg.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex items-start gap-3">
               <div className="w-8 h-8 rounded-full bg-purple-600/50 flex items-center justify-center shrink-0 border border-white/10">
                  <Sparkles className="w-4 h-4 text-yellow-200 animate-pulse" />
               </div>
               <div className="bg-white/5 text-purple-200 p-3 rounded-2xl rounded-tl-none border border-white/5 text-xs italic">
                 {t.chat.thinking}
               </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <form onSubmit={handleSend} className="p-4 border-t border-white/10 bg-white/5 flex gap-2">
           <input
             type="text"
             value={input}
             onChange={(e) => setInput(e.target.value)}
             placeholder={t.chat.placeholder}
             className="flex-grow bg-black/20 border border-white/10 rounded-full px-4 py-2 text-white placeholder-white/30 outline-none focus:border-purple-400 transition-colors text-sm"
             disabled={isLoading}
           />
           <button 
             type="submit"
             disabled={!input.trim() || isLoading}
             className="w-10 h-10 rounded-full bg-purple-500 hover:bg-purple-400 disabled:bg-white/10 disabled:text-white/20 text-white flex items-center justify-center transition-all shadow-lg shadow-purple-900/40"
           >
             <Send className="w-4 h-4" />
           </button>
        </form>

      </div>
    </div>
  );
};
