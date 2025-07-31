import { Slot, useRouter, useSegments } from 'expo-router';
import { useEffect, useState } from 'react';
import { AuthProvider, useAuth } from '../context/AuthContext';

function ProtectedLayout() {
  const { user } = useAuth();
  const router = useRouter();
  const segments = useSegments();
  const [isReady, setIsReady] = useState(false); // para esperar montaje

  useEffect(() => {
    setIsReady(true); // se activa después del primer render
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

export default function RootLayout() {
  return (
    <AuthProvider>
      <ProtectedLayout />
    </AuthProvider>
  );
}
