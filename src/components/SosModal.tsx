import React, { useState, useEffect } from 'react';
import { Language } from '../types';
import { ShieldAlert, X, PhoneCall, CheckCircle2, AlertTriangle } from 'lucide-react';

interface SosModalProps {
  language: Language;
  onClose: () => void;
}

export const SosModal: React.FC<SosModalProps> = ({ language, onClose }) => {
  const [countdown, setCountdown] = useState(5);
  const [dispatched, setDispatched] = useState(false);

  useEffect(() => {
    if (countdown > 0 && !dispatched) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0 && !dispatched) {
      setDispatched(true);
    }
  }, [countdown, dispatched]);

  const handleCancel = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-red-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border-4 border-red-700 text-center relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 bg-slate-100 p-2 rounded-full"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="w-20 h-20 bg-red-700 text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl animate-bounce">
          <ShieldAlert className="w-10 h-10" />
        </div>

        <h3 className="text-3xl font-black text-red-700 mb-2">
          {language === 'hi' ? 'आपातकालीन एसओएस (SOS) सक्रिय!' : 'EMERGENCY SOS ACTIVATED'}
        </h3>
        
        {!dispatched ? (
          <div>
            <p className="text-base text-slate-700 mb-6 font-medium">
              {language === 'hi'
                ? `रद्द करने के लिए ${countdown} सेकंड बचे हैं...`
                : `Dispatching rapid response and alerting family in California in ${countdown} seconds...`}
            </p>

            <div className="text-6xl font-black text-red-600 font-mono mb-8">
              0:0{countdown}
            </div>

            <button
              onClick={handleCancel}
              className="w-full py-4 bg-slate-200 hover:bg-slate-300 text-slate-800 font-black text-lg rounded-2xl shadow-sm transition-colors uppercase tracking-wider"
            >
              {language === 'hi' ? 'गलती से दबा - रद्द करें' : 'False Alarm - Cancel SOS'}
            </button>
          </div>
        ) : (
          <div className="space-y-4 animate-fade-in">
            <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-5 text-left space-y-3">
              <div className="flex items-center gap-3 text-red-800 font-bold">
                <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                <span>24/7 Rapid Response Unit Dispatched (Max Healthcare Green Park)</span>
              </div>
              <div className="flex items-center gap-3 text-red-800 font-bold">
                <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                <span>WhatsApp & SMS Alert sent to Son Rohan (California)</span>
              </div>
              <div className="flex items-center gap-3 text-red-800 font-bold">
                <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                <span>Care Manager Ananya notified with live GPS coordinates</span>
              </div>
            </div>

            <div className="pt-2">
              <a
                href="tel:112"
                className="w-full py-4 bg-red-700 hover:bg-red-800 text-white font-black text-lg rounded-2xl shadow-xl flex items-center justify-center gap-3 uppercase tracking-wider"
              >
                <PhoneCall className="w-6 h-6" />
                <span>Call Emergency Helpline 112</span>
              </a>
            </div>

            <button
              onClick={onClose}
              className="w-full py-3 bg-slate-100 text-slate-700 font-bold text-sm rounded-xl"
            >
              Close Emergency Window
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
