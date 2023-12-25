import react, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    Button,
    Rating,
    ToggleButtonGroup,
    ToggleButton,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from '@mui/material';

interface MakeReviewPopupProps {
    open: boolean;
    onClose: () => void;
}


const MakeReviewPopup = ({ open, onClose }: MakeReviewPopupProps) => {
    const [reviewText, setReviewText] = useState('');
    const [professorRating, setProfessorRating] = useState(3);
    const [wouldTakeAgain, setWouldTakeAgain] = useState(false);
    const [difficultyRating, setDifficultyRating] = useState(3);
    const [obtainedGrade, setObtainedGrade] = useState(3);
    const [selectedClass, setSelectedClass] = useState('');
    const [selectedPeriod, setSelectedPeriod] = useState('');

    const handleReviewSubmit = () => {
        // Add your logic to submit the review
        // You can access all the state variables here
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>Write a Review</DialogTitle>
            <DialogContent>
                <TextField
                    label="Write your review"
                    multiline
                    rows={4}
                    variant="outlined"
                    fullWidth
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                />

                <Rating
                    name="professor-rating"
                    value={professorRating}
                    precision={1}
                    onChange={(event, newValue) => setProfessorRating(newValue? newValue : 0)}
                />

                <ToggleButtonGroup
                    value={wouldTakeAgain}
                    exclusive
                    onChange={() => setWouldTakeAgain(!wouldTakeAgain)}
                >
                    <ToggleButton value={true}>Would take again</ToggleButton>
                    <ToggleButton value={false}>Would not take again</ToggleButton>
                </ToggleButtonGroup>

                <Rating
                    name="difficulty-rating"
                    value={difficultyRating}
                    icon="😐"
                    max={5}
                    onChange={(event, newValue) => setDifficultyRating(newValue? newValue : 0)}
                />

                <FormControl fullWidth>
                    <InputLabel id="obtained-grade-label">Obtained Grade</InputLabel>
                    <Select
                        labelId="obtained-grade-label"
                        value={obtainedGrade}
                        onChange={(e) => setObtainedGrade(Number(e.target.value))}
                    >
                        {[1, 2, 3, 4, 5].map((grade) => (
                            <MenuItem key={grade} value={grade}>
                                {grade}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl fullWidth>
                    <InputLabel id="selected-class-label">Select Class</InputLabel>
                    <Select
                        labelId="selected-class-label"
                        value={selectedClass}
                        onChange={(e) => setSelectedClass(e.target.value)}
                    >
                        {/* Add your class options dynamically */}
                        <MenuItem value="class1">Class 1</MenuItem>
                        <MenuItem value="class2">Class 2</MenuItem>
                        {/* Add more classes as needed */}
                    </Select>
                </FormControl>

                <FormControl fullWidth>
                    <InputLabel id="selected-period-label">Select Period</InputLabel>
                    <Select
                        labelId="selected-period-label"
                        value={selectedPeriod}
                        onChange={(e) => setSelectedPeriod(e.target.value)}
                    >
                        {/* Add your period options dynamically */}
                        <MenuItem value="spring">Spring</MenuItem>
                        <MenuItem value="summer">Summer</MenuItem>
                        {/* Add more periods as needed */}
                    </Select>
                </FormControl>

                <Button variant="contained" color="primary" onClick={handleReviewSubmit}>
                    Submit Review
                </Button>
            </DialogContent>
        </Dialog>
    );
};

export default MakeReviewPopup;
