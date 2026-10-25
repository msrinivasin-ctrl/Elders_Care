import React, { useState } from 'react';
import { Language } from '../types';
import { X, Send, Bot, User, Sparkles } from 'lucide-react';

interface AiChatDrawerProps {
  language: Language;
  onClose: () => void;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export const AiChatDrawer: React.FC<AiChatDrawerProps> = ({ language, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: language === 'hi'
        ? 'नमस्ते! मैं आपका प्रणाम केयर एआई सहायक हूँ। आज मैं आपके माता-पिता की देखभाल या स्वास्थ्य संबंधी किस बात में मदद कर सकता हूँ?'
        : 'Namaste! I am your Pranaam Care AI Assistant. How can I help you with eldercare guidance, medication schedules, or nursing services today?'
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: userMsg }]);
    setLoading(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg, language })
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { role: 'assistant', content: data.reply || 'Namaste! I am here to help.' }]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [...prev, { role: 'assistant', content: 'Sorry, I am having trouble connecting to the AI care network right now. Please try again.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-2xs z-50 flex justify-end animate-fade-in">
      <div className="bg-white w-full max-w-lg h-full shadow-2xl flex flex-col border-l border-slate-200">
        
        {/* Header */}
        <div className="p-5 bg-teal-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-teal-800 rounded-xl flex items-center justify-center text-amber-400">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-base flex items-center gap-2">
                Pranaam Care AI Assistant <Sparkles className="w-4 h-4 text-amber-400" />
              </h3>
              <p className="text-xs text-teal-200">24/7 Bilingual Eldercare Expert</p>
            </div>
          </div>
          <button onClick={onClose} className="text-teal-200 hover:text-white bg-teal-800 p-2 rounded-xl">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Message Feed */}
        <div className="flex-1 p-5 overflow-y-auto space-y-4 bg-slate-50">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex items-start gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                msg.role === 'user' ? 'bg-teal-900 text-white' : 'bg-amber-500 text-teal-950 font-bold'
              }`}>
                {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>
              <div className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-teal-900 text-white rounded-tr-none'
                  : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none shadow-2xs'
              }`}>
                {msg.content}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex items-center gap-2 text-slate-400 text-xs italic">
              <div className="w-2 h-2 bg-teal-700 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-teal-700 rounded-full animate-bounce delay-100"></div>
              <div className="w-2 h-2 bg-teal-700 rounded-full animate-bounce delay-200"></div>
              <span>Pranaam Care AI is thinking...</span>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSend} className="p-4 bg-white border-t border-slate-200 flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={language === 'hi' ? 'यहाँ अपना सवाल पूछें...' : 'Ask about medicines, doctors, or eldercare...'}
            className="flex-1 bg-slate-100 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-teal-700"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="w-12 h-12 bg-teal-900 hover:bg-teal-800 text-white rounded-xl flex items-center justify-center transition-colors disabled:opacity-50 shrink-0"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>

      </div>
    </div>
  );
};
