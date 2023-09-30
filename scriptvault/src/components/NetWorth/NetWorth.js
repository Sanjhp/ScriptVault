import React from "react";
import styles from "./netWorth.module.css";

function NetWorth() {
  const assetsUnderManagement = "$500,000";
  const costValue = "$450,000";
  const overallAppreciation = "$50,000";
  const todaysAppreciation = "$1,000";

  return (
    <div className={styles.netWorthContainer}>
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
    </div>
  );
}

export default NetWorth;
