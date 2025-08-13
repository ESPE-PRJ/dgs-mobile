// types/treatment.ts
export type Weekday = 0 | 1 | 2 | 3 | 4 | 5 | 6; // 0=Domingo

export interface DoseSchedule {
  id: string;
  hour: number;   // 0-23
  minute: number; // 0-59
  daysOfWeek: Weekday[]; // [1,2,3,4,5] entre semana; [0..6] diario
  notificationId?: string; // id de expo-notifications (opcional)
}

export interface Treatment {
  id: string;
  name: string;          // p.ej. "Paracetamol 500mg"
  dosage: string;        // p.ej. "1 tableta"
  startDate: string;     // ISO
  endDate?: string;      // ISO opcional
  schedules: DoseSchedule[];
}

export interface IntakeRecord {
  id: string;
  treatmentId: string;
  takenAt: string;       // ISO datetime cuando el usuario confirmó
  scheduledHour?: number;
  scheduledMinute?: number;
}
