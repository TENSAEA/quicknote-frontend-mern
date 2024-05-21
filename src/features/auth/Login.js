import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "./authSlice";
import { userLoggedIn } from "../user/userSlice";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Alert,
} from "@mui/material";
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

const Heading = styled(Typography)`
  font-family: "Arial", sans-serif;
  font-weight: bold;
  text-align: center;
  color: #3f51b5;
  animation: ${fadeIn} 1s ease-in-out;
  transition: color 0.3s;

  &:hover {
    color: #1e88e5;
  }
`;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password })).then((action) => {
      if (action.payload?.token) {
        localStorage.setItem("token", action.payload.token);
        dispatch(userLoggedIn({ id: action.payload._id }));
        navigate("/dashboard");
      } else {
        setError("Unauthorized. Incorrect email or password.");
      }
    });
  };

  const handleSignupClick = () => {
    navigate("/");
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
        <Heading component="h1" variant="h5">
          Login
        </Heading>
        {error && (
          <Alert severity="error" sx={{ mt: 2, width: "100%" }}>
            {error}
          </Alert>
        )}
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
            label="Email"
            variant="outlined"
            margin="normal"
            fullWidth
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            sx={{ animation: `${fadeIn} 0.5s ease-in-out` }}
          />
          <TextField
            label="Password"
            variant="outlined"
            margin="normal"
            fullWidth
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            sx={{ animation: `${fadeIn} 0.6s ease-in-out` }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, animation: `${fadeIn} 0.7s ease-in-out` }}
          >
            Login
          </Button>
          <Button
            fullWidth
            variant="outlined"
            sx={{ mt: 1, animation: `${fadeIn} 0.8s ease-in-out` }}
            onClick={handleSignupClick}
          >
            Don't have an account? Sign Up
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
