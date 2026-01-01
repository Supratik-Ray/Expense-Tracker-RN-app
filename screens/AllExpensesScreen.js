import { StyleSheet, View, Pressable } from "react-native";
import { useLayoutEffect } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import ExpensesOutput from "../components/expensesOutput/ExpensesOutput";

export default function AllExpensesScreen({ navigation }) {
  const expenses = [
    {
      id: "E1",
      description: "A book",
      amount: 14.99,
      date: new Date("2025-12-25"),
    },
    {
      id: "E2",
      description: "Another book",
      amount: 20.65,
      date: new Date("2025-12-22"),
    },
    {
      id: "E3",
      description: "A book",
      amount: 5.99,
      date: new Date("2025-12-21"),
    },
    {
      id: "E4",
      description: "Another book",
      amount: 23.65,
      date: new Date("2025-12-05"),
    },
    {
      id: "E5",
      description: "Another book",
      amount: 23.65,
      date: new Date("2025-12-01"),
    },
  ];

  return <ExpensesOutput periodName={"Total"} expenses={expenses} />;
}
