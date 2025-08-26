import Student from "../models/student.js";
import { computeWeightedReadiness, generateImprovementPlan } from "../utils/scoreCalculator.js";

const parseWeightsFromEnv = () => {
  try {
    if (process.env.READINESS_WEIGHTS) {
      return JSON.parse(process.env.READINESS_WEIGHTS);
    }
  } catch (err) {
    console.warn("Invalid READINESS_WEIGHTS format, using defaults.");
  }
  return null;
};

export const calculateReadiness = async (req, res) => {
  try {
    const { studentId, aptitude, coding, resume, mock, weights } = req.body;

    // prefer passed weights, else env, else defaults
    const effectiveWeights = weights ?? parseWeightsFromEnv() ?? {
      aptitude: 0.25,
      coding: 0.35,
      resume: 0.2,
      mock: 0.2
    };

    const { readinessPercent, breakdown } = computeWeightedReadiness(
      { aptitude, coding, resume, mock },
      effectiveWeights
    );

    if (!readinessPercent || !breakdown) {
      return res.status(400).json({ message: "Invalid readiness calculation" });
    }

    const improvementPlan = generateImprovementPlan(breakdown);

    const record = {
      readinessPercent,
      breakdown,
      improvementPlan
    };

    if (studentId) {
      const student = await Student.findById(studentId);
      if (!student) return res.status(404).json({ message: "Student not found" });

      student.readinessHistory = student.readinessHistory || [];
      student.readinessHistory.unshift(record);

      // update fields
      if (aptitude) student.aptitude = aptitude;
      if (coding) student.coding = coding;
      if (resume) student.resume = resume;
      if (mock) student.mock = mock;

      await student.save();
    }

    return res.json({ success: true, record });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};


export const getLatestReadinessForStudent = async (req, res) => {
  // GET /api/readiness/:studentId
  try {
    const { studentId } = req.params;
    const student = await Student.findById(studentId);
    if (!student) return res.status(404).json({ message: "Student not found" });
    const latest = (student.readinessHistory && student.readinessHistory[0]) || null;
    return res.json({ success: true, latest, readinessHistory: student.readinessHistory || [] });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};
