import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';

interface CreateReviewRatingProps {
    textRating: string;
    professorRating: number;
    setProfessorRating: React.Dispatch<React.SetStateAction<number>>;
}

const CreateReviewRating = ({ textRating, professorRating, setProfessorRating }: CreateReviewRatingProps) =>
    <Box>
        <Typography component="legend">{textRating}</Typography>
        <Stack spacing={2} direction="row">
            <Rating
                name="professor-rating"
                value={professorRating}
                precision={0.5}
                onChange={(_e, value) => setProfessorRating(value as number)}
            />
            <Typography variant="body1" sx={{ marginLeft: 1 }}>
                {professorRating}
            </Typography>
        </Stack>
    </Box>

export default CreateReviewRating;