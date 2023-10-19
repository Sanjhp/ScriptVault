import InvestedFunds from "../model/Funds.js";

// Function to create a new investment record
export const createInvestment = async (req, res) => {
  try {
    const { user, fund_id, fund_name, sector, cost, quantity } = req.body;

    console.log(req.body);
    const newInvestment = new InvestedFunds({
      user,
      fund_id,
      fund_name,
      sector,
      cost,
      quantity,
    });

    const savedInvestment = await newInvestment.save();

    res.status(201).json(savedInvestment);
  } catch (error) {
    console.error("Error creating investment:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Function to delete an investment record by ID
export const deleteInvestmentById = async (req, res) => {
  try {
    const { _id } = req.params;
    console.log("_id :>> ", _id);

    const deletedInvestment = await InvestedFunds.findByIdAndDelete(_id);
    console.log("Deleted Investment:", deletedInvestment);

    if (!deletedInvestment) {
      return res.status(404).json({ error: "Investment record not found" });
    }

    res.json(deletedInvestment);
  } catch (error) {
    console.error("Error deleting investment:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getAllInvestmentsByUserId = async (req, res) => {
  try {
    const { user } = req.params;

    const investments = await InvestedFunds.find({ user });
    const numberOfAssets = investments.length;
    const totalCostValue = investments.reduce((total, investment) => {
      return total + investment.cost;
    }, 0);

    res.json({
      assets: numberOfAssets,
      cost_value: totalCostValue,
      investments,
    });
  } catch (error) {
    console.error("Error fetching investments:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
