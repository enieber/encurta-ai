import React, { useState, useEffect } from 'react';
import { Routes, Route } from "react-router";

import { Footer } from "./Footer";
import { Main } from "./Main";
import { Menu } from "./Menu";
import { Link } from "./Link";
import { Home } from "./Home";
import { Login } from "./Login";
import { Register } from "./Register";

async function verifyAuth() {
  return await fetch("/api/auth/current");
}

export const App = () => {
  const [isAuthed, setAuthed] = useState(false);

  useEffect(() => {
    verifyAuth()
      .then(res => {
        if (res.status == 200) {
          setAuthed(true)
        } else {
          setAuthed(false)
        }
      })
      .catch(err => {
        
        console.warn(err)
        setAuthed(false)
      })
  }, [])


  if (isAuthed) {  
    return (
      <React.StrictMode>
          <Menu isAuthed />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard/novo" element={<Main />} />
          <Route path="/link/:hash" element={<Link />} />
        </Routes>
        <Footer />
      </React.StrictMode>
    )
  }
  
  return (
    <React.StrictMode>
      <Menu isAuthed={false}/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/link/:hash" element={<Link />} />
      </Routes>
      <Footer />
    </React.StrictMode>
  )
}
