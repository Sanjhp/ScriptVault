/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect } from "react";
import styles from "./UpdateUser.module.css";
import axios from "axios";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateUser = () => {
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
  });
  const navigate = useNavigate();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validateSchema),
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(null);
  const accessToken = localStorage.getItem("token");
  const [id, setId] = useState(null);

  // Retrieve the token from localStorage
  useEffect(() => {
    if (accessToken) {
      const parts = accessToken.split(".");
      const payload = JSON.parse(atob(parts[1]));
      const userId = payload._id;
      setId(userId);
      setToken(accessToken);
      console.log("User ID:", userId);
    } else {
      console.log("Token not found");
    }
  }, [accessToken]);

  const handleGetUser = async (e) => {
    // e.preventDefault();
    if (id) {
      try {
        setLoading(true);
        // let Token = localStorage.getItem("token");
        // setToken(Token);
        const url = `/api/users/get-user/${id}`;
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("response", response);

        const { name, email, phone, PAN, dob } = response?.data?.data;
        const formattedBirthDate = new Date(dob).toISOString().split("T")[0];

        setValue("name", name);
        setValue("email", email);
        setValue("phone", phone);
        setValue("PAN", PAN);
        setValue("dob", formattedBirthDate);
        setLoading(false);
      } catch (err) {
        if (err?.response?.data?.message === "unAuthorized") {
          localStorage.removeItem("token");

          navigate("/");
        } else if (err?.response?.data?.message) {
          console.log(err?.response?.data?.message[0]);
        } else {
          console.log("an error occured");
        }
      }
    }
  };

  useEffect(() => {
    handleGetUser();
  }, [id]);

  const handleProfileUpdate = async (value) => {
    console.log("value :>> ", value);
    try {
      setLoading(true);
      const updatedUserData = {
        name: value.name,
        phone: value.phone,
        dob: value.dob,
      };

      const response = await axios.put(
        `/api/users/update-user/${id}`,
        updatedUserData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("response :>> ", response);
      toast.success(response?.data?.message);
      handleGetUser();
      setLoading(false);
    } catch (err) {
      setLoading(false);
      if (err?.response?.data?.message === "unAuthorized") {
        localStorage.removeItem("token");
        navigate("/");
      } else if (err?.response?.data?.message) {
        toast.error(err?.response?.data?.message);
        console.log("err :>> ", err);
      } else {
        toast.error("An error occured!");
        console.log("err :>> ", err);
      }
    }
  };
  return (
    <>
      <div className={styles.container}>
        <div className={styles.signupCard}>
          <form onSubmit={handleSubmit(handleProfileUpdate)}>
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
              {errors && errors?.name ? (
                <p className={styles.errorMessage}>{errors?.name?.message}</p>
              ) : (
                ""
              )}
            </div>
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
                readOnly
              />
              {errors && errors.email && (
                <p className={styles.errorMessage}>{errors.email.message}</p>
              )}
            </div>
            {/* <p className="err-msg">{errors.name?.message}</p> */}
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
              {errors && errors.phone && (
                <p className={styles.errorMessage}>{errors.phone.message}</p>
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
                readOnly
              />
              {errors && errors.PAN && (
                <p className={styles.errorMessage}>{errors.PAN.message}</p>
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
              {errors && errors.dob && (
                <p className={styles.errorMessage}>{errors.dob.message}</p>
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
                readOnly
              />
              {errors && errors.password && (
                <p className={styles.errorMessage}>{errors.password.message}</p>
              )}
            </div>
            {/* Error message */}
            {error && <p className={styles.error}>{error}</p>}
            <button
              className={styles.button}
              type="submit"
              style={{ backgroundColor: "#6c63ff" }}
            >
              {loading && <div className="loader"></div>}
              Update
            </button>
          </form>
        </div>

        <div className={styles.imageContainer}>
          <img
            className={styles.image}
            src="https://i.ibb.co/GpPbfKC/istockphoto-1300004790-612x612.jpg"
          />
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default UpdateUser;
