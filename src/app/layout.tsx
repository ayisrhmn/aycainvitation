import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Outfit, Great_Vibes } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const outfit = Outfit({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const greatVibes = Great_Vibes({
  variable: "--font-script",
  subsets: ["latin"],
  weight: ["400"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: "Undangan Pernikahan Romantis & Estetik",
  description:
    "Buka undangan digital kami untuk berbagi hari bahagia bersama kami.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${cormorantGaramond.variable} ${outfit.variable} ${greatVibes.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col text-charcoal bg-cream">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
