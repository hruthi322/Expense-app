import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Action 


// const data = {
//   user: "ghruthik3@gmail.com",
//   amount : 350,
//   category : "work",
//   name : "burger"   
// }

export const createExpense  = createAsyncThunk("createExpense", async (data) => {
  console.log("form data",data);
  const response = await fetch(`https://expense-api-26nr.onrender.com/api/expense`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(data)
  });
  return response.json();
});


const createExpenseSlice = createSlice({
  name: "expense",
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(createExpense.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(createExpense.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(createExpense.rejected, (state, action) => {
      console.log("Error", action.payload);
      state.isError = true;
    });
  },
});

export default createExpenseSlice.reducer;