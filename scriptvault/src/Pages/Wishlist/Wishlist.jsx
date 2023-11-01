import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Wishlist.module.css";
import axios from "axios";

const Wishlist = () => {
  const [fundIds, setFundIds] = useState([]); // Store fund or stock IDs received from the backend
  const [apiResponses, setApiResponses] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const accessToken = localStorage.getItem("token");

    if (accessToken) {
      const parts = accessToken.split(".");
      const payload = JSON.parse(atob(parts[1]));
      const userId = payload._id;
      console.log("User ID from localStorage:", userId);
      setUserId(userId);
      console.log("User ID state:", userId);
      console.log("Fetching fund IDs...");
      fetchFundIds(userId);
    } else {
      console.log("Token not found");
    }
  }, [userId]);

  const fetchFundIds = async (userId) => {
    try {
      console.log("User id in wishlist", userId);
      const response = await axios.get(`/api/watchlist/getlist/${userId}`);
      console.log(response.data);

      if (response.data) {
        setFundIds(response.data);
      }
    } catch (error) {
      console.error("Error fetching stock IDs:", error);
    }
  };

  const removeFromWishlist = async (stockId) => {
    try {
      const response = await axios.delete(
        `/api/watchlist/remove/${userId}/${stockId}`
      );
      if (response.status === 200) {
        console.log(`Removed ${stockId} from wishlist`);
        // Refresh the wishlist after removal
        fetchFundIds(userId);
        alert(`Removed ${stockId} from wishlist`);
      } else {
        alert("API calls limit reached, try again later.");
      }
    } catch (error) {
      alert("API calls limit reached, try again later.");
      console.error("Error removing item from wishlist:", error);
    }
  };

  useEffect(() => {
    const fetchData = async (stockId) => {
      try {
        console.log(stockId);
        const response = await axios.get(`/api/investment/${stockId}`);
        console.log("response from your backend", response?.data.investment);
        return response?.data.investment;
      } catch (error) {
        console.error("Error:", error);
        return null;
      }
    };

    const fetchAllData = async () => {
      const responses = await Promise.all(
        fundIds.map((fundId) => fetchData(fundId.stockId))
      );
      setApiResponses(responses?.filter((response) => response !== null));
    };

    fetchAllData();
  }, [fundIds]);

  return (
    <div className="flex flex-col w-full justify-center">
      <div className={styles.homeWrapper}>
        {apiResponses.length === 0 ? (
          <div className={styles.nothingToShow}>
            <p>Explore Stocks - Nothing to show here</p>
          </div>
        ) : (
          apiResponses.map((apiResponse, index) => (
            <div className={styles.card} key={index}>
              <div className={styles.cardStacked}>
                <div className={styles.cardContent}>
                  <h3 className={styles.stockName}>
                    {apiResponse?.name ? apiResponse?.name : "N/A"}
                  </h3>
                  <div className={styles.stockWrapper}>
                    <h2 className={styles.stockPrice}>
                      ₹ {apiResponse?.price ? apiResponse?.price : "N/A"}
                    </h2>
                    <h2 className={styles.percentChange}>
                      {apiResponse.changePercent
                        ? apiResponse.changePercent
                        : "N/A"}
                    </h2>
                  </div>
                </div>
                <div className={styles.boxWrapper}>
                  <div className={`${styles.cardContent} ${styles.cardAction}`}>
                    <div className={styles.dataHead}>
                      <div>
                        <h4>Open</h4>
                      </div>
                      <div>
                        <h4>High</h4>
                      </div>
                      <div>
                        <h4>Low</h4>
                      </div>
                    </div>
                    <div className={styles.dataDetails}>
                      <div>
                        <h4>{apiResponse?.open ? apiResponse?.open : "N/A"}</h4>
                      </div>
                      <div>
                        <h4>{apiResponse?.high ? apiResponse?.high : "N/A"}</h4>
                      </div>
                      <div>
                        <h4>{apiResponse?.low ? apiResponse?.low : "N/A"}</h4>
                      </div>
                    </div>
                  </div>
                  <div className={styles.cardAction}>
                    <div className={styles.linktoNext}>
                      <Link
                        to={`/details-page/${apiResponse?.symbol}/${apiResponse?._id}`}
                      >
                        Know more
                      </Link>
                      <button
                        className={styles.removeButton}
                        onClick={() => removeFromWishlist(fundIds.stockId)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Wishlist;
