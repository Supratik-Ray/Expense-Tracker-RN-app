import { StyleSheet, Text, View } from "react-native";
import Summary from "./Summary";
import ExpenseList from "./ExpenseList";
import { GlobalStyles } from "../../constants/styles";

export default function ExpensesOutput({ periodName, expenses }) {
  return (
    <View style={styles.container}>
      <Summary periodName={periodName} expenses={expenses} />
      <ExpenseList data={expenses} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.primary700,
    padding: 24,
  },
});
