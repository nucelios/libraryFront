import {
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
import { registerUser } from "@/features/userSlice/userSlice";
import FormElement from "@/components/UI/form/FormElement";





interface RegisterState {
  username: string;
  displayName: string;
  password: string;
}

const Register = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const errors = useAppSelector((state) => state.user.registerError);

  const [state, setState] = useState<RegisterState>({
    displayName: "",
    username: "",
    password: "",
  });

  const getErrorsBy = (name: string) => {
    if (Array.isArray(errors)) {
      const error = errors.find(({ type }) => type === name);
      return error?.messages.join(",");
    }
  };
  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const submitFormHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(registerUser({ ...state }))
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
          Зарегестрироваться
        </Typography>

        <Box
          component="form"
          onSubmit={submitFormHandler}
          noValidate
          sx={{ mt: 1 }}
        >
          
          <FormElement
            required
            label="Email"
            name="username"
            value={state.username}
            onChange={inputChangeHandler}
            error={getErrorsBy("username")}
          />

          <FormElement
            required
            name="password"
            label="Пароль"
            type="password"
            value={state.password}
            onChange={inputChangeHandler}
            error={getErrorsBy("password")}
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
              <Link component={RouterLink} to="/login">
                {"Есть Аккаунт? Войти"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Register;
