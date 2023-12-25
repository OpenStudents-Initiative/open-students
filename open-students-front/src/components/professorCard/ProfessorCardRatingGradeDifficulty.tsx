import { useIntl } from 'react-intl';
import { Sheet, Typography } from '@mui/joy';


interface Props {
    rating: number;
    grade: number;
    difficulty: number;
}


const ProfessorCardRatingGradeDifficulty = ({ rating, grade, difficulty }: Props) => {
    const intl = useIntl();
    const textConstants = {
        rating: intl.formatMessage({ id: "averageRatingText" }),
        grade: intl.formatMessage({ id: "averageCourseGradeText" }),
        difficulty: intl.formatMessage({ id: "averageDifficultyLevelText" }),
    };

    const roundOrHyphen = (num: number) => typeof num === 'number' ? num.toFixed(2) : "—"

    const textsAndNumbers = [
        [textConstants.rating, rating],
        [textConstants.grade, grade],
        [textConstants.difficulty, difficulty],
    ];

    return (
        <Sheet
            sx={{
                bgcolor: 'background.level1',
                borderRadius: 'sm',
                p: 1.5,
                my: 1.5,
                display: 'flex',
                gap: 2,
                '& > div': { flex: 1 },
            }}
        >
            {textsAndNumbers.map(([text, num]) => (
                <div key={text}>
                    <Typography level="body-xs" fontWeight="lg">
                        {text}
                    </Typography>
                    <Typography fontWeight="lg">{roundOrHyphen(num as number)}</Typography>
                </div>
            ))}
        </Sheet>
    );
}

export default ProfessorCardRatingGradeDifficulty;