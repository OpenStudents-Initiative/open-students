import { Box, Typography } from "@mui/material";
import ProfessorCard from "../components/professorCard/ProfessorCard.tsx";
import ReviewCard from "../components/reviewCard/ReviewCard.tsx";
import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import CreateReview from "../components/createReview/CreateReview.tsx";
import { currentProfessorIdState } from "../atoms/defaultAtoms.ts";
import { useRecoilValue } from "recoil";
import { Professor, Review } from "../utils/types.ts";
import {
  fetchProfessorById,
  fetchProfessorReviews,
} from "../services/professorService.ts";

export default function ProfessorPage() {
  const intl = useIntl();
  const professorId = useRecoilValue(currentProfessorIdState);
  const textConstants = {
    noReviewsYet: intl.formatMessage({ id: "noReviewsYet" }),
    beTheFirstReview: intl.formatMessage({ id: "beTheFirstReview" }),

    loadingProfessor: intl.formatMessage({ id: "loadingProfessor" }),
    loadingUniversity: intl.formatMessage({ id: "loadingUniversity" }),
    loadingDependency: intl.formatMessage({ id: "loadingDependency" }),
  };

  const [professor, setProfessor] = useState<Professor>({
    name: textConstants.loadingProfessor,
    university: textConstants.loadingUniversity,
    dependency: textConstants.loadingDependency,
    averageRating: 5.0,
    averageCourseGrade: 5.0,
    averageDifficultyLevel: 5.0,
  });

  const [isReviewPopupOpen, setReviewPopupOpen] = useState(false);

  const handleOpenReviewPopup = () => {
    setReviewPopupOpen(true);
  };

  const handleCloseReviewPopup = () => {
    setReviewPopupOpen(false);
  };

  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    async function fetchData() {
      const professor = await fetchProfessorById(professorId);

      if (professor) {
        setProfessor(professor);
      }

      const reviews = await fetchProfessorReviews(professorId);
      const sortedReviews = reviews.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
      setReviews(sortedReviews);
    }

    if (professorId) fetchData();
  }, [professorId]);

  return (
    <Box
      sx={{ flexGrow: 1 }}
      width="90%"
      margin="auto"
      border={0}
      paddingBottom="1.5em"
    >
      <Grid container direction={"row"} spacing={9} justifyContent="center">
        <Grid item md={12} lg={3}>
          <ProfessorCard
            professor={professor}
            makeReview={handleOpenReviewPopup}
          />
        </Grid>
        <Grid item md={12} lg={9}>
          {reviews && reviews.length > 0 ? (
            reviews.map((review, index) => (
              <ReviewCard key={index} review={review} />
            ))
          ) : (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  textAlign: "center",
                  justifyContent: "center",
                  color: "text.secondary",
                }}
              >
                {textConstants.noReviewsYet}
                <br />
                {textConstants.beTheFirstReview}
              </Typography>
            </Box>
          )}
          <CreateReview
            open={isReviewPopupOpen}
            onClose={handleCloseReviewPopup}
            professor={{ id: professorId, ...professor }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
