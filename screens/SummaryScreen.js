import { StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../constants/styles";
import { PieChart } from "react-native-gifted-charts";
import { useContext } from "react";
import { ExpensesContext } from "../contexts/ExpensesContext";

export const CATEGORY_COLORS = {
  food: "#FF8A65", // warm coral – appetite & energy
  transport: "#4FC3F7", // sky blue – motion & travel
  shopping: "#BA68C8", // soft purple – lifestyle
  education: "#FFD54F", // warm yellow – growth & clarity
  entertainment: "#F06292", // playful pink – fun
  others: "#90A4AE", // neutral grey-blue – misc
};

export default function SummaryScreen() {
  const { expenses } = useContext(ExpensesContext);

  const frequency = expenses.reduce((acc, expense) => {
    if (acc[expense.category]) {
      acc[expense.category] = acc[expense.category] + 1;
    } else {
      acc[expense.category] = 1;
    }
    return acc;
  }, {});

  const total = Object.values(frequency).reduce((a, b) => a + b, 0);

  const pieData = Object.keys(frequency).map((category) => ({
    value: frequency[category],
    text: `${Math.round((frequency[category] / total) * 100)}%`,
    label: category.charAt(0).toUpperCase() + category.slice(1),
    color: CATEGORY_COLORS[category],
  }));

  return (
    <View style={styles.container}>
      <View style={styles.chartContainer}>
        <PieChart
          data={pieData}
          donut
          showText
          textColor="white"
          radius={140}
          innerRadius={70}
          focusOnPress
          sectionAutoFocus
        />
      </View>
      <View style={styles.legendContainer}>
        <View style={styles.legend}>
          {pieData.map((item) => (
            <View key={item.label} style={styles.legendRow}>
              <View
                style={[styles.colorBox, { backgroundColor: item.color }]}
              />
              <Text style={styles.legendText}>
                {item.label} – {item.value}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.primary700,
    padding: 24,
  },
  chartContainer: {
    alignItems: "center",
  },
  legendContainer: { alignItems: "center" },
  legend: {
    marginTop: 24,
  },
  legendRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  colorBox: {
    width: 12,
    height: 12,
    borderRadius: 3,
    marginRight: 10,
  },
  legendText: {
    color: "white",
    fontSize: 14,
  },
});
