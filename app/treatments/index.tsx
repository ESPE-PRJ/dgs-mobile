import { Link } from 'expo-router';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import TopBar from '../../components/TopBar';
import { useTreatments } from '../../context/TreatmentsContext';

const PALETTE = {
  bg: '#FFFFFF',
  border: '#E5F1FF',
  text: '#111111',
  sub: '#666666',
  accent: '#5EC2FF',
  accentBg: '#EAF6FF',
};

function formatHM(h: number, m: number) {
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

export default function TreatmentsList() {
  const { treatments, intakes, confirmIntake, seedDemoData, clearAll } = useTreatments();

  return (
    <View style={styles.container}>
      <TopBar title="Tratamientos" />

      {/* Acciones rápidas */}
      <View style={styles.actionsRow}>
        <TouchableOpacity style={[styles.btn, styles.btnOutline]} onPress={() => seedDemoData({ notifications: false })}>
          <Text style={[styles.btnText, styles.btnTextOutline]}>Cargar datos de prueba</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.btn, styles.dangerBtn]} onPress={clearAll}>
          <Text style={styles.btnDangerText}>Limpiar</Text>
        </TouchableOpacity>

        <Link href="/treatments/create" asChild>
          <TouchableOpacity style={styles.btn}>
            <Text style={styles.btnText}>Nuevo tratamiento</Text>
          </TouchableOpacity>
        </Link>
      </View>

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

            <Text style={styles.section}>Recordatorios</Text>
            {item.schedules.map(s => (
              <View key={s.id} style={styles.row}>
                <Text style={styles.hour}>{formatHM(s.hour, s.minute)}</Text>
                <TouchableOpacity
                  onPress={() => confirmIntake(item.id, { hour: s.hour, minute: s.minute })}
                  style={styles.smallBtn}
                >
                  <Text style={styles.smallBtnText}>Marcar tomado</Text>
                </TouchableOpacity>
              </View>
            ))}

            <Text style={styles.section}>Últimas tomas</Text>
            {intakes
              .filter(i => i.treatmentId === item.id)
              .slice(-3)
              .reverse()
              .map(i => (
                <Text key={i.id} style={styles.intake}>
                  ✓ {new Date(i.takenAt).toLocaleString()}
                </Text>
              ))
            }
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: PALETTE.bg },
  actionsRow: {
    paddingHorizontal: 16, paddingTop: 12, paddingBottom: 6,
    flexDirection: 'row', gap: 10, flexWrap: 'wrap',
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
    borderWidth: 1, borderColor: PALETTE.accent,
  },
  btnTextOutline: { color: PALETTE.accent, fontWeight: '700' },

  dangerBtn: {
    backgroundColor: '#fff',
    borderWidth: 1, borderColor: '#ffd6d6',
  },
  btnDangerText: { color: '#cc0000', fontWeight: '800' },

  card: {
    marginHorizontal: 16,
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: PALETTE.border,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06, shadowRadius: 6, elevation: 2,
  },
  name: { fontSize: 18, fontWeight: '800', color: PALETTE.text },
  dose: { opacity: 0.7, color: PALETTE.sub },

  section: { marginTop: 8, fontWeight: '700', color: PALETTE.text },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 4 },
  hour: { fontSize: 16, color: PALETTE.text },

  smallBtn: { backgroundColor: PALETTE.accent, paddingVertical: 8, paddingHorizontal: 12, borderRadius: 10 },
  smallBtnText: { color: '#fff', fontWeight: '700', fontSize: 13 },

  intake: { fontSize: 12, opacity: 0.7, marginTop: 2 },
  empty: { textAlign: 'center', marginTop: 30, color: PALETTE.sub },
});
