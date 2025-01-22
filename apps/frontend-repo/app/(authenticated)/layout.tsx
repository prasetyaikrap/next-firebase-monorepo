import { Authenticated } from "@/components/Authenticated";
import { MainLayout } from "@/components/MainLayout";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Authenticated>
      <MainLayout>{children}</MainLayout>
    </Authenticated>
  );
}
