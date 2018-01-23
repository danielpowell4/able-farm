import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";
import garden from "../modules/garden/reducer";

const rootReducer = combineReducers({ garden });

export default createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunkMiddleware))
);
