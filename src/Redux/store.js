import { configureStore } from "@reduxjs/toolkit";
import todoSlice from "./todoSlice/todoSlice";

const store = configureStore({
  reducer: {
    todo: todoSlice,
  },
});

export default store;
