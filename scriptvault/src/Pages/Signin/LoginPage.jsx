import React, { useState } from "react";
import axios from "axios";
import styles from "./Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../../Components/LoginNavbar";

function LoginPage() {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("token"));
  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  const validateSchema = yup.object().shape({
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });
  const {
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validateSchema),
  });

  const {
    loginContainer,
    leftContainer,
    leftContainerImg,
    leftContainerContent,
    rightContainer,
    rightContainerContent,
    loginCard,
    h2,
    errorMessage,
    signupLink,
    forgotPasswordLink,
    button,
    inputContainer,
    label,
    input,
    rememberMe,
    rememberMeLabel,
    rememberMeCheckbox,
    loginOptions,
  } = styles;

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [forgotPasswordMode, setForgotPasswordMode] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (forgotPasswordMode) {
        const response = await axios.post("/api/users/reset-password", {
          email: formData.email,
        });
        console.log("Reset email sent:", response.data);
      } else {
        const response = await axios.post("/api/users/login", formData);
        if (response.status === 200 && response.data.token) {
          localStorage.setItem("token", response.data.token);
          console.log("Access token stored:", response.data.token);
          console.log(response);
          setLoading(false);

          navigate("/");
        } else {
          console.error("Login failed:", response.data.error);
        }
      }
    } catch (error) {
      setLoading(false);
      console.error("Login error:", error);
      if (error.response && error.response.status === 401) {
        setError("Incorrect email or password.");
      } else {
        setError("Login failed. Please try again later.");
      }
    }
  };

  const toggleForgotPasswordMode = () => {
    setForgotPasswordMode(!forgotPasswordMode);
    setError("");
  };

  const handleBackToLogin = () => {
    setForgotPasswordMode(false);
    setError("");
  };

  return (
    <div>
      <div className={loginContainer}>
        <div className={leftContainer}>
          <div className={leftContainerImg}>
            <img
              src="https://img.freepik.com/premium-vector/student-character-together-obtain-online-knowledge-people-tiny-classmate-work-with-laptop-flat-vecto_109722-3416.jpg?w=996"
              width="600"
            />
          </div>
          <div className={leftContainerContent}>
            <h2>Investing Made Simple, Profits Made Possible</h2>
          </div>
        </div>
        <div className={rightContainer}>
          <div className={rightContainerContent}>
            <h2>Hello ! Welcome back.</h2>
            <p>
              Log in with your data that you entered during Your registration.
            </p>
          </div>
          <div className={loginCard}>
            {error && <p className={errorMessage}>{error}</p>}
            <form onSubmit={handleSubmit}>
              <div className={inputContainer}>
                <label className={label} htmlFor="email">
                  E-mail
                </label>
                <input
                  className={input}
                  type="text"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                {errors && errors.email && (
                  <p className={styles.error}>{errors.email.message}</p>
                )}
              </div>
              <div className={inputContainer}>
                <label className={label} htmlFor="password">
                  Password
                </label>
                <input
                  className={input}
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                {errors && errors.password && (
                  <p className={styles.error}>{errors.password.message}</p>
                )}
              </div>
              {!forgotPasswordMode && (
                <div className={rememberMe}>
                  <label className={rememberMeLabel}>
                    <input
                      className={rememberMeCheckbox}
                      type="checkbox"
                      name="rememberMe"
                      checked={formData.rememberMe}
                      onChange={handleChange}
                    />
                    Remember me
                  </label>
                </div>
              )}
              <button
                className={button}
                type="submit"
                style={{ backgroundColor: "#6c63ff" }}
              >
                Login
                {loading && <div className="loader"></div>}
              </button>
            </form>
            <div className={loginOptions} style={{ color: "#000000" }}>
              <p>
                {!forgotPasswordMode ? (
                  "Don't have an account? "
                ) : (
                  <span>
                    <Link className={signupLink} onClick={handleBackToLogin}>
                      Back to Login
                    </Link>
                    <br />
                    <br />
                  </span>
                )}
                <Link to="/signup" className={signupLink}>
                  Sign up
                </Link>
              </p>
              <p>
                <span
                  className={forgotPasswordLink}
                  onClick={() => navigate("/forget-password")}
                >
                  Forgot Password
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
      {token && <Navbar token={token} onLogout={handleLogout()} />}
    </div>
  );
}

export default LoginPage;
