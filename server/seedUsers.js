import mongoose from "mongoose";
import bcrypt from "bcrypt";
import {faker} from '@faker-js/faker';
import User from "./models/User.js";
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

const generateAgent = (index) => {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const username = `${firstName.toLowerCase()}.${lastName.toLowerCase()}`;
  const email = faker.internet.email({ firstName, lastName });
  const password = `agent${index + 1}`;

  return {
    username,
    email,
    password,
    role: "agent",
  };
};

const seedUsers = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/job-scheduler", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");

    const supervisor = new User({
      username: "merid",
      email: "merid@gmail.com",
      password: await hashPassword("merid12"),
      role: "supervisor",
    });

    await User.deleteMany({});
    console.log("Cleared existing users");

    await supervisor.save();
    console.log("Supervisor created:", supervisor);

    const agents = Array.from({ length: 5 }, (_, index) =>
      generateAgent(index)
    );

    for (let agent of agents) {
      const newAgent = new User({
        username: agent.username,
        email: agent.email,
        password: await hashPassword(agent.password),
        role: agent.role,
      });
      await newAgent.save();
      console.log("Agent created:", newAgent);
    }

    console.log("Seeding completed successfully");
  } catch (error) {
    console.error("Error seeding users", error);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  }
};

seedUsers();
