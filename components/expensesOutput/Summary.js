import { StyleSheet, Text, View } from "react-native";

import { GlobalStyles } from "../../constants/styles";

export default function Summary({ periodName, expenses }) {
  const expensesSum = expenses.reduce((sum, expense) => {
    return sum + expense.amount;
  }, 0);

  return (
    <View style={styles.summary}>
      <Text style={styles.periodName}>{periodName}</Text>
      <Text style={styles.amount}>{expensesSum.toFixed(2)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  summary: {
    backgroundColor: GlobalStyles.colors.primary50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 8,
    borderRadius: 6,
    marginBottom: 10,
  },
  periodName: {
    color: GlobalStyles.colors.primary400,
  },
  amount: {
    color: GlobalStyles.colors.primary500,
    fontWeight: "bold",
    fontSize: 16,
  },
});
