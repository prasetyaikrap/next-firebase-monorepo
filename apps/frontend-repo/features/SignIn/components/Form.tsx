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
import { useFirebaseAuth } from "@/hooks/useFirebaseAuth";
import { useSnackbar } from "@/hooks/useSnackbar";
import { SnackbarAlert } from "@/components/SnackbarAlert";
import { firebaseAuthError } from "@repo/shared/firebaseUtils";
import { useEffect } from "react";
import { nativeRouter } from "@/utils/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

type FormProps = {
  toggleLoading: (state?: boolean) => void;
};

export function Form({ toggleLoading }: FormProps) {
  const router = nativeRouter();
  const { signInUser } = useFirebaseAuth();
  const {
    register,
    formState: { errors, isLoading, isSubmitting },
    watch,
    setValue,
    handleSubmit,
  } = useForm<SignInFormSchema>({
    defaultValues: { email: "", password: "", is_remember_me: false },
    resolver: zodResolver(signInFormSchema),
  });
  const { is_remember_me: watchRememberMe } = watch();
  const formLoading = isSubmitting || isLoading;
  const useSnackbarProps = useSnackbar();
  const { state, onOpen, onClose } = useSnackbarProps;

  const onAlertClose = () => {
    onClose();
    if (state.type === "success") {
      router.replace("/");
    }
  };

  const onSubmit = async (data: SignInFormSchema) => {
    toggleLoading(true);
    const {
      success,
      error,
      data: resData,
    } = await signInUser(data.email, data.password);

    if (!success) {
      const { message } = firebaseAuthError(error);
      toggleLoading(false);
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
    setValue("email", rememberEmail);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ display: "flex", flexDirection: "column", width: "100%", gap: 2 }}
    >
      <FormControl>
        <FormLabel htmlFor="email">Email</FormLabel>
        <TextField
          {...register("email")}
          type="email"
          placeholder="your@email.com"
          autoComplete="email"
          autoFocus
          required
          fullWidth
          variant="outlined"
          color={errors.email?.message ? "error" : "primary"}
          error={Boolean(errors.email)}
          helperText={errors.email?.message}
          disabled={formLoading}
        />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="password">Password</FormLabel>
        <TextField
          {...register("password")}
          placeholder="••••••"
          type="password"
          autoComplete="current-password"
          autoFocus
          required
          fullWidth
          variant="outlined"
          color={errors.password?.message ? "error" : "primary"}
          error={Boolean(errors.password)}
          helperText={errors.password?.message}
          disabled={formLoading}
        />
      </FormControl>
      <FormControlLabel
        control={
          <Checkbox
            value="remember"
            color="primary"
            checked={watchRememberMe}
            onChange={() => setValue("is_remember_me", !watchRememberMe)}
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
