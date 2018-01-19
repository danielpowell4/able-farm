import React from "react";
import ReactDOM from "react-dom";
//import registerServiceWorker from "./registerServiceWorker";
import { observe } from "./components/Game";
import Board from "./components/Board";

const rootEl = document.getElementById("root");

observe(knightPosition =>
  ReactDOM.render(<Board knightPosition={knightPosition} />, rootEl)
);
//registerServiceWorker();
