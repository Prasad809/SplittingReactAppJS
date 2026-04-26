import { applyMiddleware, createStore } from "redux";
import rootReducers from "./Reducers";
import { thunk } from "redux-thunk";

export const Store = createStore(rootReducers,applyMiddleware(thunk))