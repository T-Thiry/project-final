import express from "express";
import { Spendings } from "../models/Spendings.js";

const router = express.Router();

// POST - Add income
router.post("/", async (req, res) => {
  const { category, amount } = req.body;

  try {
    let newSpending = await Spendings.create({ category, amount});
      res.status(201).json(newSpending);
  } catch (error) {
    res.status(400).json({ message: "Failed to add spending", error: error.message });
  }
});

// GET - Get all spendings
router.get("/", async (req, res) => {
  try {
    const spendings = await Spendings.find();
    res.status(200).json(spendings);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch spendings", error: error.message });
  }
});

// GET - Get total spendings
router.get("/total", async (req, res) => {
  try {
    const total = await Spendings.aggregate([
      { $group: {_id: null, totalAmount: { $sum: "$amount" } } },
    ]);
    console.log("Total Spendings Calculation:", total);
    res.status(200).json({ total: total[0]?.totalAmount || 0 });
  } catch (error) {
    console.error("Error Fetching Total Spendings:", error.message); 
    res.status(500).json({ message: "Failed to fetch total spendings", error: error.message });
  }
});

export default router;