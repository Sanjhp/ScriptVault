import { check } from "express-validator";

export const validateRegister = [
    check("name")
        .notEmpty()
        .withMessage("Name is required!")
        .isString()
        .withMessage("Name must be a string")
        .isLength({ min: 3 })
        .withMessage("Name must contain at least 3 characters"),

    check("email")
        .notEmpty()
        .withMessage("Email is required!")
        .isEmail()
        .withMessage("Please enter a valid email")
        .normalizeEmail(),

    check("phone")
        .notEmpty()
        .withMessage("Phone number is required")
        .isNumeric()
        .withMessage("Phone number must be a number")
        .isLength({ min: 10, max: 10 })
        .withMessage("Phone number must be 10 digits"),

    check("dob")
        .notEmpty()
        .withMessage("Date of birth is required")
        .isDate()
        .withMessage("Please enter a valid date of birth")
        .custom((value) => {
            const birthDate = new Date(value);
            const currentDate = new Date();
      
            if (birthDate >= currentDate) {
              throw new Error("Date of birth must be in the past");
            }
            return true;
          }),

    check("PAN")
        .notEmpty()
        .withMessage("PAN is required")
        .isString()
        .withMessage("PAN must be a string")
        .isLength({ min: 10, max: 10 })
        .withMessage("PAN must be 10 characters long"),

    check("password")
        .notEmpty()
        .withMessage("Password is required")
        .isString()
        .withMessage("Password must be a string")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long"),
];

export const validateLogin=[
    check("email")
    .notEmpty()
    .withMessage("Email is required!")
    .isEmail()
    .withMessage("Please enter a valid email")
    .normalizeEmail(),

    check("password")
    .notEmpty()
    .withMessage("Password is required")
    .isString()
    .withMessage("Password must be a string")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
]

