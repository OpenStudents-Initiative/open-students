import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  Stack,
} from "@mui/material";
import { useIntl } from "react-intl";
import { supabase } from "../../App.tsx";
import { COLORS } from "../../styles/colors.tsx";
import CreateReviewTextField from "./CreateReviewTextField.tsx";
import CreateReviewRating from "./CreateReviewRating.tsx";
import CreateReviewDifficulty from "./CreateReviewDifficulty.tsx";
import CreateReviewWouldTakeAgain from "./CreateReviewWouldTakeAgain.tsx";
import CreateReviewObtainedGrade from "./CreateReviewObtainedGrade.tsx";
import CreateReviewCourses from "./CreateReviewCourses.tsx";
import CreateReviewPeriods from "./CreateReviewPeriods.tsx";
import { useRecoilValue } from "recoil";
import { sessionState } from "../../atoms/defaultAtoms.ts";
import axios from "axios";
import { apiUrl } from "../../config.ts";

interface CreateReviewProps {
  open: boolean;
  onClose: () => void;
  professor: { name: string; id: string };
}

interface Course {
  professorId: string;
  courseId: string;
  courseName: string;
}

interface Period {
  name: string;
  id: string;
}

const CreateReview = ({ open, onClose, professor }: CreateReviewProps) => {
  const intl = useIntl();
  const textConstants = {
    writeAReviewFor: intl.formatMessage({ id: "writeAReviewFor" }),
    wouldTakeAgainText: intl.formatMessage({ id: "wouldTakeAgainText" }),
    wouldNotTakeAgainText: intl.formatMessage({ id: "wouldNotTakeAgainText" }),
    obtainedGradeText: intl.formatMessage({ id: "obtainedGradeText" }),
    selectClassText: intl.formatMessage({ id: "selectClassText" }),
    selectPeriodText: intl.formatMessage({ id: "selectPeriodText" }),
    submitReviewText: intl.formatMessage({ id: "submitReviewText" }),

    difficulty: intl.formatMessage({ id: "difficulty" }),
    rating: intl.formatMessage({ id: "rating" }),
  };

  const [reviewText, setReviewText] = useState("");
  const [professorRating, setProfessorRating] = useState(0);
  const [wouldTakeAgain, setWouldTakeAgain] = useState(false);
  const [difficultyRating, setDifficultyRating] = useState(0);
  const [obtainedGrade, setObtainedGrade] = useState(0);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState("");

  const [showDifficultyError, setShowDifficultyError] = useState(false);
  const [showRatingError, setShowRatingError] = useState(false);
  const [showTextFieldError, setShowTextFieldError] = useState(false);
  const [showCourseError, setShowCourseError] = useState(false);
  const [showPeriodError, setShowPeriodError] = useState(false);
  const [showGradeError, setShowGradeError] = useState(false);

  const [courses, setCourses] = useState<string[]>([]);
  const [periods, setPeriods] = useState<string[]>([]);

  const [periodsMap, setPeriodsMap] = useState<Map<string, string>>(new Map());
  const [coursesMap, setCoursesMap] = useState<Map<string, string>>(new Map());
  const session = useRecoilValue(sessionState);

  useEffect(() => {
    async function fetchData() {
      const courses: Course[] = await fetchCourses(professor.id);
      const preCoursesMap = new Map<string, string>();
      for (const course of courses) {
        preCoursesMap.set(course.courseName, course.courseId);
      }
      setCoursesMap(preCoursesMap);
      setCourses(courses.map((course: Course) => course.courseName));

      const periods: Period[] = await fetchPeriods();
      const prePeriodsMap = new Map<string, string>();
      for (const period of periods) {
        prePeriodsMap.set(period.name, period.id);
      }
      setPeriodsMap(prePeriodsMap);
      setPeriods(periods.map((period: Period) => period.name));
    }

    if (professor.id) {
      fetchData();
    }
  }, [professor.id]);

  async function handleReviewSubmit() {
    setShowTextFieldError(reviewText === "");
    setShowRatingError(professorRating < 1);
    setShowDifficultyError(difficultyRating < 1);
    setShowCourseError(selectedCourse === "");
    setShowPeriodError(selectedPeriod === "");
    setShowGradeError(obtainedGrade < 1);

    if (!coursesMap.get(selectedCourse) || !periodsMap.get(selectedPeriod)) {
      console.error("Error: no course or period selected");
      return;
    }

    const reviewObject: postReviewProps = {
      created_at: new Date().toISOString(),
      review: reviewText,
      general_rating: professorRating,
      difficulty_level: difficultyRating,
      course_grade: obtainedGrade,
      would_enroll_again: wouldTakeAgain,
      fk_professor: professor.id,
      fk_course: String(coursesMap.get(selectedCourse)),
      fk_academic_period: String(periodsMap.get(selectedPeriod)),
      creator: session?.user?.id || "",
    };

    postReview(reviewObject);

    if (
      !(
        showCourseError ||
        showPeriodError ||
        showTextFieldError ||
        showRatingError ||
        showDifficultyError ||
        showGradeError
      )
    )
      onClose();
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{`${textConstants.writeAReviewFor} ${professor.name}`}</DialogTitle>
      <DialogContent>
        <Stack spacing={2}>
          <CreateReviewTextField
            reviewText={reviewText}
            setReviewText={setReviewText}
            showError={showTextFieldError}
            setShowError={setShowTextFieldError}
          />
          <CreateReviewRating
            textRating={textConstants.rating}
            professorRating={professorRating}
            setProfessorRating={setProfessorRating}
            showError={showRatingError}
            setShowError={setShowRatingError}
          />
          <CreateReviewDifficulty
            difficultyText={textConstants.difficulty}
            difficultyRating={difficultyRating}
            setDifficultyRating={setDifficultyRating}
            showError={showDifficultyError}
            setShowError={setShowDifficultyError}
          />
          <CreateReviewWouldTakeAgain
            wouldTakeAgainText={textConstants.wouldTakeAgainText}
            wouldNotTakeAgainText={textConstants.wouldNotTakeAgainText}
            wouldTakeAgain={wouldTakeAgain}
            setWouldTakeAgain={setWouldTakeAgain}
          />
          <CreateReviewObtainedGrade
            obtainedGradeText={textConstants.obtainedGradeText}
            obtainedGrade={obtainedGrade}
            setObtainedGrade={setObtainedGrade}
            showError={showGradeError}
            setShowError={setShowGradeError}
          />
          <CreateReviewCourses
            selectClassText={textConstants.selectClassText}
            classes={courses}
            selectedClass={selectedCourse}
            setSelectedClass={setSelectedCourse}
            showError={showCourseError}
            setShowError={setShowCourseError}
          />
          <CreateReviewPeriods
            selectPeriodText={textConstants.selectPeriodText}
            periods={periods}
            selectedPeriod={selectedPeriod}
            setSelectedPeriod={setSelectedPeriod}
            showError={showPeriodError}
            setShowError={setShowPeriodError}
          />
          <Button
            variant="contained"
            onClick={handleReviewSubmit}
            sx={{
              textTransform: "none",
              color: "white",
              backgroundColor: COLORS.primary,
              "&:hover": {
                backgroundColor: COLORS.dark,
              },
            }}
          >
            {textConstants.submitReviewText}
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default CreateReview;

interface postReviewProps {
  created_at: string;
  review: string;
  general_rating: number;
  difficulty_level: number;
  course_grade: number;
  would_enroll_again: boolean;
  fk_professor: string;
  fk_course: string;
  fk_academic_period: string;
  creator: string;
}

const postReview = async (reviewObject: postReviewProps) => {
  try {
    axios.post(`${apiUrl}/reviews`, reviewObject);
  } catch (error) {
    console.error(`Error inserting review: ${error}`);
  }
};

const fetchCourses = async (id: string) => {
  let courses: Course[];
  try {
    courses = await axios.get(`${apiUrl}/professors/${id}/courses`);
  } catch (e) {
    console.error(`Error fetching courses: ${e}`);
    return;
  }

  if (!courses) {
    console.error("No courses found");
    return [];
  }

  const sortedCourses: Course[] = courses.sort(
    (course1: Course, course2: Course) =>
      course1.courseName.localeCompare(course2.courseName),
  );

  return sortedCourses;
};

const fetchPeriods = async () => {
  let periods: Period[];
  try {
    periods = await axios.get(`${apiUrl}/periods`);
  } catch (e) {
    console.error(`Error fetching periods: ${e}`);
    return [];
  }

  return periods.sort(comparePeriods);
};

const comparePeriods = (period1: Period, period2: Period) => {
  // Descending order, prioritizing numbers over strings. E.g: 2023-20, 2023-10, 2022-20, ..., other

  // Extract numeric parts from the strings
  const num1 = parseInt(period1.name, 10) || 0;
  const num2 = parseInt(period2.name, 10) || 0;
  // Compare numeric parts first
  if (num1 !== num2) {
    return num2 - num1;
  }

  // If numeric parts are equal, compare the entire strings
  return period2.name.localeCompare(period1.name);
};
