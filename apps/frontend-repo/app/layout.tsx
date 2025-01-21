import { ThemeContainer } from "../components/ThemeContainer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeContainer>{children}</ThemeContainer>
      </body>
    </html>
  );
}
