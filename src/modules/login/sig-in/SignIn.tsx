import * as React from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
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

export default function SignIn(props: { disableCustomTheme?: boolean }) {
  const [userError, setuserError] = React.useState(false);
  const [userErrorMessage, setuserErrorMessage] = React.useState("");
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const email = String(data.get("user")); // 👈 tu campo "user" es el email
    const password = String(data.get("password"));

    try {
      const response = await fetch("http://localhost:4000/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.status === 400) {
        setuserError(true);
        setuserErrorMessage("Faltan campos obligatorios.");
        return;
      }

      if (response.status === 401) {
        setuserError(true);
        setuserErrorMessage("Usuario o contraseña incorrectos.");
        setPasswordError(true);
        setPasswordErrorMessage("Usuario o contraseña incorrectos.");
        return;
      }

      if (!response.ok) {
        console.error("Error inesperado:", response.status);
        return;
      }

      // Si todo está bien, obtenés el token
      const dataResponse = await response.json();
      console.log("Usuario autenticado:", dataResponse);

      // Podés guardar el token en localStorage
      localStorage.setItem("token", dataResponse.token);
      localStorage.setItem("user", JSON.stringify(dataResponse.user));

      // Y redirigir según el rol si tu backend lo devuelve
      if (dataResponse.user.role === "empresa") {
        navigate("/empresa/home");
      } else if (dataResponse.user.role === "emprendedor") {
        navigate("/emprendedor/home");
      }

      // Limpieza de errores
      setuserError(false);
      setPasswordError(false);
      setuserErrorMessage("");
      setPasswordErrorMessage("");
    } catch (error) {
      console.error("Error al autenticar:", error);
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
              Inicio de Sesión
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

              <ForgotPassword open={open} handleClose={handleClose} />

              <Button type="submit" fullWidth variant="contained">
                Iniciar Sesión
              </Button>
            </Box>

            <Divider>or</Divider>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Typography sx={{ textAlign: "center" }}>
                {
                  <>
                    ¿No tienes cuenta?{" "}
                    <Link href="/registrar" variant="body2">
                      Regístrate
                    </Link>
                  </>
                }
              </Typography>
            </Box>
          </Card>
        </Box>
      </SignInContainer>
    </AppTheme>
  );
}
