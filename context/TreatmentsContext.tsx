// context/TreatmentsContext.tsx
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { api, clearDemoStorage } from '../app/libs/api';
import { askNotificationPermissions, cancelNotification, scheduleForDose } from '../app/libs/notifications';
import { generateSeedTreatments } from '../app/libs/seed';
import { DoseSchedule, IntakeRecord, Treatment } from '../app/types/treatments';

type Ctx = {
    treatments: Treatment[];
    intakes: IntakeRecord[];
    reload(): Promise<void>;
    addTreatment(input: Omit<Treatment, 'id'>, options?: { notifications?: boolean }): Promise<Treatment>;
    confirmIntake(treatmentId: string, sched?: { hour?: number; minute?: number }): Promise<void>;
    seedDemoData(options?: { notifications?: boolean }): Promise<void>;
    clearAll(): Promise<void>;
};

const TreatmentsContext = createContext<Ctx | null>(null);
export const useTreatments = () => {
    const ctx = useContext(TreatmentsContext);
    if (!ctx) throw new Error('useTreatments must be used within <TreatmentsProvider/>');
    return ctx;
};

export const TreatmentsProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [treatments, setTreatments] = useState<Treatment[]>([]);
    const [intakes, setIntakes] = useState<IntakeRecord[]>([]);

    const reload = async () => {
        const [ts, ins] = await Promise.all([api.listTreatments(), api.listIntakes()]);
        setTreatments(ts); setIntakes(ins);
    };

    useEffect(() => { reload(); }, []);

    const addTreatment: Ctx['addTreatment'] = async (input, options) => {
        const enableNotif = options?.notifications ?? true;
        if (enableNotif) {
            await askNotificationPermissions();
        }
        const created = await api.createTreatment(input);

        let updated = created;
        if (enableNotif) {
            const updatedSchedules: DoseSchedule[] = [];
            for (const sch of created.schedules) {
                const notificationId = await scheduleForDose(created, sch);
                updatedSchedules.push({ ...sch, notificationId });
            }
            updated = { ...created, schedules: updatedSchedules };
            await api.replaceTreatment(updated);
        }

        await reload();
        return updated;
    };

    const confirmIntake: Ctx['confirmIntake'] = async (treatmentId, sched) => {
        await api.confirmIntake(treatmentId, { hour: sched?.hour, minute: sched?.minute });
        await reload();
    };

    const seedDemoData: Ctx['seedDemoData'] = async (options) => {
        const seeds = generateSeedTreatments();
        for (const t of seeds) {
            await addTreatment(t, { notifications: options?.notifications ?? false }); // por defecto SIN notifs
        }
        await reload();
    };

    const clearAll: Ctx['clearAll'] = async () => {
        // Cancelar notificaciones programadas (si existieran)
        const ts = await api.listTreatments();
        for (const t of ts) {
            for (const s of t.schedules) {
                await cancelNotification(s.notificationId);
            }
        }
        // Limpiar almacenamiento demo
        await clearDemoStorage();
        await reload();
    };

    const value = useMemo(() => ({
        treatments, intakes, reload, addTreatment, confirmIntake, seedDemoData, clearAll
    }), [treatments, intakes]);

    return <TreatmentsContext.Provider value={value}>{children}</TreatmentsContext.Provider>;
};
