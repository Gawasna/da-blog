import { createSlice } from "@reduxjs/toolkit";

const courseSlice = createSlice({
  name: "courseSlice",
  initialState: {},
  reducers: {
    setCurrentCourse: (state, action) => {
      state.course = action.payload;
    },
  },
});
export const { setCurrentCourse } = courseSlice.actions;
export default courseSlice.reducer;
