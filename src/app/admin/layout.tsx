import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard - Aycainvitation",
  description: "Kelola klien dan RSVP pernikahan digital",
  robots: "noindex, nofollow",
};

/**
 * Admin layout - Auth check happens in API routes
 * Client component will show 401 error if user not authenticated
 */
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-sakura-bg text-sakura-charcoal font-sans">
      <nav className="bg-white/85 backdrop-blur-md border-b border-sakura-primary-light/30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <h1 className="text-xl font-serif font-bold text-sakura-primary-dark">
            Aycainvitation Admin
          </h1>
          <a
            href="/"
            className="text-sm text-sakura-charcoal-muted hover:text-sakura-primary transition-colors underline font-medium"
          >
            ← Kembali ke Beranda
          </a>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
