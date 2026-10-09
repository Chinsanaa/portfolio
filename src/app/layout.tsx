import type { Metadata } from "next";
import { Archivo, Geist, Noto_Sans_Mongolian } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { IS_INDEXABLE, SITE_URL, URLS } from "@/config/resources";
import { skillCategories } from "@/components/portfolio/content";
import "./globals.css";

// Bold neo-grotesque for display. Its variable weight axis drives the
// hero's pointer-proximity effect.
const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
});

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

// Traditional Mongol script for the hero name. Not preloaded: the browser
// only downloads it if Mongolian text is actually on the page.
const mongolian = Noto_Sans_Mongolian({
  weight: "400",
  subsets: ["mongolian"],
  preload: false,
  variable: "--font-mongolian",
});

const TITLE = "Chinsanaa Chuluunbold | Data Science & Finance";
const SITE_NAME = "Chinsanaa Portfolio";
const DESCRIPTION =
  "Portfolio of Chinsanaa Chuluunbold, a Data Science student (Finance concentration) at NYU Shanghai. Financial Analyst experience with Excel, SQL, and Power BI; builder of full-stack machine learning and financial analytics projects.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  manifest: "/site.webmanifest",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: IS_INDEXABLE,
    follow: IS_INDEXABLE,
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
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
  image: `${SITE_URL}/og-image.png`,
  jobTitle: "Data Science Student & Financial Analyst",
  description: DESCRIPTION,
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "NYU Shanghai",
  },
  knowsAbout: skillCategories.flatMap((category) => category.skills),
  sameAs: [URLS.socials.github, URLS.socials.linkedin],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${geist.variable} ${mongolian.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Applies a theme picked in ⌘K before first paint; otherwise the OS setting wins. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}`,
          }}
        />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
