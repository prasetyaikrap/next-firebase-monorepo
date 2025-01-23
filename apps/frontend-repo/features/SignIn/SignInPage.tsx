"use client";
import {
  Box,
  Card,
  CardContent,
  Container,
  Fade,
  LinearProgress,
  Link,
  Typography,
} from "@mui/material";
import NextLink from "next/link";
import { Form } from "./components/Form";
import { useState } from "react";

export default function SignInPage() {
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
        flexDirection: "column",
        minWidth: "100vw",
      }}
    >
      <Card elevation={5}>
        <Fade in={cardLoading}>
          <LinearProgress sx={{ width: "100%" }} />
        </Fade>
        <CardContent sx={{ p: "2em" }}>
          <Box
            display="flex"
            flexDirection="column"
            rowGap="1em"
            width={{ xs: "300px", md: "400px" }}
            minHeight="400px"
          >
            <Typography component="h1" variant="h4">
              Sign In
            </Typography>
            <Form toggleLoading={toggleCardLoading} />
            <Typography sx={{ textAlign: "center" }}>
              Don&apos;t have an account?{" "}
              <span>
                <Link
                  component={NextLink}
                  href="/signup"
                  variant="body2"
                  sx={{ alignSelf: "center" }}
                >
                  Sign up
                </Link>
              </span>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}
