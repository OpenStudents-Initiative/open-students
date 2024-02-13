import express from "express";

const app = express();

const professors = [
  {
    name: "John Doe",
    university: "Universidad de los Andes",
    dependency: "Computer Science",
    averageRating: 5.0,
    averageCourseGrade: 5.0,
    averageDifficultyLevel: 5.0,
  },
  {
    name: "Jane Smith",
    university: "Universidad de los Andes",
    dependency: "Mathematics",
    averageRating: 4.5,
    averageCourseGrade: 4.8,
    averageDifficultyLevel: 4.2,
  },
];

const periods = [
  { id: "2023-20", name: "Segundo periodo, 2023" },
  { id: "2024-10", name: "Primer periodo, 2024" },
];

const reviews = [
  {
    id: "8388e950-b6dc-4650-a328-325588692321",
    course: "Introduction to Programming",
    code: "CS101",
    period: "2023-20",
    createdAt: "2023-11-20",
    review: "Great professor! Very clear and helpful.",
    generalRating: 5,
    difficultyLevel: 4,
    courseGrade: 5,
    wouldEnrollAgain: true,
    professorId: "1",
  },
  {
    id: "4cb6b49b-ee7e-41a5-a262-15dc3d4f1c56",
    course: "Data Structures and Algorithms",
    code: "CS202",
    period: "2024-10",
    createdAt: "2024-02-10",
    review:
      "Good class, but challenging. Professor was knowledgeable but could be more engaging.",
    generalRating: 4,
    difficultyLevel: 5,
    courseGrade: 4,
    wouldEnrollAgain: false,
    professorId: "2",
  },
];

const courses = [
  {
    professorId: "1",
    courseId: "ISIS-1221",
    courseName: "Introduction to Programming",
  },
  {
    professorId: "2",
    courseId: "ISIS-1225",
    courseName: "Data Structures and Algorithms",
  },
];

function generateUniqueReviewId() {
  return crypto.randomUUID();
}

app.get("/", (req, res) => {
  res.send("Hello, this is the Mock API root endpoint. Ya like jazz?");
});

app.get("/professors", (req, res) => {
  const urlKeyParams = req.query.keys;
  if (!urlKeyParams) {
    res.json(professors);
    return;
  }
  const desiredKeys = (urlKeyParams as string).split(",");
  const filteredProfessors = professors.map((professor) => {
    return Object.fromEntries(
      Object.entries(professor).filter(
        ([key]) => desiredKeys.includes(key) || !desiredKeys.length,
      ),
    );
  });
  res.json(filteredProfessors);
});

app.get("/periods", (req, res) => {
  res.json(periods);
});

app.get("/professors/:id", (req, res) => {
  const professor = professors.find((p) => p.name === req.params.id);
  if (professor) {
    res.json(professor);
  } else {
    res.status(404).send("Professor not found");
  }
});

app.get("/professors/:id/reviews", (req, res) => {
  const professorId = req.params.id;
  const professorReviews = reviews.filter((r) => r.professorId === professorId);
  res.json(professorReviews);
});

app.get("/professors/:id/courses", (req, res) => {
  const professorId = req.params.id;
  const professorCourses = courses.filter((c) => c.professorId === professorId);
  res.json(professorCourses);
});

app.post("/reviews", (req, res) => {
  // Validate data based on the provided review schema
  if (
    !req.body.course ||
    !req.body.code ||
    !req.body.period ||
    !req.body.review ||
    !req.body.generalRating ||
    !req.body.difficultyLevel ||
    !req.body.courseGrade ||
    !req.body.wouldEnrollAgain ||
    !req.body.professorId
  ) {
    return res.status(400).send("Missing required fields in review data");
  }

  // Generate a unique ID for the new review
  const newReviewId = generateUniqueReviewId();

  // Create a new review object with the received data
  const newReview = {
    id: newReviewId,
    course: req.body.course,
    code: req.body.code,
    period: req.body.period,
    createdAt: new Date().toISOString(), // Get the current date and time
    review: req.body.review,
    generalRating: req.body.generalRating,
    difficultyLevel: req.body.difficultyLevel,
    courseGrade: req.body.courseGrade,
    wouldEnrollAgain: req.body.wouldEnrollAgain,
    professorId: req.body.professorId,
  };

  // Add the new review to the `reviews` array
  reviews.push(newReview);

  // Log the received review for debugging purposes
  console.log("Received new review:", newReview);

  // Respond with a success status code (201 Created) and the newly created review
  res.status(201).json(newReview);
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
