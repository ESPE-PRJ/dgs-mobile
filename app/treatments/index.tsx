import { useRouter } from 'expo-router';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';



const router = useRouter();

const tratamientos = [
  {
    id: '1',
    medicamento: 'Paracetamol',
    dosis: '500mg',
    horarios: ['08:00', '20:00'],
    fechaInicio: '2025-08-01',
    fechaFin: '2025-08-05',
  },
  {
    id: '2',
    medicamento: 'Ibuprofeno',
    dosis: '400mg',
    horarios: ['09:00'],
    fechaInicio: '2025-08-02',
    fechaFin: '2025-08-04',
  },
];

export default function ListaTratamientos() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tratamientos registrados</Text>

      <FlatList
        data={tratamientos}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.medicamento}>{item.medicamento}</Text>
            <Text style={styles.subtext}>Dosis: {item.dosis}</Text>
            <Text style={styles.subtext}>Horario(s): {item.horarios.join(', ')}</Text>
            <Text style={styles.subtext}>Desde {item.fechaInicio} hasta {item.fechaFin}</Text>
          </View>
        )}
      />
      <TouchableOpacity style={styles.backButton} onPress={() => router.replace('/home')}>
  <Text style={styles.backText}>← Volver al inicio</Text>
</TouchableOpacity>

    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
    textAlign: 'center',
  },
  list: {
    gap: 12,
  },
  card: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 12,
    elevation: 1,
  },
  medicamento: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111',
    marginBottom: 6,
  },
  subtext: {
    fontSize: 14,
    color: '#555',
    marginBottom: 2,
  },
  backButton: {
  marginTop: 24,
  alignItems: 'center',
},
backText: {
  fontSize: 16,
  color: '#007bff',
  fontWeight: '600',
},

});
