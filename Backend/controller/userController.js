import UserModel from "../model/UserModel.js";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";
import { validationResult } from "express-validator";
import errorHandler from "../middleware/validationErrorHandler.js";
import sendMail from "../utils/sendMail.js";

function isValidPAN(PAN) {
  const regex = /^([A-Z]){5}([0-9]){4}([A-Z]){1}$/;
  return regex.test(PAN);
}

export const UserRegistration = async (req, res) => {
  try {
    const errors = validationResult(req);
    const errMessages = errorHandler(errors);
    if (errMessages && errMessages.length) {
      return res.status(400).json({
        success: false,
        errMessages,
      });
    }

    const { name, email, phone, dob, PAN, password } = req.body;

    const userExists = await UserModel.findOne({ email });
    if (userExists) {
      return res
        .status(409)
        .json({ success: false, message: "Email already exists" });
    }

    if (!isValidPAN(PAN)) {
      return res.status(400).json({ success: false, message: "Invalid PAN" });
    }

    // Generate a salt and hash the password
    const salt = await bcrypt.genSalt(10);
    const encryptPassword = await bcrypt.hash(password, salt);

    const user = await UserModel.create({
      name,
      email: email.toLowerCase(),
      phone,
      dob,
      PAN,
      password: encryptPassword,
    });
    await user.save();

    res
      .status(201)
      .json({ success: true, message: "User registered successfully", user });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

export const UserLogin = async (req, res) => {
  try {
    const errors = validationResult(req);
    const errMessages = errorHandler(errors);

    if (errMessages && errMessages.length) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ success: false, message: errMessages });
    }
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = await user.generateAuthToken();
      return res.status(200).json({
        success: true,
        message: "User login successful!",
        user,
        token,
      });
    }

    return res.status(401).json({
      success: false,
      message: "Invalid credentials! Please try again!",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

//get user by id
export const GetUser = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ success: true, message: "User not found" });
    }
    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Fetched user successfully!",
      data: user,
    });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, error: error.message });
  }
};

export const UpdateProfile = async (req, res) => {
  try {
    const errors = validationResult(req);
    const errMessages = errorHandler(errors);

    if (errMessages && errMessages.length) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ success: false, message: errMessages });
    }

    const user = await UserModel.findById(req.user._id);

    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ success: false, message: "User not found!" });
    }
    
    const allowedUpdates = ["name", "phone", "dob", "password"]; // Define allowed updates here
    
    const isValidUpdates = Object.keys(req.body).every((update) => {
      return allowedUpdates.includes(update);
    });

    if (!isValidUpdates) {
      throw new Error("Not allowed to update");
    }
    
   
    Object.keys(req.body).forEach((update) => {
      if (update === "password") {
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(req.body[update], salt);
        user[update] = hashedPassword;
      } else {
        user[update] = req.body[update];
      }
    });
    await user.save();

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "User updated successfully!",
      data: user,
    });
  } catch (error) {
    console.log('error', error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: "Failed to update user!" });
  }
};



// Forget Password Api

export const forgotPassword = async (req, res) => {
  const errors = validationResult(req);
    const errMessages = errorHandler(errors);

    if (errMessages && errMessages.length) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ success: false, message: errMessages });
    }
  try {
    const email = req.body.email
    const user = await UserModel.findOne({ email })
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User does not exist',
      })
    }

    if (user) {
      const otp = Math.random().toString().substring(2, 8)
      const currentDate = new Date()
      const expire = currentDate.setMinutes(currentDate.getMinutes() + 5)

      user.otp = {
        value: otp,
        expire,
      }

      const mail = await sendMail({
        from: `"ScrictVault " <${process.env.SMTP_EMAIL}>`,
        to: email,
        subject: 'Forgot Password',
        text: `Your OTP is ${otp} valid for 5 minutes`,
        html: `<p>Your OTP <strong>${otp}</strong> valid for 5 minutes</p>`,
      })
      if (mail === 'success') {
        await user.save()
        return res.json({
          success: true,
           message: 'OTP sent!',
          email,
        })
      }
      if (mail === 'error') {
        throw new Error(
          'OTP not sent'
        )
      }
    }
  } catch (error) {
    console.log('Error while forgot-password : ', error)
    return res.status(400).json({
      success: false,
      message: error.message,
    })
  }
}

// Reset Password

export const resetPassword = async (req, res) => {
  try {
    const errors = validationResult(req);
    const errMessages = errorHandler(errors);

    if (errMessages && errMessages.length) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ success: false, message: errMessages });
    }

    const { email, otp, password } = req.body;
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ success: false, error: "User not found " });
    }
    if (user.otp.value !== otp) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ success: false, error: "" });
    }
    if (user.otp.expire < new Date()) {
      user.otp = undefined;
      await user.save();
      return res.status(StatusCodes.FORBIDDEN).json({
        success: false,
        error: "The temporary password (OTP) has expired or is invalid.",
      });
    }
    const newPasswordMatch = await bcrypt.compare(password, user.password);
    if (newPasswordMatch) {
      throw new Error(
        "The current password and the new password cannot be identical."
      );
    }

    const hashPassword = bcrypt.hashSync(password, 10);

    user.password = hashPassword;
    user.otp = undefined;
    await user.save();
    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Password has been changed successfully.",
    });
  } catch (error) {
    console.log(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "An error occurred while resetting the password",
      error: error.message,
    });
  }
};
