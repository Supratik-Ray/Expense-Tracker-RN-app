import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import Colors from "../../constants/Colors";
import { useNavigation } from "@react-navigation/native";
import { GlobalStyles } from "../../constants/styles";

export default function ExpenseItem({ expense }) {
  const navigation = useNavigation();
  function editExpense() {
    navigation.navigate("manageExpense", { expenseId: expense.id });
  }
  return (
    <View style={styles.expenseItem}>
      <Pressable
        onPress={editExpense}
        android_ripple={{ color: "#ffffff48", foreground: true }}
        style={({ pressed }) =>
          pressed && Platform.OS === "ios"
            ? [styles.innerContainer, styles.pressed]
            : styles.innerContainer
        }
      >
        <View style={styles.expenseInfo}>
          <Text style={[styles.expenseTitle, styles.textBase]}>
            {expense.description}
          </Text>
          <Text style={styles.textBase}>
            {expense.date.toLocaleDateString()}
          </Text>
        </View>
        <View style={styles.expenseValueContainer}>
          <Text style={styles.expenseValue}>{expense.amount.toFixed(2)}</Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  expenseItem: {
    backgroundColor: GlobalStyles.colors.primary500,
    marginBottom: 15,
    borderRadius: 8,
    overflow: "hidden",
    elevation: 3,
    shadowColor: GlobalStyles.colors.gray500,
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
  },
  innerContainer: {
    padding: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textBase: {
    color: GlobalStyles.colors.primary50,
  },
  expenseInfo: {
    gap: 3,
  },
  expenseTitle: {
    fontWeight: "bold",
    fontSize: 16,
  },
  expenseValueContainer: {
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    paddingVertical: 8,
    minWidth: 80,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
  },
  expenseValue: {
    color: GlobalStyles.colors.primary500,
    fontWeight: "bold",
  },
  pressed: {
    opacity: 0.7,
  },
});
