import React from 'react';
import { X, Shield } from 'lucide-react';
import { Language } from '../types';

interface PrivacyPolicyProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ isOpen, onClose, lang }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm" 
        onClick={onClose}
      />
      <div className="relative w-full max-w-2xl bg-slate-900 border border-white/20 rounded-2xl shadow-2xl flex flex-col max-h-[80vh]">
        <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/5">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Shield className="w-5 h-5 text-green-400" />
            {lang === 'zh' ? '隐私政策' : 'Privacy Policy'}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full text-white">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 overflow-y-auto text-slate-300 space-y-4 text-sm leading-relaxed">
          <p><strong>Effective Date:</strong> 2024-01-01</p>
          <p>This privacy policy applies to the Crystal Destiny app (hereby referred to as "Application") created as a Free service. This service is intended for use "AS IS".</p>
          
          <h3 className="text-white font-bold mt-4">Information Collection and Use</h3>
          <p>The Application does not collect or store any personally identifiable information on external servers. All user inputs (name, birth date) are processed ephemerally to generate results and are not permanently stored.</p>

          <h3 className="text-white font-bold mt-4">Third Party Access</h3>
          <p>We use Google Gemini API for analysis. Data sent to the API is subject to Google's data processing terms but is not used to train their models in this implementation.</p>

          <h3 className="text-white font-bold mt-4">Cookies</h3>
          <p>This Service does not use "cookies" explicitly. However, the app may use third party code and libraries that use "cookies" to collect information and improve their services.</p>

          <h3 className="text-white font-bold mt-4">Contact Us</h3>
          <p>If you have any questions or suggestions about my Privacy Policy, do not hesitate to contact us.</p>
        </div>
      </div>
    </div>
  );
};