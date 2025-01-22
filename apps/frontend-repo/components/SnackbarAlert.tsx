import { useSnackbar } from "@/hooks/useSnackbar";
import { Alert, Snackbar, SnackbarProps } from "@mui/material";

type SnackbarAlertProps = {
  useSnackbarProps: ReturnType<typeof useSnackbar>;
  anchorOrigin?: SnackbarProps["anchorOrigin"];
  onClose?: () => void;
  autoHideDuration?: SnackbarProps["autoHideDuration"];
};

export function SnackbarAlert({
  useSnackbarProps,
  anchorOrigin,
  onClose: onAlertClose,
  autoHideDuration = 1500,
}: SnackbarAlertProps) {
  const { state, onClose } = useSnackbarProps;

  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "right", ...anchorOrigin }}
      open={state.open}
      onClose={onAlertClose ?? onClose}
      TransitionComponent={state.Transition}
      key={state.Transition.name}
      autoHideDuration={autoHideDuration}
    >
      <Alert
        onClose={onAlertClose ?? onClose}
        severity={state.type}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {state.message}
      </Alert>
    </Snackbar>
  );
}
