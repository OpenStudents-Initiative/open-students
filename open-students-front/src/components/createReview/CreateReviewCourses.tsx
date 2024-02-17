import React, { useEffect } from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import { useIntl } from "react-intl";
import { Course } from "../../utils/types";

interface CreateReviewCoursesProps {
  selectedCourse: Course | null;
  setSelectedCourse: (value: Course) => void;
  courses: Course[];
  showError: boolean;
  setShowError: (value: boolean) => void;
}

const CreateReviewCourses: React.FC<CreateReviewCoursesProps> = ({
  selectedCourse,
  setSelectedCourse,
  courses,
  showError,
  setShowError,
}) => {
  const intl = useIntl();
  const courseMap = new Map<string, Course>();

  useEffect(() => {
    courseMap.clear();
    courses.forEach((course) => {
      courseMap.set(course.id, course);
    });
  }, [courses]);

  const textConstants = {
    courseNotSelectedError: intl.formatMessage({
      id: "courseNotSelectedError",
    }),
    selectClassText: intl.formatMessage({ id: "selectClassText" }),
  };

  const handleSelectChange = (e: { target: { value: string } }) => {
    setSelectedCourse(courseMap.get(e.target.value as string)!);
    setShowError(e.target.value === "");
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="selected-class-label">
        {textConstants.selectClassText}
      </InputLabel>
      <Select
        label={textConstants.selectClassText}
        labelId="selected-class-label"
        value={selectedCourse ? selectedCourse.courseName : ""}
        onChange={handleSelectChange}
      >
        <MenuItem value="" disabled>
          {textConstants.selectClassText}
        </MenuItem>
        {courses.map((course, index) => (
          <MenuItem value={course.id} key={index}>
            {course.courseName}
          </MenuItem>
        ))}
      </Select>
      {showError && (
        <Typography variant="body2" sx={{ color: "red", marginTop: 1 }}>
          {textConstants.courseNotSelectedError}
        </Typography>
      )}
    </FormControl>
  );
};

export default CreateReviewCourses;
