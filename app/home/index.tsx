import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Home() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.brand}>PharmaLink</Text>
      <Text style={styles.title}>Bienvenido a PharmaLink 👋</Text>
      <Text style={styles.subtitle}>
        Desde aquí puedes gestionar tus tratamientos, medicamentos y recordatorios.
      </Text>

      <View style={styles.menu}>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => router.push('/treatments/create')}
        >
          <Text style={styles.menuText}>Registrar tratamiento</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => router.push('/treatments')}
        >
          <Text style={styles.menuText}>Ver tratamientos</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  brand: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#000',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
  },
  menu: {
    width: '100%',
    gap: 12,
  },
  menuItem: {
    backgroundColor: '#007bff',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  menuText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
