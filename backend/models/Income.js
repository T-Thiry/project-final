import mongoose from 'mongoose'

const incomeSchema = new mongoose.Schema({
 amount: {
   type: Number,
   required: true,
   default: 0,
 },
 month: {
   type: String,
   required: true,
 },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Income = mongoose.model("Income", incomeSchema);