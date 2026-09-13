import type { MetadataRoute } from "next";
import { IS_INDEXABLE, SITE_URL } from "@/config/resources";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: IS_INDEXABLE ? "/" : undefined,
      disallow: IS_INDEXABLE ? undefined : "/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
