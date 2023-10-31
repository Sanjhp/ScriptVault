import mongoose from "mongoose";

const investmentSchema = new mongoose.Schema(
  {
    symbol: {
      type: String,
      required: false,
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
    price: {
      type: Number,
      required: true,
    },
    aum: {
      type: Number,
      required: false,
    },
    expenseRatio: {
      type: String,
      required: false,
    },
    cagr: {
      type: String,
      required: false,
    },
    exitLoad: {
      type: String,
      required: false,
    },
    minInvestment: {
      type: Number,
      required: false,
    },
    open: {
      type: Number,
      required: false,
    },
    high: {
      type: Number,
      required: false,
    },
    low: {
      type: Number,
      required: false,
    },

    volume: {
      type: Number,
      required: false,
    },
    latestTradingDay: {
      type: Date,
      required: false,
    },
    previousClose: {
      type: Number,
      required: false,
    },
    change: {
      type: Number,
      required: false,
    },
    changePercent: {
      type: String,
      required: false,
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
