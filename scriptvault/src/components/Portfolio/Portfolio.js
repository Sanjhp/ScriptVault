import React from "react";
import styles from "./portfolio.module.css";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";
Chart.register(ArcElement);

function Portfolio() {
  const dummyPortfolioData = [
    {
      id: 1,
      bankName: "Bank A",
      type: "Mutual Fund",
      name: "ABC Equity Fund",
      category: "Equity",
      investedAmount: 5000,
      costValue: 5000,
      currentValue: 5500,
      appreciation: 500,
    },
    {
      id: 2,
      bankName: "Bank B",
      type: "Stock",
      name: "XYZ Corporation",
      category: "Technology",
      investedAmount: 3000,
      costValue: 3000,
      currentValue: 3200,
      appreciation: 200,
    },
    {
      id: 3,
      bankName: "Bank A",
      type: "Mutual Fund",
      name: "DEF Bond Fund",
      category: "Bonds",
      investedAmount: 2000,
      costValue: 2000,
      currentValue: 2100,
      appreciation: 100,
    },
    {
      id: 4,
      bankName: "Bank B",
      type: "Stock",
      name: "LMN Pharmaceuticals",
      category: "Healthcare",
      investedAmount: 1500,
      costValue: 1500,
      currentValue: 1600,
      appreciation: 100,
    },
    {
      id: 5,
      bankName: "Bank c",
      type: "Stock",
      name: "LMN Pharmaceuticals",
      category: "Healthcare",
      investedAmount: 1500,
      costValue: 1500,
      currentValue: 1600,
      appreciation: 100,
    },
    {
      id: 6,
      bankName: "Bank D",
      type: "Stock",
      name: "LMN Pharmaceuticals",
      category: "Healthcare",
      investedAmount: 1500,
      costValue: 1500,
      currentValue: 1600,
      appreciation: 100,
    },
    {
      id: 7,
      bankName: "Bank E",
      type: "Stock",
      name: "LMN Pharmaceuticals",
      category: "Healthcare",
      investedAmount: 1500,
      costValue: 1500,
      currentValue: 1600,
      appreciation: 100,
    },
  ];

  const uniqueBankNames = [
    ...new Set(dummyPortfolioData.map((item) => item.bankName)),
  ];

  const bankInvestments = uniqueBankNames.map((bankName) => {
    const investments = dummyPortfolioData.filter(
      (item) => item.bankName === bankName
    );
    const totalInvestment = investments.reduce(
      (total, item) => total + item.investedAmount,
      0
    );
    return { bankName, totalInvestment };
  });

  const chartData = {
    labels: bankInvestments.map((item) => item.bankName),
    datasets: [
      {
        data: bankInvestments.map((item) => item.totalInvestment),
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(67, 150, 200, 0.6)",

          // Add more colors if needed
        ],
      },
    ],
  };
  return (
    <div className={styles.portfolioContainer}>
      <div className={styles.chartAndLegend}>
        <div className={styles.pieChart}>
          <Pie data={chartData} />
        </div>
        <ul className={styles.chartLegend}>
          {uniqueBankNames.map((bankName, index) => (
            <li key={index} className={styles.legendItem}>
              <span
                className={styles.legendColor}
                style={{
                  backgroundColor: chartData.datasets[0].backgroundColor[index],
                }}
              ></span>
              {bankName}
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.portfolioList}>
        {dummyPortfolioData.map((item) => (
          <div key={item.id} className={styles.portfolioItem}>
            <p>{item.bankName}</p>
            <p className={styles.investmentType}>{item.type}</p>
            <p className={styles.investmentName}>{item.name}</p>
            <p className={styles.investmentCategory}>{item.category}</p>
            <div className={styles.investmentValues}>
              <p className={styles.investmentAmount}>
                Invested: ${item.investedAmount}
              </p>
              <p className={styles.currentValue}>
                Current Value: ${item.currentValue}
              </p>
            </div>
            <button className={styles.investButton}>Invest</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Portfolio;
