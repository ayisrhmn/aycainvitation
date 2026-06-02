import { ensureSupabaseAdmin } from "./supabase";
import { WeddingConfig } from "@/types";

export interface ClientConfig {
  slug: string;
  email: string;
  phone: string;
  theme: string;
  status: "Active" | "Pending";
  settings: WeddingConfig;
  createdAt: string;
}

/**
 * Mendapatkan konfigurasi klien dari Supabase berdasarkan slug.
 * Mengembalikan data clients baik berstatus 'Active' maupun 'Pending'.
 * Data settings di-parse dari JSONB.
 */
export async function getClientConfig(
  slug: string
): Promise<ClientConfig | null> {
  try {
    const normalizedSlug = slug.toLowerCase().trim();
    const supabaseAdmin = ensureSupabaseAdmin();

    const { data, error } = await supabaseAdmin
      .from("clients")
      .select("slug, email, phone, theme, status, settings, created_at")
      .eq("slug", normalizedSlug)
      .single();

    if (error || !data) {
      return null;
    }

    return {
      slug: data.slug,
      email: data.email,
      phone: data.phone,
      theme: data.theme,
      status: data.status,
      settings: (data.settings || {}) as WeddingConfig,
      createdAt: data.created_at,
    };
  } catch (error) {
    console.error(`Error fetching client config for slug "${slug}":`, error);
    return null;
  }
}

// Peta musik kustom klien yang dikelola langsung di codebase.
// Admin dapat memetakan slug klien ke judul dan file musik pilihan mereka di sini.
// Letakkan file audio (.mp3) di folder /public/music/ lalu daftarkan di bawah ini.
// Contoh:
// "nama-slug-klien": {
//   title: "Westlife - When You Tell Me That You Love Me",
//   fileUrl: "/music/When You Tell Me That You Love Me.mp3",
// },
export const CLIENT_MUSIC: Record<string, { title: string; fileUrl: string }> =
  {
    // Tambahkan kustom musik klien di bawah ini:
  };

/**
 * Mendapatkan detail musik kustom klien atau fallback ke default tema.
 */
export function getClientMusic(
  slug: string,
  theme: string
): { title: string; fileUrl: string } {
  const normalizedSlug = slug.toLowerCase().trim();

  // Cek apakah ada lagu kustom terdaftar untuk klien ini
  if (CLIENT_MUSIC[normalizedSlug]) {
    return CLIENT_MUSIC[normalizedSlug];
  }

  // Fallback berdasarkan tema jika tidak ada lagu kustom
  switch (theme) {
    case "creamy-sage":
    default:
      return {
        title: "Westlife - When You Tell Me That You Love Me",
        fileUrl: "/music/When You Tell Me That You Love Me.mp3", // Lagu default tema
      };
  }
}
