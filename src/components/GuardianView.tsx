import React, { useState } from 'react';
import { Currency, Language, ParentProfile, ScheduledTask, VitalSign } from '../types';
import { currencyRates, mockCaregivers, translations } from '../mockData';
import { Activity, ShieldCheck, CreditCard, Calendar, Plus, CheckCircle2, Clock, MapPin, Phone, DollarSign, FileText, UserCheck, AlertTriangle, Film, Music } from 'lucide-react';
import { VideoAnimatorTab } from './VideoAnimatorTab';
import { MusicStudioTab } from './MusicStudioTab';

interface GuardianViewProps {
  language: Language;
  currency: Currency;
  parent: ParentProfile;
  vitals: VitalSign[];
  tasks: ScheduledTask[];
  onBookService: (serviceName: string, costINR: number) => void;
}

export const GuardianView: React.FC<GuardianViewProps> = ({
  language,
  currency,
  parent,
  vitals,
  tasks,
  onBookService,
}) => {
  const t = translations[language];
  const [activeTab, setActiveTab] = useState<'overview' | 'services' | 'team' | 'wallet' | 'video' | 'music'>('overview');
  const [successToast, setSuccessToast] = useState<string | null>(null);

  const rate = currencyRates[currency]?.rateToINR || 1;
  const symbol = currencyRates[currency]?.symbol || '₹';

  const formatPrice = (inr: number) => {
    if (currency === 'INR') return `₹${inr.toLocaleString('en-IN')}`;
    const converted = (inr / rate).toFixed(2);
    return `${symbol}${converted} ${currency}`;
  };

  const handleBookingClick = (title: string, costINR: number) => {
    onBookService(title, costINR);
    setSuccessToast(`Successfully booked "${title}"! Care Manager notified in New Delhi.`);
    setTimeout(() => setSuccessToast(null), 4000);
  };

  return (
    <div className="min-h-screen bg-slate-100 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">

        {/* Success Toast Notification */}
        {successToast && (
          <div className="bg-emerald-900 text-white px-6 py-4 rounded-xl shadow-lg flex items-center justify-between animate-fade-in">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-emerald-400" />
              <span className="font-medium text-sm">{successToast}</span>
            </div>
            <button onClick={() => setSuccessToast(null)} className="text-emerald-200 hover:text-white font-bold text-xs uppercase">Dismiss</button>
          </div>
        )}

        {/* Guardian Header Card */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img src={parent.avatar} alt="Parent" className="w-16 h-16 rounded-2xl object-cover border-2 border-teal-800" />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs bg-teal-100 text-teal-900 font-semibold px-2.5 py-0.5 rounded-full">
                  Overseas Guardian View (USA / UK / CA)
                </span>
                <span className="text-xs text-slate-500">Parent Phone Battery: {parent.batteryLevel}%</span>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mt-1">{parent.name}</h2>
              <p className="text-sm text-slate-600 flex items-center gap-1.5 mt-0.5">
                <MapPin className="w-4 h-4 text-teal-700" /> {parent.location}
              </p>
            </div>
          </div>

          {/* Sub Nav Tabs */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 overflow-x-auto w-full md:w-auto">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-3 py-2 text-xs font-bold rounded-lg transition-all ${
                activeTab === 'overview' ? 'bg-white text-teal-950 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              🏠 Overview
            </button>
            <button
              onClick={() => setActiveTab('services')}
              className={`px-3 py-2 text-xs font-bold rounded-lg transition-all ${
                activeTab === 'services' ? 'bg-white text-teal-950 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              📋 Services
            </button>
            <button
              onClick={() => setActiveTab('team')}
              className={`px-3 py-2 text-xs font-bold rounded-lg transition-all ${
                activeTab === 'team' ? 'bg-white text-teal-950 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              🛡️ Care Team
            </button>
            <button
              onClick={() => setActiveTab('wallet')}
              className={`px-3 py-2 text-xs font-bold rounded-lg transition-all ${
                activeTab === 'wallet' ? 'bg-white text-teal-950 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              💳 Wallet
            </button>
            <button
              onClick={() => setActiveTab('video')}
              className={`px-3 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-1 ${
                activeTab === 'video' ? 'bg-teal-900 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900 bg-white'
              }`}
            >
              <Film className="w-3.5 h-3.5 text-amber-400" />
              <span>AI Video</span>
            </button>
            <button
              onClick={() => setActiveTab('music')}
              className={`px-3 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-1 ${
                activeTab === 'music' ? 'bg-amber-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900 bg-white'
              }`}
            >
              <Music className="w-3.5 h-3.5 text-amber-200" />
              <span>Lyria Music</span>
            </button>
          </div>
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="bg-teal-900 text-white rounded-2xl p-6 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-teal-800 rounded-xl flex items-center justify-center text-amber-400">
                  <UserCheck className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="text-lg font-bold">Live Care Status: All Clear</h4>
                  <p className="text-sm text-teal-100">{t.activeNurseNotice}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <a
                  href={`tel:${parent.primaryCareManager.phone}`}
                  className="px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-teal-950 font-bold text-xs rounded-xl flex items-center gap-2 transition-colors"
                >
                  <Phone className="w-4 h-4" /> Call Care Manager
                </a>
              </div>
            </div>

            {/* Vitals Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {vitals.map((vital) => (
                <div key={vital.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
                  <div className="flex items-center justify-between text-slate-500 text-xs font-semibold mb-2">
                    <span>{vital.title}</span>
                    <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-mono">Normal</span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-extrabold text-slate-900 font-mono tabular-nums">{vital.value}</span>
                    <span className="text-xs text-slate-500 font-medium">{vital.unit}</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-2 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> Checked at {vital.time}
                  </p>
                </div>
              ))}
            </div>

            {/* Tasks & Scheduled Pipeline */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs">
              <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-teal-700" /> Today's Care Pipeline & Automated Billing
              </h3>
              <div className="space-y-3">
                {tasks.map((task) => (
                  <div key={task.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200 gap-3">
                    <div className="flex items-start gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                        task.status === 'completed' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {task.status === 'completed' ? <CheckCircle2 className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900 text-sm">{task.title}</h4>
                        <p className="text-xs text-slate-500 mt-0.5">Time: {task.time} {task.assignedTo ? `· Assigned: ${task.assignedTo}` : ''}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                      <span className="text-sm font-bold font-mono text-teal-900">{formatPrice(task.costINR)}</span>
                      <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${
                        task.status === 'completed' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {task.status === 'completed' ? 'Completed' : 'Pending'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: SERVICES */}
        {activeTab === 'services' && (
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-6">
            <h3 className="text-xl font-bold text-slate-900">Remote Care Services & Concierge Booking</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-semibold text-teal-800 bg-teal-100 px-2.5 py-1 rounded-full">Healthcare</span>
                  <h4 className="text-lg font-bold text-slate-900 mt-3">General Nursing & Vitals Check</h4>
                  <p className="text-xs text-slate-600 mt-1">2-hour comprehensive health checkup, blood pressure, sugar, and vitals report.</p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-slate-400">Price</p>
                    <p className="text-lg font-black text-teal-950 font-mono">{formatPrice(950)}</p>
                  </div>
                  <button
                    onClick={() => handleBookingClick('General Nursing & Vitals Check', 950)}
                    className="px-4 py-2 bg-teal-900 hover:bg-teal-800 text-white font-bold text-xs rounded-xl shadow-xs"
                  >
                    Book Now
                  </button>
                </div>
              </div>

              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-semibold text-blue-800 bg-blue-100 px-2.5 py-1 rounded-full">Hospital Escort</span>
                  <h4 className="text-lg font-bold text-slate-900 mt-3">Hospital OPD & Cab Escort</h4>
                  <p className="text-xs text-slate-600 mt-1">Door-to-door cab escort, wheel-chair assistance at Max/Apollo Hospital.</p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-slate-400">Price</p>
                    <p className="text-lg font-black text-teal-950 font-mono">{formatPrice(1800)}</p>
                  </div>
                  <button
                    onClick={() => handleBookingClick('Hospital OPD & Cab Escort', 1800)}
                    className="px-4 py-2 bg-teal-900 hover:bg-teal-800 text-white font-bold text-xs rounded-xl shadow-xs"
                  >
                    Book Now
                  </button>
                </div>
              </div>

              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-semibold text-amber-800 bg-amber-100 px-2.5 py-1 rounded-full">Concierge</span>
                  <h4 className="text-lg font-bold text-slate-900 mt-3">Jeevan Pramaan & Pension Escort</h4>
                  <p className="text-xs text-slate-600 mt-1">Assistance with digital life certificate and government pension verification.</p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-slate-400">Price</p>
                    <p className="text-lg font-black text-teal-950 font-mono">{formatPrice(1200)}</p>
                  </div>
                  <button
                    onClick={() => handleBookingClick('Jeevan Pramaan & Pension Escort', 1200)}
                    className="px-4 py-2 bg-teal-900 hover:bg-teal-800 text-white font-bold text-xs rounded-xl shadow-xs"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: CARE TEAM */}
        {activeTab === 'team' && (
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-6">
            <h3 className="text-xl font-bold text-slate-900">Dedicated Care Team & Background Check Credentials</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mockCaregivers.map((cg, idx) => (
                <div key={idx} className="bg-slate-50 rounded-2xl p-6 border border-slate-200 flex items-start gap-4">
                  <img src={cg.photo} alt={cg.name} className="w-16 h-16 rounded-2xl object-cover border-2 border-teal-700 shrink-0" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-base font-bold text-slate-900">{cg.name}</h4>
                      <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5" /> IDfy Verified
                      </span>
                    </div>
                    <p className="text-xs text-teal-800 font-semibold mt-0.5">{cg.role}</p>
                    <p className="text-xs text-slate-500 mt-2">Experience: {cg.experienceYears} Years · Rating: ⭐ {cg.rating}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: WALLET */}
        {activeTab === 'wallet' && (
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-6">
            <h3 className="text-xl font-bold text-slate-900">Care Wallet & Multi-Currency Parity</h3>
            <div className="bg-gradient-to-r from-teal-900 to-teal-950 text-white rounded-2xl p-6 shadow-md mb-6 flex items-center justify-between">
              <div>
                <p className="text-xs text-teal-200 uppercase tracking-wider font-bold">Care Wallet Balance</p>
                <p className="text-3xl font-black mt-1 font-mono">₹24,500 INR <span className="text-sm font-normal text-teal-200">(≈ {formatPrice(24500)})</span></p>
              </div>
              <button
                onClick={() => setSuccessToast('Successfully added funds to Care Wallet!')}
                className="px-5 py-3 bg-amber-500 hover:bg-amber-600 text-teal-950 font-bold text-sm rounded-xl shadow-md"
              >
                + Top Up Wallet
              </button>
            </div>
          </div>
        )}

        {/* TAB 5: AI VIDEO ANIMATOR */}
        {activeTab === 'video' && <VideoAnimatorTab language={language} />}

        {/* TAB 6: LYRIA MUSIC STUDIO */}
        {activeTab === 'music' && <MusicStudioTab language={language} />}

      </div>
    </div>
  );
};
