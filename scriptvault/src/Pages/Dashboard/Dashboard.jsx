import React, { useEffect, useState } from "react";
import styles from "./Dashboard.module.css";
import { useLocation } from "react-router-dom";
import Stock from "../Watchlist/Stock";
import { FaHandHoldingUsd } from "react-icons/fa";

import axios from "axios";
function Dashboard() {
  const location = useLocation();
  const { stockDetails, stockDetailsList: initialStockDetailsList } =
    location.state ?? { stockDetails: null, stockDetailsList: [] };

  const [stockDetailsList, setStockDetailsList] = useState(
    initialStockDetailsList
  );
  const [token, setToken] = useState(null);
  const accessToken = localStorage.getItem("token");
  const [userId, setUserId] = useState(null);
  const [data, setData] = useState(null);
  // Retrieve the token from localStorage
  useEffect(() => {
    if (accessToken) {
      const parts = accessToken.split(".");
      const payload = JSON.parse(atob(parts[1]));
      const userId = payload._id;
      setUserId(userId);
      setToken(accessToken);
      console.log("User ID:", userId);
    } else {
      console.log("Token not found");
    }
  }, [accessToken]);
  const dummyStock = {
    id: 1,
    name: "Company A",
    sector: "logo",
    price: 100,
    prevPrice: 75,
  };

  const { id, name, symbol, price, prevPrice } = dummyStock;
  function calculatePerformance(currentPrice, prevPrice) {
    const percentageChange = ((currentPrice - prevPrice) / prevPrice) * 100;
    return percentageChange.toFixed(2);
  }
  const perform = calculatePerformance(price, prevPrice);
  const [isSelling, setIsSelling] = useState(false); // State to track the selling operation
  const [stockData, setStockData] = useState(null);
  console.log("stockData :>> ", stockData);
  const handleSellClick = async (investmentIdToDelete) => {
    try {
      if (data) {
        console.log("Deleting investment with ID:", investmentIdToDelete);
        await axios.delete(`/api/fund/investments/${investmentIdToDelete}`);

        setData((prevData) => ({
          ...prevData,
          investments: prevData.investments.filter(
            (investment) => investment._id !== investmentIdToDelete
          ),
        }));

        window.alert("Stock sold successfully!");
      } else {
        console.error("Error selling the fund: data is null");
      }
    } catch (error) {
      console.error("Error selling the fund:", error);
    }
  };

  const fetchData = async () => {
    try {
      console.log("fetch data user id ", userId);
      const res = await axios.get(`/api/fund/investments/${userId}`);
      console.log("res :>> ", res.data);
      setData(res?.data);
    } catch (error) {
      console.log("error :>> ", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [userId]);

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.netWorthPartitions}>
        <div className={styles.netWorthPartition}>
          <div className={styles.label}>Assets under Management</div>
          <div className={styles.value}>{data?.assets}</div>
        </div>
        <div className={styles.netWorthPartition}>
          <div className={styles.label}>Cost Value</div>
          <div className={styles.value}>{data?.cost_value}</div>
        </div>
        {/* <div className={styles.netWorthPartition}>
          <div className={styles.label}>Overall Appreciation</div>
          <div className={styles.value}>{overallAppreciation}</div>
        </div>
        <div className={styles.netWorthPartition}>
          <div className={styles.label}>Today's Appreciation</div>
          <div className={styles.value}>{todaysAppreciation}</div>
        </div> */}
      </div>

      {/* <Stock userId={id} /> */}
      <div className="stock">
        {data && data.investments ? (
          data.investments.map((investment) => (
            <div key={investment._id}>
              <p>
                <h1>{investment?.fund_name}</h1> ({investment?.sector})
              </p>
              <p>Current Price: ${investment?.cost}</p>
              {/* <p>
                Performance:
                <p
                  className={
                    perform > 0 ? "green-text" : perform < 0 ? "red-text" : ""
                  }
                >
                  {perform}%
                </p>
              </p> */}
              <button
                onClick={() => handleSellClick(investment._id)}
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
          ))
        ) : (
          <p>Loading stock data...</p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
