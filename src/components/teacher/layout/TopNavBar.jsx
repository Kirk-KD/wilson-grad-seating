import { AppBar, Tabs } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import StyledTab from "./StyledTab";

export default function TopNavBar() {
  const normalizePath = (path) => path.replace(/\/+$/, "") || "/";

  const navigate = useNavigate();
  const location = useLocation();

  const [value, setValue] = useState(normalizePath(location.pathname));
  useEffect(() => {
    setValue(normalizePath(location.pathname));
  }, [location.pathname]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <AppBar position="static" sx={{
      borderBottomLeftRadius: "10px",
      borderBottomRightRadius: "10px",
      backgroundColor: (theme) => theme.palette.background.transparent,
      boxShadow: 0
    }}>
      <Tabs 
        value={value} 
        onChange={handleChange} 
        indicatorColor="primary" 
        allowScrollButtonsMobile
        variant="scrollable"
        scrollButtons="auto"
        sx={{ 
          px: { lg: 4, md: 2 },
        }}
      >
        {[
          ["Seating", "/admin"],
          ["Students", "/admin/students"],
        ].map(([label, path]) => (
          <StyledTab 
            key={path} 
            value={path}
            label={label} 
            onClick={() => navigate(path)} 
          />
        ))}
      </Tabs>
    </AppBar>
  );
}