import type { MetadataRoute } from "next";
import { SITE_URL } from "@/config/resources";

export default function robots(): MetadataRoute.Robots {
  const isProduction = process.env.VERCEL_ENV === "production" || !process.env.VERCEL_ENV;

  return {
    rules: {
      userAgent: "*",
      allow: isProduction ? "/" : undefined,
      disallow: isProduction ? undefined : "/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
