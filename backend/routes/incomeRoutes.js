import express from "express";

const router = express.Router();

// In-memory storage for income (replace with a database in production)
let incomeData = { income: 0 };

// GET /income - Fetch the current income
router.get("/", (req, res) => {
  res.status(200).json(incomeData);
});

// POST /income - Add or update the income
router.post("/", (req, res) => {
  const { income } = req.body;

  if (typeof income !== "number" || income < 0) {
    return res.status(400).json({ error: "Invalid income value" });
  }

  incomeData.income = income;
  res.status(200).json({ message: "Income updated successfully", income: incomeData.income });
});

// DELETE /income - Delete the income
router.delete("/", (req, res) => {
  incomeData = { income: 0 };
  res.status(200).json({ message: "Income deleted successfully" });
});

export default router; // Ensure this line is present