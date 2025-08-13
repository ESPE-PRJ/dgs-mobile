// lib/notifications.ts
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { DoseSchedule, Treatment, Weekday } from '../types/treatments';
import { api } from './api';

// Muestra la notificación aunque la app esté activa
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export async function askNotificationPermissions() {
  if (!Device.isDevice) return false;
  const settings = await Notifications.getPermissionsAsync();
  if (settings.status !== 'granted') {
    const req = await Notifications.requestPermissionsAsync();
    return req.status === 'granted';
  }
  return true;
}

function matchesToday(dow: Weekday[]) {
  const today = (new Date().getDay()) as Weekday;
  return dow.includes(today);
}

// Programa una notificación repetitiva para un schedule concreto
export async function scheduleForDose(treatment: Treatment, sch: DoseSchedule) {
  // Si hay días específicos y hoy no aplica, igual programamos repetitivo; Expo filtra por hora.
  // Para días específicos, programamos 7 triggers distintos (uno por día marcado).
  if (sch.daysOfWeek.length > 0 && sch.daysOfWeek.length < 7) {
    // Una por día seleccionado
    const ids: string[] = [];
    for (const d of sch.daysOfWeek) {
      const id = await Notifications.scheduleNotificationAsync({
        content: {
          title: `Hora de tu medicación`,
          body: `${treatment.name} - ${treatment.dosage}`,
          data: { treatmentId: treatment.id, hour: sch.hour, minute: sch.minute },
        },
        trigger: { weekday: d === 0 ? 7 : d, hour: sch.hour, minute: sch.minute, repeats: true } as any,
      });
      ids.push(id);
    }
    // toma el primero
    return ids[0];
  }

  // Diario (o sin días especificados)
  return await Notifications.scheduleNotificationAsync({
    content: {
      title: `Hora de tu medicación`,
      body: `${treatment.name} - ${treatment.dosage}`,
      data: { treatmentId: treatment.id, hour: sch.hour, minute: sch.minute },
    },
    trigger: { hour: sch.hour, minute: sch.minute, repeats: true },
  });
}

export async function cancelNotification(id?: string) {
  if (!id) return;
  try { await Notifications.cancelScheduledNotificationAsync(id); } catch {}
}

// Listener: cuando el usuario toca la notificación, marcamos “tomado” inmediato
export function registerNotificationResponseListener() {
  return Notifications.addNotificationResponseReceivedListener(async (resp) => {
    const data = resp.notification.request.content.data as any;
    if (data?.treatmentId) {
      await api.confirmIntake(String(data.treatmentId), {
        hour: Number(data.hour ?? 0),
        minute: Number(data.minute ?? 0),
      });
    }
  });
}
