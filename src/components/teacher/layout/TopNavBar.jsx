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
    <AppBar position="static">
      <Tabs 
        value={value} 
        onChange={handleChange} 
        indicatorColor="secondary" 
        allowScrollButtonsMobile
        variant="scrollable"
        scrollButtons="auto"
        sx={{ px: { lg: 4, md: 2 } }}
      >
        {[
          ["Seating", "/admin"],
          ["Students", "/admin/students"],
          ["Teachers", "/admin/teachers"],
          ["Settings", "/admin/settings"],
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