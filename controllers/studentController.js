import Student from "../models/student.js";

export const createStudent = async (req, res) => {
  try {
    const { name, email, rollNo } = req.body;
    if (!name || !email) return res.status(400).json({ message: "name and email required" });

    const existing = await Student.findOne({ email });
    if (existing) return res.status(409).json({ message: "Student with this email already exists" });

    const student = new Student({ name, email, rollNo });
    await student.save();
    res.status(201).json({ success: true, student });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json({ success: true, student });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateStudentScores = async (req, res) => {
  try {
    /**
     * PATCH /api/students/:id
     * body can include aptitude, coding, resume, mock
     */
    const payload = req.body;
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });

    // merge updates
    ["aptitude", "coding", "resume", "mock"].forEach((k) => {
      if (payload[k] !== undefined) student[k] = payload[k];
    });

    await student.save();
    res.json({ success: true, student });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const listStudents = async (req, res) => {
  try {
    const students = await Student.find().select("-readinessHistory");
    res.json({ success: true, students });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
