import React from "react";
import ReactDOM from "react-dom";
//import registerServiceWorker from "./registerServiceWorker";
import { Provider } from "react-redux";
import App from "./App";
import gardenStore from "./stores/gardenStore";
import "./index.scss";

const rootEl = document.getElementById("root");

document.addEventListener("DOMContentLoaded", function() {
  if (rootEl !== null) {
    ReactDOM.render(
      <Provider store={gardenStore}>
        <App />
      </Provider>,
      rootEl
    );
  }
});

//registerServiceWorker();
