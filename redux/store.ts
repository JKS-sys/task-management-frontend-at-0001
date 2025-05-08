import { configureStore } from "@reduxjs/toolkit";
import TaskReducer from "./feature/searchSlice";

export const store = configureStore({
  reducer: {
    Tasks: TaskReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
