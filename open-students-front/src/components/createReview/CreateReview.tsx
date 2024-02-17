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

interface CreateReviewProps {
  open: boolean;
  onClose: () => void;
  professor: { name: string; id: string };
}

interface ReviewFormData {
  reviewText: string;
  professorRating: number;
  wouldTakeAgain: boolean;
  difficultyRating: number;
  obtainedGrade: number;
  selectedCourse: Course | null;
  selectedPeriod: Period | null;
}

interface FormErrorStates {
  showDifficultyError: boolean;
  showRatingError: boolean;
  showTextFieldError: boolean;
  showCourseError: boolean;
  showPeriodError: boolean;
  showGradeError: boolean;
}

const CreateReview = ({ open, onClose, professor }: CreateReviewProps) => {
  const intl = useIntl();
  const authHeader = useAuthHeader();
  const textConstants = {
    writeAReviewFor: intl.formatMessage({ id: "writeAReviewFor" }),
    submitReviewText: intl.formatMessage({ id: "submitReviewText" }),
  };

  const [formData, setFormData] = useState<ReviewFormData>({
    reviewText: "",
    professorRating: 0,
    wouldTakeAgain: false,
    difficultyRating: 0,
    obtainedGrade: 0,
    selectedCourse: null,
    selectedPeriod: null,
  });

  const [errorStates, setErrorStates] = useState<FormErrorStates>({
    showDifficultyError: false,
    showRatingError: false,
    showTextFieldError: false,
    showCourseError: false,
    showPeriodError: false,
    showGradeError: false,
  });

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

  function isThereFormErrors() {
    return (
      errorStates.showDifficultyError ||
      errorStates.showRatingError ||
      errorStates.showTextFieldError ||
      errorStates.showCourseError ||
      errorStates.showPeriodError ||
      errorStates.showGradeError
    );
  }

  async function handleReviewSubmit() {
    if (!formData.selectedCourse || !formData.selectedPeriod) {
      console.error("Error: no course or period selected");
      return;
    }

    const reviewObject: CreatedReview = createReviewObject(formData, professor);

    if (authHeader) {
      postReview(reviewObject, authHeader);
    } else {
      console.error("User tried to post a review, but user is not logged in?");
    }

    if (!isThereFormErrors()) onClose();
  }

  function modifyFormData<T extends keyof ReviewFormData>(property: T) {
    return (value: ReviewFormData[T]) => {
      const modifiedFormData: ReviewFormData = { ...formData };
      modifiedFormData[property] = value;
      setFormData(modifiedFormData);
    };
  }

  function modifyErrorStates<T extends keyof FormErrorStates>(error: T) {
    return (value: FormErrorStates[T]) => {
      const modifiedErrorStates: FormErrorStates = { ...errorStates };
      modifiedErrorStates[error] = value;
      setErrorStates(modifiedErrorStates);
    };
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{`${textConstants.writeAReviewFor} ${professor.name}`}</DialogTitle>
      <DialogContent>
        <Stack spacing={2}>
          <CreateReviewTextField
            reviewText={formData.reviewText}
            setReviewText={modifyFormData("reviewText")}
            showError={errorStates.showTextFieldError}
            setShowError={modifyErrorStates("showTextFieldError")}
          />
          <CreateReviewRating
            professorRating={formData.professorRating}
            setProfessorRating={modifyFormData("professorRating")}
            showError={errorStates.showRatingError}
            setShowError={modifyErrorStates("showRatingError")}
          />
          <CreateReviewDifficulty
            difficultyRating={formData.difficultyRating}
            setDifficultyRating={modifyFormData("difficultyRating")}
            showError={errorStates.showDifficultyError}
            setShowError={modifyErrorStates("showDifficultyError")}
          />
          <CreateReviewWouldTakeAgain
            wouldTakeAgain={formData.wouldTakeAgain}
            setWouldTakeAgain={modifyFormData("wouldTakeAgain")}
          />
          <CreateReviewObtainedGrade
            obtainedGrade={formData.obtainedGrade}
            setObtainedGrade={modifyFormData("obtainedGrade")}
            showError={errorStates.showGradeError}
            setShowError={modifyErrorStates("showGradeError")}
          />
          <CreateReviewCourses
            courses={courses}
            selectedCourse={formData.selectedCourse}
            setSelectedCourse={modifyFormData("selectedCourse")}
            showError={errorStates.showCourseError}
            setShowError={modifyErrorStates("showCourseError")}
          />
          <CreateReviewPeriods
            periods={periods}
            selectedPeriod={formData.selectedPeriod}
            setSelectedPeriod={modifyFormData("selectedPeriod")}
            showError={errorStates.showPeriodError}
            setShowError={modifyErrorStates("showPeriodError")}
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

const createReviewObject = (
  formData: ReviewFormData,
  professor: { id: string },
) => {
  return {
    course: formData.selectedCourse!.id,
    code: formData.selectedCourse!.code,
    period: formData.selectedPeriod!.id,
    review: formData.reviewText,
    generalRating: formData.professorRating,
    difficultyLevel: formData.difficultyRating,
    courseGrade: formData.obtainedGrade,
    wouldEnrollAgain: formData.wouldTakeAgain,
    professorId: professor.id,
  };
};

const compareCourses = (course1: Course, course2: Course) =>
  course1.courseName.localeCompare(course2.courseName);

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
