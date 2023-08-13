import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {
  Avatar,
  Box,
  Container,
  CssBaseline,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { darkTheme } from '../../components/Header';
import { ThemeProvider } from '@emotion/react';

function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  const onSubmit = () => {
    setLoading(!loading);
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <Avatar sx={{ m: 1 }} />
          <Typography component="h1" variant="h4">
            Вход
          </Typography>
          <Box component="form" noValidate autoComplete="on" onSubmit={handleSubmit(onSubmit)}>
            <TextField
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="Email"
              required
              fullWidth
              margin="normal"
              {...register('email', {
                required: 'Заполните поле',
                validate: {
                  matchPattern: (v) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
                    'Введите валидный Email (*** @**.**)',
                },
              })}
              error={errors.email ? true : false}
              helperText={errors.email && errors.email.message}
              disabled={loading ? true : false}
            />
            <TextField
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              value={password}
              type={showPassword ? 'text' : 'password'}
              onChange={(e) => setPassword(e.target.value)}
              label="Пароль"
              required
              fullWidth
              margin="normal"
              {...register('password', {
                required: 'Заполните поле',
                validate: {
                  matchPattern: (v) =>
                    /^(?=.*\S)(?=.*[A-ZА-Я])\S{8,}$/.test(v) ||
                    'Минимум 8 символов + одна заглавная буква(без пробел)',
                },
              })}
              error={errors.password ? true : false}
              helperText={errors.password && errors.password.message}
              disabled={loading ? true : false}
            />
            <LoadingButton
              type="submit"
              fullWidth
              loading={loading}
              variant="contained"
              sx={{ mt: 3, mb: 2 }}>
              Войти
            </LoadingButton>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Login;
