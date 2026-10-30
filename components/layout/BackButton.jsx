import React from "react";
import { Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router";

export default function BackButton({
  label = "Back",
  fallback = "/organizations",
  ...props
}) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate(fallback);
    }
  };

  return (
    <Button
      variant="contained"
      startIcon={<ArrowBackIcon />}
      onClick={handleBack}
      {...props}
    >
      {label}
    </Button>
  );
}
