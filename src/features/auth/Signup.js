import React from "react";
import { useDispatch } from "react-redux";
import { signupUser } from "./authSlice";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Paper,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const FormContainer = styled(Paper)`
  padding: 3rem;
  margin-top: 3rem;
  width: 100%;
  border-radius: 2rem;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 1s ease-in-out;
`;

const Heading = styled(Typography)`
  font-family: "Arial", sans-serif;
  font-weight: bold;
  text-align: center;
  color: #3f51b5;
  transition: color 0.3s;

  &:hover {
    color: #1e88e5;
  }
`;

const Signup = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    dispatch(signupUser(data));
    navigate("/login");
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 8,
        }}
      >
        <Heading component="h1" variant="h4">
          Sign Up to Quicknotes
        </Heading>
        <FormContainer elevation={3}>
          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="name"
              control={control}
              defaultValue=""
              rules={{ required: "Name is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Name"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  error={!!errors.name}
                  helperText={errors.name ? errors.name.message : ""}
                  sx={{ animation: `${fadeIn} 0.5s ease-in-out` }}
                />
              )}
            />
            <Controller
              name="email"
              control={control}
              defaultValue=""
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address",
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Email"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  error={!!errors.email}
                  helperText={errors.email ? errors.email.message : ""}
                  sx={{ animation: `${fadeIn} 0.6s ease-in-out` }}
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              defaultValue=""
              rules={{
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Password"
                  type="password"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  error={!!errors.password}
                  helperText={errors.password ? errors.password.message : ""}
                  sx={{ animation: `${fadeIn} 0.7s ease-in-out` }}
                />
              )}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, animation: `${fadeIn} 0.8s ease-in-out` }}
            >
              Sign Up
            </Button>
            <Button
              fullWidth
              variant="outlined"
              sx={{ mt: 1, animation: `${fadeIn} 0.9s ease-in-out` }}
              onClick={handleLoginClick}
            >
              Already have an account? Log In
            </Button>
          </Box>
        </FormContainer>
      </Box>
    </Container>
  );
};

export default Signup;
