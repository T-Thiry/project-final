import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'; 
import { User } from '../models/User.js';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables
console.log('JWT_SECRET:', process.env.JWT_SECRET);

const router = express.Router()
const JWT_SECRET = process.env.JWT_SECRET || 'your_secure_secret_key'; // Use environment variable for the secret key

// POST - Register a new user
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body
    const salt = bcrypt.genSaltSync()
    const hashedPassword = bcrypt.hashSync(password, salt);
    const user = new User({ name, email, password: hashedPassword
    }) 
 
    //await to not send response before database finished saving
    await user.save()

    // Generate a JWT token
    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
    expiresIn: '1h', // Token expires in 1 hour
    });
 
    res.status(201).json({
      success: true,
      message: "User created successfully.",
      response: {
        id: user._id,
        accessToken: token,
      }
    })
 
  } catch (error) {
    console.error("Signup error:", error)
    res.status(400).json({
      success: false,
      message: "Failed to create user.",
      response: error.message 
    })
  }
 })
 

 export default router
 