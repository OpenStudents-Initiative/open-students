import React from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

interface CreateReviewCoursesProps {
    selectClassText: string;
    selectedClass: string;
    setSelectedClass: React.Dispatch<React.SetStateAction<string>>;
    classes: string[];
}

const CreateReviewCourses: React.FC<CreateReviewCoursesProps> = ({ selectClassText, selectedClass, setSelectedClass, classes }) => (
    <FormControl fullWidth>
        <InputLabel id="selected-class-label">{selectClassText}</InputLabel>
        <Select
            label={selectClassText}
            labelId="selected-class-label"
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value as string)}
        >
            {classes.map((course, index) => (
                <MenuItem value={course} key={index}>
                    {course}
                </MenuItem>
            ))}
        </Select>
    </FormControl>
);

export default CreateReviewCourses;
