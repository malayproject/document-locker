import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers";
import logger from "redux-logger";
import { thunk } from "redux-thunk";

const store = createStore(rootReducer, applyMiddleware(thunk, logger));

console.log("global store", store.getState());

export default store;
