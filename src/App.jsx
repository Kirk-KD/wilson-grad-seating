import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashboardLayout from "./components/teacher/layout/DashboardLayout";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import NotFound from "./pages/NotFound";
import StudentPage from "./pages/student/StudentPage";
import Seating from "./pages/teacher/Seating";
import Students from "./pages/teacher/Students";
import Teachers from "./pages/teacher/Teachers";
import theme from "./Theme";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/student" element={<StudentPage />} />
          <Route path="/admin" element={<DashboardLayout />}>
            <Route index element={<Seating />} />
            <Route path="students" element={<Students />} />
            <Route path="teachers" element={<Teachers />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
