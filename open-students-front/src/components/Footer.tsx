import Container from "@mui/material/Container";
import { Box, Typography } from "@mui/material";
import { COLORS } from "../styles/colors";
import { useIntl } from "react-intl";


export default function Footer() {

    const intl = useIntl();

    const footerText = intl.formatMessage({ id: 'footerText' });

    return (
        <Box
            component="footer"
            sx={boxStyle}
        >
            <Container>
                <Typography variant="body2" gutterBottom sx={{
                    color: "white",
                }}>
                    {footerText}
                </Typography>
            </Container>
        </Box>
    );
}


const boxStyle = {
    backgroundColor: COLORS.dark,
    position: 'fixed',
    bottom: 0,
    width: '100%',
    zIndex: 1,
    right: '0px',
    left: '0px',
};
