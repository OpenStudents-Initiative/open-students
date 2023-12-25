import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import { Sheet } from '@mui/joy';
import { COLORS } from '../styles/colors';
import { useIntl } from 'react-intl';
import professorAvatar from "../assets/professorAvatar.png";

interface Professor {
    name: string;
    university: string;
    dependency: string;
    averageRating: number;
    averageCourseGrade: number;
    averageDifficultyLevel: number;
}

interface ProfessorCardProps {
    professor: Professor;
    makeReview: React.MouseEventHandler<HTMLElement>;
}


const ProfessorCard: React.FC<ProfessorCardProps> = ({ professor, makeReview }) => {

    const intl = useIntl();
    const textConstants = {
        averageRatingText: intl.formatMessage({ id: "averageRatingText" }),
        averageCourseGradeText: intl.formatMessage({ id: "averageCourseGradeText" }),
        averageDifficultyLevelText: intl.formatMessage({ id: "averageDifficultyLevelText" }),
        writeReviewText: intl.formatMessage({ id: "writeReviewText" }),
    };

    const roundOrHyphen = (num: number) => typeof num === 'number' ? num.toFixed(2) : "—"

    const {
        name,
        university,
        dependency,
        averageRating,
        averageCourseGrade,
        averageDifficultyLevel,
    } = professor;

    return (
        <Box
            sx={{
                width: '100%',
                position: 'relative',
                overflow: { sm: 'initial' },
            }}
        >
            <Card
                orientation="horizontal"
                sx={{
                    width: '100%',
                    flexWrap: 'wrap',
                    overflow: 'auto',
                }}
            >
                <AspectRatio flex ratio="1" maxHeight={200} sx={{ minWidth: 200 }}>
                    <img src={professorAvatar} alt="professorAvatar" />
                </AspectRatio>
                <CardContent>
                    <Typography fontSize="xl" fontWeight="lg">
                        {name}
                    </Typography>
                    <Typography level="body-md" fontWeight="lg" textColor="text.tertiary">
                        {university}
                    </Typography>
                    <Typography level="body-sm" fontWeight="lg" textColor="text.tertiary">
                        {dependency}
                    </Typography>

                    <Sheet
                        sx={{
                            bgcolor: 'background.level1',
                            borderRadius: 'sm',
                            p: 1.5,
                            my: 1.5,
                            display: 'flex',
                            gap: 2,
                            '& > div': { flex: 1 },
                        }}
                    >
                        <div>
                            <Typography level="body-xs" fontWeight="lg">
                                {textConstants.averageRatingText}
                            </Typography>
                            <Typography fontWeight="lg">
                                {roundOrHyphen(averageRating)}
                            </Typography>
                        </div>
                        <div>
                            <Typography level="body-xs" fontWeight="lg">
                                {textConstants.averageCourseGradeText}
                            </Typography>
                            <Typography fontWeight="lg">{roundOrHyphen(averageCourseGrade)}</Typography>
                        </div>
                        <div>
                            <Typography level="body-xs" fontWeight="lg">
                                {textConstants.averageDifficultyLevelText}
                            </Typography>
                            <Typography fontWeight="lg">{roundOrHyphen(averageDifficultyLevel)}</Typography>
                        </div>
                    </Sheet>

                    <Box sx={{ display: 'flex', gap: 1.5, '& > button': { flex: 1 } }}>
                        <Button variant="solid"
                            onClick={makeReview}
                            sx={{
                                color: "white",
                                backgroundColor: COLORS.primary,
                                '&:hover': {
                                    backgroundColor: COLORS.dark,
                                },
                            }}
                        >
                            {intl.formatMessage({ id: "writeReviewText" })}
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Box >
    );
};

export default ProfessorCard;