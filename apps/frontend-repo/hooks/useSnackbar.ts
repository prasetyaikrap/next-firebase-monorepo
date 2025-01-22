"use client";

import { AlertProps, Fade } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { ComponentType, ReactElement, useState } from "react";

type SnackbarStateProps = {
  open: boolean;
  message: string;
  type: AlertProps["severity"];
  Transition: ComponentType<
    TransitionProps & {
      children: ReactElement<any, any>;
    }
  >;
};

type UseSnackbarProps = {
  initialOpen?: boolean;
  message?: string;
};

type OnOpenProps = {
  Transition?: SnackbarStateProps["Transition"];
  message?: SnackbarStateProps["message"];
  type?: SnackbarStateProps["type"];
};

export function useSnackbar(props?: UseSnackbarProps) {
  const [state, setState] = useState<SnackbarStateProps>({
    open: props?.initialOpen ?? false,
    message: props?.message ?? "",
    type: "info",
    Transition: Fade,
  });

  const onOpen = (props?: OnOpenProps) => {
    setState((prev) => ({
      ...prev,
      open: true,
      type: props?.type ?? prev.type,
      Transition: props?.Transition ?? prev.Transition,
      message: props?.message ?? prev.message,
    }));
  };

  const onClose = () => {
    setState({
      ...state,
      open: false,
    });
  };

  return { state, onOpen, onClose };
}
