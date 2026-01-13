import { ThemedText } from "@/components/themed-text";
import { useThemeColor } from "@/hooks/use-theme-color";
import {
  deleteContact,
  filteredContacts$,
  filters$,
  isLoading$,
  resultsCount$,
} from "@/store/contacts";
import type { Contact } from "@/types/contact";
import { useSelector } from "@legendapp/state/react";
import { FlashList } from "@shopify/flash-list";
import { useCallback } from "react";
import { RefreshControl, StyleSheet, View } from "react-native";
import { ContactItem } from "./contact-item";
import { EmptyState } from "./empty-state";
import { SkeletonLoading } from "./skeleton-loading";

interface ContactListProps {
  onRefresh?: () => void;
}

export function ContactList({ onRefresh }: Readonly<ContactListProps>) {
  const contacts = useSelector(() => filteredContacts$.get());
  const count = useSelector(() => resultsCount$.get());
  const isLoading = useSelector(() => isLoading$.get());
  const filters = useSelector(() => filters$.get());
  const tintColor = useThemeColor({}, "tint");

  const isFiltered = filters.search !== "" || filters.department !== null;

  const renderItem = useCallback(
    ({ item }: { item: Contact }) => (
      <ContactItem contact={item} onDelete={deleteContact} />
    ),
    []
  );

  const keyExtractor = useCallback((item: Contact) => item.id, []);

  return (
    <View style={styles.container}>
      <View style={styles.countContainer}>
        <ThemedText style={styles.countText}>
          {count} {count === 1 ? "contacto" : "contactos"}
          {isFiltered && " encontrados"}
        </ThemedText>
      </View>
      <FlashList
        data={contacts}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          isLoading ? (
            <SkeletonLoading />
          ) : (
            <EmptyState isFiltered={isFiltered} />
          )
        }
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
  listContent: {
    paddingBottom: 20,
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
