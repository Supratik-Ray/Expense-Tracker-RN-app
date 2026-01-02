import { StyleSheet, Text, View } from "react-native";
import Summary from "./Summary";
import ExpenseList from "./ExpenseList";
import { GlobalStyles } from "../../constants/styles";

export default function ExpensesOutput({ periodName, expenses, fallbackText }) {
  let content = <Text style={styles.fallback}>{fallbackText}</Text>;

  if (expenses.length > 0) {
    content = <ExpenseList data={expenses} />;
  }
  return (
    <View style={styles.container}>
      <Summary periodName={periodName} expenses={expenses} />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.primary700,
    padding: 24,
  },
  fallback: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    marginTop: 32,
  },
});
