import express from "express";
import { Income } from "../models/Income.js";

const router = express.Router();

// GET /income - Fetch the current income
router.get("/", async (req, res) => {
  try {
    let income = await Income.findOne();
    if (!income) {
      income = await Income.create({ amount: 0 });
    }
    res.status(200).json({ income: income.amount });
  } catch (error) {
    console.error("Error fetching income:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// POST /income - Add or update the income
router.post("/", async (req, res) => {
  const { income } = req.body;

  if (typeof income !== "number" || income < 0) {
    return res.status(400).json({ error: "Invalid income value" });
  }

  try {
    let incomeData = await Income.findOne();
    if (!incomeData) {
      incomeData = await Income.create({ amount: income });
    } else {
      incomeData.amount = income;
      await incomeData.save();
    }
    res.status(200).json({ message: "Income updated successfully", income: incomeData.amount });
  } catch (error) {
    console.error("Error updating income:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// DELETE /income - Delete the income
router.delete("/", async (req, res) => {
  try {
    await Income.deleteMany(); // Remove all income records
    res.status(200).json({ message: "Income deleted successfully" });
  } catch (error) {
    console.error("Error deleting income:", error);
    return res.status(500).json({ error: "Server error" });
  }
});

export default router;