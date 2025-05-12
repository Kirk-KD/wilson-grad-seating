import { ThemeProvider } from "@emotion/react";
import '@fontsource-variable/raleway';
import '@fontsource/cal-sans';
import { CssBaseline } from "@mui/material";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashboardLayout from "./components/teacher/layout/DashboardLayout";
import FinishLoginPage from "./pages/FinishLoginPage";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import NotFound from "./pages/NotFound";
import StudentPage from "./pages/student/StudentPage";
import Seating from "./pages/teacher/Seating";
import Students from "./pages/teacher/Students";
import Teachers from "./pages/teacher/Teachers";
import theme from "./Theme";
import { auth } from "./utils/firebase/firebase.js";

function useEnforceUserExists() {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) return;

      user.reload().catch(err => {
        if (err.code === 'auth/user-not-found') {
          signOut(auth);
        }
      });
    });
    return unsubscribe;
  }, []);
}

export default function App() {
  useEnforceUserExists();
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/finishLogin" element={<FinishLoginPage />} />
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
