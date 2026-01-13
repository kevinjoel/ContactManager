import { ContactForm } from "@/components/contacts/contact-form";
import { useThemeColor } from "@/hooks/use-theme-color";
import type { ContactFormData } from "@/types/contact";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { forwardRef, useCallback } from "react";
import { StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface AddContactSheetProps {
  onSubmit: (data: ContactFormData) => void;
  onClose: () => void;
}

export const AddContactSheet = forwardRef<BottomSheet, AddContactSheetProps>(
  ({ onSubmit, onClose }, ref) => {
    const insets = useSafeAreaInsets();
    const backgroundColor = useThemeColor({}, "background");

    const renderBackdrop = useCallback(
      (props: any) => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
          opacity={0.5}
        />
      ),
      []
    );

    const handleSubmit = useCallback(
      (data: ContactFormData) => {
        onSubmit(data);
        onClose();
      },
      [onSubmit, onClose]
    );

    return (
      <BottomSheet
        ref={ref}
        index={-1}
        enablePanDownToClose
        enableDynamicSizing
        backdropComponent={renderBackdrop}
        backgroundStyle={{ backgroundColor }}
        handleIndicatorStyle={styles.handleIndicator}
      >
        <BottomSheetView
          style={[styles.sheetContent, { paddingBottom: insets.bottom }]}
        >
          <ContactForm onSubmit={handleSubmit} onCancel={onClose} />
        </BottomSheetView>
      </BottomSheet>
    );
  }
);

AddContactSheet.displayName = "AddContactSheet";

const styles = StyleSheet.create({
  sheetContent: {
    minHeight: 400,
  },
  handleIndicator: {
    backgroundColor: "#ccc",
    width: 40,
  },
});
