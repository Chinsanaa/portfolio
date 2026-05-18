import type { Metadata } from "next";
import { Press_Start_2P } from "next/font/google";
import "./globals.css";

const pressStart = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-press-start",
});

export const metadata: Metadata = {
  title: "Chinsanaa Chuluunbold | Portfolio",
  description:
    "Soft pixel-art portfolio — Data Science student at NYU Shanghai.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${pressStart.variable} h-full`}>
      <body className="min-h-full font-pixel antialiased">{children}</body>
    </html>
  );
}
