import { configureStore } from "@reduxjs/toolkit";
import BooklistReducer from "../Components/WebContent/LandingPage/BookListSlice";

export default configureStore({
  reducer: {
    booklist: BooklistReducer,
  },
});
