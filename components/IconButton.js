import { StyleSheet, View, Pressable } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function IconButton({ icon, color, size, onPress }) {
  return (
    <View style={styles.addButtonContainer}>
      <Pressable
        onPress={onPress}
        android_ripple={{ color: "#ffffff30", foreground: true }}
        style={({ pressed }) => (pressed ? styles.pressed : null)}
      >
        <Ionicons name={icon} color={color} size={size} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  addButtonContainer: {
    marginRight: 16,
  },
  pressed: {
    opacity: 0.75,
  },
});
