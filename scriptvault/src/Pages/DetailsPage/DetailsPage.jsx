import React, { useState, useEffect } from "react";
import { Sparklines, SparklinesLine } from "react-sparklines";
import data from "../../Components/Jsondata/Fundingdata.json";
import styles from "./Details.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";

console.log(data?.[0].id);
const count = 0;

const Profile = () => {
  const { symbol } = useParams();
  const [stockData, setStockData] = useState(null);

  // const [apiRes, setApiRes] = useState([]);
  console.log("stockData :>> ", stockData);
  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const apiKey = "demo";
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
    return <div>Loading...</div>; // Add loading state while data is being fetched
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
              {/* <h2>{data?.[count]?.policyName}</h2> */}
              <h2>{stockData?.Name}</h2>
            </div>
          </div>
          <div className={styles.policyFeed}>
            <span className={styles.btn}>Equality</span>
            <span className={styles.btn}>Large Cap</span>
            <span className={styles.btn}>
              5.0{" "}
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
            {" "}
            <h2>{data?.[count]?.yearsGrowth}</h2>{" "}
          </div>
          <div className={styles.oneYearReturn}>
            {" "}
            <h6> {data?.[count]?.years} Return </h6>{" "}
          </div>
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

      <h4> Fund Details </h4>
      <div className={styles.fundDetails}>
        <div className={styles.lhsDetails}>
          <ul className={styles.collection}>
            <li className={styles.collectionItem}>
              {" "}
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

            {/* <li className={styles.collectionItem}>
             
              <div>50DayMovingAverage</div> <div>{stockData["50DayMovingAverage"]}</div>{" "}
            </li> */}
          </ul>
        </div>
        <div className={styles.rhsDetails}>
          <ul className={styles.collection}>
            <li className={styles.collectionItem}>
              <div>	β</div> <div>{stockData?.Beta}</div>{" "}
            </li>
            <li className={styles.collectionItem}>
              <div>Exchange</div> <div>{stockData?.Exchange}</div>{" "}
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
        <h4> Axis Bluechip Fund Direct Plan Details </h4>
        <p>{stockData?.Description}</p>
        {/* <p>
          {" "}
          Axis Bluechip Fund Direct Plan Growth is a Equity Mutual Fund Scheme
          launched by Axis Mutual Fund. This scheme was made available to
          investors on 01 Jan 2013. Shreyash Devalkar is the Current Fund
          Manager of Axis Bluechip Fund Direct Plan Growth fund.The fund
          currently has an Asset Under Management(AUM) of ₹14,522 Cr and the
          Latest NAV as of 28 Jul 2020 is ₹33.36.{" "}
        </p>

        <p>
          {" "}
          The Axis Bluechip Fund Direct Plan Growth is rated Moderately High
          risk. Minimum SIP Investment is set to 500. Minimum Lumpsum Investment
          is 5000. For units in excess of 10% of the investment,1% will be
          charged for redemption within 12 months{" "}
        </p>

        <p>
          {" "}
          As the name suggests, Axis blue-chip fund-growth invests in blue-chip
          stocks, or stocks of predominantly large companies, which are
          financially sound, and well established. The stocks are less volatile
          than mid-cap and small-cap stocks, traded frequently, and have
          adequate liquidity as a result. The stocks that the Axis Blue Chip
          fund intends to invest in have the potential to perform long-term due
          to their proven track record.{" "}
        </p>

        <h5> Investment Objective </h5>

        <p>
          {" "}
          To achieve long term capital appreciation by investing in a
          diversified portfolio predominantly consisting of equity and equity
          related securities including derivatives. Howerver, there can be no
          assurance that the investment objective of the scheme will be
          achieved.{" "}
        </p>

        <p>
          {" "}
          Axis Blue Chip Fund-Direct ( Growth), being an equity fund, is
          suitable for investors aiming for long term capital
          appreciation,ideally with an investment horizon of more than five
          years. There is no lock-in period in this fund, however.{" "}
        </p>

        <h5> Tax Implications </h5>

        <p>
          {" "}
          Returns are taxed at 15%, if you redeem before one year. After 1 year,
          you are required to pay LTCG tax of 10% on returns of Rs 1 lakh+ in a
          financial year.{" "}
        </p>

        <p>
          {" "}
          If the investment in the Axis Blue Chip Fund Growth plan is redeemed
          before one year, it will be taxed as per STCG, which is currently at
          15%. There will be no tax liability as long as the fund units are
          held. There is no surcharge included in this rate.{" "}
        </p> */}
      </div>
    </div>
  );
};
export default Profile;
