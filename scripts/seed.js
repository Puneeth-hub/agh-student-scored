import dotenv from "dotenv";
import connectDB from "../config/db.js";
import Student from "../models/student.js";

dotenv.config();
await connectDB();

const run = async () => {
  try {
    await Student.deleteMany({});
    const s = await Student.create({
      name: "Test Student",
      email: "test@student.com",
      rollNo: "AGH001",
      aptitude: { value: 65, details: { speed: 60, accuracy: 70 } },
      coding: { value: 55, details: { dsa: 50, systems: 40 } },
      resume: { value: 50, details: { projects: 40, format: 60 } },
      mock: { value: 45, details: { communication: 50, problemSolving: 40 } },
      readinessHistory: []
    });
    console.log("Seeded:", s);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

run();
