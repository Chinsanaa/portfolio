export type SocialLink = {
  platform: string;
  url: string;
  color: string;
  label: string;
  comingSoon?: boolean;
};

export const socialLinks: SocialLink[] = [
  {
    platform: "linkedin",
    url: "https://www.linkedin.com/in/chinsanaa/",
    color: "#0077B5",
    label: "LinkedIn",
  },
  {
    platform: "github",
    url: "https://github.com/Chinsanaa",
    color: "#333333",
    label: "GitHub",
  },
  {
    platform: "instagram",
    url: "https://www.instagram.com/chinsna_/",
    color: "#E1306C",
    label: "Instagram",
    comingSoon: false,
  },
  {
    platform: "pinterest",
    url: "https://www.pinterest.com/chinsanaa0202/",
    color: "#E60023",
    label: "Pinterest",
    comingSoon: false,
  },
  {
    platform: "youtube",
    url: "https://www.youtube.com/@Chinsanaa",
    color: "#FF0000",
    label: "YouTube",
    comingSoon: false,
  },
  {
    platform: "tiktok",
    url: "https://www.tiktok.com/@chinsanaa",
    color: "#000000",
    label: "TikTok",
    comingSoon: false,
  },
];
