// lib/api.ts
import { IntakeRecord, Treatment } from '../types/treatments';
import { getItem, removeItem, setItem } from './storage';

export interface Api {
  listTreatments(): Promise<Treatment[]>;
  createTreatment(t: Omit<Treatment, 'id'> & { id?: string }): Promise<Treatment>;
  confirmIntake(treatmentId: string, payload?: { hour?: number; minute?: number }): Promise<IntakeRecord>;
  listIntakes(): Promise<IntakeRecord[]>;
  replaceTreatment(t: Treatment): Promise<void>;
}

export const DEMO_TREATMENTS_KEY = 'demo:treatments';
export const DEMO_INTAKES_KEY = 'demo:intakes';

class DummyApi implements Api {
  async listTreatments() {
    return getItem<Treatment[]>(DEMO_TREATMENTS_KEY, []);
  }
  async createTreatment(tin: Omit<Treatment, 'id'> & { id?: string }) {
    const t: Treatment = { ...tin, id: tin.id ?? (global as any).crypto?.randomUUID?.() ?? String(Date.now()) };
    const list = await this.listTreatments();
    list.push(t);
    await setItem(DEMO_TREATMENTS_KEY, list);
    return t;
  }
  async confirmIntake(treatmentId: string, payload?: { hour?: number; minute?: number }) {
    const rec: IntakeRecord = {
      id: (global as any).crypto?.randomUUID?.() ?? String(Date.now()),
      treatmentId,
      takenAt: new Date().toISOString(),
      scheduledHour: payload?.hour,
      scheduledMinute: payload?.minute
    };
    const all = await getItem<IntakeRecord[]>(DEMO_INTAKES_KEY, []);
    all.push(rec);
    await setItem(DEMO_INTAKES_KEY, all);
    return rec;
  }
  async listIntakes() {
    return getItem<IntakeRecord[]>(DEMO_INTAKES_KEY, []);
  }
  async replaceTreatment(t: Treatment) {
    const list = await this.listTreatments();
    const idx = list.findIndex(x => x.id === t.id);
    if (idx >= 0) list[idx] = t;
    await setItem(DEMO_TREATMENTS_KEY, list);
  }
}

class HttpApi implements Api {
  constructor(private baseUrl: string) {}
  async listTreatments() {
    const r = await fetch(`${this.baseUrl}/treatments`);
    return (await r.json()) as Treatment[];
  }
  async createTreatment(t: Omit<Treatment, 'id'> & { id?: string }) {
    const r = await fetch(`${this.baseUrl}/treatments`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(t),
    });
    return (await r.json()) as Treatment;
  }
  async confirmIntake(treatmentId: string, payload?: { hour?: number; minute?: number }) {
    const r = await fetch(`${this.baseUrl}/treatments/${treatmentId}/confirm`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload ?? {}),
    });
    return (await r.json()) as IntakeRecord;
  }
  async listIntakes() {
    const r = await fetch(`${this.baseUrl}/intakes`);
    return (await r.json()) as IntakeRecord[];
  }
  async replaceTreatment(t: Treatment) {
    await fetch(`${this.baseUrl}/treatments/${t.id}`, {
      method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(t),
    });
  }
}

// Cambia esto cuando conectes tu backend real:
// export const api: Api = new HttpApi('https://TU_BACKEND/api');
export const api: Api = new DummyApi();

// Utilidad para limpiar demo (solo dummy)
export async function clearDemoStorage() {
  await removeItem(DEMO_TREATMENTS_KEY);
  await removeItem(DEMO_INTAKES_KEY);
}
