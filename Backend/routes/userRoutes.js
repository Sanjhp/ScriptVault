import express from 'express';
import { UserLogin, UserRegistration } from '../controller/userController.js';
import { validateLogin, validateRegister } from '../middleware/validate.js';

const router= express.Router();

router.post('/register',validateRegister,UserRegistration);
router.post('/login',validateLogin, UserLogin);

export default router;