import UserModel from '../model/UserModel.js';
import bcrypt from 'bcryptjs';
import {StatusCodes} from "http-status-codes";
import { validationResult } from 'express-validator';
import errorHandler from '../middleware/validationErrorHandler.js';


function isValidPAN(PAN) {
    const regex = /^([A-Z]){5}([0-9]){4}([A-Z]){1}$/;
    return regex.test(PAN);
}

export const UserRegistration = async (req, res) => {
    try {
        const errors= validationResult(req);
        const errMessages= errorHandler(errors);
        if (errMessages && errMessages.length) {
            return res.status(400).json({
              success: false,
              errMessages,
            })
          }
   
        const { name, email, phone, dob, PAN, password } = req.body;

        const userExists = await UserModel.findOne({ email });
        if (userExists) {
            return res.status(409).json({ success: false, message: "Email already exists" });
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
            password: encryptPassword
        });
        await user.save()
       
        res.status(201).json({ success: true, message: "User registered successfully", user });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message,
        });
    }
}

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
            return res.status(404).json({ success: false, message: "User not found" });
        }

        if (user && (await bcrypt.compare(password, user.password))) {
            const token = await user.generateAuthToken()
            return res.status(200).json({ success: true, message: "User login successful!", user ,token});
        }
       
        return res.status(401).json({ success: false, message: "Invalid credentials! Please try again!" });

    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message,
        });
    }
}

