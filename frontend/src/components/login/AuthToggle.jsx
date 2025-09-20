import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function AuthToggle() {
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL; // Vite env
const { login } = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
    terms: false,
  });
  const [errors, setErrors] = useState({});

  const handleToggle = (toLogin) => {
    setIsLogin(toLogin);
    setErrors({});
  };

  // ---------------- Input change handlers ----------------
  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleRegisterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setRegisterData({
      ...registerData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // ---------------- Login submit ----------------
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    try {
      const res = await axios.post(`${API_URL}auth/login/`, loginData);
      localStorage.setItem("access", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);
      login({ username: loginData.username }, res.data);
      toast.success("Login successful!");
      navigate("/"); // redirect to homepage
    } catch (err) {
      if (err.response && err.response.data) {
        const backendErrors = {};
        for (const key in err.response.data) {
          if (Array.isArray(err.response.data[key])) {
            backendErrors[key] = err.response.data[key].join(" ");
          } else {
            backendErrors[key] = err.response.data[key];
          }
        }
        setErrors(backendErrors);
        toast.error("Login failed.");
      } else {
        toast.error("Login failed. Check credentials.");
      }
    }
  };

  // ---------------- Register submit ----------------
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    // Frontend validations
    const fieldErrors = {};
    if (!registerData.username) fieldErrors.username = "Username is required";
    if (!registerData.email) fieldErrors.email = "Email is required";
    if (registerData.password.length < 6)
      fieldErrors.password = "Password must be at least 6 characters";
    if (registerData.password !== registerData.password2)
      fieldErrors.password2 = "Passwords do not match";
    if (!registerData.terms) fieldErrors.terms = "You must agree to the terms";

    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }

    try {
      await axios.post(`${API_URL}auth/register/`, registerData);
      toast.success("Registration successful! Redirecting to homepage...");
      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      if (err.response && err.response.data) {
        const backendErrors = {};
        for (const key in err.response.data) {
          if (Array.isArray(err.response.data[key])) {
            backendErrors[key] = err.response.data[key].join(" ");
          } else {
            backendErrors[key] = err.response.data[key];
          }
        }
        setErrors(backendErrors);
        toast.error("Registration failed.");
      } else {
        toast.error("Registration failed.");
      }
    }
  };

  // ---------------- JSX ----------------
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <Toaster position="top-right" />
      {/* Toggle buttons */}
      <div className="flex mb-4">
        <button
          onClick={() => handleToggle(true)}
          className={`flex-1 py-2 rounded-t ${
            isLogin ? "bg-slate-700 text-white" : "bg-gray-200"
          }`}
        >
          Login
        </button>
        <button
          onClick={() => handleToggle(false)}
          className={`flex-1 py-2 rounded-t ${
            !isLogin ? "bg-slate-700 text-white" : "bg-gray-200"
          }`}
        >
          Register
        </button>
      </div>

      {/* Login Form */}
      {isLogin ? (
        <form onSubmit={handleLoginSubmit}>
          <label className="block mb-1">Username</label>
          <input
            type="text"
            name="username"
            autoComplete="username"
            value={loginData.username}
            onChange={handleLoginChange}
            className="w-full mb-1 p-2 border rounded"
          />
          {errors.username && <p className="text-red-500">{errors.username}</p>}

          <label className="block mb-1">Password</label>
          <input
            type="password"
            name="password"
            autoComplete="current-password"
            value={loginData.password}
            onChange={handleLoginChange}
            className="w-full mb-1 p-2 border rounded"
          />
          {errors.password && <p className="text-red-500">{errors.password}</p>}

          <button
            type="submit"
            className="w-full bg-gray-800 text-white p-2 rounded mt-2"
          >
            Login
          </button>

          <p className="mt-3 text-sm">
            Don't have an account?{" "}
            <span
              className="text-blue-500 cursor-pointer"
              onClick={() => handleToggle(false)}
            >
              Register first
            </span>
          </p>
        </form>
      ) : (
        // Register Form
        <form onSubmit={handleRegisterSubmit}>
          <label className="block mb-1">Username</label>
          <input
            type="text"
            name="username"
            autoComplete="username"
            value={registerData.username}
            onChange={handleRegisterChange}
            className="w-full mb-1 p-2 border rounded"
          />
          {errors.username && <p className="text-red-500">{errors.username}</p>}

          <label className="block mb-1">Email</label>
          <input
            type="email"
            name="email"
            autoComplete="email"
            value={registerData.email}
            onChange={handleRegisterChange}
            className="w-full mb-1 p-2 border rounded"
          />
          {errors.email && <p className="text-red-500">{errors.email}</p>}

          <label className="block mb-1">Password</label>
          <input
            type="password"
            name="password"
            autoComplete="new-password"
            value={registerData.password}
            onChange={handleRegisterChange}
            className="w-full mb-1 p-2 border rounded"
          />
          {errors.password && <p className="text-red-500">{errors.password}</p>}

          <label className="block mb-1">Confirm Password</label>
          <input
            type="password"
            name="password2"
            autoComplete="new-password"
            value={registerData.password2}
            onChange={handleRegisterChange}
            className="w-full mb-1 p-2 border rounded"
          />
          {errors.password2 && <p className="text-red-500">{errors.password2}</p>}

          <label className="block mb-3">
            <input
              type="checkbox"
              name="terms"
              checked={registerData.terms}
              onChange={handleRegisterChange}
              className="mr-2"
            />
            I have read and agreed to the terms
          </label>
          {errors.terms && <p className="text-red-500">{errors.terms}</p>}

          <button
            type="submit"
            className="w-full bg-gray-800 text-white p-2 rounded"
          >
            Register
          </button>

          <p className="mt-3 text-sm">
            Already have an account?{" "}
            <span
              className="text-blue-500 cursor-pointer"
              onClick={() => handleToggle(true)}
            >
              Login here
            </span>
          </p>
        </form>
      )}
    </div>
  );
}
