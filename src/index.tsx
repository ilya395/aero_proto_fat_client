import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

// ReactDOM.render(<App />, document.getElementById("root"));

// react 18
const container = document.getElementById("root")
const root = createRoot(container!);
root.render(<App />);