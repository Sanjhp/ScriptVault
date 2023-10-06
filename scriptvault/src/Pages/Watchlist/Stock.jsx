import React from "react";
import "./watchlist.css";
import { FaHandHoldingUsd } from "react-icons/fa";

const Stock = ({ stock, onRemoveFromWatchlist }) => {
  const { id, name, symbol, price, prevPrice } = stock;

  const perform = calculatePerformance(price, prevPrice);

  function calculatePerformance(currentPrice, prevPrice) {
    const percentageChange = ((currentPrice - prevPrice) / prevPrice) * 100;
    return percentageChange.toFixed(2);
  }

  const handleSellClick = () => {
    // Call the onRemoveFromWatchlist function with the stock's id to remove it
    onRemoveFromWatchlist(id);
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
      <button onClick={handleSellClick} className="sell-button">
        <FaHandHoldingUsd /> Sell
      </button>
    </div>
  );
};

export default Stock;
