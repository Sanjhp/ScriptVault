import InvestmentModel from "../model/Investment.js";

export const createInvestment = async (req, res) => {
  try {
    const {
      assetType,
      symbol,
      name,
      description,
      sector,
      aum,
      expenseRatio,
      cagr,
      exitLoad,
      minInvestment,
      open,
      high,
      low,
      price,
      volume,
      latestTradingDay,
      previousClose,
      change,
      changePercent,
      week52High,
      week52Low,
      pegRatio,
      peRatio,
      dividendYield,
      marketCapitalization,
      movingAverage50Days,
      movingAverage200Days,
      beta,
      bookValue,
      dividendPerShare,
      industry,
      forwardPE,
      trailingPE,
    } = req.body;

    const investment = new InvestmentModel({
      assetType,
      symbol,
      name,
      description,
      sector,
      aum,
      expenseRatio,
      cagr,
      exitLoad,
      minInvestment,
      open,
      high,
      low,
      price,
      volume,
      latestTradingDay,
      previousClose,
      change,
      changePercent,
      week52High,
      week52Low,
      pegRatio,
      peRatio,
      dividendYield,
      marketCapitalization,
      movingAverage50Days,
      movingAverage200Days,
      beta,
      bookValue,
      dividendPerShare,
      industry,
      forwardPE,
      trailingPE,
    });

    await investment.save();
    res
      .status(201)
      .json({
        success: true,
        message: "Investment added successfully!",
        investment,
      });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

export const getAllInvestments = async (req, res) => {
  try {
    const { searchQuery, assetType } = req.query;

    let filters = {};
    if (searchQuery) {
      filters.$or = [
        { symbol: { $regex: searchQuery, $options: "i" } },
        { name: { $regex: searchQuery, $options: "i" } }
      ];
    }

    if (assetType) {
      filters.assetType = assetType;
    }

    const investments = await InvestmentModel.find(filters);
    
    res.status(200).json({
      success: true,
      message: "Fetched investments successfully!",
      investments,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};


export const getSingleInvestment = async (req, res) => {
  try {
    const { id } = req.params;
    const investment = await InvestmentModel.findById(id);
    if (!investment) {
      return res
        .status(404)
        .json({ success: false, error: "Investment not found" });
    }
    res
      .status(200)
      .json({
        success: true,
        message: "Investment fetched successfully!",
        investment,
      });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};
