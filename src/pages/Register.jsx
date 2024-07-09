import { useEffect, useState } from "react";
// Mui
import { Alert } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
// React Router Dom
import { Link, useNavigate } from "react-router-dom";
// React-Form
import { useForm } from "react-hook-form";
// Axios
import axios from "axios";
// Token
import { jwtDecode } from "jwt-decode";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" to={`/`}>
        Mohamed Salah
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function Register() {
  const [formError, setFormError] = useState(null);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleLogin = async ({
    email,
    password,
    firstName = "",
    lastName = "",
  }) => {
    const fullName = `${firstName} ${lastName}`;

    try {
      const { data } = await axios.post(`http://localhost:5000/user/register`, {
        email,
        password,
        name: fullName,
      });
      sessionStorage.setItem(
        "user-session",
        JSON.stringify({
          token: data && data.data && data.data.token,
        })
      );
      const user = jwtDecode(data && data.data && data.data.token);
      sessionStorage.setItem("user-session", JSON.stringify(user));

      navigate("/chat", { state: user });
      reset();
      return data;
    } catch (err) {
      console.log(err);
      setFormError(err && err.response && err.response.data);
      return err;
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const isUserExist = JSON.parse(sessionStorage.getItem("user")) || null;

  useEffect(() => {
    if (isUserExist) navigate(`/chat`, { state: isUserExist });
  }, [isUserExist, navigate]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          {formError && (
            <Alert sx={{ margin: "20px 0 10px 0" }} severity="error">
              {formError}
            </Alert>
          )}
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(handleLogin)}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  {...register("firstName", {
                    required: "This field is required ",
                  })}
                  error={!!errors.firstName}
                  helperText={errors.firstName && errors.firstName.message}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  {...register("lastName", {
                    required: "This field is required ",
                  })}
                  error={!!errors.lastName}
                  helperText={errors.lastName && errors.lastName.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  {...register("email", {
                    required: {
                      value: true,
                      message: "This field is required",
                    },
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: "Ivalid email",
                    },
                  })}
                  error={!!errors.email}
                  helperText={errors.email && errors.email.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="password"
                  {...register("password", {
                    required: {
                      value: true,
                      message: "This field is required",
                    },
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  error={!!errors.password}
                  helperText={errors.password && errors.password.message}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link
                  to={`/`}
                  variant="body2"
                  className="text-blue-400 capitalize transition-colors hover:text-blue-500"
                >
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
