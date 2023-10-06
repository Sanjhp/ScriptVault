// routes.js

import express from "express";
const router = express.Router();
import {
  createInvestment,
  deleteInvestmentById,
  getAllInvestmentsByUserId,
} from "../controller/fundController.js";

router.post("/investments", createInvestment);
router.delete("/investments/:id", deleteInvestmentById);
router.get("/investments/:user_id", getAllInvestmentsByUserId);

export default router;
