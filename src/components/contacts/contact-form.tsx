import { ThemedText } from "@/components/themed-text";
import { useThemeColor } from "@/hooks/use-theme-color";
import { DEPARTMENTS, type ContactFormData } from "@/types/contact";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import * as yup from "yup";

const schema = yup.object({
  name: yup.string().required("El nombre es obligatorio"),
  email: yup
    .string()
    .required("El email es obligatorio")
    .email("Ingresa un email valido"),
  phone: yup.string().default(""),
  department: yup
    .string()
    .required("El departamento es obligatorio")
    .oneOf(DEPARTMENTS, "Selecciona un departamento valido"),
});

interface ContactFormProps {
  onSubmit: (data: ContactFormData) => void;
  onCancel: () => void;
}

const DEPARTMENT_COLORS: Record<string, string> = {
  Ventas: "#10B981",
  Desarrollo: "#3B82F6",
  Marketing: "#F59E0B",
  Soporte: "#8B5CF6",
};

export function ContactForm({
  onSubmit,
  onCancel,
}: Readonly<ContactFormProps>) {
  const textColor = useThemeColor({}, "text");
  const iconColor = useThemeColor({}, "icon");
  const tintColor = useThemeColor({}, "tint");
  const backgroundColor = useThemeColor(
    { light: "#f5f5f5", dark: "#2a2a2a" },
    "background"
  );

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<ContactFormData>({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      department: undefined,
    },
  });

  const handleFormSubmit = (data: ContactFormData) => {
    onSubmit(data);
    reset();
  };

  return (
    <BottomSheetScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <ThemedText type="title" style={styles.title}>
        Nuevo Contacto
      </ThemedText>

      {/* Name Field */}
      <View style={styles.fieldContainer}>
        <ThemedText style={styles.label}>Nombre *</ThemedText>
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor,
                  color: textColor,
                  borderColor: errors.name ? "#EF4444" : backgroundColor,
                },
              ]}
              placeholder="Ej: Juan Perez"
              placeholderTextColor={iconColor}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              autoCapitalize="words"
            />
          )}
        />
        {errors.name && (
          <ThemedText style={styles.errorText}>
            {errors.name.message}
          </ThemedText>
        )}
      </View>

      {/* Email Field */}
      <View style={styles.fieldContainer}>
        <ThemedText style={styles.label}>Email *</ThemedText>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor,
                  color: textColor,
                  borderColor: errors.email ? "#EF4444" : backgroundColor,
                },
              ]}
              placeholder="Ej: juan@empresa.com"
              placeholderTextColor={iconColor}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              autoCapitalize="none"
              keyboardType="email-address"
              autoCorrect={false}
            />
          )}
        />
        {errors.email && (
          <ThemedText style={styles.errorText}>
            {errors.email.message}
          </ThemedText>
        )}
      </View>

      {/* Phone Field */}
      <View style={styles.fieldContainer}>
        <ThemedText style={styles.label}>Telefono</ThemedText>
        <Controller
          control={control}
          name="phone"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[styles.input, { backgroundColor, color: textColor }]}
              placeholder="Ej: +52 55 1234 5678"
              placeholderTextColor={iconColor}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              keyboardType="phone-pad"
            />
          )}
        />
      </View>

      {/* Department Field */}
      <View style={styles.fieldContainer}>
        <ThemedText style={styles.label}>Departamento *</ThemedText>
        <Controller
          control={control}
          name="department"
          render={({ field: { onChange, value } }) => (
            <View style={styles.departmentContainer}>
              {DEPARTMENTS.map((dept) => {
                const isSelected = value === dept;
                const color = DEPARTMENT_COLORS[dept] || tintColor;
                return (
                  <Pressable
                    key={dept}
                    onPress={() => onChange(dept)}
                    style={[
                      styles.departmentChip,
                      {
                        backgroundColor: isSelected ? color : backgroundColor,
                        borderColor: color,
                      },
                    ]}
                  >
                    <ThemedText
                      style={[
                        styles.departmentText,
                        { color: isSelected ? "#fff" : textColor },
                      ]}
                    >
                      {dept}
                    </ThemedText>
                  </Pressable>
                );
              })}
            </View>
          )}
        />
        {errors.department && (
          <ThemedText style={styles.errorText}>
            {errors.department.message}
          </ThemedText>
        )}
      </View>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <Pressable
          style={[styles.button, styles.cancelButton]}
          onPress={onCancel}
        >
          <ThemedText style={styles.cancelButtonText}>Cancelar</ThemedText>
        </Pressable>
        <Pressable
          style={[
            styles.button,
            styles.submitButton,
            { backgroundColor: isValid ? tintColor : "#9CA3AF" },
          ]}
          onPress={handleSubmit(handleFormSubmit)}
          disabled={!isValid}
        >
          <ThemedText style={styles.submitButtonText}>Guardar</ThemedText>
        </Pressable>
      </View>
    </BottomSheetScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    marginBottom: 24,
    textAlign: "center",
  },
  fieldContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
  },
  input: {
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
  },
  errorText: {
    color: "#EF4444",
    fontSize: 12,
    marginTop: 4,
  },
  departmentContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  departmentChip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
  },
  departmentText: {
    fontSize: 14,
    fontWeight: "500",
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 12,
    marginTop: 24,
    marginBottom: 40,
  },
  button: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#9CA3AF",
  },
  cancelButtonText: {
    fontWeight: "600",
  },
  submitButton: {},
  submitButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
});
