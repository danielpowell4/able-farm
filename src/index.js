import React from "react";
import ReactDOM from "react-dom";
//import registerServiceWorker from "./registerServiceWorker";
import { observe } from "./components/Game";
import Garden from "./components/Garden";

const rootEl = document.getElementById("root");

observe(knightPosition =>
  ReactDOM.render(<Garden knightPosition={knightPosition} />, rootEl)
);
//registerServiceWorker();
