import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Treetap | Enterprise Automation Solutions",
  description: "Advanced software development and automation solutions for forward-thinking enterprises.",
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
