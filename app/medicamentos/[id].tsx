import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function MedicamentoDetalle() {
  const { nombre, dosis, horario, instrucciones, imagen } = useLocalSearchParams<{
    nombre: string;
    dosis: string;
    horario: string;
    instrucciones: string;
    imagen: string;
  }>();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Medicamento</Text>

      <Text style={styles.label}>Nombre</Text>
      <Text style={styles.value}>{nombre}</Text>

      <Text style={styles.label}>Dosis</Text>
      <Text style={styles.value}>{dosis}</Text>

      <Text style={styles.label}>Horario</Text>
      <Text style={styles.value}>{horario}</Text>

      <Text style={styles.label}>Instrucciones</Text>
      <Text style={styles.value}>{instrucciones}</Text>

      <Text style={styles.label}>Foto</Text>
      <Image
        source={{ uri: imagen }}
        style={styles.image}
        resizeMode="cover"
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 16,
    color: '#222',
  },
  value: {
    fontSize: 16,
    color: '#333',
    marginTop: 4,
  },
  image: {
    width: '100%',
    height: 180,
    borderRadius: 12,
    marginTop: 12,
  },
});
