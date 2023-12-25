import React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

interface CreateReviewWouldTakeAgainProps {
    wouldTakeAgainText: string;
    wouldNotTakeAgainText: string;
    wouldTakeAgain: boolean;
    setWouldTakeAgain: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateReviewWouldTakeAgain = ({ wouldTakeAgainText, wouldNotTakeAgainText, wouldTakeAgain, setWouldTakeAgain }: CreateReviewWouldTakeAgainProps) => (
    <ToggleButtonGroup
        value={wouldTakeAgain}
        exclusive
        onChange={() => setWouldTakeAgain(!wouldTakeAgain)}
    >
        <ToggleButton value={true} color="success" sx={{ textTransform: 'none' }}>
            {wouldTakeAgainText}
        </ToggleButton>
        <ToggleButton value={false} color="error" sx={{ textTransform: 'none' }}>
            {wouldNotTakeAgainText}
        </ToggleButton>
    </ToggleButtonGroup>
);

export default CreateReviewWouldTakeAgain;
