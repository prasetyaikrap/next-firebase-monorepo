import { ReduxProvider } from "@/components/ReduxProvider";
import { ThemeContainer } from "@/components/ThemeContainer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <ThemeContainer>{children}</ThemeContainer>
        </ReduxProvider>
      </body>
    </html>
  );
}
