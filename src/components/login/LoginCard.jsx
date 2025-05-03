import { Paper } from "@mui/material";
import { useState } from "react";
import TabBar from "./TabBar";
import TabContent from "./TabContent";

export default function LoginCard() {
  const [isTeacher, setTeacher] = useState(false);

  return (
    <Paper elevation={3}
      sx={{
        width: {
          xs: "100%",
          sm: "30rem"
        },
        minHeight: {
          xs: "100%",
          sm: "30rem"
        },
        padding: "0",
        display: "flex",
        flexDirection: "column",
        position: "relative"
      }}
    >
      <TabBar isTeacher={isTeacher} onClickStudent={() => setTeacher(false)} onClickTeacher={() => setTeacher(true)} />
      <TabContent isTeacher={isTeacher} />
    </Paper>
  );
}
