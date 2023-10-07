import React, { useState } from "react";
import styles from "./ResetPassword.module.css";
import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ResetPassword = () => {
  const validateSchema = yup.object().shape({
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
    otp: yup.string().required("OTP is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validateSchema),
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async (value) => {
    console.log("value :>> ", value);
    setLoading(true);
    try {
      const res = await axios.post("/api/users/reset-password", value);
      setLoading(false);
      toast.success(res.data.message || "Successfully registered!!");
      console.log("res :>> ", res);
      navigate("/signin")
    } catch (err) {
      setLoading(false);
      if (err?.res?.data?.message) {
        console.log(err?.res?.data?.message)
        toast.error(err?.res?.data?.message);
      } else {
        toast.error("An error occured");
      }
      console.log("error :>> ", error);
    }
  };

  return (
    <div>
      <div className={styles.background}></div>
      <div className={styles.signupCard}>
        <form onSubmit={handleSubmit(handleResetPassword)}>
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
            {errors && errors.email && (
              <p className={styles.error}>{errors.email.message}</p>
            )}
          </div>

          <div className={styles.inputContainer}>
            <label className={styles.label} htmlFor="otp">
              OTP
            </label>
            <input
              className={styles.input}
              type="text"
              id="otp"
              name="otp"
              {...register("otp")}
            />
            {errors && errors.otp && (
              <p className={styles.error}>{errors.otp.message}</p>
            )}
          </div>

          <div className={styles.inputContainer}>
            <label className={styles.label} htmlFor="password">
              New Password
            </label>
            <input
              className={styles.input}
              type="password"
              id="password"
              name="password"
              {...register("password")}
            />
            {errors && errors.password && (
              <p className={styles.error}>{errors.password.message}</p>
            )}
          </div>

          {error && <p className={styles.error}>{error}</p>}

          <button className={styles.button} type="submit" disabled={loading}>
            {loading && <div className="loader"></div>}
            Reset Password
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ResetPassword;
