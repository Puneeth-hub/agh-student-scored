import express from "express";
import { createStudent, getStudent, updateStudentScores, listStudents } from "../controllers/studentController.js";

const router = express.Router();

router.post("/", createStudent);
router.get("/", listStudents);
router.get("/:id", getStudent);
router.patch("/:id", updateStudentScores);

export default router;
