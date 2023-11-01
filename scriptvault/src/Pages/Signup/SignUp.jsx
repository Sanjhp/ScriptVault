import React, { useState } from "react";
import styles from "./SignUp.module.css";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function SignupPage() {
  const navigate = useNavigate();
  const validateSchema = yup.object().shape({
    name: yup
      .string()
      .min(3, "Name should be a minimum of 3 characters")
      .required("Name is required"),
    phone: yup
      .string()
      .matches(/^\d{10}$/, "Phone number is invalid.")
      .required("Phone number is required"),
    dob: yup
      .date()
      .max(new Date(), "Date of birth cannot be in the future")
      .required("Date of birth is required"),
    email: yup
      .string()
      .email("Invalid email address")
      .required("Email is required"),
    password: yup
      .string()
      .min(6, "Password should be a minimum of 6 characters")
      .required("Password is required"),
    PAN: yup
      .string()
      .matches(/^([A-Z]){5}([0-9]){4}([A-Z]){1}$/, "Invalid PAN number")
      .required("PAN number is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validateSchema),
  });
  const [loading, setLoading] = useState(false);

  const handleRegister = async (data) => {
    const formattedBirthDate = new Date(data.dob).toISOString().split("T")[0];
    const formattedData = { ...data, dob: formattedBirthDate };
    try {
      setLoading(true);
      await axios.post(
        `${process.env.REACT_APP_BASE_URL}/users/register`,
        formattedData
      );
      setLoading(false);
      toast.success("User registered successfully!!");
      navigate("/signin");
    } catch (error) {
      setLoading(false);
      console.log("error :>> ", error);
      if (error?.response?.data?.message) {
        toast.error(error?.response?.data?.message);
        console.log("err :>> ", error);
      } else {
        toast.error("An error occured!");
        console.log("err :>> ", error);
      }
    }
  };
  return (
    <div>
      <div className={styles.registerContainer}>
        <div className={styles.leftContainer}>
          <div className={styles.leftContainerImg}>
            <img
              src="https://img.freepik.com/premium-vector/student-character-together-obtain-online-knowledge-people-tiny-classmate-work-with-laptop-flat-vecto_109722-3416.jpg?w=996"
              width="600"
            />
          </div>
          <div className={styles.leftContainerContent}>
            <h2>Investing Made Simple, Profits Made Possible</h2>
          </div>
        </div>
        <div className={styles.rightContainer}>
          <div className={styles.rightContainerContent}>
            <h2>Hello ! Welcome.</h2>
            <p>Lets Get Started.</p>
          </div>
          <div className={styles.signupCard}>
            <form onSubmit={handleSubmit(handleRegister)}>
              {/* Name Input */}
              <div className={styles.inputContainer}>
                <label className={styles.label} htmlFor="name">
                  Name
                </label>
                <input
                  className={styles.input}
                  type="text"
                  id="name"
                  name="name"
                  {...register("name")}
                />
                {errors && errors?.name && (
                  <p className={styles.errorMessage}>{errors?.name?.message}</p>
                )}
              </div>

              {/* Email Input */}
              <div className={styles.inputContainer}>
                <label className={styles.label} htmlFor="email">
                  Email
                </label>
                <input
                  className={styles.input}
                  type="email"
                  id="email"
                  name="email"
                  {...register("email")}
                />
                {errors && errors?.email && (
                  <p className={styles.errorMessage}>
                    {errors?.email?.message}
                  </p>
                )}
              </div>

              {/* Phone Input */}
              <div className={styles.inputContainer}>
                <label className={styles.label} htmlFor="phone">
                  Phone
                </label>
                <input
                  className={styles.input}
                  type="tel"
                  id="phone"
                  name="phone"
                  {...register("phone")}
                />
                {errors && errors?.phone && (
                  <p className={styles.errorMessage}>
                    {errors?.phone?.message}
                  </p>
                )}
              </div>

              {/* PAN Input */}
              <div className={styles.inputContainer}>
                <label className={styles.label} htmlFor="PAN">
                  PAN
                </label>
                <input
                  className={styles.input}
                  type="text"
                  id="PAN"
                  name="PAN"
                  {...register("PAN")}
                  required
                />
                {errors && errors?.PAN && (
                  <p className={styles.errorMessage}>{errors?.PAN?.message}</p>
                )}
              </div>

              {/* Date of Birth Input */}
              <div className={styles.inputContainer}>
                <label className={styles.label} htmlFor="dob">
                  Date of Birth
                </label>
                <input
                  className={styles.input}
                  type="date"
                  id="dob"
                  name="dob"
                  {...register("dob")}
                />
                {errors && errors?.dob && (
                  <p className={styles.errorMessage}>{errors?.dob?.message}</p>
                )}
              </div>
              {/* Password Input */}
              <div className={styles.inputContainer}>
                <label className={styles.label} htmlFor="password">
                  Password
                </label>
                <input
                  className={styles.input}
                  type="password"
                  id="password"
                  name="password"
                  {...register("password")}
                />
                {errors && errors?.password && (
                  <p className={styles.errorMessage}>
                    {errors?.password.message}
                  </p>
                )}
              </div>
              {/* Error message */}
              {/* {error && <p className={styles.error}>{error}</p>} */}

              <button
                className={styles.button}
                type="submit"
                style={{ backgroundColor: "#6c63ff" }}
              >
                {loading && <div className="loader"></div>}
                Sign Up
              </button>
            </form>
          </div>

          <p className={styles.loginLinkp} style={{ color: "#000000" }}>
            Already have an account?{" "}
            <Link to="/signin" className={styles.loginLink}>
              Login
            </Link>
          </p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default SignupPage;
