import { Box } from "@mui/material";
import ProfessorCard from "../components/ProfessorCard.tsx"
import ReviewCard from "../components/ReviewCard.tsx"
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
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

        fetchData();
    }, []);


    const exampleReviews = [
        {
            id: "34993",
            course: "Introducción A la Programación",
            code: "ISIS1221", 
            period: "2020-20 (virtual)",
            createdAt: "2021-01-11T20:53:55.303Z",
            review: "Es el mejor profesor del mundo. Yo entré sin saber programar en lo absoluto, pero él enserio que explica súper bien y de una forma que uno entiende. Hace laboratorios que lo dejan a uno súper preparado para los proyectos y parciales. Responde todas las dudas, es una gran persona y la clase es entretenida.\nPros: Todo. Explica súper bien, es el mejor del mundo, lo deja a uno preparado.\nContras: Alvaro no tiene defectos, él es perfecto",
            generalRating: 5,
            difficultyLevel: 3.5,
            courseGrade: 3.5,
            wouldEnrollAgain: true,
            professorId: "6952b37b-95be-448d-a723-d559b777bba0",
        },
        {
            id: "34104",
            course: "Introducción A la Programación",
            code: "ISIS1221", 
            period: "2020-10 (virtual)",
            createdAt: "2020-12-21T04:46:24.027Z",
            review: "Si vas a meter Introducción a la programación, tienes que meter con este profesor SÍ O SÍ\nDesde la primera clase te da una motivación muy grande con sus explicaciones y material mostrado para integrarte en la materia sin problemas, a pesar de que hubiera códigos complejos, él y sus monitores los cuales fueron muy buenos ayudaron mucho al resolver dudas en los laboratorios.\nExplica muy bien sus temas y su forma de hablar demuestra sus ganas que tiene hacia la materia y se preocupa mucho por el bienestar de los estudiantes en pleno primer semestre empezando una nueva etapa en la vida.\nPros: Ameno, Explica muy bien, Querido, Gracioso, Clases muy entretenidas\nCons: Ninguno",
            generalRating: 5,
            difficultyLevel: 2,
            courseGrade: 4.1,
            wouldEnrollAgain: true,
            professorId: "6952b37b-95be-448d-a723-d559b777bba0",
        },
        {
            id: "31000",
            course: "Introducción A la Programación",
            code: "ISIS1221",
            period: "2020-10 (virtual)",
            createdAt: "2020-07-28T23:19:48.556Z",
            review: "Es simplemente un excelente profesor.\nPros: Explica de manera clara todos los temas, es considerado con las fechas de entrega",
            generalRating: 5,
            difficultyLevel: 1.5,
            courseGrade: 5,
            wouldEnrollAgain: true,
            professorId: "6952b37b-95be-448d-a723-d559b777bba0",
        },
        {
            id: "53561",
            course: "Introducción A la Programación",
            code: "ISIS1221", 
            period: "2022-1",
            createdAt: "2023-12-21T21:10:21.085Z",
            review: "El mejor profesor de la universidad. Explica con una dedicación y paciencia increíble. Si va a meter IP, métala con Alvarito, no se arrepentirá.\nPros: Paciente, Parciales super trabajables, Ayuda mucho, Los monitores son lo máximo, Se le entiende todo\nCons: No dictar más cursos :(",
            generalRating: 5,
            difficultyLevel: 2.1,
            courseGrade: 5,
            wouldEnrollAgain: true,
            professorId: "6952b37b-95be-448d-a723-d559b777bba0",
        },
        {
            id: "52440",
            course: "Introducción A la Programación",
            code: "ISIS1221", 
            period: "2021-10 (virtual)",
            createdAt: "2023-08-19T17:41:25.106Z",
            review: "Fue mi primer profesor de programación, y a pesar de que estudio Sistemas me parece que es una excelente opción para cualquier persona que tenga que ver esta materia. Alvaro siempre está atento a las preguntas y responde todo, además es una excelente persona, si puede meter con él, no lo dude.",
            generalRating: 5,
            difficultyLevel: 3,
            courseGrade: 4.5,
            wouldEnrollAgain: true,
            professorId: "6952b37b-95be-448d-a723-d559b777bba0",
        },
        {
            id: "51518",
            course: "Introducción A la Programación",
            code: "ISIS1221", 
            period: "2023-1",
            createdAt: "2023-07-20T00:44:17.520Z",
            review: "No hay nada que decir, es buenísimo. Si pueden meter con Alvarito, no lo duden.\nPros: Le gusta pokemon, su clase es muuy relajada",
            generalRating: 4.8,
            difficultyLevel: 1.5,
            courseGrade: 4.7,
            wouldEnrollAgain: true,
            professorId: "6952b37b-95be-448d-a723-d559b777bba0",
        },
        {
            id: "50841",
            course: "Introducción A la Programación",
            code: "ISIS1221", 
            period: "2023-1",
            createdAt: "2023-07-11T23:49:12.187Z",
            review: "Es probablemente uno de los mejores profesores. La forma en que explica hace los conceptos fáciles de entender, y se preocupa por que todos sus estudiantes tengan un buen desempeño en el curso. Además, la clase sigue un buen ritmo y se encarga de prepararlo a uno para los proyectos. Los exámenes siguen un formato muy similar a los problemas de los proyectos y hay un tiempo prudente para todo lo que hay que hacer.\nPros: Explica de forma muy clara. Cubre los temas de una forma que encaja perfectamente con los proyectos/exámenes del curso. Le gusta pokémon y el kpop :)\nCons: Literalmente no tiene. Es un ser humano perfecto",
            generalRating: 5,
            difficultyLevel: 3,
            courseGrade: 5,
            wouldEnrollAgain: true,
            professorId: "6952b37b-95be-448d-a723-d559b777bba0",
        },
    ]

    return (
        <Box sx={{ flexGrow: 1 }} width="90%"
            margin="auto"
        >
            <Grid container direction={'row'} spacing={8} component={Paper}
                justifyContent="center"
            >
                <Grid item md={12} lg={3} component={Paper}>
                    <ProfessorCard professor={professor} />
                </Grid>
                <Grid item md={12} lg={9} component={Paper}>
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

    console.log(reviews);

    return reviews;
}