import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// Action
export const fetchExpenses = createAsyncThunk("fetchExpenses", async () => {
  const response = await fetch(`https://expense-api-26nr.onrender.com/api/expenses`);
  return response.json();
});

const expenseSlice = createSlice({
  name: "expenseList",
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchExpenses.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchExpenses.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = [...action.payload];
    });
    builder.addCase(fetchExpenses.rejected, (state, action) => {
      console.log("Error", action.payload);
      state.isError = true;
    });
  },
});

export default expenseSlice.reducer;