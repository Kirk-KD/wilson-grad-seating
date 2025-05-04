import { Tabs } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import StyledTab from "./StyledTab";

export default function TabBar({ isTeacher, onClickStudent, onClickTeacher }) {
  const [tabIndex, setTabIndex] = useState(isTeacher ? 1 : 0);

  const handleChange = (event, newIndex) => {
    setTabIndex(newIndex);
    if (newIndex === 0) onClickStudent();
    else onClickTeacher();
  };

  return (
    <Box sx={{
      borderBottom: 1,
      borderColor: "divider",
      width: "90%",
      marginLeft: "auto",
      marginRight: "auto"
    }}>
      <Tabs value={tabIndex} onChange={handleChange} centered>
        <StyledTab label="Students"/>
        <StyledTab label="Teachers"/>
      </Tabs>
    </Box>
  );
}