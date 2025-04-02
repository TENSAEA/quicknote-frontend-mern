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
  Card,
  CardContent,
  Avatar,
  CircularProgress,
  Link,
} from "@mui/material";
import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const BackgroundContainer = styled(Box)`
  min-height: 100vh;
  background: linear-gradient(135deg, #3f51b5 0%, #1e88e5 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const StyledCard = styled(Card)`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  animation: ${fadeIn} 0.5s ease-in-out;
  max-width: 400px;
  width: 100%;
`;

const Heading = styled(Typography)`
  font-family: "Roboto", sans-serif;
  font-weight: 600;
  text-align: center;
  color: #3f51b5;
  margin-bottom: 1rem;
`;

const StyledButton = styled(Button)`
  background: linear-gradient(45deg, #3f51b5 30%, #1e88e5 90%);
  border-radius: 25px;
  padding: 10px 20px;
  font-weight: 500;
  text-transform: none;
  &:hover {
    background: linear-gradient(45deg, #1e88e5 30%, #3f51b5 90%);
  }
`;

const FooterText = styled(Typography)`
  color: #ffffff;
  text-align: center;
  margin-top: 20px;
  font-size: 0.9rem;
`;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      const action = await dispatch(loginUser({ email, password })).unwrap();
      localStorage.setItem("token", action.token);
      dispatch(userLoggedIn({ id: action._id }));
      navigate("/dashboard");
    } catch (err) {
      setError("Unauthorized. Incorrect email or password.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignupClick = () => {
    navigate("/");
  };

  return (
    <BackgroundContainer>
      <StyledCard>
        <CardContent sx={{ p: 4 }}>
          <Box display="flex" flexDirection="column" alignItems="center">
            <Avatar sx={{ m: 1, bgcolor: 'primary.main', animation: `${fadeIn} 0.6s ease-in-out` }}>
              <LockOutlinedIcon />
            </Avatar>
            <Heading component="h1" variant="h5">
              Welcome Back
            </Heading>
            <Typography 
              variant="body2" 
              color="text.secondary" 
              sx={{ mb: 3, textAlign: 'center' }}
            >
              Please login to your account
            </Typography>

            {error && (
              <Alert severity="error" sx={{ width: "100%", mb: 2 }}>
                {error}
              </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
              <TextField
                label="Email"
                variant="outlined"
                margin="normal"
                fullWidth
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                sx={{ 
                  animation: `${fadeIn} 0.7s ease-in-out`,
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: 'primary.main',
                    },
                  },
                }}
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
                sx={{ 
                  animation: `${fadeIn} 0.8s ease-in-out`,
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: 'primary.main',
                    },
                  },
                }}
              />
              <StyledButton
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={isLoading}
              >
                {isLoading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Sign In"
                )}
              </StyledButton>
              <Button
                fullWidth
                variant="text"
                onClick={handleSignupClick}
                sx={{ 
                  mt: 1, 
                  animation: `${fadeIn} 0.9s ease-in-out`,
                  color: 'primary.main'
                }}
              >
                Don't have an account? Sign Up
              </Button>
            </Box>
          </Box>
        </CardContent>
      </StyledCard>
      <FooterText>
        © {new Date().getFullYear()} Your Company. All rights reserved.
        <br />
        <Link href="#" sx={{ color: '#fff', textDecoration: 'underline' }}>
          Privacy Policy
        </Link>
        {" | "}
        <Link href="#" sx={{ color: '#fff', textDecoration: 'underline' }}>
          Terms of Service
        </Link>
      </FooterText>
    </BackgroundContainer>
  );
};

export default Login;
