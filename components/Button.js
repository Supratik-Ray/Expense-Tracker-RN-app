import { StyleSheet, Text, View, Pressable } from "react-native";
import Colors from "../constants/Colors";
import { useNavigation } from "@react-navigation/native";

export default function Button({ children, backgroundColor, textColor }) {
  const navigation = useNavigation();
  return (
    <View style={[styles.button, backgroundColor ? { backgroundColor } : {}]}>
      <Pressable
        style={styles.buttonInnerContainer}
        onPress={() => navigation.goBack()}
        android_ripple={{ color: "#ffffff22", foreground: true }}
      >
        <Text
          style={[styles.buttonText, textColor ? { color: textColor } : {}]}
        >
          {children}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.violet300,
  },
  buttonInnerContainer: {
    padding: 10,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
  },
});
