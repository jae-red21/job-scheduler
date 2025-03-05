import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    if (!process.env.JWT_KEY) {
      throw new Error("Missing JWT_KEY in environment variables");
    }

    const token = jwt.sign(
      { _id: user._id, role: user.role },
      process.env.JWT_KEY,
      { expiresIn: "10d" }
    );

    const { _id, username, role } = user; // Sanitize output

    res.status(200).json({
      success: true,
      token,
      user: { _id, username, role },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export { login };
