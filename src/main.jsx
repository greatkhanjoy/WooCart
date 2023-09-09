import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Frontend from "./Frontend.jsx";
import "./index.css";

import { Provider } from "react-redux";
import store from "./app/store";

const root = document.getElementById("browter-woo-cart");
if (root) {
  const settingsData = document.getElementById("browter-woo-cart-data");
  const data = JSON.parse(settingsData.innerHTML);
  settingsData.remove();
  ReactDOM.createRoot(document.getElementById("browter-woo-cart")).render(
    <React.StrictMode>
      <Provider store={store}>
        <App data={data} />
      </Provider>
    </React.StrictMode>
  );
}

const root2 = document.getElementById("browter-woo-cart-frontend");

if (root2) {
  const settingsData = document.getElementById("browter-woo-cart-data-front");
  const data = JSON.parse(settingsData.innerHTML);
  settingsData.remove();
  ReactDOM.createRoot(
    document.getElementById("browter-woo-cart-frontend")
  ).render(
    <React.StrictMode>
      <Provider store={store}>
        <Frontend data={data} />
      </Provider>
    </React.StrictMode>
  );
}
