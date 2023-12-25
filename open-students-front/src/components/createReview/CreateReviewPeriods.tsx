import React from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { useIntl } from 'react-intl';

interface CreateReviewPeriodsProps {
    selectPeriodText: string;
    selectedPeriod: string;
    setSelectedPeriod: React.Dispatch<React.SetStateAction<string>>;
    periods: string[];
    showError: boolean;
    setShowError: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateReviewPeriods = ({
    selectPeriodText,
    selectedPeriod,
    setSelectedPeriod,
    periods,
    showError,
    setShowError,
}: CreateReviewPeriodsProps) => {
    const intl = useIntl();
    const textConstants = {
        periodNotSelectedError: intl.formatMessage({ id: 'periodNotSelectedError' }),
    };

    const handleSelectChange = (e: { target: { value: string; }; }) => {
        setSelectedPeriod(e.target.value as string);
        setShowError(e.target.value === '');
    };

    return (
        <FormControl fullWidth>
            <InputLabel id="selected-period-label">{selectPeriodText}</InputLabel>
            <Select
                label={selectPeriodText}
                labelId="selected-period-label"
                value={selectedPeriod}
                onChange={handleSelectChange}
            >
                <MenuItem value="" disabled>
                    {selectPeriodText}
                </MenuItem>
                {periods.map((period, index) => (
                    <MenuItem value={period} key={index}>
                        {period}
                    </MenuItem>
                ))}
            </Select>
            {showError && (
                <Typography variant="body2" sx={{ color: 'red', marginTop: 1 }}>
                    {textConstants.periodNotSelectedError}
                </Typography>
            )}
        </FormControl>
    );
};

export default CreateReviewPeriods;
