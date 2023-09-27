import InvestmentModel from "../model/InvestmentModel.js";

export const Investment = async (req, res) => {
  try {
    const { user, fundOrStock, amount, frequency } = req.body;
    const investment = new InvestmentModel({
      user,
      fundOrStock,
      amount,
      frequency,
    });
    await investment.save();
    res.status(201).json(investment);
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};
