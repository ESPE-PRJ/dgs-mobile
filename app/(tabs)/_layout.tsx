import { Tabs } from 'expo-router';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,           // sin header en las pantallas del tab
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: { position: 'absolute' },
          default: {},
        }),
      }}
    >
      {/* HOME -> apunta al shim dentro de (tabs) */}
      <Tabs.Screen
        name="home/index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />

      {/* TREATMENTS (lista) */}
      <Tabs.Screen
        name="treatments/index"
        options={{
          title: 'Tratamientos',
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="pills.fill" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="medicamentos/index"
        options={{
          title: 'Medicamentos',
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="cross.case.fill" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
