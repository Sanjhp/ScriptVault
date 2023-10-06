import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Explore.module.css";
import axios from "axios";

const Home = () => {
  const symbols = ["IBM", "AAPL", "GOOGL", "MSFT", "AMZN"];
  const [apiResponses, setApiResponses] = useState([]);
  console.log("apiResponses :>> ", apiResponses);
  useEffect(() => {
    const fetchData = async (symbol) => {
      try {
        const apiKey = "C04721VTHLJFESKF";
        // const apiKey = "demo"
        const apiUrl = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`;
        const response = await axios.get(apiUrl);
        return response?.data;
      } catch (error) {
        console.error("Error:", error);
        return null;
      }
    };

    const fetchAllData = async () => {
      const responses = await Promise.all(
        symbols.map((symbol) => fetchData(symbol))
      );
      setApiResponses(responses?.filter((response) => response !== null));
    };

    fetchAllData();
  }, []);

  //www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=BA&apikey=demo
  const [searchResults, setSearchResults] = useState([]);
  console.log("searchResults :>> ", searchResults);
  const [searchQuery, setSearchQuery] = useState("BA");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiKey = "C04721VTHLJFESKF";
        const apiUrl = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${searchQuery}&apikey=${apiKey}`;
        const response = await axios.get(apiUrl);
        setSearchResults(response.data.bestMatches || []); 
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [searchQuery]);

  return (
    <>
      <div className="flex flex-col w-full justify-center">
        <div className={styles.searchBar}>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for symbols..."
          />
          <ul className={styles.suggestionList}>
            {searchResults?.map((result) => (
              <li
                key={result["1. symbol"]}
                onClick={() => {
                  const selectedSymbol = result["1. symbol"];
                  const fetchData = async (symbol) => {
                    try {
                      const apiKey = "YOUR_API_KEY_HERE";
                      const apiUrl = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`;
                      const response = await axios.get(apiUrl);
                      const responseData = response?.data;
                      if (responseData) {
                        setApiResponses((prevResponses) => [
                          ...prevResponses,
                          responseData,
                        ]);
                      }
                    } catch (error) {
                      console.error("Error:", error);
                    }
                  };
                  fetchData(selectedSymbol);
                }}
              >
                {result["1. symbol"]} - {result["2. name"]}
              </li>
            ))}
          </ul>
          <button>Search</button>
        </div>

        <div className={styles.homeWrapper}>
          {apiResponses?.map((apiResponse, index) => (
            <div className={styles.card} key={index}>
              <div className={styles.cardStacked}>
                <div className={styles.cardContent}>
                  <h3 className={styles.stockName}>
                    {apiResponse?.["Global Quote"]?.["01. symbol"] ?? "N/A"}{" "}
                  </h3>
                  <div className={styles.stockWrapper}>
                    <h2 className={styles.stockPrice}>
                      ₹{apiResponse?.["Global Quote"]?.["05. price"] ?? "N/A"}
                    </h2>
                    <h2 className={styles.percentChange}>
                      {apiResponse?.["Global Quote"]?.["10. change percent"] ??
                        "N/A"}
                    </h2>
                  </div>
                </div>
                <div className={styles.boxWrapper}>
                  <div className={`${styles.cardContent} ${styles.cardAction}`}>
                    <div className={styles.dataHead}>
                      <div>
                        <h4> Open </h4>
                      </div>
                      <div>
                        <h4>High</h4>
                      </div>
                      <div>
                        <h4> Low </h4>
                      </div>
                    </div>
                    <div className={styles.dataDetails}>
                      <div>
                        <h4>
                          {apiResponse?.["Global Quote"]?.["02. open"] ?? "N/A"}
                        </h4>
                      </div>
                      <div>
                        <h4>
                          {apiResponse?.["Global Quote"]?.["03. high"] ?? "N/A"}
                        </h4>
                      </div>
                      <div>
                        <h4>
                          {apiResponse?.["Global Quote"]?.["04. low"] ?? "N/A"}
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className={styles.cardAction}>
                    <div className={styles.linktoNext}>
                      <Link
                        to={`/details-page/${apiResponse?.["Global Quote"]?.["01. symbol"]}`}
                      >
                        Know more
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default Home;
