// app/treatments/create.tsx
import DateTimePicker from '@react-native-community/datetimepicker';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import TopBar from '../../components/TopBar';
import { useTreatments } from '../../context/TreatmentsContext';
import { Treatment } from '../types/treatments';

export default function CreateTreatment() {
  const { addTreatment } = useTreatments();
  const router = useRouter();
  const [name, setName] = useState('');
  const [dosage, setDosage] = useState('');
  const [time, setTime] = useState(new Date());
  const [showPicker, setShowPicker] = useState(Platform.OS === 'ios');

  const onSubmit = async () => {
    if (!name || !dosage) {
      Alert.alert('Faltan datos', 'Completa nombre y dosis');
      return;
    }
    const h = time.getHours();
    const m = time.getMinutes();

    const input: Omit<Treatment, 'id'> = {
      name, dosage,
      startDate: new Date().toISOString(),
      schedules: [{
        id: crypto.randomUUID(), hour: h, minute: m,
        daysOfWeek: [0, 1, 2, 3, 4, 5, 6] // diario
      }]
    };

    await addTreatment(input);
    Alert.alert('Listo', 'Tratamiento creado y recordatorio programado');
    router.back();
  };

  return (
    <View style={styles.container}>
      <TopBar title="Nuevo tratamiento" />
      <Text style={styles.title}>Nuevo tratamiento</Text>

      <Text style={styles.label}>Nombre del medicamento</Text>
      <TextInput value={name} onChangeText={setName} placeholder="Ej: Paracetamol 500mg" style={styles.input} />

      <Text style={styles.label}>Dosis</Text>
      <TextInput value={dosage} onChangeText={setDosage} placeholder="Ej: 1 tableta" style={styles.input} />

      <Text style={styles.label}>Hora del recordatorio</Text>
      {showPicker ? (
        <DateTimePicker value={time} mode="time" onChange={(_, d) => d && setTime(d)} />
      ) : (
        <TouchableOpacity onPress={() => setShowPicker(true)} style={styles.timeBtn}>
          <Text>{String(time.getHours()).padStart(2, '0')}:{String(time.getMinutes()).padStart(2, '0')}</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity style={styles.save} onPress={onSubmit}>
        <Text style={styles.saveText}>Guardar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.cancel} onPress={() => router.back()}>
        <Text>Cancelar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 10 },
  content: { flex: 1, padding: 16, gap: 10 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 6, backgroundColor: '#fff' },
  label: { fontWeight: '600' },
  input: { borderWidth: 1, borderRadius: 8, padding: 10 },
  timeBtn: { borderWidth: 1, borderRadius: 8, padding: 12, alignItems: 'center', width: 120 },
  save: { backgroundColor: '#f2cb2b', padding: 12, borderRadius: 8, alignItems: 'center', marginTop: 12 },
  saveText: { fontWeight: '700' },
  cancel: { alignItems: 'center', marginTop: 8 }
});
