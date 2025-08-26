import mongoose from "mongoose";

const ScoreSchema = new mongoose.Schema({
  value: { type: Number, required: true }, 
  details: { type: mongoose.Schema.Types.Mixed } 
}, { _id: false });

const ReadinessRecordSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  readinessPercent: { type: Number, required: true },
  breakdown: {
    aptitude: ScoreSchema,
    coding: ScoreSchema,
    resume: ScoreSchema,
    mock: ScoreSchema
  },
  improvementPlan: [String]
}, { _id: false });

const StudentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  rollNo: { type: String },
  aptitude: ScoreSchema,
  coding: ScoreSchema,
  resume: ScoreSchema,
  mock: ScoreSchema,
  readinessHistory: [ReadinessRecordSchema],
}, { timestamps: true });

export default mongoose.model("Student", StudentSchema);
