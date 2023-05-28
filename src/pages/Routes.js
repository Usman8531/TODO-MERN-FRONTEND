import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// importing pages
import Todo from "./Todo";
import Auth from "./Auth";
import Profile from "./Profile";
// importing components
import Footer from "../components/Footer";
import NoPage from "./NoPage";

export default function Index() {
  return (
    <>
      <main>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Todo />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/auth/*" element={<Auth />} />
            <Route path="*" element={<NoPage />} />
            <Route />
          </Routes>
        </BrowserRouter>
      </main>
      <Footer />
    </>
  );
}
