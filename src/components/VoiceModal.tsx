import React, { useState } from 'react';
import { Language } from '../types';
import { Mic, X, CheckCircle2, Sparkles } from 'lucide-react';

interface VoiceModalProps {
  language: Language;
  onClose: () => void;
  onConfirmAction: (actionText: string) => void;
}

export const VoiceModal: React.FC<VoiceModalProps> = ({
  language,
  onClose,
  onConfirmAction,
}) => {
  const [isListening, setIsListening] = useState(true);
  const [transcript, setTranscript] = useState(language === 'hi' ? 'सुन रहा हूँ... बोलिए (Listening...)' : 'Listening... Speak your request');
  const [confirmed, setConfirmed] = useState(false);

  const sampleVoiceCommands = [
    language === 'hi' ? 'बुखार और बीपी की दवाई भेजो' : 'Send fever & BP medicines',
    language === 'hi' ? 'कल मैक्स अस्पताल जाने के लिए कैब बुक करो' : 'Book cab for Max Hospital tomorrow',
    language === 'hi' ? 'ताजा दूध और ब्रेड का ऑर्डर दो' : 'Order fresh milk & bread',
    language === 'hi' ? 'देखभाल करने वाले से बात कराओ' : 'Call care coordinator',
  ];

  const handleSelectSample = (cmd: string) => {
    setIsListening(false);
    setTranscript(cmd);
    setConfirmed(true);
    setTimeout(() => {
      onConfirmAction(cmd);
    }, 1500);
  };

  const handleSimulateSpeech = () => {
    setIsListening(false);
    const chosen = language === 'hi' ? 'बीपी की दवाई और सरिडॉन मंगाओ' : 'Please reorder my BP and sugar medicines';
    setTranscript(chosen);
    setConfirmed(true);
    setTimeout(() => {
      onConfirmAction(chosen);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border-4 border-teal-800 text-center relative animate-scale-up">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 bg-slate-100 p-2 rounded-full"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="w-20 h-20 bg-amber-500 text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg animate-pulse">
          <Mic className="w-10 h-10" />
        </div>

        <h3 className="text-2xl font-black text-teal-950 mb-2">
          {language === 'hi' ? 'आवाज़ से सेवा मांगें' : 'Voice Assistant (Sahayak AI)'}
        </h3>
        <p className="text-sm text-slate-600 mb-6">
          {isListening
            ? (language === 'hi' ? 'माइक चालू है। कृपया साफ़ आवाज़ में बोलें...' : 'Microphone is active. Speak clearly...')
            : (language === 'hi' ? 'आवाज़ समझ ली गई है!' : 'Request captured successfully!')}
        </p>

        {/* Transcript Box */}
        <div className="bg-teal-50 border-2 border-teal-200 rounded-2xl p-4 mb-6 min-h-[80px] flex items-center justify-center text-teal-950 font-bold text-lg">
          {transcript}
        </div>

        {confirmed ? (
          <div className="flex items-center justify-center gap-2 text-emerald-700 font-bold text-lg bg-emerald-50 py-3 rounded-xl border border-emerald-200">
            <CheckCircle2 className="w-6 h-6" />
            <span>{language === 'hi' ? 'अनुरोध दर्ज किया गया!' : 'Request Sent to Care Manager!'}</span>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
              {language === 'hi' ? 'या नीचे दिए गए सुझाव चुनें:' : 'Or tap a common request below:'}
            </p>
            <div className="grid grid-cols-1 gap-2">
              {sampleVoiceCommands.map((cmd, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectSample(cmd)}
                  className="px-4 py-3 bg-slate-100 hover:bg-teal-900 hover:text-white text-slate-800 rounded-xl font-bold text-sm text-left transition-colors flex items-center justify-between"
                >
                  <span>{cmd}</span>
                  <Sparkles className="w-4 h-4 text-amber-500" />
                </button>
              ))}
            </div>
            <button
              onClick={handleSimulateSpeech}
              className="w-full mt-4 py-3.5 bg-teal-900 hover:bg-teal-800 text-white font-black text-base rounded-xl shadow-md"
            >
              {language === 'hi' ? 'सिम्युलेटेड आवाज़ से भेजें' : 'Simulate Voice Capture'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
