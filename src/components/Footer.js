import React from "react";
import { Box, Typography, Link } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        position: "fixed",
        bottom: 0,
        width: "100%",
        backgroundColor: "#673ab7",
        color: "white",
        padding: "10px 0",
        textAlign: "center",
        py: 1.2,
        mt: 8,
      }}
    >
      <Typography variant="body2">
        © {new Date().getFullYear()} Made by Tensae Aschalew
      </Typography>
      <Link
        href="mailto:tensaeaschalew27@gmail.com"
        style={{ color: "white", textDecoration: "none" }}
      >
        tensaeaschalew27@gmail.com
      </Link>
    </Box>
  );
};

export default Footer;
