import express from 'express';
import { Investment } from '../controller/investmentController.js';

const router= express.Router();

router.post('/list', Investment);

export default router;