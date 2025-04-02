import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signupUser } from "./authSlice";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  CircularProgress,
  Link,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import PersonAddIcon from '@mui/icons-material/PersonAdd';

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

const Signup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      await dispatch(signupUser(data)).unwrap();
      navigate("/login");
    } catch (err) {
      console.error("Signup failed:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <BackgroundContainer>
      <StyledCard>
        <CardContent sx={{ p: 4 }}>
          <Box display="flex" flexDirection="column" alignItems="center">
            <Avatar sx={{ m: 1, bgcolor: 'primary.main', animation: `${fadeIn} 0.6s ease-in-out` }}>
              <PersonAddIcon />
            </Avatar>
            <Heading component="h1" variant="h5">
              Join Quicknotes
            </Heading>
            <Typography 
              variant="body2" 
              color="text.secondary" 
              sx={{ mb: 3, textAlign: 'center' }}
            >
              Create your account to get started
            </Typography>

            <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ width: '100%' }}>
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
                    sx={{ 
                      animation: `${fadeIn} 0.7s ease-in-out`,
                      '& .MuiOutlinedInput-root': {
                        '&:hover fieldset': {
                          borderColor: 'primary.main',
                        },
                      },
                    }}
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
                    sx={{ 
                      animation: `${fadeIn} 0.8s ease-in-out`,
                      '& .MuiOutlinedInput-root': {
                        '&:hover fieldset': {
                          borderColor: 'primary.main',
                        },
                      },
                    }}
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
                    sx={{ 
                      animation: `${fadeIn} 0.9s ease-in-out`,
                      '& .MuiOutlinedInput-root': {
                        '&:hover fieldset': {
                          borderColor: 'primary.main',
                        },
                      },
                    }}
                  />
                )}
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
                  "Create Account"
                )}
              </StyledButton>
              <Button
                fullWidth
                variant="text"
                onClick={handleLoginClick}
                sx={{ 
                  mt: 1, 
                  animation: `${fadeIn} 1s ease-in-out`,
                  color: 'primary.main'
                }}
              >
                Already have an account? Log In
              </Button>
            </Box>
          </Box>
        </CardContent>
      </StyledCard>
      <FooterText>
        © {new Date().getFullYear()} Quicknotes. All rights reserved.
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

export default Signup;
