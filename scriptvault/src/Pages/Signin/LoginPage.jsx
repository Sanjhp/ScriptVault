// import React, { useState } from "react";
// import axios from "axios";
// import styles from "./Login.module.css";
// import { Link, useNavigate } from "react-router-dom"; // Import useHistory
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// function LoginPage() {
//   const navigate = useNavigate();
//   const validateSchema = yup.object().shape({
//     email: yup
//       .string()
//       .email("Invalid email format")
//       .required("Email is required"),
//     password: yup
//       .string()
//       .min(6, "Password must be at least 6 characters")
//       .required("Password is required"),
//   });
//   const {
//     register,
//     formState: { errors },
//   } = useForm({
//     resolver: yupResolver(validateSchema),
//   });
//   // Destructure styles
//   const {
//     background,
//     loginCard,
//     h2,
//     errorMessage,
//     signupLink,
//     forgotPasswordLink,
//     button,
//     inputContainer,
//     label,
//     input,
//     rememberMe,
//     rememberMeLabel,
//     rememberMeCheckbox,
//     loginOptions,
//   } = styles;

//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//     rememberMe: false,
//   });
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [forgotPasswordMode, setForgotPasswordMode] = useState(false);
//   // Track "Forgot Password" mode

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     const newValue = type === "checkbox" ? checked : value;

//     setFormData({
//       ...formData,
//       [name]: newValue,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       setLoading(true);
//       if (forgotPasswordMode) {
//         // Handle "Forgot Password" mode
//         const response = await axios.post(
//           `${process.env.REACT_APP_BASE_URL}/users/reset-password`,
//           { email: formData.email }
//         );
//         console.log("Reset email sent:", response.data);
//         // Handle reset email sent
//       } else {
//         // Handle regular login
//         const response = await axios.post(
//           `${process.env.REACT_APP_BASE_URL}/users/login`,
//           formData
//         );
//         if (response.status === 200 && response.data.token) {
//           // Store the token in local storage
//           localStorage.setItem("token", response.data.token);
//           console.log("Access token stored:", response.data.token);
//           console.log(response);
//           setLoading(false);
//           // Redirect to the home page or handle success
//           navigate("/");
//         } else {
//           // Handle login failures, show error messages, etc.
//           console.error("Login failed:", response.data.error);
//         }
//       }
//     } catch (error) {
//       setLoading(false);
//       console.error("Login error:", error);
//       if (error.response && error.response.status === 401) {
//         setError("Incorrect email or password.");
//       } else {
//         setError("Login failed. Please try again later.");
//       }
//     }
//   };

//   const toggleForgotPasswordMode = () => {
//     setForgotPasswordMode(!forgotPasswordMode);
//     setError(""); // Clear any previous errors
//   };

//   const handleBackToLogin = () => {
//     setForgotPasswordMode(false); // Turn off "Forgot Password" mode
//     setError(""); // Clear any previous errors
//   };

//   return (
//     <div>
//       <div className={background}></div>
//       <div className={loginCard}>
//         {/* <h2 className={h2}>
//           {forgotPasswordMode ? "Forgot Password" : "LOGIN"}
//         </h2> */}
//         {error && <p className={errorMessage}>{error}</p>}
//         <form onSubmit={handleSubmit}>
//           <div className={inputContainer}>
//             <label className={label} htmlFor="email">
//               E-mail
//             </label>
//             <input
//               className={input}
//               type="text"
//               id="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//             />
//             {errors && errors.email && (
//               <p className={styles.error}>{errors.email.message}</p>
//             )}
//           </div>
//           {/* {!forgotPasswordMode && ( */}
//           <div className={inputContainer}>
//             <label className={label} htmlFor="password">
//               Password
//             </label>
//             <input
//               className={input}
//               type="password"
//               id="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               required
//             />
//             {errors && errors.password && (
//               <p className={styles.error}>{errors.password.message}</p>
//             )}
//           </div>
//           {/* )} */}
//           {!forgotPasswordMode && (
//             <div className={rememberMe}>
//               <label className={rememberMeLabel}>
//                 <input
//                   className={rememberMeCheckbox}
//                   type="checkbox"
//                   name="rememberMe"
//                   checked={formData.rememberMe}
//                   onChange={handleChange}
//                 />
//                 Remember me
//               </label>
//             </div>
//           )}
//           <button className={button} type="submit">
//             Login
//             {/* {forgotPasswordMode ? "Send Reset Email" : "Login"} */}
//             {loading && <div class="loader"></div>}
//           </button>
//         </form>
//         <div className={loginOptions}>
//           <p>
//             {!forgotPasswordMode ? (
//               "Don't have an account? "
//             ) : (
//               <span>
//                 <Link className={signupLink} onClick={handleBackToLogin}>
//                   Back to Login
//                 </Link>
//                 <br />
//                 <br />
//               </span>
//             )}
//             <Link to="/signup" className={signupLink}>
//               Sign up
//             </Link>
//           </p>
//           {/* {!forgotPasswordMode && ( */}
//             <p>
//               <span
//                 className={forgotPasswordLink}
//                 onClick={()=>navigate("/forget-password")}
//               >
//                 Forgot Password
//               </span>
//             </p>
//           {/* )} */}
//         </div>
//       </div>
//       <ToastContainer />
//     </div>
//   );
// }

// export default LoginPage;

import React, { useState } from "react";
import axios from "axios";
import styles from "./Login.module.css";
import { Link, useNavigate } from "react-router-dom"; // Import useHistory
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
    setToken(null); // Clear the token in state
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
  // Destructure styles
  const {
    loginContainer,
    // background,
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
  // Track "Forgot Password" mode

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
        // Handle "Forgot Password" mode
        const response = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/users/reset-password`,
          { email: formData.email }
        );
        console.log("Reset email sent:", response.data);
        // Handle reset email sent
      } else {
        // Handle regular login
        const response = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/users/login`,
          formData
        );
        if (response.status === 200 && response.data.token) {
          // Store the token in local storage
          localStorage.setItem("token", response.data.token);

          console.log("Access token stored:", response.data.token);
          console.log(response);
          setLoading(false);
          // Redirect to the home page or handle success
          navigate("/");
        } else {
          // Handle login failures, show error messages, etc.
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
    setError(""); // Clear any previous errors
  };

  const handleBackToLogin = () => {
    setForgotPasswordMode(false); // Turn off "Forgot Password" mode
    setError(""); // Clear any previous errors
  };

  return (
    <div>
      {/* <div className={background}></div> */}
      <div className={loginContainer}>
        <div className={leftContainer}>
          <div className={leftContainerImg}>
            <img
              src="https://img.freepik.com/premium-vector/student-character-together-obtain-online-knowledge-people-tiny-classmate-work-with-laptop-flat-vecto_109722-3416.jpg?w=996"
              width="600"
            />
          </div>
          <div className={leftContainerContent}>
            <h2>Turn your ambition into a success story</h2>
            {/* <p>Choose from over 100,000 online video.</p> */}
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
            {/* <h2 className={h2}>
          {forgotPasswordMode ? "Forgot Password" : "LOGIN"}
        </h2> */}
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
              {/* {!forgotPasswordMode && ( */}
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
              {/* )} */}
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
              <button className={button} type="submit">
                Login
                {/* {forgotPasswordMode ? "Send Reset Email" : "Login"} */}
                {loading && <div class="loader"></div>}
              </button>
            </form>
            <div className={loginOptions}>
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
              {/* {!forgotPasswordMode && ( */}
              <p>
                <span
                  className={forgotPasswordLink}
                  onClick={() => navigate("/forget-password")}
                >
                  Forgot Password
                </span>
              </p>
              {/* )} */}
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
