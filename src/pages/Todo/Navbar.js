import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../index";
import axios from "axios";

import { server } from "../../index";
import { useState } from "react";
function Navbar() {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const [isLoading, setIsLoading] = useState(false);
  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await axios.get(`${server}/users/logout`, {
        withCredentials: true,
      });
      setIsAuthenticated(false);
      window.showToast("success", "logout successfull");
      setIsLoading(false);
    } catch (error) {
      window.showToast("error", error.response.data.message);
      setIsLoading(false);
    }
  };

  return (
    <>
      <header>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <div className="container">
            <Link className="navbar-brand" to="/">
              MERN
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  {isAuthenticated ? (
                    <Link
                      aria-disabled={isLoading}
                      className="nav-link"
                      onClick={handleLogout}
                    >
                      Logout
                    </Link>
                  ) : (
                    <Link className="nav-link" to="/auth/login">
                      Login
                    </Link>
                  )}
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/profile">
                    Profile
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}

export default Navbar;
