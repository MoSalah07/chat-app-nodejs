import { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Alert } from "@mui/material";
// React Router Dom
import { Link, useNavigate } from "react-router-dom";
// Axios
import axios from "axios";
// React Form
import { useForm } from "react-hook-form";
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
      <Link color="inherit" href="/">
        Mohamed Salah
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function Login() {
  const [formError, setFormError] = useState(null);

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();

  const navigate = useNavigate();

  const isUserExist = JSON.parse(localStorage.getItem("user")) || null;

  useEffect(() => {
    if (isUserExist) navigate(`/chat`, { state: isUserExist });
  }, [isUserExist, navigate]);

  const handleLoginSubmit = async ({ email, password }) => {
    try {
      const {
        data: { data },
      } = await axios.post("http://localhost:5000/user/login", {
        email,
        password,
      });
      const userToken = jwtDecode(data && data.token);
      localStorage.setItem(
        "user-session",
        JSON.stringify({ token: data && data.token })
      );
      localStorage.setItem("user-session", JSON.stringify(userToken));
      navigate("/chat", { state: userToken });
      reset();
      return data;
    } catch (err) {
      setFormError(
        err && err.response && err.response.data && err.response.data.message
      );
      return err;
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={6}
          className="bg-orange-500 text-white flex flex-1 justify-center items-center"
        >
          <div className=" flex flex-col gap-4 items-center justify-center">
            <h1 className="text-xl md:text-2xl lg:text-4xl">
              Hello In My Chat App{" "}
            </h1>
            <p className="text-lg font-bold">Created By Mohamed Salah</p>
          </div>
        </Grid>
        <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            {formError && (
              <Alert sx={{ margin: "20px 0 10px 0" }} severity="error">
                {formError}
              </Alert>
            )}

            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit(handleLoginSubmit)}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                type="email"
                autoComplete="email"
                autoFocus
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
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
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
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link
                    className="text-blue-400 capitalize transition-colors hover:text-blue-500"
                    to={`/`}
                    variant="body2"
                  >
                    Forgot password ?
                  </Link>
                </Grid>
                <Grid item>
                  <Link
                    className="text-blue-400 capitalize transition-colors hover:text-blue-500"
                    to={`/register`}
                    variant="body2"
                  >
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
