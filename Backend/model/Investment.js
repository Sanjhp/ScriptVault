import mongoose from "mongoose";

const investmentSchema = new mongoose.Schema(
  {
    symbol: {
      type: String,
      required: true,
    },
    assetType: {
      type: String,
      enum: ["ETF", "NFO", "NPS", "Mutual Fund"],
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    sector: {
      type: String,
      required: true,
    },
    open: {
      type: Number,
      required: true,
    },
    high: {
      type: Number,
      required: true,
    },
    low: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    volume: {
      type: Number,
      required: true,
    },
    latestTradingDay: {
      type: Date,
      required: true,
    },
    previousClose: {
      type: Number,
      required: true,
    },
    change: {
      type: Number,
      required: true,
    },
    changePercent: {
      type: String,
      required: true,
    },
    week52High: {
      type: Number,
      required: false,
    },
    week52Low: {
      type: Number,
      required: false,
    },
    pegRatio: {
      type: Number,
      required: false,
    },
    peRatio: {
      type: Number,
      required: false,
    },
    dividendYield: {
      type: Number,
      required: false,
    },
    marketCapitalization: {
      type: Number,
      required: false,
    },
    movingAverage50Days: {
      type: Number,
      required: false,
    },
    movingAverage200Days: {
      type: Number,
      required: false,
    },
    beta: {
      type: Number,
      required: false,
    },
    bookValue: {
      type: Number,
      required: false,
    },
    dividendPerShare: {
      type: Number,
      required: false,
    },
    industry: {
      type: String,
      required: false,
    },
    forwardPE: {
      type: Number,
      required: false,
    },
    trailingPE: {
      type: Number,
      required: false,
    },
  },
  { timestamps: true }
);

const InvestmentModel = mongoose.model("investment-details", investmentSchema);

export default InvestmentModel;
