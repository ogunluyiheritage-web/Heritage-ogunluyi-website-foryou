import type { Metadata } from "next";
import { Fraunces, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/data";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const grotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-grotesk",
  weight: ["400", "500", "600"],
  display: "swap",
});

const title = `${site.name} — Creative Developer`;
const description =
  "I design and develop premium digital experiences for luxury real estate, hospitality, architecture, and ambitious brands.";
const url = "https://heritage.studio";

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title: {
    default: title,
    template: `%s — ${site.name}`,
  },
  description,
  openGraph: {
    title,
    description,
    url,
    siteName: site.name,
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: title }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${grotesk.variable}`}>
      <body className="font-sans antialiased bg-paper text-ink">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:z-[100] focus:top-4 focus:left-4 focus:bg-ink focus:text-paper focus:px-4 focus:py-2 focus:text-sm"
        >
          Skip to content
        </a>
        <div className="grain-overlay" aria-hidden />
        {children}
      </body>
    </html>
  );
}
