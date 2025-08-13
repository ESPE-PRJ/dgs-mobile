// components/TopBar.tsx
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Link, useRouter } from 'expo-router';

type Props = { title?: string };

export default function TopBar({ title = '' }: Props) {
    const router = useRouter();

    const goHome = () => {
        // ❌ No usar dismissAll / popToTop: causa el error si no hay stack
        // ✅ Ir directo al tab de Home
        router.replace('/home'); // o '/home/index'
    };

    return (
        <View style={styles.wrapper}>
            {/* Opción 1: Imperativo */}
            <TouchableOpacity onPress={goHome} style={styles.backBtn}>
                <Text style={styles.backText}>← Home</Text>
            </TouchableOpacity>

            <Text style={styles.title} numberOfLines={1}>{title}</Text>
            <View style={{ width: 64 }} />
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        paddingTop: 14, paddingHorizontal: 16, paddingBottom: 10,
        borderBottomWidth: 1, borderColor: '#eee', backgroundColor: '#fff',
        flexDirection: 'row', alignItems: 'center', gap: 8,
    },
    backBtn: {
        paddingVertical: 6, paddingHorizontal: 10,
        borderRadius: 8, borderWidth: 1, borderColor: '#ddd',
        minWidth: 64, alignItems: 'center',
    },
    backText: { fontWeight: '700' },
    title: { flex: 1, textAlign: 'center', fontSize: 18, fontWeight: '700' },
});
