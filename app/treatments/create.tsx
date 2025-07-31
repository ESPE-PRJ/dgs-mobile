import DateTimePicker from '@react-native-community/datetimepicker';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';


export default function CreateTreatment() {
  const [medicamento, setMedicamento] = useState('');
  const [dosis, setDosis] = useState('');
  const [horarios, setHorarios] = useState<string[]>([]);
  const [horaActual, setHoraActual] = useState(new Date());
  const [mostrarPicker, setMostrarPicker] = useState(false);

  const [fechaInicio, setFechaInicio] = useState(new Date());
  const [fechaFin, setFechaFin] = useState(new Date());

  const router = useRouter();
    

  const agregarHorario = () => {
    const horaFormateada = horaActual.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    if (!horarios.includes(horaFormateada)) {
      setHorarios([...horarios, horaFormateada]);
    }
  };

  const handleGuardar = () => {
    if (!medicamento || !dosis || horarios.length === 0) {
      Alert.alert('Error', 'Completa todos los campos requeridos.');
      return;
    }

    const tratamiento = {
      medicamento,
      dosis,
      horarios,
      fechaInicio: fechaInicio.toISOString().split('T')[0],
      fechaFin: fechaFin.toISOString().split('T')[0],
    };

    console.log('Tratamiento registrado:', tratamiento);
    Alert.alert('Éxito', 'Tratamiento registrado correctamente', [
  {
    text: 'OK',
    onPress: () => router.replace('/home'),
  },
]);

  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Registrar tratamiento</Text>

      <TextInput
        placeholder="Nombre del medicamento"
        value={medicamento}
        onChangeText={setMedicamento}
        style={styles.input}
      />

      <TextInput
        placeholder="Dosis (ej: 500mg)"
        value={dosis}
        onChangeText={setDosis}
        keyboardType="numeric"
        style={styles.input}
      />

      <TouchableOpacity onPress={() => setMostrarPicker(true)} style={styles.buttonSmall}>
        <Text style={styles.buttonText}>Agregar horario</Text>
      </TouchableOpacity>

      {mostrarPicker && (
        <DateTimePicker
          value={horaActual}
          mode="time"
          is24Hour
          display="default"
          onChange={(e, selectedDate) => {
            if (selectedDate) {
              setHoraActual(selectedDate);
              setMostrarPicker(false);
              agregarHorario();
            }
          }}
        />
      )}

      <View style={styles.horarios}>
        {horarios.map((hora, index) => (
          <Text key={index} style={styles.horarioItem}>• {hora}</Text>
        ))}
      </View>

      <Text style={styles.label}>Fecha de inicio:</Text>
      <DateTimePicker
        value={fechaInicio}
        mode="date"
        display="default"
        onChange={(e, date) => date && setFechaInicio(date)}
      />

      <Text style={styles.label}>Fecha de fin:</Text>
      <DateTimePicker
        value={fechaFin}
        mode="date"
        display="default"
        onChange={(e, date) => date && setFechaFin(date)}
      />

      <TouchableOpacity onPress={handleGuardar} style={styles.button}>
        <Text style={styles.buttonText}>Guardar tratamiento</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    padding: 14,
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#007bff',
    borderRadius: 10,
    padding: 14,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonSmall: {
    backgroundColor: '#6c757d',
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 16,
  },
  horarios: {
    marginBottom: 12,
  },
  horarioItem: {
    fontSize: 14,
    color: '#333',
    marginVertical: 2,
  },
});
