// app/dashboard/index.tsx
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import TopBar from '../../components/TopBar';

const PALETTE = {
  bg: '#FFFFFF',
  border: '#E5F1FF',
  text: '#111111',
  sub: '#666666',
  accent: '#5EC2FF',
  accentBg: '#EAF6FF',
};

export default function Dashboard() {
  const [treatments, setTreatments] = useState<any[]>([]);
  const router = useRouter();

  // Simulando un fetch de datos
  useEffect(() => {
    const data = [
      { id: '1', name: 'Paracetamol 500mg', dosage: '1 tableta', schedule: '08:00 AM' },
      { id: '2', name: 'Ibuprofeno 200mg', dosage: '1 tableta', schedule: '09:30 AM' },
    ];
    setTreatments(data);
  }, []);

  return (
    <View style={styles.container}>
      <TopBar title="Dashboard de Adherencia" />

      <FlatList
        data={treatments}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 24 }}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        ListEmptyComponent={<Text style={styles.empty}>Aún no tienes tratamientos.</Text>}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.dose}>{item.dosage}</Text>
            <Text style={styles.schedule}>Recordatorio: {item.schedule}</Text>
          </View>
        )}
      />

      <TouchableOpacity
        style={styles.addBtn}
        onPress={() => router.push('/dashboard/create')}
      >
        <Text style={styles.addBtnText}>Agregar Nuevo Tratamiento</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: PALETTE.bg, padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', color: PALETTE.text, marginBottom: 20 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: PALETTE.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
    marginBottom: 16,
  },
  name: { fontSize: 18, fontWeight: '800', color: PALETTE.text },
  dose: { opacity: 0.7, color: PALETTE.sub },
  schedule: { marginTop: 8, color: PALETTE.text },
  addBtn: {
    backgroundColor: PALETTE.accent,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  addBtnText: { color: '#FFFFFF', fontWeight: '700' },
  empty: { textAlign: 'center', marginTop: 30, color: PALETTE.sub },
});
