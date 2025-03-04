import express from "express";
import bcrypt from "bcrypt";
import User from "../models/User.js";
const router = express.Router();

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    res.json({
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({message: 'Server error'})
  }
};

router.post("/api/auth/login", login);

export default router