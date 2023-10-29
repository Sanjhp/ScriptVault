// routes.js

import express from "express";
const router = express.Router();
import {
  createInvestment,
  deleteInvestmentById,
  getAllInvestmentsByUserId,
} from "../controller/fundController.js";

router.post("/investments", createInvestment);
router.delete("/investments/:_id", deleteInvestmentById);
router.get("/investments/:user", getAllInvestmentsByUserId);

export default router;
