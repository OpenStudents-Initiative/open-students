import { COLORS } from "../styles/colors";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { useState } from "react";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import { HOME_ROUTE } from "../utils/consts";
import { useNavigate } from "react-router-dom";
import { fetchLogin } from "../services/authService";

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const signIn = useSignIn();
  const navigate = useNavigate();

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const responseData = await fetchLogin(email, password);

    if (!responseData) {
      setError(
        "There has been a problem with the login endpoint, please try again later",
      );
      return;
    }

    if (
      signIn({
        auth: {
          token: responseData.token,
          type: "Bearer",
        },
        userState: responseData.userInfo,
      })
    ) {
      navigate(HOME_ROUTE);
    } else {
      setError("Login is invalid");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "100px auto", // Adjust for the presence of header/footer
      }}
    >
      <Typography variant="h2" sx={{ color: COLORS.primary, mb: 3 }}>
        Login
      </Typography>

      <form onSubmit={handleLogin}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Email"
              type="email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Password"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              type="submit"
              fullWidth
              sx={{ bgcolor: COLORS.dark }}
            >
              Sign In
            </Button>
          </Grid>
        </Grid>
      </form>

      {error && (
        <Typography variant="h5" sx={{ color: "#ee3A44", mt: 3 }}>
          {error}
        </Typography>
      )}
    </Box>
  );
}
