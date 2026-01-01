import { StyleSheet, Text, View } from "react-native";
import Button from "../components/Button";
import Ionicons from "@expo/vector-icons/Ionicons";
import Colors from "../constants/Colors";
import { useLayoutEffect } from "react";
import { GlobalStyles } from "../constants/styles";

export default function EditExpenseScreen({ navigation, route }) {
  const editedExpenseId = route.params?.expenseId;

  const isEditing = !!editedExpenseId;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.buttonsContainer}>
        <View style={styles.buttonContainer}>
          <Button backgroundColor={Colors.violet500} textColor={"#ccc"}>
            Cancel
          </Button>
        </View>
        <View style={styles.buttonContainer}>
          <Button>Update</Button>
        </View>
      </View>
      {isEditing && (
        <View style={styles.deleteButton}>
          <Ionicons
            name="trash"
            color={GlobalStyles.colors.error500}
            size={36}
          />
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
    borderTopWidth: 1,
    borderColor: "#fff",
    padding: 20,
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
    width: "100%",
  },
});
