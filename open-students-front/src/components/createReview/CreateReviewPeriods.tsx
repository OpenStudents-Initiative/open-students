import React from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

interface CreateReviewPeriodsProps {
    selectPeriodText: string;
    selectedPeriod: string;
    setSelectedPeriod: React.Dispatch<React.SetStateAction<string>>;
    periods: string[];
}

const CreateReviewPeriods: React.FC<CreateReviewPeriodsProps> = ({ selectPeriodText, selectedPeriod, setSelectedPeriod, periods }) => (
    <FormControl fullWidth>
        <InputLabel id="selected-period-label">{selectPeriodText}</InputLabel>
        <Select
            label={selectPeriodText}
            labelId="selected-period-label"
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value as string)}
        >
            {periods.map((period, index) => (
                <MenuItem value={period} key={index}>
                    {period}
                </MenuItem>
            ))}
        </Select>
    </FormControl>
);

export default CreateReviewPeriods;
