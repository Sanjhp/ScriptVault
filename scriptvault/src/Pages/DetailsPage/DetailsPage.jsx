import React, { useState, useEffect } from "react";
import { Sparklines, SparklinesLine } from "react-sparklines";
import data from "../../Components/Jsondata/Fundingdata.json";
import styles from "./Details.module.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Modal from "react-modal";
import { loadStripe } from "@stripe/stripe-js";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

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
  // const [stopLoss, setStopLoss] = useState("");
  const navigate = useNavigate();
  const [price, setPrice] = useState("622.33");
  const elements = useElements();
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

  const handleDataForBackend = (async) => {
    try {
      // Construct the data object to send to the backend
      const fundData = {
        fund_id: stockData.Symbol,
        fund_name: stockData.Name,
        sector: stockData.Sector,
        cost: stockData.BookValue,
        user_id: id,
      };
      const response = axios.post("/api/fund/investments", fundData);
      console.log(fundData);
      console.log("Backend response:", response.data);
    } catch (error) {
      console.error("Error buying stock:", error);
    }
  };

  // const handleBuy = () => {
  //   console.log(`Buying ${quantity} stocks with Stop Loss set `);
  //   navigate("/dashboard");
  // };

  // const handleBuy = async () => {
  //   const stripe = await stripePromise;
  //   const cardElement = elements.getElement(CardElement);

  //   if (!stripe || !cardElement) {
  //     console.error("Stripe or CardElement not available.");
  //     return;
  //   }

  //   // Create a PaymentMethod with the card information
  //   const { paymentMethod, error } = await stripe.createPaymentMethod({
  //     type: "card",
  //     card: cardElement,
  //   });

  //   if (error) {
  //     console.error("Error creating PaymentMethod:", error);
  //     return;
  //   }

  //   // Use the paymentMethod.id to process the payment on your server
  //   const response = await axios.post("/your-server-endpoint", {
  //     paymentMethodId: paymentMethod.id,
  //     amount: parseFloat(price) * quantity * 100,
  //     user_id: id, // Include the user ID here
  //   });

  //   console.log("Payment successful:", response.data);

  //   handleDataForBackend();

  //   closeModal();

  //   navigate("/dashboard");
  // };

  const handleBuy = async () => {
    handleDataForBackend();

    const stripe = await stripePromise;
    const cardElement = elements.getElement(CardElement);

    closeModal();

    navigate("/dashboard");

    if (!stripe || !cardElement) {
      console.error("Stripe or CardElement not available.");
      return;
    }

    // Create a PaymentMethod with the card information
    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.error("Error creating PaymentMethod:", error);
      return;
    }

    // Use the paymentMethod.id to process the payment on your server
    const response = await axios.post("/your-server-endpoint", {
      paymentMethodId: paymentMethod.id,
      amount: parseFloat(price) * quantity * 100,
      user_id: id,
    });

    console.log("Payment successful:", response.data);
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
        // const apiKey = "demo";
        const apiKey = "C04721VTHLJFESKF";
        const apiUrl = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=${apiKey}`;
        const response = await axios.get(apiUrl);
        console.log("response :>> ", response);
        setStockData(response.data);
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
            <div>
              <img alt="logo" src={data?.[count]?.companyImg} />
            </div>
            <div>
              <h2>{stockData?.Name}</h2>
            </div>
          </div>
          <div className={styles.policyFeed}>
            <span className={styles.btn}>Equality</span>
            <span className={styles.btn}>Large Cap</span>
            <span className={styles.btn}>
              5.0
              <span id="star">
                <i className={`${styles.materialIcons} ${styles.star}`}>star</i>
              </span>{" "}
            </span>
          </div>
        </div>
        <div className={styles.yearReturn}>
          <div className={styles.percentReturn}>
            {" "}
            <h2>{data?.[count]?.yearGrowth}</h2>{" "}
          </div>
          <div className={styles.oneYearReturn}>
            {" "}
            <h6> {data?.[count]?.year} Return </h6>{" "}
          </div>
          <div className={styles.percentReturn}>
            <h2>{data?.[count]?.yearsGrowth}</h2>{" "}
          </div>
          <div className={styles.oneYearReturn}>
            <h6> {data?.[count]?.years} Return </h6>{" "}
          </div>

          <button
            onClick={openModal}
            type="submit"
            className="mt-10 font-bold text-xl px-6 py-1 rounded bg-green-600 text-white"
          >
            Buy
          </button>
        </div>
      </div>

      <div className={styles.sparkline}>
        <div className={styles.sparklineData}>
          <Sparklines
            data={[
              5, 10, 5, 20, 8, 15, 5, 10, 5, 20, 8, 15, 5, 10, 5, 20, 8, 15, 5,
              10, 5, 20, 8, 15,
            ]}
          >
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

      <div className={styles.prosCons}>
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
      </div>

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
                Buy <span>IBM</span>
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
          </div>

          <div className={styles.modalFooter}>
            <button className={styles.buyButton} onClick={handleBuy}>
              Buy
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
