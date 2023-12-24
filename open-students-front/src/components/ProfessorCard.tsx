import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import { Sheet } from '@mui/joy';
import { COLORS } from '../styles/colors';

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
}

const ProfessorCard: React.FC<ProfessorCardProps> = ({ professor }) => {

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
                <AspectRatio flex ratio="1" maxHeight={182} sx={{ minWidth: 182 }}>
                    <img />
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
                                Average Rating
                            </Typography>
                            <Typography fontWeight="lg">{averageRating.toFixed(2)}</Typography>
                        </div>
                        <div>
                            <Typography level="body-xs" fontWeight="lg">
                                Avg Student Course Grade
                            </Typography>
                            <Typography fontWeight="lg">{averageCourseGrade.toFixed(2)}</Typography>
                        </div>
                        <div>
                            <Typography level="body-xs" fontWeight="lg">
                                Avg Difficulty Level
                            </Typography>
                            <Typography fontWeight="lg">{averageDifficultyLevel.toFixed(2)}</Typography>
                        </div>
                    </Sheet>

                    <Box sx={{ display: 'flex', gap: 1.5, '& > button': { flex: 1 } }}>
                        <Button variant="solid" 
                            sx={{
                                color: "white",
                                backgroundColor: COLORS.primary,
                                '&:hover': {
                                    backgroundColor: COLORS.dark,
                                },
                            }}
                        >
                            Reseñar a este profesor
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Box >
    );
};

export default ProfessorCard;
