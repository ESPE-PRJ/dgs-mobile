// app/dashboard/create.tsx
import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import TopBar from '../../components/TopBar';

const PALETTE = {
  bg: '#FFFFFF',
  border: '#E5F1FF',
  text: '#111111',
  sub: '#666666',
  accent: '#5EC2FF',
  accentBg: '#EAF6FF',
};

export default function CreateDashboard() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [dosage, setDosage] = useState('');
  const [hour, setHour] = useState('');
  const [minute, setMinute] = useState('');

  const onSubmit = () => {
    if (!name || !dosage || !hour || !minute) {
      Alert.alert('Faltan datos', 'Completa todos los campos');
      return;
    }
    // Aquí puedes realizar la acción de guardar el nuevo tratamiento

    Alert.alert('Listo', 'Nuevo tratamiento añadido');
    router.push('/dashboard'); // Redirigir al listado de adherencia
  };

  return (
    <View style={styles.container}>
      <TopBar title="Nuevo Dashboard de Adherencia" />
      <Text style={styles.title}>Agregar Nuevo Tratamiento</Text>

      <Text style={styles.label}>Nombre del tratamiento</Text>
      <TextInput value={name} onChangeText={setName} style={styles.input} placeholder="Ej: Paracetamol" />

      <Text style={styles.label}>Dosis</Text>
      <TextInput value={dosage} onChangeText={setDosage} style={styles.input} placeholder="Ej: 1 tableta" />

      <Text style={styles.label}>Hora del Recordatorio</Text>
      <View style={styles.row}>
        <TextInput
          value={hour}
          onChangeText={setHour}
          style={[styles.input, { width: '40%' }]}
          placeholder="Hora"
          keyboardType="numeric"
        />
        <Text>:</Text>
        <TextInput
          value={minute}
          onChangeText={setMinute}
          style={[styles.input, { width: '40%' }]}
          placeholder="Minutos"
          keyboardType="numeric"
        />
      </View>

      <TouchableOpacity style={styles.saveBtn} onPress={onSubmit}>
        <Text style={styles.saveText}>Guardar Tratamiento</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: PALETTE.bg, padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  label: { fontWeight: '600', marginBottom: 4 },
  input: {
    height: 40,
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
    borderColor: PALETTE.border,
  },
  row: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  saveBtn: {
    backgroundColor: PALETTE.accent,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  saveText: { color: '#FFFFFF', fontWeight: '700' },
});
