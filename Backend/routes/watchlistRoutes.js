import express from "express";
import {
  addFundToWatchlist,
  getWatchlistByUserId,
  deleteFundFromWatchlist,
} from "../controller/watchlistController.js";

const router = express.Router();

router.post("/add", addFundToWatchlist);
router.get("/getlist/:userid", getWatchlistByUserId);
router.delete("/remove/:userId/:symbol", deleteFundFromWatchlist);

export default router;
