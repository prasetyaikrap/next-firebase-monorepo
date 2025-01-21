"use client";
import { Box, Button, FormControl, FormLabel, TextField } from "@mui/material";
import { useForm } from "../../../hooks/useForm";
import { SignUpFormSchema } from "../type";
import { signUpFormSchema } from "../constants";
import { useEffect } from "react";

export function Form() {
  const { setValues, fieldForm, errors, setErrors, handleSubmit, formLoading } =
    useForm<SignUpFormSchema>({
      defaultValues: {
        name: "",
        email: "",
        password: "",
        confirm_password: "",
      },
      schema: signUpFormSchema,
    });

  const onSubmit = async (data: SignUpFormSchema) => {
    console.log(data);
  };

  useEffect(() => {
    if (fieldForm.confirm_password !== fieldForm.password) {
      setErrors({ confirm_password: { message: "Password not match" } });
    } else {
      setErrors({ confirm_password: { message: "" } });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fieldForm.confirm_password]);

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
        <FormLabel htmlFor="name">Name</FormLabel>
        <TextField
          id="name"
          type="text"
          name="name"
          placeholder="Buddy E."
          autoFocus
          required
          fullWidth
          variant="outlined"
          error={Boolean(errors.name.message)}
          helperText={errors.name.message}
          color={errors.name.message ? "error" : "primary"}
          onChange={(e) => setValues({ name: e.currentTarget.value })}
          value={fieldForm.name}
          disabled={formLoading}
        />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="email">Email</FormLabel>
        <TextField
          id="email"
          type="email"
          name="email"
          placeholder="your@email.com"
          autoComplete="email"
          autoFocus
          required
          fullWidth
          variant="outlined"
          error={Boolean(errors.email.message)}
          helperText={errors.email.message}
          color={errors.email.message ? "error" : "primary"}
          onChange={(e) => setValues({ email: e.currentTarget.value })}
          value={fieldForm.email}
          disabled={formLoading}
        />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="password">Password</FormLabel>
        <TextField
          name="password"
          placeholder="••••••"
          type="password"
          id="password"
          autoFocus
          required
          fullWidth
          variant="outlined"
          error={Boolean(errors.password.message)}
          helperText={errors.password.message}
          color={errors.password.message ? "error" : "primary"}
          onChange={(e) => setValues({ password: e.currentTarget.value })}
          value={fieldForm.password}
          disabled={formLoading}
        />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
        <TextField
          name="confirm_password"
          placeholder="••••••"
          type="password"
          id="confirm_password"
          autoFocus
          required
          fullWidth
          variant="outlined"
          error={Boolean(errors.confirm_password.message)}
          helperText={errors.confirm_password.message}
          color={errors.confirm_password.message ? "error" : "primary"}
          onChange={(e) =>
            setValues({ confirm_password: e.currentTarget.value })
          }
          value={fieldForm.confirm_password}
          disabled={formLoading}
        />
      </FormControl>
      <Button type="submit" fullWidth variant="contained" loading={formLoading}>
        Sign up
      </Button>
    </Box>
  );
}
