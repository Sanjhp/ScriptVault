import Watchlist from "../model/Watchlist.js";

// Function to add a fund to the watchlist
export const addFundToWatchlist = async (req, res) => {
  try {
    const { user_id, symbol } = req.body;
    console.log(req.body);

    // Check if the symbol already exists for the user
    const existingItem = await Watchlist.findOne({ user_id, symbol });

    if (existingItem) {
      return res
        .status(400)
        .json({ error: "Symbol already exists in the watchlist" });
    }

    const newWatchlistItem = new Watchlist({
      user_id: user_id,
      symbol: symbol,
    });

    const savedWatchlistItem = await newWatchlistItem.save();

    res.status(201).json(savedWatchlistItem);
  } catch (error) {
    console.error("Error adding fund to watchlist:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Function to delete a fund from the watchlist by _id
export const deleteFundFromWatchlist = async (req, res) => {
  try {
    const { userId, symbol } = req.params;
    console.log("in wacthlist delete controller", req.params);

    const deletedWatchlistItem = await Watchlist.findOneAndDelete({
      user_id: userId,
      symbol: symbol,
    });

    if (!deletedWatchlistItem) {
      return res.status(404).json({ error: "Watchlist item not found" });
    }

    res.json(deletedWatchlistItem);
  } catch (error) {
    console.error("Error deleting fund from watchlist:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getWatchlistByUserId = async (req, res) => {
  try {
    const { userid } = req.params;
    console.log("in watchlist controller", req.params);
    const watchlistItems = await Watchlist.find({ user_id: userid });
    console.log(watchlistItems);

    if (watchlistItems.length === 0) {
      return res
        .status(404)
        .json({ error: "No watchlist items found for the specified userId" });
    }

    res.json(watchlistItems);
  } catch (error) {
    console.error("Error fetching watchlist by userId:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
