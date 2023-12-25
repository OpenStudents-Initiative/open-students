import React from 'react';
import { useIntl } from 'react-intl';
import { Box } from '@mui/material';
import Button from '@mui/joy/Button';
import { COLORS } from '../../styles/colors';


interface Props {
    makeReview: React.MouseEventHandler<HTMLElement>;
}


const ProfessorCardCreateReviewButton = ({ makeReview }: Props) => {
    const intl = useIntl();
    const textConstants = {
        createReviewText: intl.formatMessage({ id: "createReviewText" }),
    };

    return (
        <Box sx={{ display: 'flex', '& > button': { flex: 1 } }}>
            <Button variant="solid"
                onClick={makeReview}
                sx={{
                    color: "white",
                    backgroundColor: COLORS.primary,
                    '&:hover': {
                        backgroundColor: COLORS.dark,
                    },
                }}
            >
                {textConstants.createReviewText}
            </Button>
        </Box >
    );
};


export default ProfessorCardCreateReviewButton;