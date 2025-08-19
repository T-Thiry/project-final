import express from 'express'
import bcrypt from 'bcryptjs'
import { User } from '../models/user.js'

const router = express.Router()


// POST - Register a new user
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body
    const salt = bcrypt.genSaltSync()
    const user = new User({ name, email, password: bcrypt.hashSync(password, salt)
    }) 
 
    //await to not send response before database finished saving
    await user.save()
 
    res.status(201).json({
      success: true,
      message: "User created successfully.",
      response: {
        id: user._id,
        accessToken: user.accessToken
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
 