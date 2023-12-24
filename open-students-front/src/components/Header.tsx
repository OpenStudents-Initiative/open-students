import { useIntl } from "react-intl";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { COLORS } from '../styles/colors';
import { Nav } from 'react-bootstrap';
import { SearchBar } from './SearchBar';
import { SearchResultsList } from './SearchResultsList';
import { useState } from "react";
import { Typography } from "@mui/material";


export default function Header( {setCurrentProfessorId}: {setCurrentProfessorId: React.Dispatch<React.SetStateAction<string>>}) {
    const intl = useIntl();

    const ingresar = intl.formatMessage({ id: 'headerLogin' });
    const text = localStorage.getItem("accUserName")?.split(' ')[0] ?? ingresar;
    const link = localStorage.getItem("accUserName") ? `/user` : `/Register`;

    const [results, setResults] = useState<{ name: string, id: string }[]>([]);
    const [showResults, setShowResults] = useState(false);

    return (
        <Box sx={boxStyle}>
            <AppBar position="static" sx={{ backgroundColor: "white" }}>
                <Toolbar sx={firstRowStyle}>
                    <LogoOpenStudents />
                    <div className="search-bar-container">
                        <SearchBar results={results} setResults={setResults} setShowResults={setShowResults}  />
                        {showResults && <SearchResultsList results={results} setCurrentProfessorId={setCurrentProfessorId} setShowResults={setShowResults}/>}
                    </div>
                    <LoginButton text={text} link={link} />
                </Toolbar>
            </AppBar>
        </Box >
    );
}

const boxStyle = {
    flexGrow: 1,
    position: 'fixed',
    top: 0,
    width: '100%',
    zIndex: 100,
}


const firstRowStyle = {
    alignItems: 'center',
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: "4px",
}



const LogoOpenStudents = () =>
    <Toolbar>
        <Nav.Link style={{ textDecoration: 'none' }} href="/">
            <Typography variant="h5" style={{ color: COLORS.primary, fontWeight: "bold" }}>
                OpenRatings
            </Typography>
        </Nav.Link>
    </Toolbar>

const LoginButton = ({ text, link }: { text: string, link: string }) => {

    return (

        <Nav.Link style={{ textDecoration: 'none' }} href={link}>
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
    )
}

