const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Temporary in-memory storage
let students = [
  { id: 1, name: "Juan Dela Cruz", course: "BSIT", year: 1 },
  { id: 2, name: "Maria Santos", course: "BSCS", year: 2 }
];

let nextId = 3;

// Validate student data
function validateStudent(data) {
  return (
    data &&
    typeof data.name === "string" &&
    data.name.trim() !== "" &&
    typeof data.course === "string" &&
    data.course.trim() !== "" &&
    Number.isInteger(data.year) &&
    data.year >= 1 &&
    data.year <= 6
  );
}

// Root route
app.get("/", (req, res) => {
  res.json({
    message: "Student Records API is running",
    endpoints: 5
  });
});

// 1. READ ALL students
app.get("/api/students", (req, res) => {
  res.status(200).json(students);
});

// 2. READ ONE student
app.get("/api/students/:id", (req, res) => {
  const id = Number(req.params.id);
  const student = students.find((s) => s.id === id);

  if (!student) {
    return res.status(404).json({
      error: "Student not found"
    });
  }

  res.status(200).json(student);
});

// 3. CREATE a student
app.post("/api/students", (req, res) => {
  if (!validateStudent(req.body)) {
    return res.status(400).json({
      error: "Name, course, and a year from 1 to 6 are required"
    });
  }

  const student = {
    id: nextId++,
    name: req.body.name.trim(),
    course: req.body.course.trim(),
    year: req.body.year
  };

  students.push(student);
  res.status(201).json(student);
});

// 4. UPDATE a student
app.put("/api/students/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = students.findIndex((s) => s.id === id);

  if (index === -1) {
    return res.status(404).json({
      error: "Student not found"
    });
  }

  if (!validateStudent(req.body)) {
    return res.status(400).json({
      error: "Valid name, course, and year are required"
    });
  }

  students[index] = {
    id,
    name: req.body.name.trim(),
    course: req.body.course.trim(),
    year: req.body.year
  };

  res.status(200).json(students[index]);
});

// 5. DELETE a student
app.delete("/api/students/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = students.findIndex((s) => s.id === id);

  if (index === -1) {
    return res.status(404).json({
      error: "Student not found"
    });
  }

  const deletedStudent = students.splice(index, 1)[0];

  res.status(200).json({
    message: "Student deleted successfully",
    student: deletedStudent
  });
});

// Handle invalid JSON and other errors
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({
      error: "Invalid JSON request body"
    });
  }

  console.error(err);
  res.status(500).json({ error: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`Student Records API running on port ${PORT}`);
});