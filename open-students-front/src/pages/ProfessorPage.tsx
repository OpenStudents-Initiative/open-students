import { Box } from "@mui/material";
import ProfessorCard from "../components/ProfessorCard.tsx"
import ReviewCard from "../components/ReviewCard.tsx"
import Grid from '@mui/material/Grid';
import { useEffect, useState } from "react";
import { supabase } from '../App.tsx'


export default function ProfessorPage({ id }: { id: string }) {

    const [professor, setProfessor] = useState({
        name: "Loading professor...",
        university: "Loading university...",
        dependency: "Loading dependency...",
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
                    {reviews.map((review, index) => (
                        <ReviewCard key={index} review={review} />
                    ))}
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