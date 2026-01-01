import { StyleSheet, Text, View, FlatList } from "react-native";
import ExpenseItem from "./ExpenseItem";

export default function ExpenseList({ data }) {
  return (
    <View style={styles.listContainer}>
      <FlatList
        data={data}
        renderItem={(expenseData) => <ExpenseItem expense={expenseData.item} />}
        keyExtractor={(expense) => expense.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    marginBottom: 20,
  },
});
