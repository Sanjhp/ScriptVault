import React, { useEffect, useState } from "react";
import styles from "./Dashboard.module.css";
import { useLocation } from "react-router-dom";
import Stock from "../Watchlist/Stock";

function Dashboard() {
  const location = useLocation();
  const { stockDetails, stockDetailsList: initialStockDetailsList } =
    location.state ?? { stockDetails: null, stockDetailsList: [] };

  const [stockDetailsList, setStockDetailsList] = useState(
    initialStockDetailsList
  );
  const [token, setToken] = useState(null);
  const accessToken = localStorage.getItem("token");
  const [id, setId] = useState(null);

  // Retrieve the token from localStorage
  useEffect(() => {
    if (accessToken) {
      const parts = accessToken.split(".");
      const payload = JSON.parse(atob(parts[1]));
      const userId = payload._id;
      setId(userId);
      setToken(accessToken);
      console.log("User ID:", userId);
    } else {
      console.log("Token not found");
    }
  }, [accessToken]);

  const assetsUnderManagement = "$500,000";
  const costValue = "$450,000";
  const overallAppreciation = "$50,000";
  const todaysAppreciation = "$1,000";

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.netWorthPartitions}>
        <div className={styles.netWorthPartition}>
          <div className={styles.label}>Assets under Management</div>
          <div className={styles.value}>{assetsUnderManagement}</div>
        </div>
        <div className={styles.netWorthPartition}>
          <div className={styles.label}>Cost Value</div>
          <div className={styles.value}>{costValue}</div>
        </div>
        <div className={styles.netWorthPartition}>
          <div className={styles.label}>Overall Appreciation</div>
          <div className={styles.value}>{overallAppreciation}</div>
        </div>
        <div className={styles.netWorthPartition}>
          <div className={styles.label}>Today's Appreciation</div>
          <div className={styles.value}>{todaysAppreciation}</div>
        </div>
      </div>

      <Stock userId={id} />
    </div>
  );
}

export default Dashboard;
