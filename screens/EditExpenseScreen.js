import { Pressable, StyleSheet, Text, View } from "react-native";
import Button from "../components/Button";
import Ionicons from "@expo/vector-icons/Ionicons";

import { useContext, useLayoutEffect } from "react";
import { GlobalStyles } from "../constants/styles";
import { ExpensesContext } from "../contexts/ExpensesContext";

export default function EditExpenseScreen({ navigation, route }) {
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

  function confirmHandler() {
    if (isEditing) {
      updateExpense(editedExpenseId, {
        description: "test",
        amount: 19.5,
        date: new Date("2026-01-01"),
      });
    } else {
      addExpense({
        description: "test",
        amount: 19.5,
        date: new Date("2026-01-01"),
      });
    }
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttonsContainer}>
        <View style={styles.buttonContainer}>
          <Button mode={"flat"} onPress={cancelHandler}>
            Cancel
          </Button>
        </View>
        <View style={styles.buttonContainer}>
          <Button onPress={confirmHandler}>
            {isEditing ? "Update" : "Add"}
          </Button>
        </View>
      </View>
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
  buttonsContainer: {
    flexDirection: "row",
    gap: 20,
    width: "70%",
  },
  buttonContainer: { flex: 1 },
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
