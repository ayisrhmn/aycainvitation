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
    "karina-anton": {
      title: "Ari Lasso - Cinta Terakhir",
      fileUrl: "/audio/Ari Lasso - Cinta Terakhir.mp3",
    },
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
    case "emerald-elegance":
      return {
        title: "Backstreet Boys - Shape of My Heart",
        fileUrl: "/audio/Shape of My Heart.mp3", // Lagu default tema
      };

    case "creamy-sage":
      return {
        title: "Westlife - When You Tell Me That You Love Me",
        fileUrl: "/audio/When You Tell Me That You Love Me.mp3", // Lagu default tema
      };

    default:
      return {
        title: "Backstreet Boys - Shape of My Heart",
        fileUrl: "/audio/Shape of My Heart.mp3", // Lagu fallback
      };
  }
}
