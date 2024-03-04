import { useState } from "react";
import { useIntl } from "react-intl";
import CreateReviewTextField from "./CreateReviewTextField.tsx";
import CreateReviewRating from "./CreateReviewRating.tsx";
import CreateReviewDifficulty from "./CreateReviewDifficulty.tsx";
import CreateReviewWouldTakeAgain from "./CreateReviewWouldTakeAgain.tsx";
import CreateReviewObtainedGrade from "./CreateReviewObtainedGrade.tsx";
import CreateReviewCourses from "./CreateReviewCourses.tsx";
import CreateReviewPeriods from "./CreateReviewPeriods.tsx";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { CreatedReview } from "../../utils/types.ts";
import type { Period, Course, ApiResponse, Review } from "../../utils/types.ts";
import { fetchAllPeriods } from "../../services/periodService.ts";
import { fetchProfessorCourses } from "../../services/professorService.ts";
import { postReview } from "../../services/reviewService.ts";
import { comparePeriods } from "../../utils/comparisons.ts";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog.tsx";
import { Button } from "../ui/button.tsx";
import { useQuery, useQueryClient, useMutation } from "react-query";

interface CreateReviewProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  professor: { name: string; id: string };
}

const CreateReview = ({ open, setOpen, professor }: CreateReviewProps) => {
  const intl = useIntl();
  const authHeader = useAuthHeader();
  const queryClient = useQueryClient();
  const textConstants = {
    writeAReviewFor: intl.formatMessage({ id: "writeAReviewFor" }),
    submitReviewText: intl.formatMessage({ id: "submitReviewText" }),
  };

  const [reviewText, setReviewText] = useState("");
  const [professorRating, setProfessorRating] = useState(1);
  const [wouldTakeAgain, setWouldTakeAgain] = useState(false);
  const [difficultyRating, setDifficultyRating] = useState(1);
  const [obtainedGrade, setObtainedGrade] = useState(2.5);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<Period | null>(null);

  const [showTextFieldError, setShowTextFieldError] = useState(false);
  const [showCourseError, setShowCourseError] = useState(false);
  const [showPeriodError, setShowPeriodError] = useState(false);

  const {
    data: courses,
    isLoading: isLoadingCourses,
    error: coursesError,
  } = useQuery(["courses", professor.id], () =>
    fetchProfessorCourses(professor.id)
  );

  const {
    data: periods,
    isLoading: isLoadingPeriods,
    error: periodsError,
  } = useQuery("periods", fetchAllPeriods, {
    select: (data) => data.sort(comparePeriods),
  });

  const createReviewObject = (professor: { id: string }) => {
    return {
      professor: professor.id,
      course: selectedCourse!.id,
      academicPeriod: selectedPeriod!.id,
      review: reviewText,
      generalRating: professorRating,
      difficultyLevel: difficultyRating,
      courseGrade: obtainedGrade,
      wouldEnrollAgain: wouldTakeAgain,
    };
  };

  const reviewMutation = useMutation<ApiResponse<Review>, Error, CreatedReview>(
    (review) =>
      postReview(review, authHeader!).then((response) => response.data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["reviews", professor.id]);
      },
    }
  );
  const handleReviewSubmit = async () => {
    if (!selectedCourse || !selectedPeriod) {
      setShowCourseError(!selectedCourse);
      setShowPeriodError(!selectedPeriod);
      return;
    }

    const reviewObject = createReviewObject(professor);
    await reviewMutation.mutateAsync(reviewObject);

    if (!reviewMutation.isError) {
      setOpen(false);
    }
  };
  if (isLoadingCourses || isLoadingPeriods) {
    return (
      <div className="flex items-center justify-center h-full">
        <p>Loading</p>
      </div>
    );
  }

  if (coursesError || periodsError) {
    return (
      <div className="flex items-center justify-center h-full">
        <p>Error</p>
      </div>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{`${textConstants.writeAReviewFor} ${professor.name}`}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col justify-between">
          <CreateReviewTextField
            reviewText={reviewText}
            setReviewText={setReviewText}
            showError={showTextFieldError}
            setShowError={setShowTextFieldError}
          />
          <CreateReviewRating
            professorRating={professorRating}
            setProfessorRating={setProfessorRating}
          />
          <CreateReviewDifficulty
            difficultyRating={difficultyRating}
            setDifficultyRating={setDifficultyRating}
          />
          <CreateReviewWouldTakeAgain
            wouldTakeAgain={wouldTakeAgain}
            setWouldTakeAgain={setWouldTakeAgain}
          />
          <CreateReviewObtainedGrade
            obtainedGrade={obtainedGrade}
            setObtainedGrade={setObtainedGrade}
          />
          <CreateReviewCourses
            courses={courses!}
            selectedCourse={selectedCourse}
            setSelectedCourse={setSelectedCourse}
            showError={showCourseError}
            setShowError={setShowCourseError}
          />
          <CreateReviewPeriods
            periods={periods!}
            selectedPeriod={selectedPeriod}
            setSelectedPeriod={setSelectedPeriod}
            showError={showPeriodError}
            setShowError={setShowPeriodError}
          />
          <Button
            onClick={handleReviewSubmit}
            className="bg-primary hover:bg-black"
          >
            {textConstants.submitReviewText}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateReview;
