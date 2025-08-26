import express from "express";
import { calculateReadiness, getLatestReadinessForStudent } from "../controllers/readinessController.js";

const router = express.Router();

router.post("/", calculateReadiness); 
router.get("/:studentId", getLatestReadinessForStudent); 

export default router;
