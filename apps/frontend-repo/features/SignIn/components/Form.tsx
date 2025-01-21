"use client";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  TextField,
} from "@mui/material";

import { SignInFormSchema } from "../type";
import { signInFormSchema } from "../constants";
import { useForm } from "../../../hooks/useForm";

export function Form() {
  const { setValues, fieldForm, errors, handleSubmit } =
    useForm<SignInFormSchema>({
      defaultValues: { email: "", password: "", is_remember_me: false },
      schema: signInFormSchema,
    });

  const onSubmit = async (data: SignInFormSchema) => {
    console.log(data);
  };

  return (
    <Box
      component="form"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(onSubmit);
      }}
      sx={{ display: "flex", flexDirection: "column", width: "100%", gap: 2 }}
    >
      <FormControl>
        <FormLabel htmlFor="email">Email</FormLabel>
        <TextField
          error={Boolean(errors.email.message)}
          helperText={errors.email.message}
          id="email"
          type="email"
          name="email"
          placeholder="your@email.com"
          autoComplete="email"
          autoFocus
          required
          fullWidth
          variant="outlined"
          color={errors.email.message ? "error" : "primary"}
          onChange={(e) => {
            setValues({ email: e.currentTarget.value });
          }}
          value={fieldForm.email}
        />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="password">Password</FormLabel>
        <TextField
          error={Boolean(errors.password.message)}
          helperText={errors.password.message}
          name="password"
          placeholder="••••••"
          type="password"
          id="password"
          autoComplete="current-password"
          autoFocus
          required
          fullWidth
          variant="outlined"
          color={errors.password.message ? "error" : "primary"}
          onChange={(e) => {
            setValues({ password: e.currentTarget.value });
          }}
          value={fieldForm.password}
        />
      </FormControl>
      <FormControlLabel
        control={
          <Checkbox
            value="remember"
            color="primary"
            checked={fieldForm.is_remember_me}
            onChange={() =>
              setValues({ is_remember_me: !fieldForm.is_remember_me })
            }
          />
        }
        label="Remember me"
      />
      <Button type="submit" fullWidth variant="contained">
        Sign in
      </Button>
    </Box>
  );
}
