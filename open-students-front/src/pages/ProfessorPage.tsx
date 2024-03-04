import ProfessorCard from "../components/professorCard/ProfessorCard.tsx";
import ReviewCard from "../components/reviewCard/ReviewCard.tsx";
import { useState } from "react";
import { useIntl } from "react-intl";
import CreateReview from "../components/createReview/CreateReview.tsx";
import {
  fetchProfessorById,
  fetchProfessorReviews,
} from "../services/professorService.ts";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

export default function ProfessorPage() {
  const intl = useIntl();
  const { id: professorId } = useParams();

  const {
    data: professor,
    isLoading: isLoadingProfessor,
    isError: professorError,
  } = useQuery(["professor", professorId], () =>
    fetchProfessorById(professorId)
  );

  const {
    data: reviews,
    isLoading: isLoadingReviews,
    isError: reviewsError,
  } = useQuery(["reviews", professorId], () =>
    fetchProfessorReviews(professorId)
  );

  const textConstants = {
    noReviewsYet: intl.formatMessage({ id: "noReviewsYet" }),
    beTheFirstReview: intl.formatMessage({ id: "beTheFirstReview" }),

    loadingProfessor: intl.formatMessage({ id: "loadingProfessor" }),
    loadingUniversity: intl.formatMessage({ id: "loadingUniversity" }),
    loadingDependency: intl.formatMessage({ id: "loadingDependency" }),
  };

  const [isReviewPopupOpen, setReviewPopupOpen] = useState(false);

  const handleOpenReviewPopup = () => {
    setReviewPopupOpen(true);
  };

  if (isLoadingProfessor || isLoadingReviews) {
    return (
      <div className="flex items-center justify-center h-full">
        <p>{textConstants.loadingProfessor}</p>
      </div>
    );
  }

  if (professorError || reviewsError) {
    return (
      <div className="flex items-center justify-center h-full">
        <p>Error</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row  gap-8 p-2">
      <div>
        <ProfessorCard
          professor={professor}
          makeReview={handleOpenReviewPopup}
        />
      </div>
      <div className="flex flex-col w-full gap-4">
        {reviews && reviews.length > 0 ? (
          reviews.map((review, index) => (
            <ReviewCard key={index} review={review} />
          ))
        ) : (
          <div className="flex items-center h-full">
            <p className="text-center">
              {textConstants.noReviewsYet}
              <br />
              {textConstants.beTheFirstReview}
            </p>
          </div>
        )}

        {professor && professorId && (
          <CreateReview
            open={isReviewPopupOpen}
            setOpen={setReviewPopupOpen}
            professor={{ id: professorId, ...professor }}
          />
        )}
      </div>
    </div>
  );
}
