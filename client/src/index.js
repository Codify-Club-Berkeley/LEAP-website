import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { createBrowserRouter, BrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
  },
]);

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);