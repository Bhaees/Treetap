import type { Metadata } from "next";
import Providers from "@/components/Providers";
import FallingLeaves from "@/components/FallingLeaves";
import "./globals.css";

export const metadata: Metadata = {
  title: "TreeTap | Plant Trees with a Click",
  description: "Join the movement to restore forests. $1 plants one real tree. Track our global impact live.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <FallingLeaves />
          {children}
        </Providers>
      </body>
    </html>
  );
}
