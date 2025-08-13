import { Link } from 'expo-router';
import { useMemo, useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import TopBar from '../../components/TopBar';

type Medication = {
  id: string;
  name: string;         // "Paracetamol"
  strength: string;     // "500 mg"
  form: string;         // "Tableta", "Cápsula"
  frequency: string;    // "Cada 8 h", "Una al día"
  notes?: string;       // "Tomar con agua"
};

const PALETTE = {
  bg: '#FFFFFF',
  card: '#FFFFFF',
  text: '#111111',
  sub: '#666666',
  border: '#E5F1FF',
  accent: '#5EC2FF',     // azul claro para botones
  accentBg: '#EAF6FF',   // azul muy claro para chips/fondos
};

const EXAMPLE_MEDS: Medication[] = [
  { id: '1', name: 'Paracetamol', strength: '500 mg', form: 'Tableta', frequency: 'Cada 8 h', notes: 'Tomar con agua. Máx 4 g/día.' },
  { id: '2', name: 'Amoxicilina', strength: '500 mg', form: 'Cápsula', frequency: 'Cada 8 h', notes: 'Completar el tratamiento indicado.' },
  { id: '3', name: 'Ibuprofeno', strength: '400 mg', form: 'Tableta', frequency: 'Cada 12 h', notes: 'Tomar después de comer.' },
  { id: '4', name: 'Metformina', strength: '850 mg', form: 'Tableta', frequency: 'Cada mañana y noche', notes: 'Con alimentos.' },
  { id: '5', name: 'Losartán', strength: '50 mg', form: 'Tableta', frequency: 'Una al día', notes: 'Medir presión regularmente.' },
  { id: '6', name: 'Omeprazol', strength: '20 mg', form: 'Cápsula', frequency: 'Antes del desayuno', notes: 'No masticar.' },
];

export default function MedicamentosScreen() {
  const [query, setQuery] = useState('');

  const data = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return EXAMPLE_MEDS;
    return EXAMPLE_MEDS.filter(m =>
      (m.name + ' ' + m.strength + ' ' + m.form + ' ' + m.frequency + ' ' + (m.notes ?? ''))
        .toLowerCase()
        .includes(q)
    );
  }, [query]);

  return (
    <View style={styles.container}>
      <TopBar title="Mis medicamentos" />

      <View style={styles.content}>
        {/* Buscador */}
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Buscar medicamento..."
          placeholderTextColor={PALETTE.sub}
          style={styles.search}
        />

        {/* Acciones rápidas */}
        <View style={styles.actionsRow}>
          <Link href="/home" asChild>
            <TouchableOpacity style={[styles.btn, styles.btnOutline]}>
              <Text style={[styles.btnText, styles.btnTextOutline]}>← Home</Text>
            </TouchableOpacity>
          </Link>

          <Link href="/treatments" asChild>
            <TouchableOpacity style={styles.btn}>
              <Text style={styles.btnText}>Ver tratamientos</Text>
            </TouchableOpacity>
          </Link>

          <Link href="/treatments/create" asChild>
            <TouchableOpacity style={styles.btn}>
              <Text style={styles.btnText}>Registrar tratamiento</Text>
            </TouchableOpacity>
          </Link>
        </View>

        {/* Lista */}
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 24 }}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.medName}>{item.name}</Text>
                <View style={styles.pill}>
                  <Text style={styles.pillText}>{item.form}</Text>
                </View>
              </View>

              <Text style={styles.medStrength}>{item.strength}</Text>

              <View style={styles.row}>
                <View style={styles.chip}>
                  <Text style={styles.chipText}>{item.frequency}</Text>
                </View>
              </View>

              {item.notes ? <Text style={styles.notes}>{item.notes}</Text> : null}

              <View style={styles.cardActions}>
                <Link href="/treatments/create" asChild>
                  <TouchableOpacity style={styles.smallBtn}>
                    <Text style={styles.smallBtnText}>Usar en tratamiento</Text>
                  </TouchableOpacity>
                </Link>
              </View>
            </View>
          )}
          ListEmptyComponent={
            <Text style={styles.empty}>No hay resultados para “{query}”.</Text>
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: PALETTE.bg },
  content: { flex: 1, padding: 16, gap: 12 },
  search: {
    borderWidth: 1,
    borderColor: PALETTE.border,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: PALETTE.text,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 10,
    flexWrap: 'wrap',
  },
  btn: {
    backgroundColor: PALETTE.accent,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
  },
  btnText: { color: '#FFFFFF', fontWeight: '700' },
  btnOutline: {
    backgroundColor: PALETTE.accentBg,
    borderWidth: 1,
    borderColor: PALETTE.accent,
  },
  btnTextOutline: { color: PALETTE.accent, fontWeight: '700' },

  card: {
    backgroundColor: PALETTE.card,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: PALETTE.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  medName: { fontSize: 18, fontWeight: '800', color: PALETTE.text },
  medStrength: { marginTop: 2, color: PALETTE.sub, fontWeight: '600' },
  pill: {
    backgroundColor: PALETTE.accentBg,
    borderColor: PALETTE.accent,
    borderWidth: 1,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 999,
  },
  pillText: { color: PALETTE.accent, fontWeight: '700', fontSize: 12 },

  row: { flexDirection: 'row', gap: 8, marginTop: 8 },
  chip: {
    backgroundColor: PALETTE.accentBg,
    borderColor: PALETTE.accent,
    borderWidth: 1,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 999,
  },
  chipText: { color: PALETTE.accent, fontWeight: '700', fontSize: 12 },

  notes: { marginTop: 8, color: PALETTE.sub },

  cardActions: {
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  smallBtn: {
    backgroundColor: PALETTE.accent,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  smallBtnText: { color: '#fff', fontWeight: '700', fontSize: 13 },

  empty: { textAlign: 'center', marginTop: 20, color: PALETTE.sub },
});
