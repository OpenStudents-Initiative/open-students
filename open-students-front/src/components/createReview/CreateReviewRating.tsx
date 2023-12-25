import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import { useIntl } from 'react-intl';

interface CreateReviewRatingProps {
    textRating: string;
    professorRating: number;
    setProfessorRating: React.Dispatch<React.SetStateAction<number>>;
    showError: boolean;
    setShowError: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateReviewRating = ({ textRating, professorRating, setProfessorRating, showError, setShowError}: CreateReviewRatingProps) => {
    const intl = useIntl();
    const textConstants = {
        minimumRating: intl.formatMessage({ id: 'minimumRating' }),
    };

    const handleRatingChange = (_e: React.ChangeEvent<{}>, value: number | null) => {
        if (value !== null) {
            setProfessorRating(value);
            setShowError(value < 1);
        } else
            setShowError(true);
    };

    return (
        <Box>
            <Typography component="legend">{textRating}</Typography>
            <Stack spacing={2} direction="row">
                <Rating
                    name="professor-rating"
                    value={professorRating}
                    precision={0.5}
                    onChange={handleRatingChange}
                    onBlur={() => setShowError(professorRating < 1)}
                />
                <Typography variant="body1" sx={{ marginLeft: 1 }}>
                    {professorRating}
                </Typography>
            </Stack>
            {showError && (
                <Typography variant="body2" sx={{ color: 'red', marginTop: 1 }}>
                    {textConstants.minimumRating}
                </Typography>
            )}
        </Box>
    );
};

export default CreateReviewRating;
