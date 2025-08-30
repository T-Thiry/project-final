import mongoose from 'mongoose'

const spendingsSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    enum: ["Rent", "Parking", "Insurance", "Broadband", "Phone", "Grocery", "Shopping", "Entertainment", "Restaurants", "Cafe", "Travel", "Others"]
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