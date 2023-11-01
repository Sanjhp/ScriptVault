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
  const { stockId } = useParams();
  const [stockData, setStockData] = useState(null);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const [price, setPrice] = useState("");
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

    return 0;
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

  const handleDataForBackend = async (data) => {
    try {
      console.log(data);
      const response = await axios.post("/api/fund/investments", data);
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
          fund_id: stockData.symbol,
          fund_name: stockData.name,
          sector: stockData.sector,
          cost: price,
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
      symbol: stockData.symbol,
      user_id: id,
    };

    try {
      console.log(watchlistData);
      const response = await axios.post("/api/watchlist/add", watchlistData);
      if (response.data === undefined) {
        alert("API calls limit reached, try again later.");
      } else {
        console.log("Backend response:", response.data);
        alert("Fund Added to Watchlist");
      }
    } catch (error) {
      alert("Fund already exists in the watchlist");
      closeModal();
      console.error("Request failed:", error);
    }
  };

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setQuantity(1);
    setIsOpen(false);
  }

  const fetchStockData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/investment/${stockId}`
      );
      setStockData(response?.data?.investment);
      if (response?.data && response?.data?.investment?.price) {
        setPrice(response?.data?.investment?.price);
        console.log(response.data.investment.price);
      }
    } catch (error) {
      console.error("Error fetching stock data:", error);
    }
  };
  useEffect(() => {
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
            <div>
              <h2>{stockData?.name}</h2>
            </div>
          </div>
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
            type="button"
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

      <h4> {stockData?.name} Fund Details </h4>
      <div className={styles.fundDetails}>
        <div className={styles.lhsDetails}>
          <ul className={styles.collection}>
            <li className={styles.collectionItem}>
              <div>52W High</div>
              <div>{stockData.week52High}</div>
            </li>
            <li className={styles.collectionItem}>
              {" "}
              <div>52W Low</div> <div>{stockData.week52Low}</div>
            </li>
            <li className={styles.collectionItem}>
              <div>PE Ratio</div> <div>{stockData?.peRatio}</div>
            </li>
            <li className={styles.collectionItem}>
              <div>PEG Ratio</div> <div>{stockData?.pegRatio}</div>
            </li>
            <li className={styles.collectionItem}>
              <div>Dividend Yield</div> <div>{stockData?.dividendYield}</div>
            </li>
            <li className={styles.collectionItem}>
              <div>Mkt. Cap</div> <div>{stockData?.marketCapitalization}</div>
            </li>
            <li className={styles.collectionItem}>
              <div>50Day Moving Avg.</div>{" "}
              <div>{stockData.movingAverage50Days}</div>
            </li>
            <li className={styles.collectionItem}>
              <div>200Day Moving Avg.</div>{" "}
              <div>{stockData.movingAverage200Days}</div>
            </li>
          </ul>
        </div>
        <div className={styles.rhsDetails}>
          <ul className={styles.collection}>
            <li className={styles.collectionItem}>
              <div> price</div> <div>{stockData?.price}</div>{" "}
            </li>
            <li className={styles.collectionItem}>
              <div> β</div> <div>{stockData?.beta}</div>{" "}
            </li>
            <li className={styles.collectionItem}>
              <div> BookValue</div> <div>{stockData?.bookValue}</div>{" "}
            </li>
            <li className={styles.collectionItem}>
              <div> trailingPE </div> <div>{stockData?.trailingPE}</div>{" "}
            </li>
            <li className={styles.collectionItem}>
              <div> forwardPE</div> <div>{stockData?.forwardPE}</div>{" "}
            </li>

            <li className={styles.collectionItem}>
              <div>DividendPerShare</div>{" "}
              <div>{stockData?.dividendPerShare}</div>{" "}
            </li>
            <li className={styles.collectionItem}>
              <div>Sector</div> <div>{stockData?.sector}</div>{" "}
            </li>
            <li className={styles?.collectionItem}>
              <div>Industry</div> <div>{stockData?.industry}</div>{" "}
            </li>
          </ul>
        </div>
      </div>
      <div className={styles.aboutPolicy}>
        <h4> Direct Plan Details </h4>
        <p>{stockData?.description}</p>
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
