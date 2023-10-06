/* eslint-disable jsx-a11y/img-redundant-alt */
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as yup from "yup";
import styles from "./ForgetPassword.module.css";

const ForgetPassword = () => {
  const validateSchema = yup.object().shape({
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
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

  const handleForgetPassword = async (value) => {
    setLoading(true);
    try {
      const res = await axios.post("/api/users/forgot-password", value);
      console.log("res.data.message :>> ", res.data.message);
      toast.success(res?.data?.message);
      setLoading(false);
      console.log("res :>> ", res);
    } catch (error) {
      setLoading(false);
      if (error) {
        toast.error(error?.res?.data?.message || "");
      } else {
        toast.error("An error occured");
      }
      console.log("error :>> ", error);
    }
  };

  return (
    <div>
      <div className={styles.loginContainer}>
        <div className={styles.leftContainer}>
          <div className={styles.leftContainerImg}>
            <img
              src="https://img.freepik.com/premium-vector/student-character-together-obtain-online-knowledge-people-tiny-classmate-work-with-laptop-flat-vecto_109722-3416.jpg?w=996"
              width="600"
              alt="Login Page Image"
            />
          </div>
        </div>
        <div className={styles.rightContainer}>
          <div className={styles.rightContainerContent}>
            <h2>Hello! </h2>
            <p>Enter your Email that you entered during your registration.</p>
          </div>
          <div className={styles.loginCard}>
            {error && <p className={styles.errorMessage}>{error}</p>}
            <form onSubmit={handleSubmit(handleForgetPassword)}>
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
                  <p className={styles.errorMessage}>{errors.email.message}</p>
                )}
              </div>
              <button className={styles.button} type="submit">
                {loading && <div className="loader"></div>}
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ForgetPassword;
