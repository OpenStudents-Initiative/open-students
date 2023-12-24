import { Box } from "@mui/material";
import ProfessorCard from "./ProfessorCard"
import ReviewCard from "./ReviewCard"
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from "react";
import { supabase } from '../App.tsx'


export default function ProfessorPage({ id }: { id: string }) {

    const [professor, setProfessor] = useState([]);
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const data = await getProfessor(id);
            setProfessor(data);

            const reviews = await getReviews(id);
            setReviews(reviews);
        }

        fetchData();
    }, []);


    const exampleProfessor = {
        name: "Alvaro Andres Gomez D'Alleman",
        university: "University of Example",
        dependency: "Computer Science Department",
        averageRating: 4.98793103448276,
        averageStudentCourseGrade: 4.61896551724138,
    };

    const exampleReviews = [
        {
            id: 9,
            review: "Alvaro es como el héroe de la universidad. Explica tan bien que hasta yo, que nunca entendía, ahora le entro a la materia con ganas.",
            generalRating: 4.7,
            difficultyLevel: 3,
            courseGrade: 4.5,
            wouldEnrollAgain: true,
            createdAt: "2023-02-05T15:30:00Z",
            course: {
                name: "Ecuaciones Diferenciales",
                code: "MATE3202",
                dependency: {
                    name: "Departamento de Matemáticas",
                    abbreviation: "MATE",
                },
            },
            professor: {
                id: 287,
                name: "Alvaro Andres Gomez D'Alleman",
            },
            semester: {
                id: 1,
                name: "2019-20",
            },
        },
        {
            id: 10,
            review: "Alvaro me salvó en el semestre. Sus explicaciones son tan claras que parecía que estaba contándome un cuento. ¡Un crack!",
            generalRating: 4.9,
            difficultyLevel: 2,
            courseGrade: 4.8,
            wouldEnrollAgain: true,
            createdAt: "2023-02-10T12:45:00Z",
            course: {
                name: "Algoritmos Avanzados",
                code: "ISIS3204",
                dependency: {
                    name: "Departamento de Ingeniería de Sistemas y Computación",
                    abbreviation: "ISIS",
                },
            },
            professor: {
                id: 287,
                name: "Alvaro Andres Gomez D'Alleman",
            },
            semester: {
                id: 2,
                name: "2020-10",
            },
        },
        {
            id: 11,
            review: `¡Tuve la increíble suerte de tener a Álvaro como profesor y déjame decirte que fue una experiencia educativa única e inolvidable! Álvaro no es solo un profesor, sino un guía apasionado que realmente se preocupa por el aprendizaje y el éxito de sus estudiantes.

            Desde el primer día en su clase, Álvaro logró crear un ambiente que fomentaba la participación y el pensamiento crítico. Sus clases eran cautivadoras, llenas de energía positiva y humor que hacían que hasta los conceptos más complicados fueran accesibles y emocionantes de aprender. No solo se limitaba a enseñar, sino que también inspiraba y motivaba a cada estudiante a dar lo mejor de sí mismo.
            
            Lo que realmente destacó fue su dedicación. Álvaro siempre estaba dispuesto a brindar apoyo adicional, ya sea a través de sesiones de tutoría personalizadas o simplemente respondiendo preguntas después de clase. Su compromiso genuino con el éxito de sus estudiantes hizo que el proceso de aprendizaje fuera significativo y enriquecedor.`,
            generalRating: 5,
            difficultyLevel: 2,
            courseGrade: 5,
            wouldEnrollAgain: true,
            createdAt: "2023-02-15T09:20:00Z",
            course: {
                name: "Inteligencia Artificial",
                code: "ISIS4201",
                dependency: {
                    name: "Departamento de Ingeniería de Sistemas y Computación",
                    abbreviation: "ISIS",
                },
            },
            professor: {
                id: 287,
                name: "Alvaro Andres Gomez D'Alleman",
            },
            semester: {
                id: 1,
                name: "2021-20",
            },
        },
        {
            id: 12,
            review: "Alvaro es el profe más cool de todos. Siempre tiene historias interesantes para compartir y hace que la clase sea divertida.",
            generalRating: 4.8,
            difficultyLevel: 2,
            courseGrade: 4.9,
            wouldEnrollAgain: true,
            createdAt: "2023-02-20T13:15:00Z",
            course: {
                name: "Redes de Computadores",
                code: "ISIS3303",
                dependency: {
                    name: "Departamento de Ingeniería de Sistemas y Computación",
                    abbreviation: "ISIS",
                },
            },
            professor: {
                id: 287,
                name: "Alvaro Andres Gomez D'Alleman",
            },
            semester: {
                id: 2,
                name: "2022-10",
            },
        },
        {
            id: 13,
            review: "Alvaro es mi héroe. Sin él, habría perdido la cabeza en esta materia. ¡Gracias por todo!",
            generalRating: 5,
            difficultyLevel: 3,
            courseGrade: 4.7,
            wouldEnrollAgain: true,
            createdAt: "2023-02-25T11:00:00Z",
            course: {
                name: "Ingeniería de Software",
                code: "ISIS4202",
                dependency: {
                    name: "Departamento de Ingeniería de Sistemas y Computación",
                    abbreviation: "ISIS",
                },
            },
            professor: {
                id: 287,
                name: "Alvaro Andres Gomez D'Alleman",
            },
            semester: {
                id: 1,
                name: "2022-20",
            },
        },
        {
            id: 14,
            review: "Alvaro es un genio. Hace que hasta el tema más complicado parezca fácil. ¡Increíble profesor!",
            generalRating: 4.9,
            difficultyLevel: 2,
            courseGrade: 5,
            wouldEnrollAgain: true,
            createdAt: "2023-03-02T10:30:00Z",
            course: {
                name: "Desarrollo de Aplicaciones Móviles",
                code: "ISIS4301",
                dependency: {
                    name: "Departamento de Ingeniería de Sistemas y Computación",
                    abbreviation: "ISIS",
                },
            },
            professor: {
                id: 287,
                name: "Alvaro Andres Gomez D'Alleman",
            },
            semester: {
                id: 2,
                name: "2022-20",
            },
        }
    ]

    return (
        <Box sx={{ flexGrow: 1 }} width="90%"
            margin="auto"
        >
            <Grid container direction={'row'} spacing={8} component={Paper}
                justifyContent="center"
            >
                <Grid item md={12} lg={2.5} component={Paper}>
                    <ProfessorCard
                        name={exampleProfessor.name}
                        university={exampleProfessor.university}
                        dependency={exampleProfessor.dependency}
                        averageRating={exampleProfessor.averageRating}
                        averageStudentCourseGrade={exampleProfessor.averageStudentCourseGrade}
                    />
                </Grid>
                <Grid item md={12} lg={9} component={Paper}>
                    {exampleReviews.map((review, index) => (
                        <ReviewCard key={index} review={review} />
                    ))}
                </Grid>
            </Grid>
        </Box>
    );
};


async function getProfessor(id: string) {
    let { data: professor, error } = await supabase
        .from('professor')
        .select("*")
        .eq('id', id)
    
    console.log(professor)

    if (error) {
        console.error('Error fetching professor:', error);
        return [];
    }

    return professor;
}


async function getReviews(id: string) {
    let { data: reviews, error } = await supabase
        .from('review')
        .select("*")
        .eq('fk_professor', id)

    console.log(reviews)

    if (error) {
        console.error('Error fetching reviews:', error);
        return [];
    }

    return reviews;
}