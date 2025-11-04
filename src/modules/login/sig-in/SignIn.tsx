import * as React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Divider from "@mui/material/Divider";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import ForgotPassword from "./components/ForgotPassword";
import AppTheme from "../shared-theme/AppTheme";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  boxShadow:
    "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  height: "calc((1 - var(--template-frame-height, 0)) * 100dvh)",
  minHeight: "100%",
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
  "&::before": {
    content: '""',
    display: "block",
    position: "absolute",
    zIndex: -1,
    inset: 0,
    backgroundImage:
      "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
  },
}));

const users = [
  { username: "empresa", password: "123", role: "empresa" },
  { username: "emprendedor", password: "123", role: "emprendedor" },
];

export default function SignIn(props: { disableCustomTheme?: boolean }) {
  const [userError, setuserError] = React.useState(false);
  const [userErrorMessage, setuserErrorMessage] = React.useState("");
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // 🔹 Saber si estamos en la página de registro
  const isRegisterPage = location.pathname === "/registrar";

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isRegisterPage) {
      // lógica para registrar (puedes agregarla después)
      console.log("Registrar nuevo usuario");
      return;
    }

    const data = new FormData(event.currentTarget);
    const username = String(data.get("user"));
    const password = String(data.get("password"));

    const foundUser = users.find(
      (u) => u.username === username && u.password === password
    );

    if (!foundUser) {
      setuserError(true);
      setuserErrorMessage("Usuario o contraseña incorrectos.");
      setPasswordError(true);
      setPasswordErrorMessage("Usuario o contraseña incorrectos.");
      return;
    }

    setuserError(false);
    setuserErrorMessage("");
    setPasswordError(false);
    setPasswordErrorMessage("");

    if (foundUser.role === "empresa") {
      navigate("/empresa/home");
    } else if (foundUser.role === "emprendedor") {
      navigate("/emprendedor/home");
    }
  };

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <SignInContainer direction="column" justifyContent="space-between">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
            paddingTop: 15,
          }}
        >
          <Card variant="outlined">
            <Typography
              component="h2"
              variant="h4"
              sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
            >
              {isRegisterPage ? "Registrar" : "Inicio de Sesión"}
            </Typography>

            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                gap: 2,
              }}
            >
              <FormControl>
                <FormLabel htmlFor="user">Usuario</FormLabel>
                <TextField
                  error={userError}
                  helperText={userErrorMessage}
                  id="user"
                  type="user"
                  name="user"
                  placeholder="user"
                  autoComplete="user"
                  autoFocus
                  required
                  fullWidth
                  variant="outlined"
                  color={userError ? "error" : "primary"}
                />
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="password">Contraseña</FormLabel>
                <TextField
                  error={passwordError}
                  helperText={passwordErrorMessage}
                  name="password"
                  placeholder="••••••"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  required
                  fullWidth
                  variant="outlined"
                  color={passwordError ? "error" : "primary"}
                />
              </FormControl>

              {!isRegisterPage && (
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
              )}

              <ForgotPassword open={open} handleClose={handleClose} />

              <Button type="submit" fullWidth variant="contained">
                {isRegisterPage ? "Registrar" : "Iniciar Sesión"}
              </Button>
            </Box>

            <Divider>or</Divider>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Typography sx={{ textAlign: "center" }}>
                {isRegisterPage ? (
                  <>
                    ¿Ya tienes cuenta?{" "}
                    <Link href="/" variant="body2">
                      Inicia sesión
                    </Link>
                  </>
                ) : (
                  <>
                    ¿No tienes cuenta?{" "}
                    <Link href="/registrar" variant="body2">
                      Regístrate
                    </Link>
                  </>
                )}
              </Typography>
            </Box>
          </Card>
        </Box>
      </SignInContainer>
    </AppTheme>
  );
}
