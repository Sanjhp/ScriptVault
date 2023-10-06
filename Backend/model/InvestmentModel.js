import mongoose from "mongoose";

const investmentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserModel",
    required: true,
  },
  fundOrStock: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  frequency: {
    type: String,
    enum: ["one-time", "SIP"],
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const InvestmentModel = mongoose.model('investment-details', investmentSchema);

export default InvestmentModel;
