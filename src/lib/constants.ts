import {
  EnvelopeSimpleIcon,
  GithubLogoIcon,
  InstagramLogoIcon,
  LinkedinLogoIcon,
} from "@phosphor-icons/react/dist/ssr";

export const SOCIAL_MEDIA_ICONS = {
  GitHub: GithubLogoIcon,
  LinkedIn: LinkedinLogoIcon,
  Instagram: InstagramLogoIcon,
  Email: EnvelopeSimpleIcon,
};

export const PROJECTS = [
  {
    title: "E-Commerce Platform",
    description:
      "Full-stack e-commerce platform with shopping cart, payment integration, and admin dashboard. Built with focus on performance and user experience.",
    image: "/images/modern-ecommerce-interface.png",
    tags: ["Next.js", "TypeScript", "Stripe", "PostgreSQL"],
    github: "https://github.com",
    demo: "https://demo.com",
  },
  {
    title: "Task Management App",
    description:
      "Task management application with real-time collaboration, drag-and-drop interface, and notifications. Supports team workspaces and project organization.",
    image: "/images/task-management-dashboard.png",
    tags: ["React", "Node.js", "Socket.io", "MongoDB"],
    github: "https://github.com",
    demo: "https://demo.com",
  },
  {
    title: "Portfolio CMS",
    description:
      "Content Management System for portfolios and blogs with markdown support, image optimization, and SEO-friendly. Easy to customize and deploy.",
    image: "/images/portfolio-cms-interface.jpg",
    tags: ["Next.js", "MDX", "Tailwind CSS", "Vercel"],
    github: "https://github.com",
    demo: "https://demo.com",
  },
  {
    title: "Weather Dashboard",
    description:
      "Interactive weather dashboard with data visualization, 7-day forecast, and location-based weather information. Uses multiple weather APIs.",
    image: "/images/weather-dashboard.png",
    tags: ["React", "Chart.js", "Weather API", "Geolocation"],
    github: "https://github.com",
    demo: "https://demo.com",
  },
];
