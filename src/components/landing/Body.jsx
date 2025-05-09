import { Box } from "@mui/material";

export default function Body() {
  return (
    <>
      <Box sx={{
        position: 'relative',
        height: "50vh",
        width: "100%",
        backgroundColor: "landingbg.main"
      }}>

      </Box>
      <Box sx={{
        position: 'relative',
        height: "50vh",
        width: "100%",
        backgroundColor: "landingbg.dark"
      }}>

      </Box>
    </>
  );
}