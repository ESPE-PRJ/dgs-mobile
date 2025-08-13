import { Image } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import ThemedView from '@/components/ThemedView';
import ThemedText from '@/components/ThemedText';
import Collapsible from '@/components/Collapsible';

export default function UserProfileScreen() {
  return (
    <ParallaxScrollView
      headerImage={
        <Image
          source={{ uri: 'https://i.pravatar.cc/300' }} // Imagen de perfil temporal
          style={{ width: 100, height: 100, borderRadius: 50, alignSelf: 'center', marginTop: 40 }}
        />
      }
      headerBackgroundColor={{ light: '#CDE3DA', dark: '#0F2E26' }}
    >
      {/* Sección: Información Personal */}
      <ThemedView style={{ padding: 16 }}>
        <ThemedText type="title">Juan Pérez</ThemedText>
        <ThemedText type="subtitle">@juanperez</ThemedText>
        <ThemedText type="default">Correo: juan.perez@email.com</ThemedText>
        <ThemedText type="default">Teléfono: +593 987654321</ThemedText>
      </ThemedView>

      {/* Sección colapsable: Dirección */}
      <Collapsible title="Dirección">
        <ThemedView style={{ padding: 12 }}>
          <ThemedText type="default">Ciudad: Quito</ThemedText>
          <ThemedText type="default">País: Ecuador</ThemedText>
        </ThemedView>
      </Collapsible>

      {/* Sección colapsable: Preferencias */}
      <Collapsible title="Preferencias">
        <ThemedView style={{ padding: 12 }}>
          <ThemedText type="default">Tema: Oscuro</ThemedText>
          <ThemedText type="default">Notificaciones: Activadas</ThemedText>
        </ThemedView>
      </Collapsible>

      {/* Sección colapsable: Seguridad */}
      <Collapsible title="Seguridad">
        <ThemedView style={{ padding: 12 }}>
          <ThemedText type="default">Contraseña: ********</ThemedText>
          <ThemedText type="link">Cambiar contraseña</ThemedText>
        </ThemedView>
      </Collapsible>
    </ParallaxScrollView>
  );
}
