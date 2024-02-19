import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  Stack,
} from "@mui/material";
import { useIntl } from "react-intl";
import { COLORS } from "../../styles/colors.tsx";
import CreateReviewTextField from "./CreateReviewTextField.tsx";
import CreateReviewRating from "./CreateReviewRating.tsx";
import CreateReviewDifficulty from "./CreateReviewDifficulty.tsx";
import CreateReviewWouldTakeAgain from "./CreateReviewWouldTakeAgain.tsx";
import CreateReviewObtainedGrade from "./CreateReviewObtainedGrade.tsx";
import CreateReviewCourses from "./CreateReviewCourses.tsx";
import CreateReviewPeriods from "./CreateReviewPeriods.tsx";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { CreatedReview } from "../../utils/types.ts";
import type { Period, Course } from "../../utils/types.ts";
import { fetchAllPeriods } from "../../services/periodService.ts";
import { fetchProfessorCourses } from "../../services/professorService.ts";
import { postReview } from "../../services/reviewService.ts";
import { compareCourses, comparePeriods } from "../../utils/comparisons.ts";

interface CreateReviewProps {
  open: boolean;
  handleClose: () => void;
  professor: { name: string; id: string };
}

const CreateReview = ({ open, handleClose, professor }: CreateReviewProps) => {
  const intl = useIntl();
  const authHeader = useAuthHeader();
  const textConstants = {
    writeAReviewFor: intl.formatMessage({ id: "writeAReviewFor" }),
    submitReviewText: intl.formatMessage({ id: "submitReviewText" }),
  };

  const [reviewText, setReviewText] = useState("");
  const [professorRating, setProfessorRating] = useState(0);
  const [wouldTakeAgain, setWouldTakeAgain] = useState(false);
  const [difficultyRating, setDifficultyRating] = useState(0);
  const [obtainedGrade, setObtainedGrade] = useState(0);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<Period | null>(null);

  const [showDifficultyError, setShowDifficultyError] = useState(false);
  const [showRatingError, setShowRatingError] = useState(false);
  const [showTextFieldError, setShowTextFieldError] = useState(false);
  const [showCourseError, setShowCourseError] = useState(false);
  const [showPeriodError, setShowPeriodError] = useState(false);
  const [showGradeError, setShowGradeError] = useState(false);

  const [courses, setCourses] = useState<Course[]>([]);
  const [periods, setPeriods] = useState<Period[]>([]);

  useEffect(() => {
    async function fetchData() {
      const courses: Course[] = await fetchProfessorCourses(professor.id);
      courses.sort(compareCourses);
      setCourses(courses);

      const periods: Period[] = await fetchAllPeriods();
      periods.sort(comparePeriods);
      setPeriods(periods);
    }

    if (professor.id) {
      fetchData();
    }
  }, [professor.id]);

  const isThereFormErrors = () => {
    return (
      showDifficultyError ||
      showRatingError ||
      showTextFieldError ||
      showCourseError ||
      showPeriodError ||
      showGradeError
    );
  };

  const createReviewObject = (professor: { id: string }) => {
    return {
      course: selectedCourse!.id,
      code: selectedCourse!.code,
      period: selectedPeriod!.id,
      review: reviewText,
      generalRating: professorRating,
      difficultyLevel: difficultyRating,
      courseGrade: obtainedGrade,
      wouldEnrollAgain: wouldTakeAgain,
      professorId: professor.id,
    };
  };
  const handleReviewSubmit = async () => {
    if (!selectedCourse || !selectedPeriod) {
      console.error("Error: no course or period selected");
      return;
    }

    const reviewObject: CreatedReview = createReviewObject(professor);

    if (authHeader) {
      postReview(reviewObject, authHeader);
    } else {
      console.error("User tried to post a review, but user is not logged in?");
    }

    if (!isThereFormErrors()) handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
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
            professorRating={professorRating}
            setProfessorRating={setProfessorRating}
            showError={showRatingError}
            setShowError={setShowRatingError}
          />
          <CreateReviewDifficulty
            difficultyRating={difficultyRating}
            setDifficultyRating={setDifficultyRating}
            showError={showDifficultyError}
            setShowError={setShowDifficultyError}
          />
          <CreateReviewWouldTakeAgain
            wouldTakeAgain={wouldTakeAgain}
            setWouldTakeAgain={setWouldTakeAgain}
          />
          <CreateReviewObtainedGrade
            obtainedGrade={obtainedGrade}
            setObtainedGrade={setObtainedGrade}
            showError={showGradeError}
            setShowError={setShowGradeError}
          />
          <CreateReviewCourses
            courses={courses}
            selectedCourse={selectedCourse}
            setSelectedCourse={setSelectedCourse}
            showError={showCourseError}
            setShowError={setShowCourseError}
          />
          <CreateReviewPeriods
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
