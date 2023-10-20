import React, { useState, useEffect } from "react";
import { Sparklines, SparklinesLine } from "react-sparklines";
import data from "../../Components/Jsondata/Fundingdata.json";
import styles from "./Details.module.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Modal from "react-modal";
import { loadStripe } from "@stripe/stripe-js";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { FaHeart, FaShoppingCart } from "react-icons/fa";

// Create a Stripe instance
const stripePromise = loadStripe("YOUR_PUBLISHABLE_KEY");

const cardElementStyle = {
  base: {
    fontSize: "16px",
    color: "#333",
    fontFamily: "Arial, sans-serif",
    padding: "10px",
  },
};

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "40%",
  },
};
console.log(data?.[0].id);
const count = 0;

const Profile = () => {
  const { symbol } = useParams();
  const [stockData, setStockData] = useState(null);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const [price, setPrice] = useState("622.33");
  const elements = useElements();
  const stripe = useStripe();
  const [token, setToken] = useState(null);
  const accessToken = localStorage.getItem("token");
  const [id, setId] = useState(null);
  const [priceFluctuation, setPriceFluctuation] = useState([]);
  const [error, setError] = useState(null);

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

  const calculateReturns = (priceData, years) => {
    const today = new Date();
    const startDate = new Date();
    startDate.setFullYear(today.getFullYear() - years);

    // Filter data based on the specified years
    const filteredData = priceData.filter((data) => {
      const dataDate = new Date(data.timestamp);
      return dataDate >= startDate;
    });

    if (filteredData.length >= 2) {
      const startPrice = filteredData[0].price;
      const endPrice = filteredData[filteredData.length - 1].price;

      // Calculate returns differently based on years
      if (years === 1) {
        return ((endPrice - startPrice) / startPrice) * 100;
      } else if (years === 3) {
        return ((endPrice - startPrice) / startPrice) * (100 / 3);
      }
    }

    return 0; // Return 0 if there's not enough data for the specified years
  };

  const fetchPriceFluctuation = async () => {
    try {
      const apiKey = "C04721VTHLJFESKF";
      const apiUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${apiKey}`;
      const response = await axios.get(apiUrl);
      const timeSeriesData = response.data["Time Series (5min)"];
      // Convert time series data to an array of objects
      const priceData = Object.keys(timeSeriesData)
        .map((timestamp) => ({
          timestamp,
          price: parseFloat(timeSeriesData[timestamp]["1. open"]),
        }))
        .slice(0, 20);

      // Handle null prices by replacing with random data
      const randomData = Array.from({ length: 15 }, () => ({
        timestamp: "N/A",
        price: Math.random() * 100, // Replace with your desired random range
      }));

      const finalPriceData = priceData.map((data, index) => {
        if (data.price === null) {
          return randomData[index];
        }
        return data;
      });

      setPriceFluctuation(finalPriceData);

      // Console the price fluctuation data
      console.log("Price Fluctuation Data:", finalPriceData);
    } catch (error) {
      console.error("Error fetching price fluctuation data:", error);
    }
  };

  // Call the fetchPriceFluctuation function when the component mounts
  useEffect(() => {
    fetchPriceFluctuation();
  }, [symbol]);

  const handleDataForBackend = async (endpoint, data) => {
    try {
      const response = await axios.post(endpoint, data);
      if (response.data === undefined) {
        alert("API calls limit reached, try again later.");
      } else {
        console.log("Backend response:", response.data);
        alert("Purchase Successful");
        navigate("/dashboard");
      }
    } catch (error) {
      alert("Request failed. Try again later. Api call limit reached");
      closeModal();
      console.error("Request failed:", error);
    }
  };

  // const handleBuy = async () => {
  //   const fundData = {
  //     fund_id: stockData.Symbol,
  //     fund_name: stockData.Name,
  //     sector: stockData.Sector,
  //     cost: stockData.BookValue,
  //     user: id,
  //     quantity: quantity.toString(),
  //   };

  //   try {
  //     const response = await axios.post("/api/fund/investments", fundData);
  //     if (response.data === undefined) {
  //       alert("API calls limit reached, please try again later.");
  //     } else {
  //       // Investment successful
  //       alert("Purchase Successful");
  //       navigate("/dashboard");
  //     }
  //   } catch (error) {
  //     alert(
  //       "Investment failed. API Calls Limit reached. Please try again later."
  //     );
  //     console.error("Investment failed:", error);
  //   }
  // };

  const handleBuy = async () => {
    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      setError("Card element not found.");
      return;
    }

    // Create a Payment Method
    try {
      const { paymentMethod, error } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
      });

      if (error) {
        setError(error.message);
      } else {
        // Payment Method created successfully

        // Now, you can confirm a Payment Intent with the paymentMethod ID
        const fundData = {
          fund_id: stockData.Symbol,
          fund_name: stockData.Name,
          sector: stockData.Sector,
          cost: stockData.BookValue,
          user: id,
          quantity: quantity.toString(),
        };

        // Send the data to the backend to confirm the Payment Intent
        handleDataForBackend("/api/fund/investments", fundData);
      }
    } catch (error) {
      setError("Payment processing error. Please try again.");
      console.error("Payment processing error:", error);
    }
  };

  const handleAddToWatchlist = async () => {
    const watchlistData = {
      symbol: stockData.Symbol,
      user_id: id,
    };

    handleDataForBackend("/api/watchlist/add", watchlistData);
  };

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setQuantity(1);
    setIsOpen(false);
  }

  console.log("stockData :>> ", stockData);
  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const apiKey = "C04721VTHLJFESKF";
        const apiUrl = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=${apiKey}`;
        const response = await axios.get(apiUrl);
        console.log("response :>> ", response);
        setStockData(response.data);
        if (response.data && response.data.BookValue) {
          setPrice(response.data.BookValue);
        }
      } catch (error) {
        console.error("Error fetching stock data:", error);
      }
    };

    fetchStockData();
  }, [symbol]);

  if (!stockData) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.profileWrapper}>
      <div className={styles.heading}>
        <div className={styles.policyName}>
          <div className={styles.name}>
            {/* <div>
              <img alt="logo" src={data?.[count]?.companyImg} />
            </div> */}
            <div>
              <h2>{stockData?.Name}</h2>
            </div>
          </div>
          {/* <div className={styles.policyFeed}>
            <span className={styles.btn}>Equality</span>
            <span className={styles.btn}>Large Cap</span>
            <span className={styles.btn}>
              5.0
              <span id="star">
                <i className={`${styles.materialIcons} ${styles.star}`}>star</i>
              </span>{" "}
            </span>
          </div> */}
        </div>
        <div className={styles.yearReturn}>
          <div className={styles.percentReturn}>
            {" "}
            <h2>{calculateReturns(priceFluctuation, 1).toFixed(2)}%</h2>{" "}
          </div>
          <div className={styles.oneYearReturn}>
            {" "}
            <h6> {data?.[count]?.year} Return </h6>{" "}
          </div>
          <div className={styles.percentReturn}>
            <h2>{calculateReturns(priceFluctuation, 3).toFixed(2)}%</h2>{" "}
          </div>
          <div className={styles.oneYearReturn}>
            <h6> {data?.[count]?.years} Return </h6>{" "}
          </div>

          <button
            onClick={openModal}
            type="submit"
            className="mt-10 font-bold text-xl px-6 py-1 rounded bg-green-600 text-white"
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <FaShoppingCart style={{ marginRight: "8px" }} />
              Invest
            </div>
          </button>
          <button
            onClick={handleAddToWatchlist} // Handle adding to watchlist
            type="button" // Change to type="button" as it's not a form submission
            className="mt-10 font-bold text-xl px-6 py-1 text-black"
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <FaHeart style={{ marginRight: "8px" }} />
              Watchlist
            </div>
          </button>
        </div>
      </div>

      <div className={styles.sparkline}>
        <div className={styles.sparklineData}>
          <Sparklines data={priceFluctuation.map((data) => data.price)}>
            <SparklinesLine color="#26a69a" />
          </Sparklines>
        </div>
        <div className={styles.policyDetails}>
          <p></p>
        </div>
      </div>

      <h4> {stockData?.Name} Fund Details </h4>
      <div className={styles.fundDetails}>
        <div className={styles.lhsDetails}>
          <ul className={styles.collection}>
            <li className={styles.collectionItem}>
              <div>52W High</div>
              <div>{stockData["52WeekHigh"]}</div>
            </li>
            <li className={styles.collectionItem}>
              {" "}
              <div>52W Low</div> <div>{stockData["52WeekLow"]}</div>
            </li>
            <li className={styles.collectionItem}>
              <div>PE Ratio</div> <div>{stockData?.PERatio}</div>
            </li>
            <li className={styles.collectionItem}>
              <div>PEG Ratio</div> <div>{stockData?.PEGRatio}</div>
            </li>
            <li className={styles.collectionItem}>
              <div>Dividend Yield</div> <div>{stockData?.DividendYield}</div>
            </li>
            <li className={styles.collectionItem}>
              <div>Mkt. Cap</div> <div>{stockData?.MarketCapitalization}</div>
            </li>
            <li className={styles.collectionItem}>
              <div>50Day Moving Avg.</div>{" "}
              <div>{stockData["50DayMovingAverage"]}</div>
            </li>
            <li className={styles.collectionItem}>
              <div>200Day Moving Avg.</div>{" "}
              <div>{stockData["200DayMovingAverage"]}</div>
            </li>
          </ul>
        </div>
        <div className={styles.rhsDetails}>
          <ul className={styles.collection}>
            <li className={styles.collectionItem}>
              <div> β</div> <div>{stockData?.Beta}</div>{" "}
            </li>
            <li className={styles.collectionItem}>
              <div> BookValue</div> <div>{stockData?.BookValue}</div>{" "}
            </li>
            <li className={styles.collectionItem}>
              <div> EPS</div> <div>{stockData?.EPS}</div>{" "}
            </li>

            <li className={styles.collectionItem}>
              <div>DividendPerShare</div>{" "}
              <div>{stockData?.DividendPerShare}</div>{" "}
            </li>
            <li className={styles.collectionItem}>
              <div>Sector</div> <div>{stockData?.Sector}</div>{" "}
            </li>
            <li className={styles?.collectionItem}>
              <div>Industry</div> <div>{stockData?.Industry}</div>{" "}
            </li>
          </ul>
        </div>
      </div>

      {/* <div className={styles.prosCons}>
        <div className={styles.lhsDetails}>
          <h4>Pros</h4>
          <ol className={styles.collection}>
            <li className={styles.collectionItem}>
              <span>Lower expense ratio - 0.44%</span>
            </li>
            <li className={styles.collectionItem}>
              <span>
                1Y Returns are higher than the category average returns
              </span>
            </li>
            <li className={styles.collectionItem}>
              <span>
                3Y Returns are higher than the category average returns
              </span>
            </li>
            <li className={styles.collectionItem}>
              <span>
                5Y Returns are higher than the category average returns
              </span>
            </li>
          </ol>
        </div>
        <div className={styles.lhsDetails}>
          <h4>Cons</h4>
          <ol className={styles.collection}>
            <li className={styles.collectionItem}>
              <span>
                Risk-adjusted returns are lower compared to the category
              </span>
            </li>
          </ol>
        </div>
      </div> */}

      <div className={styles.aboutPolicy}>
        <h4> Direct Plan Details </h4>
        <p>{stockData?.Description}</p>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Buy Stock Modal"
        ariaHideApp={false}
      >
        <div className={styles.buyStockModal}>
          <div className={styles.modalHeader}>
            <div className="flex text-xl">
              <h2 className="mr-4">
                Invest <span>IBM</span>
              </h2>
              x <h2 className="ml-4">Qty. {quantity}</h2>
            </div>
            <h2>Rs. {price}</h2>
          </div>

          <div className={styles.modalContent}>
            <div className={styles.quantityControl}>
              <div className={styles.formGroup}>
                <label>Quantity: </label>
                <div className={styles.quantityBtn}>
                  <input
                    type="number"
                    className="border-black border-[1px] p-3"
                    value={quantity}
                    onChange={(e) => {
                      const newQuantity = parseInt(e.target.value, 10);
                      if (!isNaN(newQuantity) && newQuantity >= 1) {
                        setQuantity(newQuantity);
                      }
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="m-2">
              <h2 className="mb-2">
                Cost : {(parseFloat(price) * quantity).toFixed(2)}
              </h2>
            </div>
            <div className="m-2">
              <h3>Card Details</h3>
              <CardElement options={{ style: cardElementStyle }} />
            </div>
            {error && <p style={{ color: "red" }}>{error}</p>}
          </div>

          <div className={styles.modalFooter}>
            <button className={styles.buyButton} onClick={handleBuy}>
              Invest
            </button>
            <button className={styles.cancelButton} onClick={closeModal}>
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
export default Profile;
