import { View, Text, TouchableOpacity, FlatList, Image, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

const data = [
  {
    id: '1',
    nombre: 'Aspirina',
    dosis: '100 mg',
    horario: 'Mañana',
    instrucciones: 'Tomar con agua',
    imagen: 'https://cdn-icons-png.flaticon.com/512/3177/3177361.png',
  },
  // puedes agregar más aquí
];

export default function ListaMedicamentos() {
  const router = useRouter();

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.list}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => router.push({
            pathname: "/medicamentos/[id]",
            params: {
              ...item
            }
          })}
          style={styles.card}
        >
          <Image source={{ uri: item.imagen }} style={styles.thumb} />
          <View>
            <Text style={styles.name}>{item.nombre}</Text>
            <Text style={styles.subtitle}>{item.dosis} - {item.horario}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    padding: 16,
  },
  card: {
    flexDirection: 'row',
    gap: 12,
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    alignItems: 'center',
  },
  thumb: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: '#ddd',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
});
