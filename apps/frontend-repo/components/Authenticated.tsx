"use client";
import { redirect } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { LoadingScreen } from "./LoadingScreen";
import { useFirebaseAuth } from "@/hooks/useFirebaseAuth";

type AuthenticatedProps = {
  children: ReactNode;
  loading?: ReactNode;
  redirectTo?: string;
};

export function Authenticated({
  children,
  loading = <LoadingScreen />,
  redirectTo = "/login",
}: AuthenticatedProps) {
  const { userState, authStateHandler } = useFirebaseAuth();
  const { isAuthenticated, isLoading } = userState;

  useEffect(() => {
    authStateHandler();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) return loading;

  if (!isAuthenticated) {
    redirect(redirectTo);
  }

  return <>{children}</>;
}
