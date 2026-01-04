import { createContext, useReducer } from "react";

// const DUMMY_EXPENSES = [
//   {
//     id: "E1",
//     description: "A book",
//     amount: 14.99,
//     date: new Date("2025-12-29"),
//   },
//   {
//     id: "E2",
//     description: "Another book",
//     amount: 20.65,
//     date: new Date("2026-01-5"),
//   },
//   {
//     id: "E3",
//     description: "A book",
//     amount: 5.99,
//     date: new Date("2025-12-21"),
//   },
//   {
//     id: "E4",
//     description: "Another book",
//     amount: 23.65,
//     date: new Date("2025-12-05"),
//   },
//   {
//     id: "E5",
//     description: "Another book",
//     amount: 23.65,
//     date: new Date("2025-12-01"),
//   },
// ];

export const ExpensesContext = createContext({
  expenses: [],
  setExpenses: (expenses) => {},
  addExpense: ({ description, amount, date }) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
});

function expensesReducer(state, action) {
  switch (action.type) {
    case "SET":
      const reversed = action.payload.reverse();
      return reversed;
    case "ADD":
      return [{ ...action.payload }, ...state];
    case "DELETE":
      return state.filter((expense) => expense.id !== action.payload);
    case "UPDATE":
      return state.map((expense) =>
        expense.id === action.payload.id
          ? { ...action.payload.expenseData, id: action.payload.id }
          : expense
      );
    default:
      return state;
  }
}

export function ExpensesContextProvider({ children }) {
  const [expensesState, dispatch] = useReducer(expensesReducer, []);

  function addExpense(expenseData) {
    dispatch({ type: "ADD", payload: expenseData });
  }

  function deleteExpense(id) {
    dispatch({ type: "DELETE", payload: id });
  }

  function updateExpense(id, expenseData) {
    dispatch({ type: "UPDATE", payload: { id, expenseData } });
  }

  function setExpenses(expenses) {
    dispatch({ type: "SET", payload: expenses });
  }

  const value = {
    expenses: expensesState,
    addExpense,
    deleteExpense,
    updateExpense,
    setExpenses,
  };
  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}
