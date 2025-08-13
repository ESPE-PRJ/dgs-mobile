// lib/seed.ts
import { Treatment } from '../types/treatments';

const rnd = () =>
  (global as any).crypto?.randomUUID
    ? (global as any).crypto.randomUUID()
    : Math.random().toString(36).slice(2) + Date.now().toString(36);

// Genera tratamientos de ejemplo (sin id) listos para crear
export function generateSeedTreatments(): Omit<Treatment, 'id'>[] {
  const nowISO = new Date().toISOString();
  return [
    {
      name: 'Paracetamol 500 mg',
      dosage: '1 tableta',
      startDate: nowISO,
      schedules: [
        { id: rnd(), hour: 8, minute: 0, daysOfWeek: [0,1,2,3,4,5,6] },
        { id: rnd(), hour: 20, minute: 0, daysOfWeek: [0,1,2,3,4,5,6] },
      ],
    },
    {
      name: 'Metformina 850 mg',
      dosage: '1 tableta',
      startDate: nowISO,
      schedules: [
        { id: rnd(), hour: 7, minute: 30, daysOfWeek: [0,1,2,3,4,5,6] },
        { id: rnd(), hour: 19, minute: 30, daysOfWeek: [0,1,2,3,4,5,6] },
      ],
    },
    {
      name: 'Losartán 50 mg',
      dosage: '1 tableta',
      startDate: nowISO,
      schedules: [
        { id: rnd(), hour: 6, minute: 30, daysOfWeek: [1,2,3,4,5] }, // L-V
      ],
    },
    {
      name: 'Amoxicilina 500 mg',
      dosage: '1 cápsula',
      startDate: nowISO,
      schedules: [
        { id: rnd(), hour: 8, minute: 0, daysOfWeek: [0,1,2,3,4,5,6] },
        { id: rnd(), hour: 16, minute: 0, daysOfWeek: [0,1,2,3,4,5,6] },
        { id: rnd(), hour: 24, minute: 0, daysOfWeek: [0,1,2,3,4,5,6] },
      ],
    },
    {
      name: 'Omeprazol 20 mg',
      dosage: '1 cápsula',
      startDate: nowISO,
      schedules: [
        { id: rnd(), hour: 6, minute: 0, daysOfWeek: [0,1,2,3,4,5,6] },
      ],
    },
  ];
}
