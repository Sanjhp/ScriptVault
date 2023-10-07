import React, { useState, useEffect } from "react";
import "./watchlist.css";
import { FaHandHoldingUsd } from "react-icons/fa";
import axios from "axios";

const Stock = ({ userId }) => {
  // Dummy data for a stock
  const dummyStock = {
    id: 1,
    name: "Company A",
    sector: "logo",
    price: 100,
    prevPrice: 75,
  };

  const { id, name, symbol, price, prevPrice } = dummyStock;

  const perform = calculatePerformance(price, prevPrice);
  const [isSelling, setIsSelling] = useState(false); // State to track the selling operation
  const [stockData, setStockData] = useState(null);

  useEffect(() => {
    // Fetch stock data from the backend using the user ID
    const fetchStockData = async () => {
      try {
        console.log(userId);
        const response = await axios.get(`/api/fund/investments/${userId}`);
        const data = response.data[0]; // Access the first element of the array
        setStockData(data); // Set the fetched data in the state
        console.log(data);
        console.log(stockData.fund_name);
      } catch (error) {
        console.error("Error fetching stock data:", error);
      }
    };

    fetchStockData();
  }, [userId]);

  function calculatePerformance(currentPrice, prevPrice) {
    const percentageChange = ((currentPrice - prevPrice) / prevPrice) * 100;
    return percentageChange.toFixed(2);
  }

  const handleSellClick = async () => {
    try {
      await axios.delete(`/api/fund/investments/${stockData._id}`);

      // Display an alert
      window.alert("Stock sold successfully!");

      // Fetch the updated data after selling the stock
      const response = await axios.get(`/api/fund/investments/${userId}`);
      const updatedData = response.data[0];
      setStockData(updatedData);
    } catch (error) {
      console.error("Error selling the fund:", error);
    }
  };

  return (
    <div className="stock">
      <p>
        <h1>{stockData.fund_name}</h1> ({stockData.sector})
      </p>
      <p>Current Price: ${stockData.cost}</p>
      <p>
        Performance:
        <p
          className={perform > 0 ? "green-text" : perform < 0 ? "red-text" : ""}
        >
          {perform}%
        </p>
      </p>
      <button
        onClick={handleSellClick}
        className="sell-button"
        disabled={isSelling}
      >
        {isSelling ? (
          "Selling..."
        ) : (
          <>
            <FaHandHoldingUsd /> Sell
          </>
        )}
      </button>
    </div>
  );
};

export default Stock;
