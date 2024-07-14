import { configureStore } from "@reduxjs/toolkit";
import expenseSlice from "./slices/expenseSlice";
import createExpenseSlice from "./slices/createExpenseSlice";
import deleteExpenseSlice from "./slices/deleteExpenseSlice"
import userSlice from "./slices/userSlice";
export const store = configureStore({
  reducer: {
    expenses: expenseSlice,
    expense: createExpenseSlice,
    deletedExpense:deleteExpenseSlice,
    userData: userSlice
  },
});