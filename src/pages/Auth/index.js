import React from "react";
import { Route, Routes } from "react-router-dom";

import Login from "./Login";
import Register from "./Register";
import Navbar from "../Todo/Navbar";
function index() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default index;
