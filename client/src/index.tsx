import React from "react";
import ReactDOMClient from "react-dom/client";
import "./index.css";
import App from "./app/App";

const root = ReactDOMClient.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<App />);
