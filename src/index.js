import React from "react";
import ReactDOM from "react-dom";
//import registerServiceWorker from "./registerServiceWorker";
import { UserProvider } from "./contexts/UserContext";
import App from "./App";
import "./index.scss";

const rootEl = document.getElementById("root");

document.addEventListener("DOMContentLoaded", function() {
  if (rootEl !== null) {
    ReactDOM.render(
      <UserProvider>
        <App />
      </UserProvider>,
      rootEl
    );
  }
});

//registerServiceWorker();
