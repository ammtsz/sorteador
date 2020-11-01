import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import StatusProvider from "./provider/status/status.provider";

ReactDOM.render(
  <React.StrictMode>
    <StatusProvider>
      <App />
    </StatusProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
