import React, { useState } from 'react';
import { AppMode, Currency, Language } from './types';
import { initialParent, initialTasks, initialVitals } from './mockData';
import { Header } from './components/Header';
import { ElderlyView } from './components/ElderlyView';
import { GuardianView } from './components/GuardianView';
import { VoiceModal } from './components/VoiceModal';
import { SosModal } from './components/SosModal';
import { AiChatDrawer } from './components/AiChatDrawer';
import { CheckCircle2, X } from 'lucide-react';

export default function App() {
  const [mode, setMode] = useState<AppMode>('elderly');
  const [language, setLanguage] = useState<Language>('en');
  const [currency, setCurrency] = useState<Currency>('INR');
  const [vitals] = useState(initialVitals);
  const [tasks, setTasks] = useState(initialTasks);
  const parent = initialParent;

  // Modals state
  const [showSos, setShowSos] = useState(false);
  const [showVoice, setShowVoice] = useState(false);
  const [showAiChat, setShowAiChat] = useState(false);
  const [activeActionModal, setActiveActionModal] = useState<'medicine' | 'doctor' | 'grocery' | 'coordinator' | null>(null);
  const [successBanner, setSuccessBanner] = useState<string | null>(null);

  const handleTriggerSos = () => {
    setShowSos(true);
  };

  const handleSelectAction = (actionType: 'medicine' | 'doctor' | 'grocery' | 'coordinator') => {
    if (actionType === 'coordinator') {
      setShowAiChat(true);
    } else {
      setActiveActionModal(actionType);
    }
  };

  const handleConfirmActionRequest = (details: string) => {
    setActiveActionModal(null);
    setShowVoice(false);
    const newTask = {
      id: `task-${Date.now()}`,
      title: `Service Request: ${details}`,
      hindiTitle: `सेवा अनुरोध: ${details}`,
      category: 'medicine' as const,
      time: 'Just now',
      status: 'pending' as const,
      costINR: 1250,
    };
    setTasks([newTask, ...tasks]);
    setSuccessBanner(language === 'hi' ? 'आपका अनुरोध सफलतापूर्वक दर्ज कर लिया गया है!' : 'Service request successfully submitted to Care Manager!');
    setTimeout(() => setSuccessBanner(null), 5000);
  };

  const handleBookService = (serviceName: string, costINR: number) => {
    const newTask = {
      id: `task-${Date.now()}`,
      title: serviceName,
      hindiTitle: serviceName,
      category: 'nurse' as const,
      time: 'Scheduled',
      status: 'pending' as const,
      costINR,
    };
    setTasks([newTask, ...tasks]);
  };

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-900 selection:bg-teal-200">
      {/* Top Banner for Success */}
      {successBanner && (
        <div className="bg-teal-900 text-white px-4 py-3 text-center text-sm font-bold flex items-center justify-center gap-2 shadow-md z-50 sticky top-0">
          <CheckCircle2 className="w-5 h-5 text-amber-400" />
          <span>{successBanner}</span>
          <button onClick={() => setSuccessBanner(null)} className="ml-4 text-teal-200 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Header */}
      <Header
        mode={mode}
        setMode={setMode}
        language={language}
        setLanguage={setLanguage}
        currency={currency}
        setCurrency={setCurrency}
        onOpenAiChat={() => setShowAiChat(true)}
      />

      {/* Main Viewport */}
      <main>
        {mode === 'elderly' ? (
          <ElderlyView
            language={language}
            parent={parent}
            vitals={vitals}
            tasks={tasks}
            onTriggerSos={handleTriggerSos}
            onOpenVoice={() => setShowVoice(true)}
            onOpenChat={() => setShowAiChat(true)}
            onSelectAction={handleSelectAction}
          />
        ) : (
          <GuardianView
            language={language}
            currency={currency}
            parent={parent}
            vitals={vitals}
            tasks={tasks}
            onBookService={handleBookService}
          />
        )}
      </main>

      {/* Modals */}
      {showSos && <SosModal language={language} onClose={() => setShowSos(false)} />}
      {showVoice && (
        <VoiceModal
          language={language}
          onClose={() => setShowVoice(false)}
          onConfirmAction={handleConfirmActionRequest}
        />
      )}
      {showAiChat && <AiChatDrawer language={language} onClose={() => setShowAiChat(false)} />}

      {/* Action Confirmation Modal */}
      {activeActionModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border-4 border-teal-800 text-center relative">
            <button
              onClick={() => setActiveActionModal(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 bg-slate-100 p-2 rounded-full"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="w-16 h-16 bg-teal-100 text-teal-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
              {activeActionModal === 'medicine' && '💊'}
              {activeActionModal === 'doctor' && '🩺'}
              {activeActionModal === 'grocery' && '🛒'}
            </div>

            <h3 className="text-2xl font-black text-teal-950 mb-2">
              {activeActionModal === 'medicine' && (language === 'hi' ? 'दवाई और पर्ची रीफिल' : 'Medicine & Prescription Refill')}
              {activeActionModal === 'doctor' && (language === 'hi' ? 'डॉक्टर या नर्स विजिट बुक करें' : 'Book Doctor or Nurse Home Visit')}
              {activeActionModal === 'grocery' && (language === 'hi' ? 'ताजा दूध और राशन अनुरोध' : 'Groceries & Daily Essentials')}
            </h3>
            <p className="text-sm text-slate-600 mb-6">
              {language === 'hi'
                ? 'हमारे केयर मैनेजर द्वारा तुरंत आपके घर पर डिलीवरी सुनिश्चित की जाएगी।'
                : 'Our verified care coordinator in New Delhi will arrange this immediately. Rohan in CA will be notified.'}
            </p>

            <div className="space-y-3">
              <button
                onClick={() => handleConfirmActionRequest(activeActionModal.toUpperCase() + ' REFILL REQUESTED')}
                className="w-full py-4 bg-teal-900 hover:bg-teal-800 text-white font-black text-lg rounded-xl shadow-lg transition-transform hover:scale-102"
              >
                {language === 'hi' ? 'हाँ, तुरंत भेजें (Confirm)' : 'Yes, Confirm Request'}
              </button>
              <button
                onClick={() => setActiveActionModal(null)}
                className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm rounded-xl"
              >
                {language === 'hi' ? 'रद्द करें' : 'Cancel'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
