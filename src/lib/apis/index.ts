import { AboutApi } from "../apis/about/about-api";
import { ExperienceApi } from "../apis/experience/experience-api";
import { HeroApi } from "../apis/hero/hero-api";
import { SocialMediaApi } from "../apis/social-media/social-media-api";

const heroApi = new HeroApi();
const aboutApi = new AboutApi();
const experienceApi = new ExperienceApi();
const socialMediaApi = new SocialMediaApi();

export { aboutApi, experienceApi, heroApi, socialMediaApi };
