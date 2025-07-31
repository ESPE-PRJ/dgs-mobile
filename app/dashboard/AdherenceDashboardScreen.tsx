import { StyleSheet, View } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import ThemedView from '@/components/ThemedView';
import ThemedText from '@/components/ThemedText';
import Collapsible from '@/components/Collapsible';
import IconSymbol from '@/components/IconSymbol';

const mockData = [
  {
    nombre: 'Juan Pérez',
    adherencia: 92,
    tomas: '3/3',
    ultimaToma: '14:30',
  },
  {
    nombre: 'Ana Torres',
    adherencia: 76,
    tomas: '2/3',
    ultimaToma: '12:00',
  },
  {
    nombre: 'Luis Cevallos',
    adherencia: 100,
    tomas: '3/3',
    ultimaToma: '09:00',
  },
];

export default function AdherenceDashboardScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={<View style={{ height: 100 }} />}
    >
      <ThemedView style={styles.container}>
        <ThemedText type="title">Dashboard de Adherencia</ThemedText>
        <ThemedText type="subtitle">Adherencia Promedio: 85%</ThemedText>
      </ThemedView>

      {mockData.map((paciente, index) => (
        <Collapsible
          key={index}
          title={`Paciente: ${paciente.nombre} - ${paciente.adherencia}%`}
        >
          <ThemedView style={styles.patientDetails}>
            <View style={styles.row}>
              <IconSymbol name="pill" size={20} color="#6D9F71" />
              <ThemedText type="defaultSemiBold">
                Medicamentos: {paciente.tomas} tomados hoy
              </ThemedText>
            </View>

            <View style={styles.row}>
              <IconSymbol name="clock" size={20} color="#789ABF" />
              <ThemedText>Última toma: {paciente.ultimaToma}</ThemedText>
            </View>
          </ThemedView>
        </Collapsible>
      ))}
    </ParallaxScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  patientDetails: {
    padding: 16,
    backgroundColor: '#FFFFFF22',
    borderRadius: 12,
    marginTop: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
});
