import { createSlice } from "@reduxjs/toolkit";

export const BookListSlice = createSlice({
  name: "booklist",
  initialState: {
    value: [
      {
        name: "Star Wars",
        price: 32.5,
        category: "Fiction",
        description: "Star wars is a famous movie",
      },
      {
        name: "Bill Gates and Microsoft",
        price: 199.5,
        category: "Documentary",
        description: "It's a famous book",
      },
    ],
  },
  reducers: {
    increment: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      //state.value += 1;
      //const myindex = parseInt(action.payload);
      //if(myindex >= 0) {
      //state.value.push(action.payload);
      //console.log("payload: " + JSON.stringify(action.payload));
      state.value = [...state.value, action.payload];
      //}
    },
    decrement: (state, action) => {
      const myindex = parseInt(action.payload);
      if (myindex >= 0) {
        state.value.splice(myindex, 1);
      }
    },
    update: (state, action) => {
      //console.log("42, payload: " + JSON.stringify(action.payload));
      const myindex = parseFloat(action.payload.bookindex);
      if (myindex >= 0) {
        state.value.splice(myindex, 1, action.payload.values);
      }
    },
  },
});

export const { increment, decrement, update } = BookListSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectBookList = (state) => state.booklist.value;

export default BookListSlice.reducer;
