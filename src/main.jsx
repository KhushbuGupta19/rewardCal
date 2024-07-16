import "./index.css";

import App from "./App.jsx";
import ErrorBoundary from "./ErrorBoundary/ErrorBoundary.jsx";
import React from "react";
import ReactDOM from "react-dom/client";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);
