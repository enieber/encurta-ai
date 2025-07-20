import React from "react";
import ReactDOM from "react-dom/client";

import { Footer } from "./Footer";
import { Main } from "./Main";
import { Menu } from "./Menu";

import "./index.css";

const root = document.getElementById("root");

if (!root) {
  throw new Error("No root element found");
}

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <Menu />
    <Main />
    <Footer />
  </React.StrictMode>,
);
