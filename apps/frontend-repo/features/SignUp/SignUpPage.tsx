"use client";
import { Box, Card, Container, Link, Typography } from "@mui/material";
import NextLink from "next/link";
import { Form } from "./components/Form";
import { useState } from "react";

export default function SignUpPage() {
  const [cardLoading, setCardLoading] = useState(false);

  const toggleCardLoading = (state?: boolean) =>
    setCardLoading(state ?? !cardLoading);

  return (
    <Container
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minWidth: "100vw",
      }}
    >
      <Card elevation={5} sx={{ p: "2.2em" }}>
        <Box
          display="flex"
          flexDirection="column"
          rowGap="1em"
          width={{ xs: "300px", md: "400px" }}
          minHeight="400px"
        >
          <Typography component="h1" variant="h4">
            Create Account
          </Typography>
          <Form toggleLoading={toggleCardLoading} />
          <Typography sx={{ textAlign: "center" }}>
            Already have an account?{" "}
            <span>
              <Link
                component={NextLink}
                href="/signin"
                variant="body2"
                sx={{ alignSelf: "center" }}
              >
                Sign in
              </Link>
            </span>
          </Typography>
        </Box>
      </Card>
    </Container>
  );
}
