import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({success:false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({success:false, message: "Invalid credentials" });
    }

    if (!process.env.JWT_KEY) {
      console.error("Missing JWT_KEY in environment variables");
      return res.status(500).json({success: false, message: 'Server configuration error'});
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

const verify = (req, res) => {
  try {
    if (!req.user) {
      return res.status(404).json({success: false, message: 'Unauthorized'});
    }

    const sanitizedUser = {
      _id: req.user._id,
      username: req.user.username,
      role: req.user.role,
      email: req.user.email, // Include only if needed
  };

  res.status(200).json({success: true, user: sanitizedUser})
  } catch (error) {
    console.lerror(error);
    res.status(500).json({success: false, message: 'Server Error'})
  }
}

export { login, verify };
