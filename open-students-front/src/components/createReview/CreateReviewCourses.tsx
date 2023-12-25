import React from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { useIntl } from 'react-intl';

interface CreateReviewCoursesProps {
    selectClassText: string;
    selectedClass: string;
    setSelectedClass: React.Dispatch<React.SetStateAction<string>>;
    classes: string[];
    showError: boolean;
    setShowError: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateReviewCourses: React.FC<CreateReviewCoursesProps> = ({
    selectClassText,
    selectedClass,
    setSelectedClass,
    classes,
    showError,
    setShowError,
}) => {
    const intl = useIntl();
    const textConstants = {
        courseNotSelectedError: intl.formatMessage({ id: 'courseNotSelectedError' }),
    };

    const handleSelectChange = (e: { target: { value: string; }; }) => {
        setSelectedClass(e.target.value as string);
        setShowError(e.target.value === '');
    };

    return (
        <FormControl fullWidth>
            <InputLabel id="selected-class-label">{selectClassText}</InputLabel>
            <Select
                label={selectClassText}
                labelId="selected-class-label"
                value={selectedClass}
                onChange={handleSelectChange}
            >
                <MenuItem value="" disabled>
                    {selectClassText}
                </MenuItem>
                {classes.map((course, index) => (
                    <MenuItem value={course} key={index}>
                        {course}
                    </MenuItem>
                ))}
            </Select>
            {showError && (
                <Typography variant="body2" sx={{ color: 'red', marginTop: 1 }}>
                    {textConstants.courseNotSelectedError}
                </Typography>
            )}
        </FormControl>
    );
};

export default CreateReviewCourses;
