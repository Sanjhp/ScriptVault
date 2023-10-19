import InvestedFunds from "../model/Funds.js";

// Function to create a new investment record
export const createInvestment = async (req, res) => {
  try {
    console.log(req.body);
    const { user, fund_id, fund_name, sector, cost, quantity } = req.body;

    // Ensure that cost is a valid number
    const costAsNumber = parseFloat(cost);

    if (isNaN(costAsNumber)) {
      // Handle the case where cost is not a valid number
      return res.status(400).json({ error: "Invalid cost value" });
    }

    // Check if an investment already exists for the same fund and user
    const existingInvestment = await InvestedFunds.findOne({
      user,
      fund_id,
    });

    if (existingInvestment) {
      // Update cost and quantity for the existing investment
      existingInvestment.cost += costAsNumber;
      existingInvestment.quantity += quantity;
      const updatedInvestment = await existingInvestment.save();
      res.status(200).json(updatedInvestment);
    } else {
      // Create a new investment
      const newInvestment = new InvestedFunds({
        user,
        fund_id,
        fund_name,
        sector,
        cost: costAsNumber,
        quantity,
      });

      const savedInvestment = await newInvestment.save();
      res.status(201).json(savedInvestment);
    }
  } catch (error) {
    console.error("Error creating or updating investment:", error);
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
    console.log(user);
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
