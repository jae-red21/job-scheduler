import mongoose from "mongoose";
import { v4 as uuid } from "uuid";

const userSchema = new mongoose.Schema({
  id: { type: String, default: uuid },
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["supervisor", "agent"], required: true },
  isAvailable: {
    type: Boolean,
    default: function () {
      return this.role === 'agent';
    },
  },
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model('User', userSchema)

export default User
