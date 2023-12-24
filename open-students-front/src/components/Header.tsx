import { useIntl } from "react-intl";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import logoOpenStudents from '../assets/logoOpenStudents.png';
import Button from '@mui/material/Button';
import { COLORS } from '../styles/colors';
import { Nav } from 'react-bootstrap';
import { SearchBar } from './SearchBar';


export default function Header() {
    const intl = useIntl();

    const search = intl.formatMessage({ id: 'headerSearch' });
    const ingresar = intl.formatMessage({ id: 'headerLogin' });
    const text = localStorage.getItem("accUserName")?.split(' ')[0] ?? ingresar;
    const link = localStorage.getItem("accUserName") ? `/user` : `/Register`;


    return (
        <Box sx={boxStyle}>
            <AppBar position="static" sx={{ backgroundColor: "white" }}>
                <Toolbar sx={firstRowStyle}>
                    <LogoOpenStudents />
                    <SearchBar text={search} />
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
            <Box className='logoOpenStudents'
                component="img"
                sx={{
                    height: 30,
                }}
                alt="Logo de OpenStudents"
                src={logoOpenStudents}
            />
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

