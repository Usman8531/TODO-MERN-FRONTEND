import axios from "axios";
import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Context, server } from "../../../index";
import { useContext } from "react";
const initialState = {
  name: "",
  email: "",
  password: "",
};

const Register = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // email validation
  const validateEmail = (email) => {
    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  //   strong password validation
  const validatePassword = (password) => {
    // Regular expressions for strong password validation
    const lengthRegex = /.{8,}/;
    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;
    const numberRegex = /[0-9]/;
    const specialCharRegex = /[!@#$%^&*()]/;

    return (
      lengthRegex.test(password) &&
      uppercaseRegex.test(password) &&
      lowercaseRegex.test(password) &&
      numberRegex.test(password) &&
      specialCharRegex.test(password)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = formData;

    if (!name || name.length < 3 || !email || !validateEmail(email)) {
      return window.showToast("error", "Please fill the inputs carefully");
    }
    if (!password || !validatePassword(password)) {
      return window.showToast("error", "Please Enter a Strong password");
    }
    // console.log(formData);
    try {
      setIsLoading(true);
      const { data } = await axios.post(
        `${server}/users/new`,
        {
          name,
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
      window.showToast("success", data.message);
      setIsAuthenticated(true);
      setFormData(initialState);
    } catch (error) {
      window.showToast("error", error.message);
      setIsAuthenticated(false);
      setIsLoading(false);
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
          <h3 className="text-center py-5">Register</h3>
          <form onSubmit={handleSubmit} className="px-3 py-4">
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                name="name"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="emailRegister" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="emailRegister"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                name="email"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="passwordRegister" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="passwordRegister"
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
                    "Register"
                  )}
                </button>
              </div>
              <div className="col-8">
                <p className="text-center mb-0">
                  <Link
                    to={"/auth/login"}
                    className="nav-link text-decoration-none ms-auto "
                  >
                    Already have a account
                  </Link>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
