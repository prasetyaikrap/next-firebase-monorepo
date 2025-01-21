import { Container, LinearProgress } from "@mui/material";

export function LoadingScreen() {
  return (
    <Container
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        minWidth: "100vw",
        px: "0px !important",
      }}
    >
      <LinearProgress sx={{ width: "100%" }} />
    </Container>
  );
}
