import React from 'react';
import FormControl from '@mui/material/FormControl';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';

interface CreateReviewObtainedGradeProps {
    obtainedGradeText: string;
    obtainedGrade: number;
    setObtainedGrade: React.Dispatch<React.SetStateAction<number>>;
}

const CreateReviewObtainedGrade = ({ obtainedGradeText, obtainedGrade, setObtainedGrade }: CreateReviewObtainedGradeProps) => (
    <FormControl fullWidth>
        <Slider
            value={obtainedGrade}
            min={1}
            max={5}
            step={0.01}
            valueLabelDisplay="auto"
            onChange={(_e, value) => setObtainedGrade(value as number)}
            aria-labelledby="obtained-grade-label"
            color={obtainedGrade < 3 ? 'error' : obtainedGrade <= 3.6 ? 'warning' : 'success'}
        />
        <Typography variant="body2" gutterBottom>
            {`${obtainedGradeText}: ${obtainedGrade}`}
        </Typography>
    </FormControl>
);

export default CreateReviewObtainedGrade;
