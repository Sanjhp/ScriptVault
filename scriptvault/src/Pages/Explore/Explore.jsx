import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Explore.module.css";
import axios from "axios";

const Home = () => {
  // const symbols = ["IBM", "AAPL", "GOOGL", "MSFT", "AMZN"];
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [assetType, setAssetType] = useState("Select Asset Types");
  console.log("assetType :>> ", assetType);

  const fetchAllInvestments = async (searchQuery, assetType) => {
    try {
      let url = "http://localhost:5000/api/investment/get-investments";
      const queryParams = [];

      if (searchQuery) {
        queryParams.push(`searchQuery=${encodeURIComponent(searchQuery)}`);
      }

      if (assetType && assetType !== "Select Asset Type") {
        queryParams.push(`assetType=${assetType}`);
      }
      console.log("assetType:", assetType);

      if (queryParams.length > 0) {
        url += `?${queryParams.join("&")}`;
      }
      console.log("url :>> ", url);
      const response = await axios.get(url);
      console.log("response.data :>> ", response.data);
      setData(response?.data.investments);
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  };

  useEffect(()=>{
    fetchAllInvestments()
  },[])
  useEffect(() => {
    fetchAllInvestments(searchQuery, assetType);
  }, [searchQuery, assetType]);

  return (
    <>
      <div className="flex flex-col w-full justify-center">
        <div className="flex justify-between mx-12">
          <button
            onClick={fetchAllInvestments}
            className="flex mr-3 col-span-2 justify-center px-2 py-2 rounded-sm active:bg-black active:text-white hover:bg-gray-700 hover:text-white items-center bg-black text-white font-extralight text-sm focus:bg-black focus:text-white"
          >
            All Asset Type
          </button>
          <select
            value={assetType}
            onChange={(e) => setAssetType(e.target.value)}
            className="flex col-span-2 px-2 py-2 rounded-sm  items-center bg-gray-300 text-black font-extralight text-sm"
          >
            <option>Select Asset Type</option>
            <option>ETF</option>
            <option>NPS</option>
            <option>Mutual Funds</option>
          </select>
          <div className={styles.searchBar}>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for symbols..."
            />
            <button onClick={() => fetchAllInvestments(searchQuery)}>
              Search
            </button>
          </div>
        </div>

        <div className={styles.homeWrapper}>
          {data && data.length > 0 ? (
            data?.map((invest) => (
              <div className={styles.card} key={invest?._id}>
                <div className={styles.cardStacked}>
                  <div className={styles.cardContent}>
                    <h3 className={styles.stockName}>
                      {invest?.name ? invest?.name : "N/A"}
                    </h3>
                    <div className={styles.stockWrapper}>
                      <h2 className={styles.stockPrice}>
                        ₹ {invest?.price ? invest?.price : "N/A"}
                      </h2>
                      <h2 className={styles.percentChange}>
                        {invest.changePercent ? invest.changePercent : "N/A"}
                      </h2>
                      <h2 className={styles.percentChange}>{invest.assetType ? invest.assetType : "N/A"} </h2>
                    </div>
                  </div>
                  <div className={styles.boxWrapper}>
                    <div
                      className={`${styles.cardContent} ${styles.cardAction}`}
                    >
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
                          <h4>{invest?.open ? invest?.open : "N/A"}</h4>
                        </div>
                        <div>
                          <h4>{invest?.high ? invest?.high : "N/A"}</h4>
                        </div>
                        <div>
                          <h4>{invest?.low ? invest?.low : "N/A"}</h4>
                        </div>
                      </div>
                    </div>
                    <div className={styles.cardAction}>
                      <div className={styles.linktoNext}>
                        <Link
                          to={`/details-page/${invest?.symbol}/${invest?._id}`}
                        >
                          Know more
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex justify-center items-center mt-[10%]">
            <p className="text-center text-3xl font-bold ">No Data Found</p>
            </div>

          
          )}
        </div>
      </div>
    </>
  );
};
export default Home;
