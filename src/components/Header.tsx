import React from 'react';
import { AppMode, Language, Currency } from '../types';
import { translations, currencyRates } from '../mockData';
import { Shield, Globe, Users, Clock, DollarSign, Bell } from 'lucide-react';

interface HeaderProps {
  mode: AppMode;
  setMode: (mode: AppMode) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  currency: Currency;
  setCurrency: (curr: Currency) => void;
  onOpenAiChat: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  mode,
  setMode,
  language,
  setLanguage,
  currency,
  setCurrency,
  onOpenAiChat,
}) => {
  const t = translations[language];

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand & Wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-12 h-12 bg-teal-900 rounded-xl flex items-center justify-center text-white shadow-md">
            <Shield className="w-7 h-7 text-amber-400" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-teal-950 tracking-tight flex items-center gap-2">
              Pranaam Care <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-semibold">प्रणाम Care</span>
            </h1>
            <p className="text-xs text-slate-500 hidden sm:block">{t.tagline}</p>
          </div>
        </div>

        {/* Mode Switcher & Timezone */}
        <div className="hidden lg:flex items-center gap-4 bg-slate-100 p-1.5 rounded-xl border border-slate-200">
          <button
            onClick={() => setMode('elderly')}
            className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all flex items-center gap-2 ${
              mode === 'elderly'
                ? 'bg-teal-900 text-white shadow-sm'
                : 'text-slate-700 hover:text-slate-900'
            }`}
          >
            <Users className="w-4 h-4 text-amber-400" />
            <span>{t.sahayakMode}</span>
          </button>
          <button
            onClick={() => setMode('guardian')}
            className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all flex items-center gap-2 ${
              mode === 'guardian'
                ? 'bg-teal-900 text-white shadow-sm'
                : 'text-slate-700 hover:text-slate-900'
            }`}
          >
            <Shield className="w-4 h-4 text-amber-400" />
            <span>{t.guardianMode}</span>
          </button>
        </div>

        {/* Right Controls: Language, Currency, AI Chat */}
        <div className="flex items-center gap-3">
          {/* Timezone Indicator */}
          <div className="hidden xl:flex items-center gap-1.5 text-xs font-medium text-slate-600 bg-slate-50 px-3 py-2 rounded-lg border border-slate-200">
            <Clock className="w-3.5 h-3.5 text-teal-700" />
            <span>New Delhi 6:30 PM (IST)</span>
          </div>

          {/* Currency Selector (Guardian Mode) */}
          {mode === 'guardian' && (
            <div className="flex items-center gap-1 bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-200">
              <DollarSign className="w-4 h-4 text-teal-700" />
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value as Currency)}
                className="bg-transparent text-xs font-semibold text-slate-700 focus:outline-none cursor-pointer"
              >
                {Object.keys(currencyRates).map((curr) => (
                  <option key={curr} value={curr}>
                    {curr} ({currencyRates[curr].symbol})
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Language Switcher Pill */}
          <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200">
            <button
              onClick={() => setLanguage('en')}
              className={`px-2.5 py-1 text-xs font-bold rounded ${
                language === 'en' ? 'bg-white text-teal-900 shadow-xs' : 'text-slate-600'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('hi')}
              className={`px-2.5 py-1 text-xs font-bold rounded ${
                language === 'hi' ? 'bg-white text-teal-900 shadow-xs' : 'text-slate-600'
              }`}
            >
              हिं
            </button>
          </div>

          {/* AI Care Coordinator Button */}
          <button
            onClick={onOpenAiChat}
            className="hidden sm:flex items-center gap-2 px-3.5 py-2 text-xs font-bold text-teal-900 bg-teal-50 hover:bg-teal-100 border border-teal-200 rounded-xl transition-colors shadow-2xs"
          >
            <Bell className="w-4 h-4 text-teal-700 animate-pulse" />
            <span>AI Care Assistant</span>
          </button>
        </div>
      </div>

      {/* Mobile Mode Switcher Bar */}
      <div className="lg:hidden flex items-center justify-center gap-2 bg-slate-100 p-2 border-t border-slate-200">
        <button
          onClick={() => setMode('elderly')}
          className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
            mode === 'elderly' ? 'bg-teal-900 text-white shadow-xs' : 'text-slate-700 bg-white border border-slate-200'
          }`}
        >
          {t.sahayakMode}
        </button>
        <button
          onClick={() => setMode('guardian')}
          className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
            mode === 'guardian' ? 'bg-teal-900 text-white shadow-xs' : 'text-slate-700 bg-white border border-slate-200'
          }`}
        >
          {t.guardianMode}
        </button>
      </div>
    </header>
  );
};
