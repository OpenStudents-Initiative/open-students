import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import { Sheet } from '@mui/joy';

interface ProfessorCardProps {
    name: string;
    university: string;
    dependency: string;
    averageRating: number;
    averageStudentCourseGrade: number;
}

const ProfessorCard: React.FC<ProfessorCardProps> = ({
    name,
    university,
    dependency,
    averageRating,
    averageStudentCourseGrade,
}) => {

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
                            <Typography fontWeight="lg">{averageRating.toFixed(3)}</Typography>
                        </div>
                        <div>
                            <Typography level="body-xs" fontWeight="lg">
                                Avg Student Course Grade
                            </Typography>
                            <Typography fontWeight="lg">{averageStudentCourseGrade.toFixed(0)}</Typography>
                        </div>
                    </Sheet>

                    <Box sx={{ display: 'flex', gap: 1.5, '& > button': { flex: 1 } }}>
                        <Button variant="solid" color="primary">
                            Like
                        </Button>
                        <Button variant="solid" color="danger">
                            Dislike
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Box >
    );
};

export default ProfessorCard;
