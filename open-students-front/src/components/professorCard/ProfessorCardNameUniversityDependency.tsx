import { Typography } from '@mui/joy';


interface Props {
    name: string;
    university: string;
    dependency: string;
}


const ProfessorCardNameUniversityDependency = ({ name, university, dependency }: Props) => {
    return (
        <>
            <Typography level="body-lg" fontWeight="lg">
                {name}
            </Typography>
            <Typography level="body-sm" fontWeight="lg">
                {university}
            </Typography>
            <Typography level="body-xs" fontWeight="lg">
                {dependency}
            </Typography>
        </>
    );
}


export default ProfessorCardNameUniversityDependency;