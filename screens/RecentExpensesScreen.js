import ExpensesOutput from "../components/expensesOutput/ExpensesOutput";
import { useContext } from "react";
import { ExpensesContext } from "../contexts/ExpensesContext";
import { getDateMinusDays } from "../utility/date";

export default function RecentExpensesScreen() {
  const { expenses } = useContext(ExpensesContext);

  const today = new Date();
  const date7DaysAgo = getDateMinusDays(today, 7);
  const recentExpenses = expenses.filter(
    (expense) => expense.date >= date7DaysAgo && expense.date <= today
  );

  return (
    <ExpensesOutput
      periodName={"Last 7 Days"}
      expenses={recentExpenses}
      fallbackText={"No registered expenses available for last 7 days"}
    />
  );
}
