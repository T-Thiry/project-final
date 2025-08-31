import express from "express";
import { Income } from "../models/Income.js";
import mongoose from "mongoose";

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

// GET /income/months
router.get("/months", async (req, res) => {
  try { 
    const months = await Income.find({}, '_id month amount createdAt').sort({ createdAt: -1 });
    res.json(months);
  } catch (error) {
    console.error("Error fetching months:", error);
    res.status(500).json({ message: "Failed to fetch months"});
  }
});

// POST /income - Add a new income
router.post("/", async (req, res) => {
  const { amount, month } = req.body;

  if (typeof amount !== "number" || amount < 0) {
    return res.status(400).json({ error: "Invalid income value" });
  }

  if (!month || typeof month !== "string") {
    return res.status(400).json({ error: "Invalid month value" });
  }

  try {
    const newIncome = await Income.create({month, amount});
      res.status(201).json(newIncome);
  } catch (error) {
      res.status(400).json({ message: "Failed to add income", error: error.message });
  }
});

// DELETE /income - Delete the income
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid income ID" });
  }
  try {
    const deletedIncome = await Income.findByIdAndDelete(id); 
    if (!deletedIncome) {
      return res.status(404).json({ message: "Income not found" });
    }
    res.status(200).json({ message: "Income deleted successfully" });
  } catch (error) {
    console.error("Error deleting income:", error.message, error.stack);
    return res.status(500).json({ error: "Server error" });
  }
});

export default router;