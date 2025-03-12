import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mindscribe",
  description: "Personal Diary Fullstack Webpage",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
