import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Products from "../features/product/Products";
import { selectUserById } from "../features/user/userSlice";
import { fetchCurrentUser } from "../features/user/userSlice"; // Import the thunk
import Header from "./Header";
import Footer from "./Footer";
import { Box, CircularProgress } from "@mui/material";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const currentUserId = useSelector((state) => state.user.currentUserId);
  const user = useSelector((state) => selectUserById(state, currentUserId));
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(fetchCurrentUser()).finally(() => setLoading(false));
    } else {
      navigate("/login");
    }
  }, [dispatch, navigate]);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [loading, user, navigate]);

  if (loading) {
    return (
      <div>
        <Header />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress />
        </Box>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Header />
      <Box sx={{ marginBottom: "60px" }}>
        <Products />
      </Box>
      <Footer />
    </div>
  );
};

export default Dashboard;
