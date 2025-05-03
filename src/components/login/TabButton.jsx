import { Tab } from "@mui/material";
import React from "react";

export default function TabButton({ onClick, label }) {
  return (
    <Tab label={label} onClick={onClick} />
  );
}