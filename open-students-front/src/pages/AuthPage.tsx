import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "../App";
import { Container } from "@mui/material";
import { COLORS } from "../styles/colors";
import { HOME_ROUTE } from "../utils/consts";

export default function AuthPage() {
  return (
    <Container>
      <Auth
        supabaseClient={supabase}
        appearance={{
          theme: ThemeSupa,
          style: {
            button: {
              backgroundColor: COLORS.primary,
              borderColor: COLORS.primary,
            },
          },
        }}
        providers={[]}
        redirectTo={HOME_ROUTE}
      />
    </Container>
  );
}
