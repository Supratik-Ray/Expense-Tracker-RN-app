import { StyleSheet, View, Pressable } from "react-native";
import { useContext, useLayoutEffect } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import ExpensesOutput from "../components/expensesOutput/ExpensesOutput";
import { ExpensesContext } from "../contexts/ExpensesContext";

export default function AllExpensesScreen({ navigation }) {
  const { expenses } = useContext(ExpensesContext);
  return (
    <ExpensesOutput
      periodName={"Total"}
      expenses={expenses}
      fallbackText={"No registered expense found!"}
    />
  );
}
