import React, { useState } from 'react';
import styles from './invest.module.css';

function Invest() {
  const mutualFunds = [
    { id: 1, name: 'ABC Mutual Fund', category: 'Equity', value: 100 },
    { id: 2, name: 'XYZ Mutual Fund', category: 'Debt', value: 150 },
    { id: 3, name: 'PQR Mutual Fund', category: 'Hybrid', value: 200 },
  ];

  const [selectedFund, setSelectedFund] = useState(null);
  const [investmentFrequency, setInvestmentFrequency] = useState('one-time');
  const [investmentAmount, setInvestmentAmount] = useState('');

  const handleFundSelection = (fund) => {
    setSelectedFund(fund);
  };

  const handleFrequencyChange = (e) => {
    setInvestmentFrequency(e.target.value);
  };

  const handleAmountChange = (e) => {
    setInvestmentAmount(e.target.value);
  };

  const handleInvest = () => {
    alert(`Invested ${investmentAmount} in ${selectedFund.name} (${investmentFrequency})`);
  };

  return (
    <>
      <h2 className={styles.sectionTitle}>Invest</h2>
      <div className={styles.mutualFunds}>
        <h3 className={styles.mutualFundsTitle}>Select a Mutual Fund</h3>
        <ul className={styles.mutualFundsList}>
          {mutualFunds.map((fund) => (
            <li
              key={fund.id}
              className={`${styles.mutualFundItem} ${selectedFund === fund ? styles.selected : ''}`}
              onClick={() => handleFundSelection(fund)}
            >
              {fund.name}
            </li>
          ))}
        </ul>
      </div>
      {selectedFund && (
        <div className={styles.investmentOptions}>
          <h3 className={styles.investmentOptionsTitle}>Investment Options</h3>
          <div className={styles.frequencyOptions}>
            <label className={styles.frequencyOptionsLabel}>
              <input
                type="radio"
                value="one-time"
                checked={investmentFrequency === 'one-time'}
                onChange={handleFrequencyChange}
              />
              One-Time Investment
            </label>
            <label className={styles.frequencyOptionsLabel}>
              <input
                type="radio"
                value="SIP"
                checked={investmentFrequency === 'SIP'}
                onChange={handleFrequencyChange}
              />
              Systematic-Investment Plan (SIP)
            </label>
          </div>
          <div className={styles.amountInput}>
            <label className={styles.amountInputLabel}>Investment Amount:</label>
            <input
              type="number"
              value={investmentAmount}
              onChange={handleAmountChange}
              className={styles.investmentAmountInput}
            />
          </div>
          <button className={styles.investButton} onClick={handleInvest}>
            Invest
          </button>
        </div>
      )}
    </>
  );
}

export default Invest;
