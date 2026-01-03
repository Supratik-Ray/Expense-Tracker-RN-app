import { StyleSheet, Text, View } from "react-native";
import Input from "./Input";
import Button from "../Button";
import { useState } from "react";

export default function ExpenseForm({
  onCancel,
  onConfirm,
  confirmButtonLabel,
}) {
  const [inputValues, setInputValues] = useState({
    amount: "",
    date: "",
    description: "",
  });
  function inputChangeHandler(inputIdentifier, inputValue) {
    setInputValues((inputValues) => ({
      ...inputValues,
      [inputIdentifier]: inputValue,
    }));
  }

  function handleSubmit() {
    const expenseData = {
      amount: +inputValues.amount,
      date: new Date(inputValues.date),
      description: inputValues.description,
    };

    onConfirm(expenseData);
  }
  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.rowInputsContainer}>
        <Input
          label={"Amount"}
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: inputChangeHandler.bind(this, "amount"),
            value: inputValues.amount,
          }}
          style={styles.rowInput}
        />
        <Input
          label={"Date"}
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: inputChangeHandler.bind(this, "date"),
          }}
          style={styles.rowInput}
        />
      </View>
      <Input
        label={"Description"}
        textInputConfig={{
          multiline: true,
          // autoCapitalize: "none",
          // autoCorrect: false, //default is true
          onChangeText: inputChangeHandler.bind(this, "description"),
        }}
      />
      <View style={styles.buttonsContainer}>
        <View style={styles.buttonContainer}>
          <Button mode={"flat"} onPress={onCancel}>
            Cancel
          </Button>
        </View>
        <View style={styles.buttonContainer}>
          <Button onPress={handleSubmit}>{confirmButtonLabel}</Button>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    width: "95%",
    marginBottom: 20,
    marginTop: 40,
  },
  title: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 24,
    textAlign: "center",
  },
  rowInputsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  rowInput: {
    flex: 1,
  },
  buttonsContainer: {
    flexDirection: "row",
    gap: 20,
    width: "70%",
  },
  buttonContainer: { flex: 1 },
});
