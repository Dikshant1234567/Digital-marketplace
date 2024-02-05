"use client";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
// interface CounterState {
//   value: number;
// }

// // Define the initial state using that type
// const initialState: CounterState = {
//   value: 0,
// };

export const counterSlice = createSlice({
  initialState: 0,
  name: "counter",
  reducers: {
    increment: (state) => (state += 1),
    decrement: (state) => (state -= 1),
  },
});

export const { increment, decrement } = counterSlice.actions;

export default counterSlice.reducer;
