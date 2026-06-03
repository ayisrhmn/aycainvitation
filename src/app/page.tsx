import type { Metadata } from "next";
import LandingClientPage from "@/components/landing-page/LandingClientPage";

export const metadata: Metadata = {
  title: "Aycainvitation - Undangan Pernikahan Digital Premium, Murah & Instan",
  description:
    "Buat website undangan pernikahan digital premium, murah, dan instan hanya dalam 5 menit. Dilengkapi RSVP online otomatis dan desain mobile-responsive yang elegan.",
  keywords: [
    "undangan pernikahan digital",
    "undangan digital murah",
    "undangan pernikahan premium",
    "undangan pernikahan instan",
    "web undangan pernikahan",
    "aycainvitation",
    "rsvp online",
    "buku tamu digital",
    "undangan pernikahan online",
    "buat undangan instan",
  ],
  authors: [{ name: "Aycainvitation" }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title:
      "Aycainvitation - Undangan Pernikahan Digital Premium, Murah & Instan",
    description:
      "Buat website undangan pernikahan digital premium, murah, dan instan hanya dalam 5 menit. Dilengkapi RSVP online otomatis and desain mobile-responsive yang elegan.",
    url: "https://aycainvitation.vercel.app",
    siteName: "Aycainvitation",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "/logo.png",
        width: 512,
        height: 512,
        alt: "Aycainvitation Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Aycainvitation - Undangan Pernikahan Digital Premium, Murah & Instan",
    description:
      "Buat website undangan pernikahan digital premium, murah, dan instan hanya dalam 5 menit. Dilengkapi RSVP online otomatis.",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function LandingPage() {
  return <LandingClientPage />;
}
