import { styled } from '@mui/material/styles';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import { IconContainerProps } from '@mui/material/Rating';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useIntl } from 'react-intl';


const ReviewDifficultyLevel = ({ difficultyLevel }: { difficultyLevel: number }) => {

    const intl = useIntl();
    const textConstants = {
        veryDifficult: intl.formatMessage({ id: "veryDifficult" }),
        difficult: intl.formatMessage({ id: "difficult" }),
        average: intl.formatMessage({ id: "average" }),
        easy: intl.formatMessage({ id: "easy" }),
        veryEasy: intl.formatMessage({ id: "veryEasy" }),
    }

    const StyledRating = styled(Rating)(({ theme }) => ({
        '& .MuiRating-iconEmpty .MuiSvgIcon-root': {
            color: theme.palette.action.disabled,
        },
    }));

    const customIcons: {
        [index: string]: {
            icon: React.ReactElement;
            label: string;
        };
    } = {
        1: {
            icon: <SentimentVeryDissatisfiedIcon color="error" />,
            label: textConstants.veryDifficult
        },
        2: {
            icon: <SentimentDissatisfiedIcon color="error" />,
            label: textConstants.difficult
        },
        3: {
            icon: <SentimentSatisfiedIcon color="warning" />,
            label: textConstants.average
        },
        4: {
            icon: <SentimentSatisfiedAltIcon color="success" />,
            label: textConstants.easy
        },
        5: {
            icon: <SentimentVerySatisfiedIcon color="success" />,
            label: textConstants.veryEasy
        },
    };

    function IconContainer(props: IconContainerProps) {
        const { value, ...other } = props;
        return <span {...other}>{customIcons[value].icon}</span>;
    }

    return <Box sx={{ display: "flex", alignItems: "center" }}>
        <StyledRating
            value={typeof difficultyLevel === 'number' ? difficultyLevel : 0}
            readOnly
            // precision={0.1}
            defaultValue={2}
            IconContainerComponent={IconContainer}
            highlightSelectedOnly
        /> <Typography variant="body1" sx={{ marginLeft: 1 }}>
            {typeof difficultyLevel === 'number' ? customIcons[difficultyLevel.toFixed(0)].label : ""}
        </Typography>
    </Box>
}


export default ReviewDifficultyLevel;