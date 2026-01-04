import { Pressable, StyleSheet, Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

import { useContext, useLayoutEffect, useState } from "react";
import { GlobalStyles } from "../constants/styles";
import { ExpensesContext } from "../contexts/ExpensesContext";
import ExpenseForm from "../components/manageExpense/ExpenseForm";
import {
  deleteExpenseFirebase,
  storeExpense,
  updateExpensefirebase,
} from "../utility/http";
import LoadingOverlay from "../components/LoadingOverlay";

export default function ManageExpenseScreen({ navigation, route }) {
  const { addExpense, deleteExpense, updateExpense, expenses } =
    useContext(ExpensesContext);

  const [isLoading, setIsLoading] = useState(false);

  const editedExpenseId = route.params?.expenseId;

  const isEditing = !!editedExpenseId;

  const selectedExpense = expenses.find(
    (expense) => expense.id === editedExpenseId
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Manage Expense" : "Add Expense",
    });
  }, []);

  async function deleteHandler() {
    setIsLoading(true);
    await deleteExpenseFirebase(editedExpenseId);
    deleteExpense(editedExpenseId);
    navigation.goBack();
  }
  function cancelHandler() {
    navigation.goBack();
  }

  async function confirmHandler(expenseData) {
    setIsLoading(true);
    if (isEditing) {
      await updateExpensefirebase(editedExpenseId, expenseData);
      updateExpense(editedExpenseId, expenseData);
    } else {
      const id = await storeExpense(expenseData);
      addExpense({ ...expenseData, id });
    }
    navigation.goBack();
  }

  if (isLoading) return <LoadingOverlay />;

  return (
    <View style={styles.container}>
      <ExpenseForm
        onCancel={cancelHandler}
        onConfirm={confirmHandler}
        confirmButtonLabel={isEditing ? "Update" : "Add"}
        defaultValues={selectedExpense}
      />

      {isEditing && (
        <View style={styles.deleteButton}>
          <Pressable onPress={deleteHandler}>
            <Ionicons
              name="trash"
              color={GlobalStyles.colors.error500}
              size={36}
            />
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 25,
    alignItems: "center",
    flex: 1,
    backgroundColor: GlobalStyles.colors.primary700,
  },

  deleteButton: {
    borderTopWidth: 2,
    borderColor: GlobalStyles.colors.primary200,
    padding: 20,
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
    width: "100%",
  },
});
