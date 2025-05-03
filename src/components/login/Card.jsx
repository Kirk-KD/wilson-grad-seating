import { Button, Checkbox, Fade } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import StudentForm from "./form/StudentForm";
import TeacherForm from "./form/TeacherForm";
import TabNav from "./nav/TabNav";

export default function Card() {
  const [tab, setTab] = useState("student");

  return (
    <Box
      sx={{
        minWidth: "30rem",
        maxWidth: "45rem",
        minHeight: "30rem",
        maxHeight: "50rem",
        padding: "0",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0px 10px 30px 5px rgba(0, 0, 0, 0.1)",
        position: "relative"
      }}
      className="bg-white-500"
    >
      <TabNav tab={tab} onChangeTab={setTab}></TabNav>

      <Box sx={{ position: "relative", flexGrow: 1 }}>
        <Fade in={tab === "student"} timeout={300} unmountOnExit>
          <Box sx={{ position: "absolute", width: "100%" }}>
            <StudentForm />
          </Box>
        </Fade>
        
        <Fade in={tab === "teacher"} timeout={300} unmountOnExit>
          <Box sx={{ position: "absolute", width: "100%" }}>
            <TeacherForm />
          </Box>
        </Fade>
      </Box>
      
      <Box>
        <Button variant="contained">Enter</Button>
        <Checkbox defaultChecked></Checkbox>
      </Box>
    </Box>
  );
}
