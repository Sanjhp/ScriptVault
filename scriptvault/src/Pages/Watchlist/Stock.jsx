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
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
    } catch (error) {
      console.error("Sell action failed", error);
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
