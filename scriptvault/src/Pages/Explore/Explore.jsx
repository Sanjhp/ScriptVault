import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Explore.css";
import Fundingdata from "../../Components/Jsondata/Fundingdata.json";
import axios from "axios";

const Home = () => {
  const symbol = "AAPL";
  // const yahooFinanceUrl = `https://finance.yahoo.com/quote/AAPL`;

  useEffect(() => {
    // Define your API key here
    const apiKey = "C04721VTHLJFESKF";
    //   const apiUrl = "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&outputsize=full&apikey=" + apiKey;
    const apiUrl =
      "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=IBM&apikey=demo";
    // Make the API call with axios
    axios
      .get(apiUrl)
      .then((response) => {
        console.log(response); // Logging the API response data
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);
  return (
    <div className="homeWrapper">
      {Fundingdata.map((fundData, i) => {
        return (
          <div key={i} className="card horizontal">
            <div className="card-image">
              <img src={fundData.companyImg} alt="Mutual Fund Logo" />
            </div>
            <div className="card-stacked">
              <div className="card-content">
                <h3> {fundData.policyName} </h3>
              </div>
              <div className="boxWrapper">
                <div className="card-content card-action">
                  <div className="dataHead">
                    <div>
                      <h4> 10.3% </h4>{" "}
                    </div>
                    <div>
                      <h4> 10.3% </h4>{" "}
                    </div>
                    <div>
                      <h4> 10.3% </h4>{" "}
                    </div>
                  </div>
                  <div className="dataDetails">
                    <div>
                      <h4> 1D </h4>{" "}
                    </div>
                    <div>
                      <h4> 1Y </h4>{" "}
                    </div>
                    <div>
                      <h4> 3Y </h4>{" "}
                    </div>
                  </div>
                </div>
                <div className="card-action">
                  <div className="linktoNext">
                    {/* <Link to={`/${fundData.id}`}>Know more</Link> */}
                    <Link to="/details-page">
                      {" "}
                      <b> Know more </b>{" "}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default Home;
