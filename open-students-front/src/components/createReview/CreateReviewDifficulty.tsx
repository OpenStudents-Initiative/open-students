import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Rating, { IconContainerProps } from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import { styled } from '@mui/material/styles';
import { useIntl } from 'react-intl';

interface ReviewDifficultyProps {
    difficultyText: string;
    difficultyRating: number;
    setDifficultyRating: React.Dispatch<React.SetStateAction<number>>;
    showError: boolean;
    setShowError: React.Dispatch<React.SetStateAction<boolean>>;
}

const StyledRating = styled(Rating)(({ theme }) => ({
    '& .MuiRating-iconEmpty .MuiSvgIcon-root': {
        color: theme.palette.action.disabled,
    },
}));

const CreateReviewDifficulty = ({ difficultyText, difficultyRating, setDifficultyRating, showError, setShowError }: ReviewDifficultyProps) => {
    const intl = useIntl();
    const textConstants = {
        veryDifficult: intl.formatMessage({ id: 'veryDifficult' }),
        difficult: intl.formatMessage({ id: 'difficult' }),
        average: intl.formatMessage({ id: 'average' }),
        easy: intl.formatMessage({ id: 'easy' }),
        veryEasy: intl.formatMessage({ id: 'veryEasy' }),
        difficultyMustBeSelected: intl.formatMessage({ id: 'difficultyMustBeSelected' }),
    };

    const customIcons: {
        [index: string]: {
            icon: React.ReactElement;
            label: string;
        };
    } = {
        0: {
            icon: <SentimentVeryDissatisfiedIcon color="error" />,
            label: textConstants.veryDifficult,
        },
        1: {
            icon: <SentimentVeryDissatisfiedIcon color="error" />,
            label: textConstants.veryDifficult,
        },
        2: {
            icon: <SentimentDissatisfiedIcon color="error" />,
            label: textConstants.difficult,
        },
        3: {
            icon: <SentimentSatisfiedIcon color="warning" />,
            label: textConstants.average,
        },
        4: {
            icon: <SentimentSatisfiedAltIcon color="success" />,
            label: textConstants.easy,
        },
        5: {
            icon: <SentimentVerySatisfiedIcon color="success" />,
            label: textConstants.veryEasy,
        },
    };

    function IconContainer(props: IconContainerProps) {
        const { value, ...other } = props;
        return <span {...other}>{customIcons[value ? value : 1].icon}</span>;
    }

    const handleRatingChange = (_e: React.ChangeEvent<{}>, value: number | null) => {
        if (value !== null) {
            setDifficultyRating(value);
            setShowError(value < 1);
        }
    };

    return (
        <Box>
            <Typography component="legend">{difficultyText}</Typography>
            <Stack spacing={2} direction="row">
                <StyledRating
                    name="professor-difficulty"
                    precision={1}
                    IconContainerComponent={IconContainer}
                    highlightSelectedOnly
                    size="large"
                    onChange={handleRatingChange}
                    value={typeof difficultyRating === 'number' ? difficultyRating : 0}
                />
                <Typography variant="body1" sx={{ marginLeft: 1 }}>
                    {typeof difficultyRating === 'number' ? customIcons[difficultyRating.toFixed(0)].label : ''}
                </Typography>
            </Stack>
            {showError && (
                <Typography variant="body2" sx={{ color: 'red', marginTop: 1 }}>
                    {textConstants.difficultyMustBeSelected}
                </Typography>
            )}
        </Box>
    );
};

export default CreateReviewDifficulty;
