import React from 'react';
import { Routes, Route } from "react-router";

import { Footer } from "./Footer";
import { Main } from "./Main";
import { Menu } from "./Menu";
import { Link } from "./Link";
import { Home } from "./Home";

export const App = () => {
  return (
    <React.StrictMode>
      <Menu />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/novo" element={<Main />} />
        <Route path="/link/:hash" element={<Link />} />
      </Routes>
      <Footer />
    </React.StrictMode>
  )
}
