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
    handleSubmit,
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

  const [loading, setLoading] = useState(false);

  const handleLogin = async (data) => {
    try {
      setLoading(true);
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/users/login`,
        data
      );
      const token = res?.data?.token;
      localStorage.setItem("token", token);
      toast.success(res?.data?.message);
      navigate("/");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error?.response?.data?.message) {
        toast.error(error?.response?.data?.message);
      } else {
        toast.error("An error occured!");
      }
    }
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
            <form onSubmit={handleSubmit(handleLogin)}>
              <div className={inputContainer}>
                <label className={label} htmlFor="email">
                  E-mail
                </label>
                <input
                  className={input}
                  type="text"
                  id="email"
                  name="email"
                  {...register("email")}
                />
                {errors && errors.email && (
                  <p className={styles.errorMessage}>{errors.email.message}</p>
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
                  {...register("password")}
                />
                {errors && errors.password && (
                  <p className={styles.errorMessage}>
                    {errors.password.message}
                  </p>
                )}
              </div>

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
                <span>
                  <Link to="/signup">Back to Signup</Link>
                  <br />
                  <br />
                </span>

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
