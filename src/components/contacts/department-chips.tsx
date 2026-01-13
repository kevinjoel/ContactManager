import { ThemedText } from "@/components/themed-text";
import { useThemeColor } from "@/hooks/use-theme-color";
import { filters$, setDepartmentFilter } from "@/store/contacts";
import { DEPARTMENTS, type Department } from "@/types/contact";
import { useSelector } from "@legendapp/state/react";
import { Pressable, ScrollView, StyleSheet } from "react-native";

const DEPARTMENT_COLORS: Record<string, string> = {
  Ventas: "#10B981",
  Desarrollo: "#3B82F6",
  Marketing: "#F59E0B",
  Soporte: "#8B5CF6",
};

export function DepartmentChips() {
  const selectedDepartment = useSelector(() => filters$.department.get());
  const tintColor = useThemeColor({}, "tint");
  const backgroundColor = useThemeColor(
    { light: "#f5f5f5", dark: "#2a2a2a" },
    "background"
  );
  const textColor = useThemeColor({}, "text");

  const handlePress = (dept: Department) => {
    if (selectedDepartment === dept) {
      setDepartmentFilter(null);
    } else {
      setDepartmentFilter(dept);
    }
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
      style={styles.scrollView}
    >
      {DEPARTMENTS.map((dept) => {
        const isSelected = selectedDepartment === dept;
        const color = DEPARTMENT_COLORS[dept] || tintColor;

        return (
          <Pressable
            key={dept}
            onPress={() => handlePress(dept)}
            style={[
              styles.chip,
              {
                backgroundColor: isSelected ? color : backgroundColor,
                borderColor: color,
                borderWidth: 1,
              },
            ]}
          >
            <ThemedText
              style={[
                styles.chipText,
                { color: isSelected ? "#fff" : textColor },
              ]}
            >
              {dept}
            </ThemedText>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 0,
  },
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignItems: "center",
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
  },
  chipText: {
    fontSize: 13,
    fontWeight: "500",
  },
});
