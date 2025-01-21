import { Box, Card, Container, Link, Typography } from "@mui/material";
import NextLink from "next/link";
import { Form } from "./components/Form";

export default function SignUpPage() {
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
      <Card variant="outlined" sx={{ p: "2.2em" }}>
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
          <Form />
          <Typography sx={{ textAlign: "center" }}>
            Already have an account?{" "}
            <span>
              <Link
                component={NextLink}
                href="/"
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
