import { useEffect, useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    Button,
    Stack,
} from '@mui/material';
import { useIntl } from 'react-intl';
import { supabase } from '../../App.tsx';
import { COLORS } from '../../styles/colors.tsx';
import CreateReviewTextField from './CreateReviewTextField.tsx';
import CreateReviewRating from './CreateReviewRating.tsx';
import CreateReviewDifficulty from './CreateReviewDifficulty.tsx';
import CreateReviewWouldTakeAgain from './CreateReviewWouldTakeAgain.tsx';
import CreateReviewObtainedGrade from './CreateReviewObtainedGrade.tsx';
import CreateReviewCourses from './CreateReviewCourses.tsx';
import CreateReviewPeriods from './CreateReviewPeriods.tsx';

interface CreateReviewProps {
    open: boolean;
    onClose: () => void;
    professor: { name: string, id: string };
}


const CreateReview = ({ open, onClose, professor }: CreateReviewProps) => {

    const intl = useIntl();
    const textConstants = {
        createReviewText: intl.formatMessage({ id: 'createReviewText' }),
        writeAReviewFor: intl.formatMessage({ id: 'writeAReviewFor' }),
        wouldTakeAgainText: intl.formatMessage({ id: 'wouldTakeAgainText' }),
        wouldNotTakeAgainText: intl.formatMessage({ id: 'wouldNotTakeAgainText' }),
        obtainedGradeText: intl.formatMessage({ id: 'obtainedGradeText' }),
        selectClassText: intl.formatMessage({ id: 'selectClassText' }),
        selectPeriodText: intl.formatMessage({ id: 'selectPeriodText' }),
        submitReviewText: intl.formatMessage({ id: 'submitReviewText' }),

        difficulty: intl.formatMessage({ id: "difficulty" }),
        rating: intl.formatMessage({ id: "rating" }),
    };

    const [reviewText, setReviewText] = useState('');
    const [professorRating, setProfessorRating] = useState(4);
    const [wouldTakeAgain, setWouldTakeAgain] = useState(false);
    const [difficultyRating, setDifficultyRating] = useState(3);
    const [obtainedGrade, setObtainedGrade] = useState(4.5);
    const [selectedClass, setSelectedClass] = useState('');
    const [selectedPeriod, setSelectedPeriod] = useState('');

    const [classes, setClasses] = useState<string[]>([]);
    const [periods, setPeriods] = useState<string[]>([]);

    useEffect(() => {
        async function fetchData() {
            const courses = await fetchCourses(professor.id);
            setClasses(courses);  // TODO: courses should always have an "Others" option, which it doesn't have right now

            const periods = await fetchPeriods();
            setPeriods(periods);
        }

        if (professor.id) {
            fetchData();
        }
    }, [professor.id]);

    const handleReviewSubmit = () => {
        // TODO: Submit review to backend
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>{`${textConstants.writeAReviewFor} ${professor.name}`}</DialogTitle>
            <DialogContent>
                <Stack spacing={2}>
                    <CreateReviewTextField
                        placeholder={textConstants.createReviewText}
                        reviewText={reviewText}
                        setReviewText={setReviewText}
                    />
                    <CreateReviewRating
                        textRating={textConstants.rating}
                        professorRating={professorRating}
                        setProfessorRating={setProfessorRating}
                    />
                    <CreateReviewDifficulty
                        difficultyText={textConstants.difficulty}
                        difficultyRating={difficultyRating}
                        setDifficultyRating={setDifficultyRating}
                    />
                    <CreateReviewWouldTakeAgain
                        wouldTakeAgainText={textConstants.wouldTakeAgainText}
                        wouldNotTakeAgainText={textConstants.wouldNotTakeAgainText}
                        wouldTakeAgain={wouldTakeAgain}
                        setWouldTakeAgain={setWouldTakeAgain}
                    />
                    <CreateReviewObtainedGrade
                        obtainedGradeText={textConstants.obtainedGradeText}
                        obtainedGrade={obtainedGrade}
                        setObtainedGrade={setObtainedGrade}
                    />
                    <CreateReviewCourses
                        selectClassText={textConstants.selectClassText}
                        classes={classes}
                        selectedClass={selectedClass}
                        setSelectedClass={setSelectedClass}
                    />
                    <CreateReviewPeriods
                        selectPeriodText={textConstants.selectPeriodText}
                        periods={periods}
                        selectedPeriod={selectedPeriod}
                        setSelectedPeriod={setSelectedPeriod}
                    />
                    <Button
                        variant="contained"
                        onClick={handleReviewSubmit}
                        sx={{
                            textTransform: 'none',
                            color: "white",
                            backgroundColor: COLORS.primary,
                            '&:hover': {
                                backgroundColor: COLORS.dark,
                            },
                        }}
                    >
                        {textConstants.submitReviewText}
                    </Button>
                </Stack>
            </DialogContent>
        </Dialog >
    );
};

export default CreateReview;


const fetchCourses = async (id: string) => {
    let { data: courses, error } = await supabase
        .from('professor_courses')
        .select('*')
        .eq('professorId', id)

    if (error) {
        console.log('Error fetching courses: ', error);
        return [];
    }

    const coursesNames: string[] = courses
        .map((course: { professorId: string, courseName: string }) => course.courseName)
        .sort();

    return coursesNames;
}


const fetchPeriods = async () => {
    let { data: academic_period, error } = await supabase
        .from('academic_period')
        .select('name')

    if (error) {
        console.log('Error fetching periods: ', error);
        return [];
    }

    const periodsNames: string[] = academic_period
        .map((period: { name: string }) => period.name)
        .sort((a: string, b: string) => {
            // Extract numeric parts from the strings
            const numA = parseInt(a, 10) || 0;
            const numB = parseInt(b, 10) || 0;

            // Compare numeric parts first
            if (numA !== numB) {
                return numB - numA;
            }

            // If numeric parts are equal, compare the entire strings
            return b.localeCompare(a);
        });

    return periodsNames;
}