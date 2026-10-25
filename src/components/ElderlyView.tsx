import React, { useState } from 'react';
import { Language, ParentProfile, ScheduledTask, VitalSign } from '../types';
import { translations } from '../mockData';
import { Pill, Stethoscope, ShoppingCart, PhoneCall, Mic, Volume2, ShieldAlert, CheckCircle2, AlertCircle, Clock, Heart, UserCheck } from 'lucide-react';

interface ElderlyViewProps {
  language: Language;
  parent: ParentProfile;
  vitals: VitalSign[];
  tasks: ScheduledTask[];
  onTriggerSos: () => void;
  onOpenVoice: () => void;
  onOpenChat: () => void;
  onSelectAction: (actionType: 'medicine' | 'doctor' | 'grocery' | 'coordinator') => void;
}

export const ElderlyView: React.FC<ElderlyViewProps> = ({
  language,
  parent,
  vitals,
  tasks,
  onTriggerSos,
  onOpenVoice,
  onOpenChat,
  onSelectAction,
}) => {
  const t = translations[language];
  const [ttsActive, setTtsActive] = useState(false);

  const handleReadAloud = () => {
    setTtsActive(true);
    const text = language === 'hi' 
      ? `नमस्ते रमेश जी। आज का तापमान सामान्य है। नर्स सुनीता सुबह आ चुकी हैं। अपोलो फार्मेसी से दवाई रीफिल बाकी है।`
      : `Namaste Ramesh ji. Vitals are normal. Nurse Sunita completed the morning visit. Medicine refill is pending.`;
    
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language === 'hi' ? 'hi-IN' : 'en-IN';
      utterance.onend = () => setTtsActive(false);
      window.speechSynthesis.speak(utterance);
    } else {
      setTimeout(() => setTtsActive(false), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 pb-32">
      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        
        {/* Top Greeting & Senior Banner */}
        <div className="bg-white rounded-2xl p-6 border-2 border-slate-300 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img
              src={parent.avatar}
              alt="Parent"
              className="w-16 h-16 rounded-full object-cover border-3 border-teal-800 shadow-md"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                  <UserCheck className="w-3.5 h-3.5" /> {language === 'hi' ? 'सुरक्षित और कनेक्टेड' : 'Online & Connected'}
                </span>
                <span className="text-xs text-slate-500">Son Rohan in CA 🇺🇸</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-teal-950 mt-1">
                {language === 'hi' ? `नमस्ते, ${parent.hindiName}` : `Namaste, ${parent.name}`}
              </h2>
              <p className="text-sm font-medium text-slate-600">
                {language === 'hi' ? parent.hindiLocation : parent.location}
              </p>
            </div>
          </div>

          {/* Audio Readout Toggle */}
          <button
            onClick={handleReadAloud}
            className={`w-full sm:w-auto px-5 py-3.5 rounded-xl font-bold text-base flex items-center justify-center gap-3 transition-all ${
              ttsActive 
                ? 'bg-amber-500 text-white animate-pulse' 
                : 'bg-teal-50 text-teal-900 border-2 border-teal-200 hover:bg-teal-100'
            }`}
          >
            <Volume2 className="w-6 h-6 text-teal-700" />
            <span>{language === 'hi' ? 'सुनें (Listen Aloud)' : 'Read Aloud'}</span>
          </button>
        </div>

        {/* Hero Upcoming Care Card */}
        <div className="bg-gradient-to-r from-teal-900 to-teal-800 text-white rounded-2xl p-6 border-2 border-teal-700 shadow-md">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs uppercase tracking-wider bg-teal-800 text-amber-300 px-3 py-1 rounded-full font-bold">
              {language === 'hi' ? 'प्रमुख अपडेट' : 'Priority Update Today'}
            </span>
            <span className="text-xs text-teal-200 flex items-center gap-1">
              <Clock className="w-4 h-4" /> 9:00 AM IST Completed
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold mb-2">
            {language === 'hi' 
              ? 'नर्स सुनीता शर्मा द्वारा सुबह का वीटल्स चेक और बीपी मॉनिटरिंग सफल रही।' 
              : 'Morning Vitals & BP Check completed successfully by Nurse Sunita Sharma.'}
          </h3>
          <p className="text-sm text-teal-100 mb-4">
            {language === 'hi' 
              ? 'ब्लड प्रेशर: 124/82 mmHg (सामान्य) | शुगर: 112 mg/dL। अगली सेवा: अपोलो फार्मेसी दवाई डिलीवरी दोपहर 11:30 बजे।' 
              : 'Blood Pressure: 124/82 mmHg (Normal) | Glucose: 112 mg/dL. Next: Apollo Pharmacy delivery at 11:30 AM.'}
          </p>
          <div className="flex items-center gap-3 bg-teal-950/40 p-3 rounded-xl border border-teal-700/50">
            <img src={parent.primaryCareManager.photo} alt="Care Manager" className="w-10 h-10 rounded-full object-cover border-2 border-amber-400" />
            <div className="text-sm">
              <p className="font-bold">Care Manager: {parent.primaryCareManager.name}</p>
              <p className="text-xs text-teal-200">Verified ID: {parent.primaryCareManager.verifiedId} (IDfy)</p>
            </div>
          </div>
        </div>

        {/* 4 Giant Action Tiles (Grid 2x2) */}
        <div>
          <h3 className="text-lg font-bold text-slate-800 mb-4">
            {language === 'hi' ? 'त्वरित सेवाएं (Quick Services)' : 'Quick Services & Requests'}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            
            {/* Tile 1: Medicine */}
            <button
              onClick={() => onSelectAction('medicine')}
              className="bg-white p-6 rounded-2xl border-3 border-slate-300 hover:border-teal-700 hover:shadow-lg transition-all text-left flex flex-col justify-between group min-h-[160px]"
            >
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 bg-teal-50 text-teal-800 rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Pill className="w-8 h-8 text-teal-700" />
                </div>
                <span className="text-xs font-bold bg-amber-100 text-amber-900 px-3 py-1 rounded-full">
                  {language === 'hi' ? '1-टैप रीफिल' : '1-Tap Reorder'}
                </span>
              </div>
              <div className="mt-4">
                <h4 className="text-xl font-extrabold text-teal-950">
                  {language === 'hi' ? 'दवाई और रीफिल' : 'Medicine / दवाई'}
                </h4>
                <p className="text-sm text-slate-600 mt-1">
                  {language === 'hi' ? 'अपोलो फार्मेसी से डॉक्टर पर्ची अपलोड करें' : 'Order monthly medicines or upload prescription'}
                </p>
              </div>
            </button>

            {/* Tile 2: Doctor & Nurse */}
            <button
              onClick={() => onSelectAction('doctor')}
              className="bg-white p-6 rounded-2xl border-3 border-slate-300 hover:border-teal-700 hover:shadow-lg transition-all text-left flex flex-col justify-between group min-h-[160px]"
            >
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 bg-blue-50 text-blue-800 rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Stethoscope className="w-8 h-8 text-blue-700" />
                </div>
                <span className="text-xs font-bold bg-blue-100 text-blue-900 px-3 py-1 rounded-full">
                  {language === 'hi' ? 'होम विजिट' : 'Home & Escort'}
                </span>
              </div>
              <div className="mt-4">
                <h4 className="text-xl font-extrabold text-teal-950">
                  {language === 'hi' ? 'डॉक्टर और नर्स' : 'Doctor & Nurse / डॉक्टर'}
                </h4>
                <p className="text-sm text-slate-600 mt-1">
                  {language === 'hi' ? 'घर पर नर्स विजिट या अस्पताल एस्कॉर्ट बुक करें' : 'Book nurse checkup or hospital cab escort'}
                </p>
              </div>
            </button>

            {/* Tile 3: Groceries & Bills */}
            <button
              onClick={() => onSelectAction('grocery')}
              className="bg-white p-6 rounded-2xl border-3 border-slate-300 hover:border-teal-700 hover:shadow-lg transition-all text-left flex flex-col justify-between group min-h-[160px]"
            >
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 bg-amber-50 text-amber-800 rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform">
                  <ShoppingCart className="w-8 h-8 text-amber-700" />
                </div>
                <span className="text-xs font-bold bg-emerald-100 text-emerald-900 px-3 py-1 rounded-full">
                  {language === 'hi' ? 'दैनिक जरूरतें' : 'Daily & Bills'}
                </span>
              </div>
              <div className="mt-4">
                <h4 className="text-xl font-extrabold text-teal-950">
                  {language === 'hi' ? 'राशन और बिल' : 'Groceries & Bills / राशन'}
                </h4>
                <p className="text-sm text-slate-600 mt-1">
                  {language === 'hi' ? 'दूध, फल, बिजली और पानी बिल भुगतान' : 'Organic milk, vegetables & utility autopay'}
                </p>
              </div>
            </button>

            {/* Tile 4: Talk to Care Coordinator */}
            <button
              onClick={() => onSelectAction('coordinator')}
              className="bg-white p-6 rounded-2xl border-3 border-slate-300 hover:border-teal-700 hover:shadow-lg transition-all text-left flex flex-col justify-between group min-h-[160px]"
            >
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 bg-teal-50 text-teal-800 rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform">
                  <PhoneCall className="w-8 h-8 text-teal-700" />
                </div>
                <span className="text-xs font-bold bg-teal-100 text-teal-900 px-3 py-1 rounded-full">
                  {language === 'hi' ? '24/7 सहायता' : '24/7 Support'}
                </span>
              </div>
              <div className="mt-4">
                <h4 className="text-xl font-extrabold text-teal-950">
                  {language === 'hi' ? 'सेवा मित्र (Coordinator)' : 'Talk to Coordinator / सेवा'}
                </h4>
                <p className="text-sm text-slate-600 mt-1">
                  {language === 'hi' ? 'एनर्जी चेक या तुरंत बात करने के लिए कॉल करें' : 'Direct voice call or companion check-in'}
                </p>
              </div>
            </button>

          </div>
        </div>

        {/* Voice Mic Floating Action Bar */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-300 rounded-2xl p-5 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-4">
            <button
              onClick={onOpenVoice}
              className="w-16 h-16 bg-amber-600 hover:bg-amber-700 text-white rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-105 shrink-0"
              title="Voice Assistant"
            >
              <Mic className="w-8 h-8 animate-pulse" />
            </button>
            <div>
              <h4 className="text-lg font-bold text-amber-950">
                {language === 'hi' ? 'बोलेर सेवा मांगें (Voice Assistant)' : 'Speak Your Request / बोलकर बताएं'}
              </h4>
              <p className="text-sm text-amber-800">
                {language === 'hi' ? 'जैसे: "मुझे बीपी की दवाई चाहिए" या "डॉक्टर को बुलाओ"' : 'Say: "Need BP medicine" or "Call doctor for tomorrow"'}
              </p>
            </div>
          </div>
          <button
            onClick={onOpenVoice}
            className="hidden sm:block px-5 py-3 bg-amber-600 text-white rounded-xl font-bold text-sm hover:bg-amber-700 shadow-sm"
          >
            {language === 'hi' ? 'माइक शुरू करें' : 'Start Mic'}
          </button>
        </div>

      </div>

      {/* Sticky Bottom Emergency SOS Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-red-700 text-white py-4 px-4 shadow-2xl z-50 border-t-4 border-red-900">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white text-red-700 rounded-full flex items-center justify-center animate-bounce">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs uppercase font-extrabold tracking-widest text-red-200">
                {language === 'hi' ? '24/7 आपातकालीन सुरक्षा' : '24/7 Rapid Response Dispatch'}
              </p>
              <p className="text-sm sm:text-base font-bold">
                {language === 'hi' ? 'आपातकालीन स्थिति में तुरंत बटन दबाएं' : 'Press in case of medical emergency or fall'}
              </p>
            </div>
          </div>
          <button
            onClick={onTriggerSos}
            className="w-full sm:w-auto px-8 py-4 bg-white text-red-700 hover:bg-red-50 font-black text-lg rounded-xl shadow-xl transition-transform hover:scale-105 active:scale-95 uppercase tracking-wide flex items-center justify-center gap-2"
          >
            <ShieldAlert className="w-6 h-6 text-red-700" />
            <span>{t.emergencySos}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
