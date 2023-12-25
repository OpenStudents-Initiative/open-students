import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import professorAvatar from "../../assets/professorAvatar.png";
import ProfessorCardRatingGradeDifficulty from './ProfessorCardRatingGradeDifficulty';
import ProfessorCardCreateReviewButton from './ProfessorCardCreateReviewButton';
import ProfessorCardNameUniversityDependency from './ProfessorCardNameUniversityDependency';


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


const ProfessorCard = ({ professor, makeReview }: ProfessorCardProps) =>
    <Box
        sx={{ width: '100%', position: 'relative', overflow: { sm: 'initial' } }}
    >
        <Card
            orientation="horizontal"
            sx={{ width: '100%', flexWrap: 'wrap', overflow: 'auto' }}
        >
            <AspectRatio flex ratio="1" maxHeight={200} sx={{ minWidth: 200 }}>
                <img src={professorAvatar} alt="professorAvatar" />
            </AspectRatio>
            <CardContent>
                <ProfessorCardNameUniversityDependency name={professor.name} university={professor.university} dependency={professor.dependency} />
                <ProfessorCardRatingGradeDifficulty rating={professor.averageRating} grade={professor.averageCourseGrade} difficulty={professor.averageDifficultyLevel} />
                <ProfessorCardCreateReviewButton makeReview={makeReview} />
            </CardContent>
        </Card>
    </Box >


export default ProfessorCard;









