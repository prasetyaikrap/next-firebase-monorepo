import { AuthenticatedCheck } from "@/components/AuthenticatedCheck";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AuthenticatedCheck>{children}</AuthenticatedCheck>;
}
