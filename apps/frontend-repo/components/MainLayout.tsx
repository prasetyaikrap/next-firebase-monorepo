import { Box, Container } from "@mui/material";
import { ReactNode } from "react";
import { TopBar } from "./TopBar";

type MainLayoutProps = {
  children: ReactNode;
};

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <Container
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        minWidth: "100vw",
        px: "0 !important",
      }}
    >
      <TopBar />
      <Box
        display="flex"
        flexDirection="column"
        px="2rem"
        py="4rem"
        minHeight={{ xs: "calc(100vh - 60px)", md: "calc(100vh - 80px)" }}
      >
        {children}
      </Box>
    </Container>
  );
}
