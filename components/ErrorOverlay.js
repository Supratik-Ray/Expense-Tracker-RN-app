import { StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../constants/styles";

export default function ErrorOverlay({ errorMessage }) {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.title]}>Some error occured!</Text>
      <Text style={styles.text}>{errorMessage}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  text: {
    color: "white",
    marginVertical: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
