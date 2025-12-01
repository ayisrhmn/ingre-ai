import { SOCIAL_MEDIA_ICONS } from "@/lib/constants";

type SocialName = keyof typeof SOCIAL_MEDIA_ICONS;

export type SocialMedia = {
  id: string;
  name: SocialName;
  link: string;
  createdAt: string;
  updatedAt: string;
};
