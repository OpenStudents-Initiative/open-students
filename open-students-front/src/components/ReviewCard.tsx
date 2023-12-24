import React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Rating, { IconContainerProps } from '@mui/material/Rating';
import { styled } from '@mui/material/styles';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import { useIntl } from 'react-intl';


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
        generalRatingText: intl.formatMessage({ id: "generalRatingText" }),
        difficultyLevelText: intl.formatMessage({ id: "difficultyLevelText" }),
        courseGradeText: intl.formatMessage({ id: "courseGradeText" }),
        wouldEnrollAgainText: intl.formatMessage({ id: "wouldEnrollAgainText" }),
        semesterText: intl.formatMessage({ id: "semesterText" }),

        veryDifficult: intl.formatMessage({ id: "veryDifficult" }),
        difficult: intl.formatMessage({ id: "difficult" }),
        average: intl.formatMessage({ id: "average" }),
        easy: intl.formatMessage({ id: "easy" }),
        veryEasy: intl.formatMessage({ id: "veryEasy" }),
    };

    const {
        course,
        code,
        review: comment,
        generalRating,
        difficultyLevel,
        wouldEnrollAgain,
    } = review;


    const StyledRating = styled(Rating)(({ theme }) => ({
        '& .MuiRating-iconEmpty .MuiSvgIcon-root': {
            color: theme.palette.action.disabled,
        },
    }));

    const customIcons: {
        [index: string]: {
            icon: React.ReactElement;
            label: string;
        };
    } = {
        1: {
            icon: <SentimentVeryDissatisfiedIcon color="error" />,
            label: textConstants.veryDifficult
        },
        2: {
            icon: <SentimentDissatisfiedIcon color="error" />,
            label: textConstants.difficult
        },
        3: {
            icon: <SentimentSatisfiedIcon color="warning" />,
            label: textConstants.average
        },
        4: {
            icon: <SentimentSatisfiedAltIcon color="success" />,
            label: textConstants.easy
        },
        5: {
            icon: <SentimentVerySatisfiedIcon color="success" />,
            label: textConstants.veryEasy
        },
    };

    function IconContainer(props: IconContainerProps) {
        const { value, ...other } = props;
        return <span {...other}>{customIcons[value].icon}</span>;
    }

    return (
        <Paper elevation={3} sx={{ padding: 2, marginBottom: 2 }}>
            <Typography variant="body1" align="left">
                {`${code}: ${course}`}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center" }}>
                <Rating value={generalRating} readOnly precision={0.1} />
                <Typography variant="body1" sx={{ marginLeft: 1 }}>
                    {generalRating}
                </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
                <StyledRating
                    // name="highlight-selected-only"
                    // IconContainerComponent={IconContainer}
                    value={typeof difficultyLevel === 'number' ? difficultyLevel : 0}
                    readOnly
                    // precision={0.1}
                    // name="highlight-selected-only"
                    defaultValue={2}
                    IconContainerComponent={IconContainer}
                    highlightSelectedOnly
                /> <Typography variant="body1" sx={{ marginLeft: 1 }}>
                    {typeof difficultyLevel === 'number' ? customIcons[difficultyLevel.toFixed(0)].label : ""}
                </Typography>
            </Box>

            <hr style={{ color: "black", height: 0.1 }} />

            <Typography variant="body1" align="left">
                {comment}
            </Typography>

            <hr style={{ color: "black", height: 0.1 }} />

            <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography variant="body2">
                    <strong>{textConstants.wouldEnrollAgainText}</strong>
                </Typography>
                <Typography variant="body2" sx={{ marginLeft: 1 }}>
                    {wouldEnrollAgain ? "😊" : "😢"}
                </Typography>
            </Box>
        </Paper>
    );
};

export default ReviewCard;
