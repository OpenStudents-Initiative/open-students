import React from 'react';
import FormControl from '@mui/material/FormControl';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import { useIntl } from 'react-intl';

interface CreateReviewObtainedGradeProps {
    obtainedGradeText: string;
    obtainedGrade: number;
    setObtainedGrade: React.Dispatch<React.SetStateAction<number>>;
    showError: boolean;
    setShowError: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateReviewObtainedGrade = ({
    obtainedGradeText,
    obtainedGrade,
    setObtainedGrade,
    showError,
    setShowError,
}: CreateReviewObtainedGradeProps) => {
    const intl = useIntl();
    const textConstants = {
        minimumGradeError: intl.formatMessage({ id: 'minimumGradeError' }),
    };

    const handleSliderChange = (_e: Event, value: number | number[]) => {
        const newValue = Array.isArray(value) ? value[0] : value;
        setObtainedGrade(newValue);
        setShowError(newValue < 1.5);
    };

    return (
        <FormControl fullWidth>
            <Slider
                value={obtainedGrade}
                min={1.5}
                max={5}
                step={0.01}
                valueLabelDisplay="auto"
                onChange={handleSliderChange}
                aria-labelledby="obtained-grade-label"
                color={obtainedGrade < 3 ? 'error' : obtainedGrade <= 3.6 ? 'warning' : 'success'}
            />
            <Typography variant="body2" gutterBottom>
                {`${obtainedGradeText}: ${obtainedGrade}`}
            </Typography>
            {showError && (
                <Typography variant="body2" sx={{ color: 'red', marginTop: 1 }}>
                    {textConstants.minimumGradeError}
                </Typography>
            )}
        </FormControl>
    );
};

export default CreateReviewObtainedGrade;
