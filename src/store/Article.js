import { createSlice } from "@reduxjs/toolkit";

const ArticleSlice = createSlice({
  name: "article",
  initialState: [],
  reducers: {
    AddArticle: (state, action) => {
       return  state = [...action.payload]
    },
    DeleteArticle: (state, action) => {
      console.log("Deleting Article");
    },
  },
});


export default ArticleSlice;
export const ArticleActions = ArticleSlice.actions;
