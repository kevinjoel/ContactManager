import { useEffect, useCallback, useRef } from "react";
import { StyleSheet, Pressable, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet from "@gorhom/bottom-sheet";
import { ThemedView } from "@/components/themed-view";
import { ThemedText } from "@/components/themed-text";
import { SearchBar } from "@/components/contacts/search-bar";
import { DepartmentChips } from "@/components/contacts/department-chips";
import { ContactList } from "@/components/contacts/contact-list";
import { AddContactSheet } from "@/components/contacts/add-contact-sheet";
import { initializeStore, isLoading$, addContact } from "@/store/contacts";
import { useThemeColor } from "@/hooks/use-theme-color";

export default function ContactsScreen() {
  const insets = useSafeAreaInsets();
  const tintColor = useThemeColor({}, "tint");
  const bottomSheetRef = useRef<BottomSheet>(null);

  useEffect(() => {
    initializeStore();
  }, []);

  const handleRefresh = useCallback(() => {
    isLoading$.set(true);
    setTimeout(() => {
      isLoading$.set(false);
    }, 1000);
  }, []);

  const handleOpenSheet = useCallback(() => {
    bottomSheetRef.current?.expand();
  }, []);

  const handleCloseSheet = useCallback(() => {
    bottomSheetRef.current?.close();
  }, []);

  return (
    <GestureHandlerRootView style={styles.flex}>
      <ThemedView style={[styles.container, { paddingTop: insets.top }]}>
        {/* Header */}
        <View style={styles.header}>
          <ThemedText type="title">Contactos</ThemedText>
          <Pressable
            onPress={handleOpenSheet}
            style={[styles.addButton, { backgroundColor: tintColor }]}
          >
            <Ionicons name="add" size={24} color="#fff" />
          </Pressable>
        </View>

        {/* Search Bar */}
        <SearchBar />

        {/* Department Chips */}
        <DepartmentChips />

        {/* Contact List */}
        <ContactList onRefresh={handleRefresh} />

        {/* Add Contact Bottom Sheet */}
        <AddContactSheet
          ref={bottomSheetRef}
          onSubmit={addContact}
          onClose={handleCloseSheet}
        />
      </ThemedView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  addButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
  },
});
