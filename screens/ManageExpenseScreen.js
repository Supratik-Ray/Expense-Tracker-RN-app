import { Pressable, StyleSheet, Text, View } from "react-native";
import Button from "../components/Button";
import Ionicons from "@expo/vector-icons/Ionicons";

import { useContext, useLayoutEffect } from "react";
import { GlobalStyles } from "../constants/styles";
import { ExpensesContext } from "../contexts/ExpensesContext";
import ExpenseForm from "../components/manageExpense/ExpenseForm";

export default function ManageExpenseScreen({ navigation, route }) {
  const { addExpense, deleteExpense, updateExpense } =
    useContext(ExpensesContext);

  const editedExpenseId = route.params?.expenseId;

  const isEditing = !!editedExpenseId;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, []);

  function deleteHandler() {
    deleteExpense(editedExpenseId);
    navigation.goBack();
  }
  function cancelHandler() {
    navigation.goBack();
  }

  function confirmHandler(expenseData) {
    if (isEditing) {
      updateExpense(editedExpenseId, expenseData);
    } else {
      addExpense(expenseData);
    }
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        onCancel={cancelHandler}
        onConfirm={confirmHandler}
        confirmButtonLabel={isEditing ? "Update" : "Add"}
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
