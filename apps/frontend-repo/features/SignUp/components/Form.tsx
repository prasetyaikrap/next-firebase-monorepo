"use client";
import { Box, Button, FormControl, FormLabel, TextField } from "@mui/material";
import { SignUpFormSchema } from "../type";
import { signUpFormSchema } from "../constants";
import { useEffect } from "react";
import { useFirebaseAuth } from "@/hooks/useFirebaseAuth";
import { SnackbarAlert } from "@/components/SnackbarAlert";
import { useSnackbar } from "@/hooks/useSnackbar";
import { firebaseAuthError } from "@repo/shared/firebaseUtils";
import { nativeRouter } from "@/utils/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

type FormProps = {
  toggleLoading: (state?: boolean) => void;
};

export function Form({ toggleLoading }: FormProps) {
  const router = nativeRouter();
  const { registerUser } = useFirebaseAuth();
  const {
    register,
    formState: { errors, isLoading, isSubmitting },
    setError,
    clearErrors,
    watch,
    handleSubmit,
  } = useForm<SignUpFormSchema>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirm_password: "",
    },
    resolver: zodResolver(signUpFormSchema),
  });

  const { password: watchPassword, confirm_password: watchConfirmPassword } =
    watch();
  const formLoading = isLoading || isSubmitting;
  const useSnackbarProps = useSnackbar();
  const { state, onOpen, onClose } = useSnackbarProps;

  const onAlertClose = () => {
    onClose();
    if (state.type === "success") {
      router.replace("/");
    }
  };
  const onSubmit = async (data: SignUpFormSchema) => {
    toggleLoading(true);
    const {
      success,
      data: resData,
      error,
    } = await registerUser(data.email, data.password, data.name);
    if (!success) {
      const { message } = firebaseAuthError(error);
      toggleLoading(false);
      return onOpen({
        type: "error",
        message,
      });
    }

    onOpen({
      type: "success",
      message: `Sign Up Success, Welcome ${resData?.user.displayName}`,
    });
  };

  useEffect(() => {
    if (watchConfirmPassword !== watchPassword) {
      setError("confirm_password", { message: "Password not match" });
    } else {
      clearErrors("confirm_password");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchConfirmPassword]);

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ display: "flex", flexDirection: "column", width: "100%", gap: 2 }}
    >
      <FormControl>
        <FormLabel htmlFor="name">Name</FormLabel>
        <TextField
          {...register("name")}
          type="text"
          placeholder="Buddy E."
          autoFocus
          required
          fullWidth
          variant="outlined"
          error={Boolean(errors.name)}
          helperText={errors.name?.message}
          color={errors.name?.message ? "error" : "primary"}
          disabled={formLoading}
        />
      </FormControl>
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
          error={Boolean(errors.email)}
          helperText={errors.email?.message}
          color={errors.email?.message ? "error" : "primary"}
          disabled={formLoading}
        />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="password">Password</FormLabel>
        <TextField
          {...register("password")}
          placeholder="••••••"
          type="password"
          autoFocus
          required
          fullWidth
          variant="outlined"
          error={Boolean(errors.password)}
          helperText={errors.password?.message}
          color={errors.password?.message ? "error" : "primary"}
          disabled={formLoading}
        />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="confirm_password">Confirm Password</FormLabel>
        <TextField
          {...register("confirm_password")}
          placeholder="••••••"
          type="password"
          autoFocus
          required
          fullWidth
          variant="outlined"
          error={Boolean(errors.confirm_password)}
          helperText={errors.confirm_password?.message}
          color={errors.confirm_password?.message ? "error" : "primary"}
          disabled={formLoading}
        />
      </FormControl>
      <Button type="submit" fullWidth variant="contained" loading={formLoading}>
        Sign up
      </Button>
      <SnackbarAlert
        useSnackbarProps={useSnackbarProps}
        onClose={onAlertClose}
      />
    </Box>
  );
}
