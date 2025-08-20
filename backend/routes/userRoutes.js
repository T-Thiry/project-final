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

      if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and password are required.",
      });
    }

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
 

 // POST - Login route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }
 
    // Find user by email
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found with provided email.",
      })
    }
    
    // Compare the provided password with the stored hashed password
    const isPasswordValid = bcrypt.compareSync(password, user.password)
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Incorrect password. Please try again.",
      })
    }
    // Generate a JWT token
    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
      expiresIn: '1h', // Token expires in 1 hour
    })

    res.status(200).json({
      success: true,
      message: "Login successfull.",
      response: {
        id: user._id,
        accessToken: token,
      }
    })
 
  } catch (error) {
    console.error("Login error:", error)
    res.status(500).json({
      success: false,
      message: "Failed to login. Please try again.",
      response: error.message 
    })
  }
 })

 export default router
 