import { Alert, StyleSheet, Text, View } from "react-native";
import Input from "./Input";
import Button from "../Button";
import { useState } from "react";
import { formatDate } from "../../utility/date";
import { GlobalStyles } from "../../constants/styles";

export default function ExpenseForm({
  onCancel,
  onConfirm,
  confirmButtonLabel,
  defaultValues,
}) {
  const [inputs, setInputs] = useState({
    amount: {
      value: defaultValues ? defaultValues.amount.toString() : "",
      isValid: true,
    },
    date: {
      value: defaultValues ? formatDate(defaultValues.date) : "",
      isValid: true,
    },
    description: {
      value: defaultValues ? defaultValues.description : "",
      isValid: true,
    },
  });

  function inputChangeHandler(inputIdentifier, inputValue) {
    setInputs((inputs) => ({
      ...inputs,
      [inputIdentifier]: { value: inputValue, isValid: true },
    }));
  }

  function handleSubmit() {
    const expenseData = {
      amount: +inputs.amount.value,
      date: new Date(inputs.date.value),
      description: inputs.description.value,
    };

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== "Invalid Date";
    const descriptionIsValid = expenseData.description.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      // Alert.alert("Invalid Input", "Please check your input values");
      setInputs((currentInput) => ({
        amount: { value: currentInput.amount.value, isValid: amountIsValid },
        date: { value: currentInput.date.value, isValid: dateIsValid },
        description: {
          value: currentInput.description.value,
          isValid: descriptionIsValid,
        },
      }));
      return;
    }

    onConfirm(expenseData);
  }

  const formIsInvalid =
    !inputs.amount.isValid ||
    !inputs.date.isValid ||
    !inputs.description.isValid;

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.rowInputsContainer}>
        <Input
          label={"Amount"}
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: inputChangeHandler.bind(this, "amount"),
            value: inputs.amount.value,
          }}
          isInvalid={!inputs.amount.isValid}
          style={styles.rowInput}
        />
        <Input
          label={"Date"}
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: inputChangeHandler.bind(this, "date"),
            value: inputs.date.value,
          }}
          isInvalid={!inputs.date.isValid}
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
          value: inputs.description.value,
        }}
        isInvalid={!inputs.description.isValid}
      />
      {formIsInvalid && (
        <Text style={styles.errorText}>
          Invalid input values - please check your entered data!
        </Text>
      )}
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
    marginTop: 10,
  },
  buttonContainer: { flex: 1 },
  errorText: {
    textAlign: "center",
    color: GlobalStyles.colors.error500,
    margin: 8,
  },
});
