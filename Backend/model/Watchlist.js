import mongoose from "mongoose";

const watchlistSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserModel",
    required: true,
  },
  symbol: {
    type: String,
    required: true,
  },
  stockId: {
    type: String,
    required: true,
  },
});

const WatchlistModel = mongoose.model("watchlist", watchlistSchema);

export default WatchlistModel;
