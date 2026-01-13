import { StyleSheet, View, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';
import type { Contact } from '@/types/contact';

interface ContactItemProps {
  contact: Contact;
  onDelete?: (id: string) => void;
}

const DEPARTMENT_COLORS: Record<string, string> = {
  Ventas: '#10B981',
  Desarrollo: '#3B82F6',
  Marketing: '#F59E0B',
  Soporte: '#8B5CF6',
};

export function ContactItem({ contact, onDelete }: ContactItemProps) {
  const iconColor = useThemeColor({}, 'icon');
  const tintColor = useThemeColor({}, 'tint');
  const departmentColor = DEPARTMENT_COLORS[contact.department] || tintColor;

  const initials = contact.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <ThemedView style={styles.container}>
      <View style={[styles.avatar, { backgroundColor: departmentColor }]}>
        <ThemedText style={styles.initials}>{initials}</ThemedText>
      </View>
      <View style={styles.content}>
        <ThemedText type="defaultSemiBold" style={styles.name}>
          {contact.name}
        </ThemedText>
        <View style={styles.infoRow}>
          <Ionicons name="mail-outline" size={14} color={iconColor} />
          <ThemedText style={styles.infoText}>{contact.email}</ThemedText>
        </View>
        {contact.phone && (
          <View style={styles.infoRow}>
            <Ionicons name="call-outline" size={14} color={iconColor} />
            <ThemedText style={styles.infoText}>{contact.phone}</ThemedText>
          </View>
        )}
        <View style={[styles.badge, { backgroundColor: `${departmentColor}20` }]}>
          <ThemedText style={[styles.badgeText, { color: departmentColor }]}>
            {contact.department}
          </ThemedText>
        </View>
      </View>
      {onDelete && (
        <Pressable
          onPress={() => onDelete(contact.id)}
          style={styles.deleteButton}
          hitSlop={8}
        >
          <Ionicons name="trash-outline" size={20} color="#EF4444" />
        </Pressable>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(128, 128, 128, 0.3)',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  initials: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    marginLeft: 12,
    gap: 4,
  },
  name: {
    fontSize: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  infoText: {
    fontSize: 13,
    opacity: 0.7,
  },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 4,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '500',
  },
  deleteButton: {
    padding: 8,
  },
});
