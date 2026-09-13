import type { Metadata } from "next";
import { Montserrat, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  weight: ["600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const inter = Inter({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-inter",
});

const plexMono = IBM_Plex_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-plex-mono",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://chinsanaa.vercel.app";
const TITLE = "Chinsanaa Chuluunbold | Data Science & Finance";
const DESCRIPTION =
  "Data Scientist + Finance enthusiast building data-driven solutions that move markets.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  manifest: "/site.webmanifest",
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: "Chinsanaa Chuluunbold",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: TITLE }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${inter.variable} ${plexMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
