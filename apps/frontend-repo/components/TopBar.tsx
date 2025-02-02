"use client";

import { useFirebaseAuth } from "@/hooks/useFirebaseAuth";
import { Box, Button, Paper, Stack } from "@mui/material";

export function TopBar() {
  const { logoutUser } = useFirebaseAuth();

  const onLogout = async () => {
    await logoutUser();
  };

  return (
    <Paper
      elevation={4}
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: { xs: "60px", md: "80px" },
        bgcolor: "white",
        py: "1rem",
        px: "2rem",
      }}
    >
      <Box />
      <Stack>
        <Button variant="contained" onClick={onLogout}>
          Logout
        </Button>
      </Stack>
    </Paper>
  );
}
