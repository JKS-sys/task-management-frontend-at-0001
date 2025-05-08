import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TaskState {
  searchQuery: string;
}

const initialState: TaskState = {
  searchQuery: "",
};

const TaskSlice = createSlice({
  name: "Tasks",
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
  },
});

export const { setSearchQuery } = TaskSlice.actions;
export default TaskSlice.reducer;
