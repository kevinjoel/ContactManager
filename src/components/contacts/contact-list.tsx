import { useCallback } from 'react';
import { StyleSheet, View, RefreshControl } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useSelector } from '@legendapp/state/react';
import {
  filteredContacts$,
  resultsCount$,
  isLoading$,
  deleteContact,
  filters$,
} from '@/store/contacts';
import { ContactItem } from './contact-item';
import { EmptyState } from './empty-state';
import { SkeletonLoading } from './skeleton-loading';
import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';
import type { Contact } from '@/types/contact';

interface ContactListProps {
  onRefresh?: () => void;
}

export function ContactList({ onRefresh }: ContactListProps) {
  const contacts = useSelector(() => filteredContacts$.get());
  const count = useSelector(() => resultsCount$.get());
  const isLoading = useSelector(() => isLoading$.get());
  const filters = useSelector(() => filters$.get());
  const tintColor = useThemeColor({}, 'tint');

  const isFiltered = filters.search !== '' || filters.department !== null;

  const renderItem = useCallback(
    ({ item }: { item: Contact }) => (
      <ContactItem contact={item} onDelete={deleteContact} />
    ),
    []
  );

  const keyExtractor = useCallback((item: Contact) => item.id, []);

  if (isLoading) {
    return <SkeletonLoading />;
  }

  if (contacts.length === 0) {
    return <EmptyState isFiltered={isFiltered} />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.countContainer}>
        <ThemedText style={styles.countText}>
          {count} {count === 1 ? 'contacto' : 'contactos'}
          {isFiltered && ' encontrados'}
        </ThemedText>
      </View>
      <FlashList
        data={contacts}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={onRefresh}
            tintColor={tintColor}
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  countContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  countText: {
    fontSize: 13,
    opacity: 0.6,
  },
});
