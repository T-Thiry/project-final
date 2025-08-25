import mongoose from 'mongoose'

const incomeSchema = new mongoose.Schema({
 amount: {
   type: Number,
   required: true,
   default: 0,
 },
});


export const Income = mongoose.model("Income", incomeSchema);