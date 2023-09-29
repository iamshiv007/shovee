import { configureStore } from "@reduxjs/toolkit";
import Thunk from "redux-thunk";

import rootReducer from "./rootReducer"

export const store = configureStore({
    reducer: rootReducer,
    middleware: [Thunk],
});

export default store;
