import { useIntl } from "react-intl";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { COLORS } from '../styles/colors';
import { Nav } from 'react-bootstrap';
import SearchBar from './searchBar/SearchBar';
import { SearchResultsList } from './searchBar/SearchResultsList';
import { useState } from "react";
import { Typography } from "@mui/material";
import "../styles/Header.css";


export default function Header({ setCurrentProfessorId }: { setCurrentProfessorId: React.Dispatch<React.SetStateAction<string>> }) {
    const intl = useIntl();

    const textConstants = {
        login: intl.formatMessage({ id: 'headerLogin' }),
        openStudents: intl.formatMessage({ id: 'openStudents' }),
    };

    // TODO: Lógica de login y usuarios
    const text = localStorage.getItem("accUserName")?.split(' ')[0] ?? textConstants.login;
    const link = localStorage.getItem("accUserName") ? `/user` : `/Register`;

    const [results, setResults] = useState<{ name: string, id: string }[]>([]);
    const [showResults, setShowResults] = useState(false);


    return (
        <Box className="header">
            <AppBar position="static" sx={{ backgroundColor: "white" }}>
                <Toolbar className="first-row">
                    <LogoOpenStudents openStudentsText={textConstants.openStudents} />
                    <div className="search-bar-container">
                        <SearchBar results={results} setResults={setResults} setShowResults={setShowResults} />
                        {showResults && <SearchResultsList results={results} setCurrentProfessorId={setCurrentProfessorId} setShowResults={setShowResults} />}
                    </div>
                    <LoginButton text={text} link={link} />
                </Toolbar>
            </AppBar>
        </Box >
    );
}


const LogoOpenStudents = ({ openStudentsText }: { openStudentsText: string }) =>
    <Toolbar>
        <Nav.Link style={{ textDecoration: 'none' }} href="/">
            <Typography variant="h5" style={{ color: COLORS.primary, fontWeight: "bold" }}>
                {openStudentsText}
            </Typography>
        </Nav.Link>
    </Toolbar>


const LoginButton = ({ text, link }: { text: string, link: string }) => <Nav.Link style={{ textDecoration: 'none' }} href={link}>
    <Button
        style={{
            borderRadius: 20,
            padding: "5px 15px",
            backgroundColor: COLORS.primary,
            fontSize: "15px",
            textTransform: "none",
        }}
        variant="contained"
    >
        {text}
    </Button>
</Nav.Link>


