import express from "express";
import auth from "../middleware/auth.js";
import {
  GetUser,
  UpdateProfile,
  UserLogin,
  UserRegistration,
  forgotPassword,
  resetPassword,
} from "../controller/userController.js";
import {
  validateForgotPassword,
  validateLogin,
  validateProfile,
  validateRegister,
  validateResetPassword,
} from "../middleware/validate.js";

const router = express.Router();

router.post("/register", validateRegister, UserRegistration);

router.post("/login", validateLogin, UserLogin);

router.get("/get-user/:id", auth, GetUser);

router.put("/update-user/:id", auth, validateProfile, UpdateProfile);

router.post("/forgot-password", validateForgotPassword, forgotPassword);

router.post("/reset-password", validateResetPassword, resetPassword);


export default router;

