import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignupPage from "./Pages/Signup/SignUp";
import SigninPage from "./Pages/Signin/LoginPage";
import Home from "./Pages/Home/home";
import UpdateUser from "./Pages/UpdateUser/UpdateUser";
import ForgetPassword from "./Pages/ForgetPassword/ForgetPassword";
import ResetPassword from "./Pages/ResetPassword/ResetPassword"
import Explore from './Pages/Explore/Explore';
import DetailsPage from './Pages/DetailsPage/DetailsPage'
function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/explore" element={<Explore />} />
        <Route exact path="/details-page" element={<DetailsPage />} />
        <Route exact path="/signup" element={<SignupPage />} />
        <Route exact path="/signin" element={<SigninPage />} />
        <Route exact path="/update-profile" element={<UpdateUser />} />
        <Route exact path="/forget-password" element={<ForgetPassword />} />
        <Route exact path="/reset-password" element={<ResetPassword />} />
        <Route exact path="/signup" element={<SignupPage />} />
        {/* <Route path="/signin" element={<SigninPage />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
