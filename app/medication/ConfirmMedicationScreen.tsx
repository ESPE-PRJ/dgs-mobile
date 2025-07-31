import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import ThemedView from '@/components/ThemedView';
import ThemedText from '@/components/ThemedText';
import IconSymbol from '@/components/IconSymbol'; // Asegúrate de tener este componente

export default function ConfirmMedicationScreen() {
  const handleConfirmTaken = () => {
    // Aquí podrías guardar la confirmación localmente o enviarla a una API
    console.log('Toma de medicación confirmada');
  };

  const handlePostpone = () => {
    // Lógica para posponer
    console.log('Toma de medicación pospuesta');
  };

  return (
    <ParallaxScrollView
      headerImage={
        <Image
          source={require('@/assets/images/meds-header.png')}
          style={styles.headerImage}
        />
      }
      headerBackgroundColor={{ light: '#D0F0EC', dark: '#124D44' }}
    >
      <ThemedView style={styles.container}>
        <ThemedText type="title">Medicamentos Programados</ThemedText>

        {/* Tarjeta 1 */}
        <ThemedView style={styles.medicationCard}>
          <ThemedText type="title">Aspirina 100mg</ThemedText>
          <ThemedText type="subtitle">Hora: 08:00 AM</ThemedText>
          <ThemedText type="default">Tomar con el desayuno</ThemedText>

          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={handleConfirmTaken}
              activeOpacity={0.8}
            >
              <IconSymbol name="checkmark.circle" size={20} color="green" />
              <ThemedText type="defaultSemiBold" style={styles.buttonText}>
                Confirmar
              </ThemedText>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.postponeButton}
              onPress={handlePostpone}
              activeOpacity={0.8}
            >
              <IconSymbol name="clock" size={20} color="orange" />
              <ThemedText type="defaultSemiBold" style={styles.buttonText}>
                Posponer
              </ThemedText>
            </TouchableOpacity>
          </View>
        </ThemedView>

        {/* Puedes duplicar más tarjetas con distinta info */}
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  headerImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  medicationCard: {
    backgroundColor: '#FFFFFF33',
    padding: 16,
    borderRadius: 12,
    marginTop: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 12,
    justifyContent: 'space-between',
  },
  confirmButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DFF5E1',
    padding: 10,
    borderRadius: 8,
    gap: 6,
  },
  postponeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF2CC',
    padding: 10,
    borderRadius: 8,
    gap: 6,
  },
  buttonText: {
    marginLeft: 4,
  },
});
