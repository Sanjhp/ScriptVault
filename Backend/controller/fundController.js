import InvestedFunds from "../model/Funds.js";

// Function to create a new investment record
export const createInvestment = async (req, res) => {
  try {
    const { user_id, fund_id, fund_name, sector, cost, investment_date } =
      req.body;

    const newInvestment = new InvestedFunds({
      user_id,
      fund_id,
      fund_name,
      sector,
      cost,
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
    const { id } = req.params;

    const deletedInvestment = await InvestedFunds.findByIdAndDelete(id);

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
    const { user_id } = req.params;

    // Fetch all investment records for the specified user ID
    const investments = await InvestedFunds.find({ user_id });

    res.json(investments);
  } catch (error) {
    console.error("Error fetching investments:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
