import { combineReducers } from "redux";

import byId from "./byId";
import allPlants from "./allPlants";

export default combineReducers({ byId, allPlants });
