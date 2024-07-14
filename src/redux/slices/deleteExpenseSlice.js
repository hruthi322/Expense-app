import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// Action

export const deleteExpense = createAsyncThunk("deleteExpense", async (id) => {
  const response = await fetch(`https://expense-api-26nr.onrender.com/api/expenses/${id}`,{
    method:"DELETE"
  });
  return response.json();
});


const deleteExpenseSlice = createSlice({
  name: "deletedExpense",
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(deleteExpense.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(deleteExpense.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(deleteExpense.rejected, (state, action) => {
      console.log("Error", action.payload);
      state.isError = true;
    });
  },
});

export default deleteExpenseSlice.reducer;