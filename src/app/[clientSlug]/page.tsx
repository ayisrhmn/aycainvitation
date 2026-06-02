import { getClientConfig } from "@/lib/clients";
import { getDemoThemeConfig } from "@/lib/themes";
import { notFound } from "next/navigation";
import ClientThemeWrapper from "./ClientThemeWrapper";
import { WeddingConfig } from "@/types";
import { cache } from "react";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ clientSlug: string }>;
}

// Wrap data fetches with React cache to deduplicate calls during metadata generation and rendering
const getCachedClientConfig = cache(getClientConfig);
const getCachedDemoThemeConfig = cache(getDemoThemeConfig);

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { clientSlug } = await params;

  let settings: WeddingConfig | null = null;
  const clientConfig = await getCachedClientConfig(clientSlug);
  if (clientConfig) {
    settings = clientConfig.settings;
  } else {
    const demoTheme = await getCachedDemoThemeConfig(clientSlug);
    if (demoTheme) {
      settings = demoTheme.settings;
    }
  }

  if (!settings) {
    return {
      title: "Undangan Pernikahan Digital - Aycainvitation",
      description:
        "Undangan pernikahan digital premium, murah, dan instan oleh Aycainvitation.",
    };
  }

  const { groom_nickname, bride_nickname } = settings;

  if (groom_nickname && bride_nickname) {
    const coupleName = `${groom_nickname} & ${bride_nickname}`;
    const title = `Pernikahan ${coupleName} - Aycainvitation`;
    const description = `Undangan pernikahan digital ${coupleName}. Temukan detail lokasi acara, tanggal, galeri foto, RSVP online, dan berikan doa restu Anda secara online.`;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        type: "website",
        siteName: "Aycainvitation",
        locale: "id_ID",
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
      },
    };
  }

  const displaySlug = clientSlug.charAt(0).toUpperCase() + clientSlug.slice(1);
  return {
    title: `Undangan Pernikahan ${displaySlug} - Aycainvitation`,
    description: `Undangan pernikahan digital premium, murah, dan instan oleh Aycainvitation.`,
  };
}

export default async function ClientPage({ params }: PageProps) {
  const { clientSlug } = await params;

  // 1. Dapatkan konfigurasi klien berdasarkan slug dari Supabase
  const clientConfig = await getCachedClientConfig(clientSlug);

  // 2. Jika client tidak ditemukan, cek apakah slug adalah tema demo yang valid di database
  if (!clientConfig) {
    const demoTheme = await getCachedDemoThemeConfig(clientSlug);
    if (demoTheme) {
      return (
        <ClientThemeWrapper
          theme={demoTheme.slug}
          clientSlug={clientSlug}
          initialConfig={demoTheme.settings}
          initialWishes={[
            {
              timestamp: new Date(Date.now() - 3600000).toISOString(),
              name: "Ahmad & Keluarga",
              attendance: "Hadir",
              guestsCount: 2,
              wish: "Selamat menempuh hidup baru! Semoga menjadi keluarga yang sakinah, mawaddah, dan warahmah. Aamiin.",
            },
            {
              timestamp: new Date(Date.now() - 7200000).toISOString(),
              name: "Sarah Wijaya",
              attendance: "Hadir",
              guestsCount: 1,
              wish: "Happy wedding ya! So happy for you guys, langgeng sampai kakek nenek!",
            },
            {
              timestamp: new Date(Date.now() - 86400000).toISOString(),
              name: "Rian & Partner",
              attendance: "Tidak Hadir",
              guestsCount: 0,
              wish: "Selamat berbahagia! Mohon maaf belum bisa hadir secara langsung.",
            },
          ]}
          isDemo={true}
        />
      );
    }

    return notFound();
  }

  // 3. Jika status klien masih Pending (belum aktif), tampilkan halaman tertunda
  if (clientConfig.status === "Pending") {
    const adminPhone = process.env.NEXT_PUBLIC_ADMIN_PHONE;
    const waText = encodeURIComponent(
      `Halo Aycainvitation, saya ingin mengaktifkan undangan untuk slug '${clientSlug}'. Mohon instruksi detail pembayarannya.`
    );
    const waLink = `https://wa.me/${adminPhone}?text=${waText}`;

    return (
      <div className="min-h-screen bg-[#FAF9F5] flex flex-col items-center justify-center p-6 text-center select-none">
        <div className="max-w-md w-full bg-white p-8 rounded-3xl border border-rose-gold-light/40 shadow-xl relative overflow-hidden">
          <div className="absolute inset-2 border border-dashed border-rose-gold-light/20 rounded-2xl pointer-events-none" />
          <div className="w-16 h-16 bg-rose-gold-light/10 rounded-full flex items-center justify-center text-rose-gold-dark mx-auto mb-4 border border-rose-gold-light/20">
            <span className="font-serif text-xl">Ay</span>
          </div>
          <h2 className="font-serif text-2xl font-semibold text-rose-gold-dark mb-3">
            Undangan Menunggu Aktivasi
          </h2>
          <p className="text-xs text-charcoal-muted leading-relaxed mb-6 font-sans">
            Terima kasih telah memilih <strong>Aycainvitation</strong>. Saat ini
            undangan dengan alamat <code>/{clientSlug}</code> sedang disiapkan
            dan menunggu proses verifikasi pembayaran.
          </p>
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 py-3.5 px-6 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold tracking-wider uppercase transition-all shadow-md shadow-emerald-600/20 cursor-pointer"
          >
            Aktivasi via WhatsApp
          </a>
        </div>
      </div>
    );
  }

  // 4. Fetch RSVPs from Supabase
  let initialWishes = [];
  try {
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:2931";
    const rsvpResponse = await fetch(`${appUrl}/api/rsvp?slug=${clientSlug}`, {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (rsvpResponse.ok) {
      const rsvpData = await rsvpResponse.json();
      if (rsvpData.status === "success" && rsvpData.data) {
        initialWishes = rsvpData.data;
      }
    }
  } catch (error) {
    console.error("Failed to fetch initial RSVPs:", error);
    // Continue with empty wishes if fetch fails
  }

  // 5. Gunakan settings dari Supabase (sudah embed di clientConfig)
  // Settings sudah berisi musik dan semua konfigurasi pernikahan
  const config: WeddingConfig = clientConfig.settings;

  return (
    <ClientThemeWrapper
      theme={clientConfig.theme}
      clientSlug={clientSlug}
      initialConfig={config}
      initialWishes={initialWishes}
      isDemo={false}
    />
  );
}
