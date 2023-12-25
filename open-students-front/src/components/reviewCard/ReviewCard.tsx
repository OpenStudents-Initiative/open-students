import React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Rating from '@mui/material/Rating';
import { useIntl } from 'react-intl';
import ReviewDifficultyLevel from "./ReviewDifficultyLevel.tsx";


interface Review {
    id: string;
    course: string;
    code: string;
    period: string;
    createdAt: string;
    review: string;
    generalRating: number;
    difficultyLevel: number;
    courseGrade: number;
    wouldEnrollAgain: boolean;
    professorId: string;
}

interface ReviewCardProps {
    review: Review;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {

    const intl = useIntl();
    const textConstants = {
        wouldEnrollAgainText: intl.formatMessage({ id: "wouldEnrollAgainText" }),
        wouldNotEnrollAgainText: intl.formatMessage({ id: "wouldNotEnrollAgainText" }),
        semesterText: intl.formatMessage({ id: "semesterText" }),
    };

    const Line = () => <hr style={{ color: "black", height: 0.1 }} />

    return (
        <Paper elevation={3} sx={{ padding: 2, marginBottom: 2, width: '100%' }}>

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                }}
            >
                <Typography variant="body1" align="left" maxWidth={"75%"}>
                    {`${review.code}: ${review.course}`}
                </Typography>
                <Typography variant="body1" align="right">
                    {`${textConstants.semesterText}: ${review.period}`}
                </Typography>
            </Box>

            <ReviewRating value={review.generalRating} />
            <ReviewDifficultyLevel difficultyLevel={review.difficultyLevel} />

            <Line />

            <Typography variant="body1" align="left">{review.review}</Typography>

            <Line />

            <WouldEnrollAgain positiveText={textConstants.wouldEnrollAgainText} negativeText={textConstants.wouldNotEnrollAgainText} value={review.wouldEnrollAgain} />
        </Paper>
    );
};


export default ReviewCard;


const ReviewRating = ({ value }: { value: number }) => <Box sx={{ display: "flex", alignItems: "center" }}>
    <Rating value={value} readOnly precision={0.1} />
    <Typography variant="body1" sx={{ marginLeft: 1 }}>
        {value}
    </Typography>
</Box>


const WouldEnrollAgain = ({ positiveText, negativeText, value }: { positiveText: string, negativeText: string, value: boolean }) => <Box sx={{ display: "flex", alignItems: "center" }}>
    <Typography variant="body2">
        <i> {value ? positiveText : negativeText}</i>
    </Typography>
</Box>
