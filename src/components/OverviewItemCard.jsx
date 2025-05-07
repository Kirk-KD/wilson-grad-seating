import { Card, CardContent, CardHeader, useTheme } from "@mui/material";

export default function OverviewItemCard({ children, title }) {
  const theme = useTheme();

  return (
    <Card sx={{
      margin: "1rem auto",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: "100%"
    }}>
      <CardHeader title={title} sx={{
        width: "100%",
        borderBottom: `1px solid ${theme.palette.divider}`
      }} />
      <CardContent sx={{
        width: "fit-content"
      }}>{children}</CardContent>
    </Card>
  );
}