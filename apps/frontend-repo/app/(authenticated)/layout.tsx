import { Authenticated } from "@/components/Authenticated";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Authenticated>{children}</Authenticated>;
}
