import { StyleSheet, TextInput, View, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from '@legendapp/state/react';
import { filters$, setSearchFilter } from '@/store/contacts';
import { useThemeColor } from '@/hooks/use-theme-color';

export function SearchBar() {
  const search = useSelector(() => filters$.search.get());
  const textColor = useThemeColor({}, 'text');
  const iconColor = useThemeColor({}, 'icon');
  const backgroundColor = useThemeColor({ light: '#f5f5f5', dark: '#2a2a2a' }, 'background');

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Ionicons name="search-outline" size={20} color={iconColor} />
      <TextInput
        style={[styles.input, { color: textColor }]}
        placeholder="Buscar por nombre..."
        placeholderTextColor={iconColor}
        value={search}
        onChangeText={setSearchFilter}
        autoCapitalize="none"
        autoCorrect={false}
      />
      {search.length > 0 && (
        <Pressable onPress={() => setSearchFilter('')} hitSlop={8}>
          <Ionicons name="close-circle" size={20} color={iconColor} />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    gap: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 0,
  },
});
