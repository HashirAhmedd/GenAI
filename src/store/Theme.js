import { createSlice } from "@reduxjs/toolkit";

const ThemeSlice = createSlice({
  name: "theme",
  initialState: "light",
  reducers: {
    toggleTheme(state) {
      return state === "light" ? "dark" : "light";
    },
  },
});

export const ThemeActions = ThemeSlice.actions;
export default ThemeSlice;
