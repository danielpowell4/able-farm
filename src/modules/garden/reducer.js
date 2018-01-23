import { combineReducers } from "redux";
import { MOVE_PLANT } from "./constants";

const initialState = {
  x: 4,
  y: 3,
};

const position = (state = initialState, { type, data }) => {
  switch (type) {
    case MOVE_PLANT:
      const { position: { x, y } } = data;
      return {
        ...state,
        x,
        y,
      };
    default:
      return state;
  }
};

export default combineReducers({ position });
