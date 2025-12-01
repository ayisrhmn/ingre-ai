import { Preloader } from "@/components/ui/preloader";
import { ThemeProvider } from "@/providers/theme-provider";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import type React from "react";
import { Suspense } from "react";
import "../styles/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "IngreAI — AI-Powered Ingredient Scanner & Recipe Generator",
  description:
    "Scan your ingredients and get smart recipe suggestions instantly. IngreAI uses camera-based ingredient detection and Google Gemini AI to create personalized dishes you can cook at home.",
  applicationName: "IngreAI — AI-Powered Ingredient Scanner & Recipe Generator",
  metadataBase: new URL("https://ingre-ai.vercel.app"),
  authors: [{ name: "Muhammad Fariz Rahman", url: "https://ayisrhmn.vercel.app" }],
  keywords: [
    "IngreAI",
    "Ingredient Scanner",
    "Recipe Generator",
    "Muhammad Fariz Rahman",
    "Fariz",
    "Ayis",
    "Ayisrhmn",
  ],
  openGraph: {
    title: "IngreAI — AI-Powered Ingredient Scanner & Recipe Generator",
    description:
      "Scan your ingredients and get smart recipe suggestions instantly. IngreAI uses camera-based ingredient detection and Google Gemini AI to create personalized dishes you can cook at home.",
    url: "https://ingre-ai.vercel.app",
    siteName: "IngreAI — AI-Powered Ingredient Scanner & Recipe Generator",
    images: [
      {
        url: "https://ingre-ai.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "IngreAI",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "IngreAI — AI-Powered Ingredient Scanner & Recipe Generator",
    description:
      "Scan your ingredients and get smart recipe suggestions instantly. IngreAI uses camera-based ingredient detection and Google Gemini AI to create personalized dishes you can cook at home.",
    images: [
      {
        url: "https://ingre-ai.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "IngreAI",
      },
    ],
    creator: "@ayisrhmn",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "https://ingre-ai.vercel.app",
  },
  other: {
    "google-site-verification": "QXVlq8lAnlntE6dV6T9lXJODwjSB5c6pxMi4pTQVsDw",
    "script:ld+json": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Muhammad Fariz Rahman",
      alternateName: "@Ayisrhmn",
      jobTitle: "Frontend Developer",
      url: "https://ayisrhmn.vercel.app",
      sameAs: [
        "https://github.com/ayisrhmn",
        "https://linkedin.com/in/ayisrhmn",
        "https://instagram.com/ayisrhmn",
      ],
    }),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        name: "IngreAI — AI-Powered Ingredient Scanner & Recipe Generator",
        url: "https://ingre-ai.vercel.app",
        potentialAction: {
          "@type": "SearchAction",
          target: "https://ingre-ai.vercel.app/?q={search_term_string}",
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "Organization",
        name: "IngreAI — AI-Powered Ingredient Scanner & Recipe Generator",
        url: "https://ingre-ai.vercel.app",
        logo: "https://ingre-ai.vercel.app/og-image.png",
        sameAs: ["https://twitter.com/ayisrhmn"],
      },
    ],
  };

  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`font-sans ${geistSans.variable} ${geistMono.variable} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Preloader />
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <Suspense>{children}</Suspense>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
