import ReactDOM from "react-dom/client";

import React from "react";
import "./index.css";
import App from "./App";
import CartProvider from "./store/CartContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <CartProvider>
      <App />
    </CartProvider>
  </React.StrictMode>
);
