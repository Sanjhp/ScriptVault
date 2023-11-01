import mongoose from "mongoose";

const fundsSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    fund_id: {
      type: String,
      required: true,
    },
    fund_name: {
      type: String,
      required: true,
    },
    sector: String,
    cost: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    fundId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const fundsModel = mongoose.model("funds-details", fundsSchema);

export default fundsModel;
