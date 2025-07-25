import React from 'react';
import { Routes, Route } from "react-router";

import { Footer } from "./Footer";
import { Main } from "./Main";
import { Menu } from "./Menu";
import { Link } from "./Link";
import { Home } from "./Home";
import { Login } from "./Login";
import { Register } from "./Register";

export const App = () => {
  return (
    <React.StrictMode>
      <Menu />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard/novo" element={<Main />} />
        <Route path="/link/:hash" element={<Link />} />
      </Routes>
      <Footer />
    </React.StrictMode>
  )
}
