import React, { useState } from 'react';
import { UserProfile, Language } from '../types';
import { Sparkles, ArrowRight } from 'lucide-react';
import { getTranslation } from '../utils/translations';

interface InputFormProps {
  onSubmit: (profile: UserProfile) => void;
  isLoading: boolean;
  lang: Language;
}

export const InputForm: React.FC<InputFormProps> = ({ onSubmit, isLoading, lang }) => {
  const t = getTranslation(lang);
  const [profile, setProfile] = useState<UserProfile>({
    name: '',
    birthDate: '',
    birthTime: '12:00',
    gender: 'female',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(profile);
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-2xl animate-fade-in">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-tr from-purple-400 to-pink-400 mb-4 shadow-lg shadow-purple-500/30">
          <Sparkles className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">{t.input.title}</h2>
        <p className="text-purple-100 text-sm">{t.input.subtitle}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-purple-100 mb-2">{t.input.name}</label>
          <input
            type="text"
            required
            className="w-full bg-white/5 border border-white/10 focus:border-pink-400 focus:ring-1 focus:ring-pink-400 rounded-lg px-4 py-3 text-white placeholder-purple-200/50 outline-none transition-all"
            placeholder={t.input.namePlaceholder}
            value={profile.name}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-purple-100 mb-2">{t.input.gender}</label>
            <div className="flex bg-white/5 rounded-lg p-1 border border-white/10">
              <button
                type="button"
                className={`flex-1 py-2 rounded-md text-sm transition-all ${
                  profile.gender === 'male'
                    ? 'bg-blue-500/80 text-white shadow-md'
                    : 'text-purple-200 hover:bg-white/5'
                }`}
                onClick={() => setProfile({ ...profile, gender: 'male' })}
              >
                {t.input.male}
              </button>
              <button
                type="button"
                className={`flex-1 py-2 rounded-md text-sm transition-all ${
                  profile.gender === 'female'
                    ? 'bg-pink-500/80 text-white shadow-md'
                    : 'text-purple-200 hover:bg-white/5'
                }`}
                onClick={() => setProfile({ ...profile, gender: 'female' })}
              >
                {t.input.female}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-purple-100 mb-2">{t.input.birthTime}</label>
            <input
              type="time"
              required
              className="w-full bg-white/5 border border-white/10 focus:border-pink-400 focus:ring-1 focus:ring-pink-400 rounded-lg px-4 py-2.5 text-white outline-none transition-all"
              value={profile.birthTime}
              onChange={(e) => setProfile({ ...profile, birthTime: e.target.value })}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-purple-100 mb-2">{t.input.birthDate}</label>
          <input
            type="date"
            required
            className="w-full bg-white/5 border border-white/10 focus:border-pink-400 focus:ring-1 focus:ring-pink-400 rounded-lg px-4 py-3 text-white outline-none transition-all"
            value={profile.birthDate}
            onChange={(e) => setProfile({ ...profile, birthDate: e.target.value })}
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="group w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-purple-900/40 transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {t.input.loading}
            </span>
          ) : (
            <>
              {t.input.submit} <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>
      </form>
    </div>
  );
};