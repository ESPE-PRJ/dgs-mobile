// app/_layout.tsx
import * as Notifications from 'expo-notifications';
import { Slot, useRouter, useSegments } from 'expo-router';
import { useEffect, useState } from 'react';
import { Platform } from 'react-native';

import { AuthProvider, useAuth } from '../context/AuthContext';
import { TreatmentsProvider } from '../context/TreatmentsContext';
import { registerNotificationResponseListener } from './libs/notifications';

// ---- Tu layout protegido tal cual ----
function ProtectedLayout() {
  const { user } = useAuth();
  const router = useRouter();
  const segments = useSegments();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (!isReady) return;

    const inAuthGroup = segments[0] === '(auth)';

    if (!user && !inAuthGroup) {
      router.replace('/(auth)/login');
    } else if (user && inAuthGroup) {
      router.replace('/home/index');
    }
  }, [user, segments, isReady]);

  return <Slot />;
}

// ---- Layout raíz: Providers + listener de notificaciones ----
export default function RootLayout() {
  useEffect(() => {
    // Canal Android (opcional pero recomendado)
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.DEFAULT,
      });
    }
    // Listener: si el usuario toca la notificación, registramos la toma
    const sub = registerNotificationResponseListener();
    return () => sub.remove();
  }, []);

  return (
    <AuthProvider>
      <TreatmentsProvider>
        <ProtectedLayout />
      </TreatmentsProvider>
    </AuthProvider>
  );
}
