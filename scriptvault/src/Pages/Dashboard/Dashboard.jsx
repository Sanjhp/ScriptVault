import React, { useEffect, useState } from "react";
import styles from "./Dashboard.module.css";
import { useLocation } from "react-router-dom";
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
    } else {
      console.log("Token not found");
    }
  }, [accessToken]);

  const [isSelling, setIsSelling] = useState(false);

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

  const fetchCurrentStockPrices = async (investments) => {
    const updatedInvestments = await Promise.all(
      investments.map(async (investment) => {
        const symbol = investment.fund_id;
        const latestPrice = await fetchCurrentStockPrice(symbol);
        return {
          ...investment,
          currentPrice: latestPrice,
        };
      })
    );

    return updatedInvestments;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/fund/investments/${userId}`);
        const updatedInvestments = await fetchCurrentStockPrices(
          res?.data.investments
        );
        setData({ ...res.data, investments: updatedInvestments });
      } catch (error) {
        console.log("error :>> ", error);
      }
    };

    fetchData();
  }, [userId]);

  const fetchCurrentStockPrice = async (symbol) => {
    try {
      const apiKey = "C04721VTHLJFESKF"; // Replace with your Alpha Vantage API key
      const apiUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${apiKey}`;
      const response = await axios.get(apiUrl);
      const timeSeriesData = response.data["Time Series (5min)"];

      // Extract the most recent price
      const latestPrice = parseFloat(
        timeSeriesData[Object.keys(timeSeriesData)[0]]["1. open"]
      );

      return latestPrice;
    } catch (error) {
      console.error("Error fetching stock price for symbol", symbol, error);
      return null;
    }
  };

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
      </div>

      <div className="stock">
        {data && data.investments ? (
          data.investments.map((investment) => (
            <div key={investment._id}>
              <p>
                <h1>{investment?.fund_name}</h1> ({investment?.sector})
              </p>
              <p>Invested Price: ${investment?.cost}</p>
              <p>Current Price: ${investment?.currentPrice}</p>
              <p>
                Performance:
                <p
                  className={
                    investment?.currentPrice > investment?.cost
                      ? "green-text"
                      : investment?.currentPrice < investment?.cost
                      ? "red-text"
                      : ""
                  }
                >
                  {(
                    ((investment?.currentPrice - investment?.cost) /
                      investment?.cost) *
                    100
                  ).toFixed(2)}
                  %
                </p>
              </p>
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
