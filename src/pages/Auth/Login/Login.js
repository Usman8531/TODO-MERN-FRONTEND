import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";

import axios from "axios";
import { Context, server } from "../../../index";
import { useContext } from "react";

const initialState = {
  email: "",
  password: "",
};

const Login = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const [formData, setFormData] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    const { email, password } = formData;
    setIsLoading(true);
    setIsLoading(true);
    // console.log(formData);
    try {
      const { data } = await axios.post(
        `${server}/users/login`,
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      setIsLoading(false);
      setIsAuthenticated(true);
      setFormData(initialState);
      window.showToast("success", data.message);
    } catch (error) {
      setIsLoading(false);
      window.showToast("error", error.response.data.message);
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }
  return (
    <div className="container">
      <div
        className="row justify-content-center d-flex align-items-center mt-5"
        style={{ minHeight: "80vh" }}
      >
        <div className="col-lg-4 col-md-6 card shadow border-0 px-4">
          <h3 className="text-center py-5">Login</h3>
          <form onSubmit={handleSubmit} className="px-3 py-4">
            <div className="mb-3">
              <label htmlFor="emailLogin" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="emailLogin"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                name="email"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="passwordLogin" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="passwordLogin"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                name="password"
              />
            </div>
            <div className="row">
              <div className="col-4">
                <button
                  type="submit"
                  className={`btn btn-primary ${isLoading ? "disabled" : ""}`}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div
                      className="spinner-grow spinner-grow-sm text-danger"
                      role="status"
                    >
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  ) : (
                    "Login"
                  )}
                </button>
              </div>
              <div className="col-8">
                <Link
                  to={"/auth/register"}
                  className="text-decoration-none text-center"
                >
                  Don't have account
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
