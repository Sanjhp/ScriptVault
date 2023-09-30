import React from "react";
import RemoveStockButton from "./RemoveStock";
import "./watchlist.css";

const Stock = ({ stock, onRemoveFromWatchlist }) => {
  const { id, name, symbol, price, prevPrice } = stock;

  const perform = calculatePerformance(price, prevPrice);
  const handleRemoveClick = () => {
    onRemoveFromWatchlist(id);
  };

  function calculatePerformance(currentPrice, prevPrice) {
    const percentageChange = ((currentPrice - prevPrice) / prevPrice) * 100;
    return percentageChange.toFixed(2);
  }

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
      <RemoveStockButton onClick={handleRemoveClick} />
    </div>
  );
};

export default Stock;
