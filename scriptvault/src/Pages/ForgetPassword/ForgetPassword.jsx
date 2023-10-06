import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';import * as yup from "yup";
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
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/users/forgot-password`,
        value
      );
      console.log('res.data.message :>> ', res.data.message);
      toast.success(res?.data?.message);
      setLoading(false);
      console.log("res :>> ", res);
    } catch (error) {
      setLoading(false);
     if(error){
      toast.error(error?.res?.data?.message || "");
     }
     else{
      toast.error("An error occured");
     }
      console.log("error :>> ", error);
    }
  };

  return (
    <div>
      <div className={styles.background}></div>
      <div className={styles.signupCard}>
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

          {/* Error message */}
          {error && <p className={styles.error}>{error}</p>}

          <button className={styles.button} type="submit">
            {loading && <div className="loader"></div>}
            submit
          </button>
        </form>
      </div>
      <ToastContainer />

    </div>
  );
};

export default ForgetPassword;
