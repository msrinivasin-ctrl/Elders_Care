export type AppMode = 'elderly' | 'guardian';
export type Language = 'en' | 'hi';
export type Currency = 'INR' | 'USD' | 'GBP' | 'CAD' | 'EUR' | 'AUD';

export interface ParentProfile {
  name: string;
  hindiName: string;
  age: number;
  location: string;
  hindiLocation: string;
  avatar: string;
  phone: string;
  batteryLevel: number;
  lastActive: string;
  primaryCareManager: {
    name: string;
    phone: string;
    photo: string;
    verifiedId: string;
  };
}

export interface VitalSign {
  id: string;
  title: string;
  hindiTitle: string;
  value: string;
  unit: string;
  status: 'normal' | 'warning' | 'critical';
  time: string;
}

export interface ScheduledTask {
  id: string;
  title: string;
  hindiTitle: string;
  category: 'medicine' | 'doctor' | 'grocery' | 'utility' | 'nurse';
  time: string;
  status: 'pending' | 'completed' | 'in_progress';
  assignedTo?: string;
  costINR: number;
}

export interface Caregiver {
  name: string;
  role: string;
  hindiRole: string;
  rating: number;
  experienceYears: number;
  languages: string[];
  verifiedId: string;
  photo: string;
  specialties: string[];
}
