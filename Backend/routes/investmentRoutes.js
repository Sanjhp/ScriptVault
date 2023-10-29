import express from "express";
import {
  createInvestment,
  getAllInvestments,
  getSingleInvestment,
} from "../controller/investmentController.js";

const router = express.Router();

router.post("/create-investment", createInvestment);
router.get("/get-investments", getAllInvestments);
router.get("/:id", getSingleInvestment);

export default router;
