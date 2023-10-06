// routes.js

import express from "express";
const router = express.Router();
import {
  createInvestment,
  deleteInvestmentById,
} from "../controller/fundController.js";

router.post("/investments", createInvestment);
router.delete("/investments/:id", deleteInvestmentById);
router.get(
  "/investments/:user_id",
  investedFundsController.getAllInvestmentsByUserId
);

export default router;
