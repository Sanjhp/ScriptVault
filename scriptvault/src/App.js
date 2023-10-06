import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignupPage from "./Pages/Signup/SignUp";
import SigninPage from "./Pages/Signin/LoginPage";
import Home from "./Pages/Home/home";
import UpdateUser from "./Pages/UpdateUser/UpdateUser";
import ForgetPassword from "./Pages/ForgetPassword/ForgetPassword";
import ResetPassword from "./Pages/ResetPassword/ResetPassword";
import Explore from "./Pages/Explore/Explore";
import DetailsPage from "./Pages/DetailsPage/DetailsPage";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Invest from "./Components/Invest/Invest";
import Watchlist from "./Pages/Watchlist/Watchlist";
import Header from "./Components/LoginNavbar";
// import Navbar from "./Pages/Home/sections/Navbar";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/explore" element={<Explore />} />
        <Route exact path="/details-page/:symbol" element={<DetailsPage />} />
        <Route exact path="/watchlist" element={<Watchlist />} />
        <Route exact path="/signup" element={<SignupPage />} />
        <Route exact path="/signin" element={<SigninPage />} />
        <Route exact path="/forget-password" element={<ForgetPassword />} />
        <Route exact path="/reset-password" element={<ResetPassword />} />
        <Route exact path="/update-profile" element={<UpdateUser />}/>
        <Route exact path="/dashboard" element={<Dashboard />}/>
        <Route exact path="/invest" element={<Invest />}/>
        {/* <Route path="/signin" element={<SigninPage />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
