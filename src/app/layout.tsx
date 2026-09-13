import type { Metadata } from "next";
import { Montserrat, Inter, IBM_Plex_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SITE_URL, URLS } from "@/config/resources";
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

const TITLE = "Chinsanaa Chuluunbold | Data Science & Finance";
const DESCRIPTION =
  "Data Scientist + Finance enthusiast building data-driven solutions that move markets.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  manifest: "/site.webmanifest",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: process.env.VERCEL_ENV === "production" || !process.env.VERCEL_ENV,
    follow: process.env.VERCEL_ENV === "production" || !process.env.VERCEL_ENV,
  },
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

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Chinsanaa Chuluunbold",
  url: SITE_URL,
  jobTitle: "Data Science Student & Financial Analyst",
  description: DESCRIPTION,
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "NYU Shanghai",
  },
  sameAs: [URLS.socials.github, URLS.socials.linkedin],
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
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
