import bodyParser from "body-parser";
import express from "express";
import cors from "cors";

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use((cors as (options: cors.CorsOptions) => express.RequestHandler)({}));

// Testing JWT
const TOKEN =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE3MDc5MjUwMDgsImV4cCI6MTczOTQ2MTAwOCwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJSb2xlIjpbIk1hbmFnZXIiLCJQcm9qZWN0IEFkbWluaXN0cmF0b3IiXX0.Pr24VsJ0XpVUgZ_o1mSNWiJK7J811XfrhiMqRkkbPcQ";

const professors = [
  {
    id: "1",
    name: "John Doe",
    university: "Universidad de los Andes",
    dependency: "Computer Science",
    averageRating: 5.0,
    averageCourseGrade: 5.0,
    averageDifficultyLevel: 5.0,
  },
  {
    id: "2",
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
    id: "1",
    professorId: "1",
    code: "ISIS-1221",
    courseName: "Introduction to Programming",
  },
  {
    id: "2",
    professorId: "2",
    code: "ISIS-1225",
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
  const professor = professors.find((p) => p.id === req.params.id);
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
    req.body.wouldEnrollAgain === undefined ||
    !req.body.professorId
  ) {
    return res.status(400).send("Missing required fields in review data");
  }

  if (
    !req.headers.authorization ||
    req.headers.authorization.split(" ")[1] != TOKEN
  ) {
    return res.status(401).send("Missing identity for the following action");
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

  // Respond with a success status code (201 Created) and the newly created review
  res.status(201).json(newReview);
});

app.post("/login", (req, res) => {
  const { password } = req.body;
  const email = req.body.username;

  // Validate required fields
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Missing required fields: username and password" });
  }

  // You can validate username and password length or format here (optional)

  // Placeholder response object (customize as needed)
  const userData = {
    token: TOKEN,
    userInfo: {
      uuid: crypto.randomUUID(),
      name: "Testing User",
      email: email,
    },
  };

  // Respond with the placeholder object
  res.json(userData);
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
