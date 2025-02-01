import { configureStore } from "@reduxjs/toolkit";
import ArticleSlice from "./Article";
import ThemeSlice from "./Theme";



const Store = configureStore({ reducer:{
    article : ArticleSlice.reducer,
    theme : ThemeSlice.reducer,
}})

export default Store;
