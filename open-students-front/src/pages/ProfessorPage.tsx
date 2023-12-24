import { Box, Typography } from "@mui/material";
import ProfessorCard from "../components/ProfessorCard.tsx"
import ReviewCard from "../components/ReviewCard.tsx"
import Grid from '@mui/material/Grid';
import { useEffect, useState } from "react";
import { supabase } from '../App.tsx'
import { useIntl } from 'react-intl';

export default function ProfessorPage({ id }: { id: string }) {

    const intl = useIntl();
    const textConstants = {
        noReviewsYet: intl.formatMessage({ id: "noReviewsYet" }),
        beTheFirstReview: intl.formatMessage({ id: "beTheFirstReview" }),

        loadingProfessor: intl.formatMessage({ id: "loadingProfessor" }),
        loadingUniversity: intl.formatMessage({ id: "loadingUniversity" }),
        loadingDependency: intl.formatMessage({ id: "loadingDependency" }),
    };

    const [professor, setProfessor] = useState({
        name: textConstants.loadingProfessor,
        university: textConstants.loadingUniversity,
        dependency: textConstants.loadingDependency,
        averageRating: 5.0,
        averageCourseGrade: 5.0,
        averageDifficultyLevel: 5.0,
    });

    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const professor = await getProfessor(id);
            setProfessor(professor);

            const reviews = await getReviews(id);
            setReviews(reviews);
        }

        if (id)
            fetchData();
    }, [id]);


    return (
        <Box sx={{ flexGrow: 1 }} width="90%"
            margin="auto"
            border={0}
        >
            <Grid container direction={'row'} spacing={9}
                justifyContent="center"
            >
                <Grid item md={12} lg={3}>
                    <ProfessorCard professor={professor} />
                </Grid>
                <Grid item md={12} lg={9}>
                    {
                        reviews && reviews.length > 0 ?
                            reviews.map((review, index) => (
                                <ReviewCard key={index} review={review} />
                            )) :
                            <Box sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                height: '100%',
                            }} >
                                <Typography variant="h5" sx={{
                                    textAlign: 'center',
                                    justifyContent: 'center',
                                    color: 'text.secondary',
                                }}>
                                    {textConstants.noReviewsYet}
                                    <br />
                                    {textConstants.beTheFirstReview}
                                </Typography>
                            </Box>
                    }
                </Grid>
            </Grid>
        </Box>
    );
};


async function getProfessor(id: string) {
    let { data: professor, error } = await supabase
        .from('professor_information')
        .select("*")
        .eq('id', id)

    if (error) {
        console.error('Error fetching professor:', error);
        return [];
    }

    return professor[0];
}


async function getReviews(id: string) {
    let { data: reviews, error } = await supabase
        .from('professor_reviews')
        .select("*")
        .eq('professorId', id)

    if (error) {
        console.error('Error fetching reviews:', error);
        return [];
    }

    return reviews;
}