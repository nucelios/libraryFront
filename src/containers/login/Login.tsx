import {
  Alert,
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { ChangeEvent, FormEvent, useState } from "react";

import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { loginUser } from "@/features/userSlice/userSlice";
import FormElement from "@/components/UI/form/FormElement";


interface LoginState {
  username: string;
  password: string;
}

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const error = useAppSelector((state) => state.user.loginError);

  const [state, setState] = useState<LoginState>({
    username: "",
    password: "",
  });

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const submitFormHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(loginUser({ ...state }))
      .unwrap()
      .then(() => {
        navigate("/");
      });
  };

  return (
    <Container component="main" maxWidth="xs">
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
          Войти
        </Typography>
        {error ? (
          <Alert sx={{ width: "100%", mt: 2 }} severity="error">
            {error}
          </Alert>
        ) : null}
        <Box
          component="form"
          onSubmit={submitFormHandler}
          sx={{ mt: 1, width: "100%" }}
        >
          <FormElement
            required
            label="Email"
            name="username"
            value={state.username}
            onChange={inputChangeHandler}
          />

          <FormElement
            required
            name="password"
            label="Пароль"
            type="password"
            value={state.password}
            onChange={inputChangeHandler}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
           Войти
          </Button>

          <Grid container>
            <Grid item>
              <Link component={RouterLink} to="/register">
                {"Нет Аккаунта? Зарегестрироваться"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
