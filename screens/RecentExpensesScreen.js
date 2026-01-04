import ExpensesOutput from "../components/expensesOutput/ExpensesOutput";
import { useContext, useEffect, useState } from "react";
import { ExpensesContext } from "../contexts/ExpensesContext";
import { getDateMinusDays } from "../utility/date";
import { getExpenses } from "../utility/http";
import LoadingOverlay from "../components/LoadingOverlay";
import ErrorOverlay from "../components/ErrorOverlay";

export default function RecentExpensesScreen() {
  const { expenses, setExpenses } = useContext(ExpensesContext);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchExpenses() {
      try {
        const expenses = await getExpenses();
        setExpenses(expenses);
      } catch (err) {
        setError("Couldn't fetch expenses");
      } finally {
        setIsLoading(false);
      }
    }
    fetchExpenses();
  }, []);

  if (error) {
    return <ErrorOverlay errorMessage={error} />;
  }

  if (isLoading) {
    return <LoadingOverlay />;
  }

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
