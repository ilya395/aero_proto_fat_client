import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import { setupStore } from "./store/root.reducer";

// ReactDOM.render(<App />, document.getElementById("root"));

// react 18
const container = document.getElementById("root")
const root = createRoot(container!);
const store = setupStore();
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);