import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';

interface EmptyStateProps {
  isFiltered?: boolean;
}

export function EmptyState({ isFiltered = false }: EmptyStateProps) {
  const iconColor = useThemeColor({}, 'icon');

  return (
    <View style={styles.container}>
      <Ionicons
        name={isFiltered ? 'search-outline' : 'people-outline'}
        size={64}
        color={iconColor}
      />
      <ThemedText type="subtitle" style={styles.title}>
        {isFiltered ? 'Sin resultados' : 'No hay contactos'}
      </ThemedText>
      <ThemedText style={styles.description}>
        {isFiltered
          ? 'No se encontraron contactos con los filtros aplicados'
          : 'Agrega tu primer contacto usando el boton +'}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingVertical: 64,
  },
  title: {
    marginTop: 16,
    textAlign: 'center',
  },
  description: {
    marginTop: 8,
    textAlign: 'center',
    opacity: 0.7,
  },
});
