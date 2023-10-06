import React, { useState } from "react";
import Stock from "./Stock";
import "./watchlist.css";

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState([
    { id: 1, name: "Company A", symbol: "logo", price: 100, prevPrice: 75 },
    { id: 2, name: "Company B", symbol: "logo", price: 150, prevPrice: 250 },
    { id: 3, name: "Company C", symbol: "logo", price: 250, prevPrice: 200 },
    { id: 4, name: "Company D", symbol: "logo", price: 350, prevPrice: 351 },
    { id: 5, name: "Company E", symbol: "logo", price: 1050, prevPrice: 1000 },
    // Add more stocks to your watchlist as needed
  ]);

  return (
    <div className="watchlist">
      <div className="wl_heading">{/* <h2>My Watchlist</h2> */}</div>
      {watchlist.map((stock) => (
        <div key={stock.id} className="stock">
          <Stock stock={stock} />
        </div>
      ))}
    </div>
  );
};

export default Watchlist;
