import { ParentProfile, VitalSign, ScheduledTask, Caregiver } from './types';

export const initialParent: ParentProfile = {
  name: 'Ramesh Sharma & Shanti Sharma',
  hindiName: 'रमेश शर्मा और शांति शर्मा',
  age: 74,
  location: 'Green Park Extension, New Delhi',
  hindiLocation: 'ग्रीन पार्क एक्सटेंशन, नई दिल्ली',
  avatar: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=300',
  phone: '+91 98102 34567',
  batteryLevel: 88,
  lastActive: '10 mins ago',
  primaryCareManager: {
    name: 'Ananya Sen',
    phone: '+91 98765 43210',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
    verifiedId: 'IDFY-DL-882910',
  },
};

export const initialVitals: VitalSign[] = [
  { id: '1', title: 'Blood Pressure', hindiTitle: 'रक्तचाप', value: '124/82', unit: 'mmHg', status: 'normal', time: '8:30 AM' },
  { id: '2', title: 'Blood Glucose', hindiTitle: 'ब्लड शुगर (फास्टिंग)', value: '112', unit: 'mg/dL', status: 'normal', time: '8:00 AM' },
  { id: '3', title: 'Heart Rate', hindiTitle: 'हार्ट रेट', value: '74', unit: 'bpm', status: 'normal', time: '9:15 AM' },
  { id: '4', title: 'Oxygen (SpO2)', hindiTitle: 'ऑक्सीजन स्तर', value: '98', unit: '%', status: 'normal', time: '9:15 AM' },
];

export const initialTasks: ScheduledTask[] = [
  { id: 't1', title: 'Morning BP & Sugar Check by Nurse Sunita', hindiTitle: 'सुबह का बीपी और शुगर चेक - नर्स सुनीता', category: 'nurse', time: '9:00 AM IST', status: 'completed', assignedTo: 'Nurse Sunita Sharma', costINR: 650 },
  { id: 't2', title: 'Saridon & Diabetes Meds Refill (Apollo Pharmacy)', hindiTitle: 'दवाई रीफिल - अपोलो फार्मेसी', category: 'medicine', time: '11:30 AM IST', status: 'pending', costINR: 1450 },
  { id: 't3', title: 'Fresh Organic Milk & Bread Delivery', hindiTitle: 'ताजा दूध और ब्रेड डिलीवरी', category: 'grocery', time: '1:00 PM IST', status: 'completed', costINR: 180 },
  { id: 't4', title: 'BSES Electricity Bill Autopay', hindiTitle: 'बिजली बिल भुगतान (BSES)', category: 'utility', time: 'Tomorrow', status: 'pending', costINR: 2840 },
];

export const mockCaregivers: Caregiver[] = [
  {
    name: 'Sunita Sharma',
    role: 'Senior Home Care Nurse',
    hindiRole: 'सीनियर होम केयर नर्स',
    rating: 4.9,
    experienceYears: 12,
    languages: ['Hindi', 'English', 'Punjabi'],
    verifiedId: 'IDFY-DL-9281',
    photo: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=200',
    specialties: ['Geriatric Care', 'Diabetes Management', 'Post-Surg Recovery']
  },
  {
    name: 'Lt. Col. Rajeshwar Verma (Retd.)',
    role: 'Hospital Companion & Escort',
    hindiRole: 'अस्पताल एस्कॉर्ट और साथी',
    rating: 5.0,
    experienceYears: 8,
    languages: ['Hindi', 'English'],
    verifiedId: 'IDFY-DL-4412',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    specialties: ['Max Hospital Escort', 'OPD Queue Management', 'Physiotherapy Assist']
  }
];

export const currencyRates: Record<string, { symbol: string; rateToINR: number }> = {
  INR: { symbol: '₹', rateToINR: 1 },
  USD: { symbol: '$', rateToINR: 83.2 },
  GBP: { symbol: '£', rateToINR: 105.5 },
  CAD: { symbol: 'CA$', rateToINR: 61.2 },
  EUR: { symbol: '€', rateToINR: 90.1 },
  AUD: { symbol: 'A$', rateToINR: 54.3 },
};

export const translations = {
  en: {
    appTitle: 'ElderCare India (Pranaam Care)',
    tagline: 'Connecting aging parents in India with family abroad',
    sahayakMode: 'Sahayak View (Senior)',
    guardianMode: 'Guardian View (Family Abroad)',
    emergencySos: 'EMERGENCY SOS / आपातकालीन सहायता',
    pressHoldSos: 'HOLD 2 SECONDS FOR INSTANT 24/7 DISPATCH',
    upcomingToday: "Today's Schedule & Care",
    medicineTile: 'Medicines & Refills',
    doctorTile: 'Doctor & Nurse Visit',
    groceryTile: 'Groceries & Bills',
    coordinatorTile: 'Talk to Coordinator',
    voicePrompt: 'Tap mic & speak (e.g., "Need BP medicine" or "Call doctor")',
    overseasDashboard: 'Overseas Guardian Dashboard',
    careHub: 'Care Hub & Vitals',
    servicesCatalog: 'Services & Booking',
    careTeam: 'Care Team & Trust',
    walletBilling: 'Wallet & Multi-Currency',
    activeNurseNotice: 'Nurse Sunita is currently active at your parents home in Green Park, New Delhi.',
    convertCurrency: 'Display Currency',
    confirmBooking: 'Confirm & Pay via Secure Care Wallet',
  },
  hi: {
    appTitle: 'प्रणाम केयर (ElderCare India)',
    tagline: 'भारत में माता-पिता और विदेशों में बच्चों के बीच भरोसेमंद सेतु',
    sahayakMode: 'सहायक व्यू (बुजुर्ग)',
    guardianMode: 'गार्डियन व्यू (विदेश में परिवार)',
    emergencySos: 'आपातकालीन सहायता (SOS)',
    pressHoldSos: 'तत्काल 24/7 मदद के लिए 2 सेकंड दबाएं',
    upcomingToday: 'आज का कार्यक्रम और देखभाल',
    medicineTile: 'दवाई और रीफिल',
    doctorTile: 'डॉक्टर और नर्स विजिट',
    groceryTile: 'राशन और बिल भुगतान',
    coordinatorTile: 'सेवा मित्र से बात करें',
    voicePrompt: 'माइक दबाएं और बोलें (जैसे: "बीपी की दवाई मंगाओ")',
    overseasDashboard: 'गार्डियन डैशबोर्ड',
    careHub: 'स्वास्थ्य और विटल्स',
    servicesCatalog: 'सेवाएं और बुकिंग',
    careTeam: 'देखभाल टीम और सुरक्षा',
    walletBilling: 'वॉलेट और मुद्रा',
    activeNurseNotice: 'नर्स सुनीता इस समय ग्रीन पार्क, नई दिल्ली स्थित घर पर मौजूद हैं।',
    convertCurrency: 'मुद्रा बदलें',
    confirmBooking: 'सुरक्षित केयर वॉलेट से भुगतान करें',
  }
};
