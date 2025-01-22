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
import { useForm } from "@/hooks/useForm";
import { useFirebaseAuth } from "@/hooks/useFirebaseAuth";
import { useSnackbar } from "@/hooks/useSnackbar";
import { SnackbarAlert } from "@/components/SnackbarAlert";
import { firebaseAuthError } from "@repo/shared/firebaseUtils";
import { useEffect } from "react";
import { nativeRouter } from "@/utils/client";

export function Form() {
  const router = nativeRouter();
  const { signInUser } = useFirebaseAuth();
  const { setValues, fieldForm, formLoading, errors, handleSubmit } =
    useForm<SignInFormSchema>({
      defaultValues: { email: "", password: "", is_remember_me: false },
      schema: signInFormSchema,
    });
  const useSnackbarProps = useSnackbar();
  const { state, onOpen, onClose } = useSnackbarProps;

  const onAlertClose = () => {
    onClose();
    if (state.type === "success") {
      router.replace("/");
    }
  };

  const onSubmit = async (data: SignInFormSchema) => {
    const {
      success,
      error,
      data: resData,
    } = await signInUser(data.email, data.password);

    if (!success) {
      const { message } = firebaseAuthError(error);
      return onOpen({
        type: "error",
        message,
      });
    }

    if (data.is_remember_me) {
      localStorage.setItem("user_signin_email", data.email);
    }

    onOpen({
      type: "success",
      message: `Sign In Success, Welcome back ${resData?.user.displayName}`,
    });
  };

  useEffect(() => {
    const rememberEmail = localStorage.getItem("user_signin_email") ?? "";
    setValues({ email: rememberEmail });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          disabled={formLoading}
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
          disabled={formLoading}
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
        disabled={formLoading}
      />
      <Button type="submit" fullWidth variant="contained" loading={formLoading}>
        Sign in
      </Button>
      <SnackbarAlert
        useSnackbarProps={useSnackbarProps}
        onClose={onAlertClose}
        autoHideDuration={1000}
      />
    </Box>
  );
}
