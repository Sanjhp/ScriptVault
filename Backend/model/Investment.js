import mongoose from "mongoose";

const investmentSchema = new mongoose.Schema({
  type:{
    type:String,
    required: true,

  },
  name:{
    type:String,
    required: true,
    
  },
  symbol:{
    type:String,
    required: true,
    
  },
  description:{
    type:String,
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
