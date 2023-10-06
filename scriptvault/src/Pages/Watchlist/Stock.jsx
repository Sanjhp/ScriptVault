import React, { useState } from "react";
import "./watchlist.css";
import { FaHandHoldingUsd } from "react-icons/fa";

const Stock = () => {
  // Dummy data for a stock
  const dummyStock = {
    id: 1,
    name: "Company A",
    symbol: "logo",
    price: 100,
    prevPrice: 75,
  };

  const { id, name, symbol, price, prevPrice } = dummyStock;

  const perform = calculatePerformance(price, prevPrice);
  const [isSelling, setIsSelling] = useState(false); // State to track the selling operation

  function calculatePerformance(currentPrice, prevPrice) {
    const percentageChange = ((currentPrice - prevPrice) / prevPrice) * 100;
    return percentageChange.toFixed(2);
  }

  const handleSellClick = async () => {
    // Set isSelling to true to show a loading indicator
    setIsSelling(true);

    try {
      // Simulate a sell action with dummy data
      // In a real application, you would make an HTTP request to your backend here
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate a 2-second delay

      // Assume the sell action was successful
      // You can update the UI or take other actions here
      // For example, remove the stock from the watchlist
    } catch (error) {
      // Handle the case where the sell action fails (e.g., display an error message)
      console.error("Sell action failed", error);
    } finally {
      // Reset the isSelling state to false
      setIsSelling(false);
    }
  };

  return (
    <div className="stock">
      <p>
        <h1>{name}</h1> ({symbol})
      </p>
      <p>Current Price: ${price}</p>
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
