import type { Metadata } from "next";
import { BackgroundTexture } from "./Components/TextureOverlay";
import "./globals.css";

export const metadata: Metadata = {
  title: "RchnaKaar",
  description: "EXTR4 ORD1N4RY DR1P!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black">
        <BackgroundTexture />
        <main>{children}</main>
      </body>
    </html>
  );
}
