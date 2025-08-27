import mongoose from 'mongoose'

const spendingsSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    enum: ["grocery", "shopping", "entertainment", "restaurants", "cafe", "travel", "others"]
},
  amount: {
    type: Number,
    required: true,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


export const Spendings = mongoose.model("Spendings", spendingsSchema);