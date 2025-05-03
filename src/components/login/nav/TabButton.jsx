import { useTheme } from "@mui/material/styles";
import StyledTabBottonBox from "../../styled/StyledTabButtonBox";

export default function TabButton({ children, name, tab, onSwitchTab }) {
  const theme = useTheme();
  return (
    <StyledTabBottonBox
      sx={{
        flexGrow: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: tab === name ? theme.palette.primary.light : "none"
      }}
      onClick={onSwitchTab}
      // className={tab === name ? `tab-btn-${name}-on` : `tab-btn-${name}-off`}
    >
      {children}
    </StyledTabBottonBox>
  );
}
