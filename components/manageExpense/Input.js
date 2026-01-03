import { StyleSheet, Text, TextInput, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";

export default function Input({ label, style, textInputConfig }) {
  return (
    <View style={[styles.InputContainer, style]}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        {...textInputConfig}
        style={[
          styles.input,
          textInputConfig?.multiline && styles.multilineInput,
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  InputContainer: {
    marginVertical: 8,
  },
  label: {
    fontSize: 12,
    color: GlobalStyles.colors.primary100,
    marginBottom: 4,
  },
  input: {
    backgroundColor: GlobalStyles.colors.primary100,
    color: GlobalStyles.colors.primary700,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
  },
  multilineInput: {
    minHeight: 100,
    textAlignVertical: "top",
  },
});
