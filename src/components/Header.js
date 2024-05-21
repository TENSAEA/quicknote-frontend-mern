import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchCurrentUser,
  userLoggedOut,
  selectUserById,
} from "../features/user/userSlice";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Container,
  Paper,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NoteIcon from "@mui/icons-material/Note";
import LogoutIcon from "@mui/icons-material/Logout";
import { keyframes } from "@mui/system";

const fadeInSlideDown = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Header = () => {
  const dispatch = useDispatch();
  const userProfileId = useSelector((state) => state.user.currentUserId);
  const userProfile = useSelector((state) =>
    selectUserById(state, userProfileId)
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(fetchCurrentUser());
    }
  }, [dispatch]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(userLoggedOut());
    window.location.href = "/login";
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#6A1B9A" }}>
      <Container>
        <Paper
          elevation={4}
          sx={{ borderRadius: 2, overflow: "hidden", padding: "5px" }}
        >
          <Toolbar>
            <Typography
              variant="h4"
              sx={{
                flexGrow: 1,
                fontFamily: "Lobster, cursive",
                color: "blue",
                animation: `${fadeInSlideDown} 1s ease-out`,
                ":hover": {
                  color: "black",
                  transform: "scale(1.05)",
                  transition: "transform 0.3s, color 0.3s",
                },
              }}
            >
              Quicknotes
            </Typography>
            {userProfile && (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography
                  variant="body1"
                  sx={{ marginRight: 2, color: "white" }}
                >
                  {userProfile.name}
                </Typography>
                <Button
                  color="inherit"
                  onClick={handleLogout}
                  startIcon={<LogoutIcon />}
                  sx={{
                    backgroundColor: "#8e24aa",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "#ab47bc",
                    },
                    marginRight: 2,
                    padding: "6px 12px",
                    borderRadius: "20px",
                    boxShadow: 1,
                  }}
                >
                  Log Out
                </Button>
                <IconButton
                  color="inherit"
                  component={Link}
                  to="/profile"
                  sx={{ marginLeft: 2 }}
                >
                  <AccountCircleIcon />
                </IconButton>
              </Box>
            )}
          </Toolbar>
        </Paper>
      </Container>
    </AppBar>
  );
};

export default Header;
