"use client";
import { redirect } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { LoadingScreen } from "./LoadingScreen";
import { useFirebaseAuth } from "@/hooks/useFirebaseAuth";
import { match } from "ts-pattern";

type AuthenticatedProps = {
  children: ReactNode;
  loading?: ReactNode;
  redirectTo?: string;
};

export function AuthenticatedCheck({
  children,
  loading = <LoadingScreen />,
  redirectTo = "/",
}: AuthenticatedProps) {
  const { userState, authStateHandler } = useFirebaseAuth();
  const { isAuthenticated, isLoading } = userState;

  useEffect(() => {
    authStateHandler();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return match({ isAuthenticated, isLoading })
    .with({ isAuthenticated: false, isLoading: false }, () => <>{children}</>)
    .with({ isAuthenticated: true, isLoading: false }, () =>
      redirect(redirectTo)
    )
    .otherwise(() => loading);
}
