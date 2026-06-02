"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

function formatWhatsAppNumber(phone: string): string {
  let cleaned = phone.replace(/\D/g, "");
  if (cleaned.startsWith("0")) {
    cleaned = "62" + cleaned.slice(1);
  }
  return cleaned;
}

interface ClientDetail {
  slug: string;
  email: string;
  phone: string;
  theme: string;
  status: "Active" | "Pending";
  settings: Record<string, any>;
  created_at: string;
}

export default function ClientDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [client, setClient] = useState<ClientDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updating, setUpdating] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [driveLink, setDriveLink] = useState("");

  const closeModal = () => {
    setIsModalOpen(false);
    setDriveLink("");
  };

  useEffect(() => {
    if (slug) {
      fetchClientData();
    }
  }, [slug]);

  async function fetchClientData() {
    try {
      setLoading(true);
      setError(null);

      const clientRes = await fetch(`/api/admin/clients/${slug}`, {
        credentials: "include",
      });

      if (!clientRes.ok) {
        throw new Error(`Klien tidak ditemukan (${clientRes.status})`);
      }

      const clientData = await clientRes.json();
      setClient(clientData.client);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Gagal mengambil data klien";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  async function updateStatus(newStatus: "Active" | "Pending") {
    try {
      setUpdating(true);
      const res = await fetch(`/api/admin/clients/${slug}`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) {
        throw new Error("Gagal memperbarui status");
      }

      const data = await res.json();
      setClient(data.client);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Gagal memperbarui status klien";
      alert(message);
    } finally {
      setUpdating(false);
    }
  }

  if (loading) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Memuat data klien...</p>
      </div>
    );
  }

  if (error || !client) {
    return (
      <div>
        <Link
          href="/admin"
          className="text-indigo-600 hover:text-indigo-900 mb-6 block"
        >
          ← Kembali ke Dashboard
        </Link>
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-8 text-center">
          <p className="text-red-600 font-medium mb-4">{error}</p>
          <Link href="/admin" className="text-indigo-600 hover:text-indigo-900">
            Kembali ke daftar klien
          </Link>
        </div>
      </div>
    );
  }

  const { groom_nickname, bride_nickname, wedding_date } = client.settings;
  const coupleName = `${groom_nickname || "Mempelai"} & ${bride_nickname || "Mempelai"}`;

  return (
    <div>
      <Link
        href="/admin"
        className="text-sakura-primary hover:text-sakura-primary-dark font-bold mb-6 block transition-colors"
      >
        ← Kembali ke Dashboard
      </Link>

      <div className="space-y-6">
        {/* Client Header */}
        <div className="bg-white border border-sakura-primary-light/20 shadow-xs p-6 rounded-2xl">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-2xl font-serif font-bold text-sakura-primary-dark">{coupleName}</h2>
              <p className="text-sakura-charcoal-muted mt-1">
                Undangan:{" "}
                <code className="bg-sakura-bg border border-sakura-primary-light/35 px-2 py-1 rounded-lg text-sm text-sakura-primary-dark font-mono font-bold">
                  /{slug}
                </code>
              </p>
            </div>
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                client.status === "Active"
                  ? "bg-emerald-100 text-emerald-800 border-emerald-200/50"
                  : "bg-amber-100 text-amber-800 border-amber-200/50"
              }`}
            >
              {client.status === "Active" ? "Aktif" : "Menunggu"}
            </span>
          </div>

          <div className="flex flex-wrap gap-3 mt-4">
            {client.status === "Pending" && (
              <button
                onClick={() => updateStatus("Active")}
                disabled={updating}
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-xl text-sm font-bold transition-all bg-sakura-primary text-white hover:bg-sakura-primary-dark shadow-md shadow-sakura-primary/20 disabled:opacity-50 cursor-pointer"
              >
                {updating ? "Memproses..." : "Aktifkan Klien"}
              </button>
            )}
            {client.status === "Active" && (
              <button
                onClick={() => updateStatus("Pending")}
                disabled={updating}
                className="inline-flex items-center justify-center px-4 py-2 border border-sakura-primary-light/40 rounded-xl text-sm font-bold transition-all bg-white text-sakura-charcoal hover:bg-sakura-bg disabled:opacity-50 cursor-pointer"
              >
                {updating ? "Memproses..." : "Nonaktifkan"}
              </button>
            )}
            <a
              href={`/${slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-4 py-2 border border-sakura-primary-light/40 rounded-xl text-sm font-bold transition-all bg-white text-sakura-charcoal hover:bg-sakura-bg cursor-pointer"
            >
              Lihat Undangan ↗
            </a>
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center justify-center px-4 py-2 border border-sakura-primary/30 rounded-xl text-sm font-bold transition-all bg-sakura-bg text-sakura-primary hover:bg-sakura-primary/10 cursor-pointer"
            >
              Kirim Drive Asset
            </button>
          </div>
        </div>

        {/* Wedding Details */}
        <div className="bg-white border border-sakura-primary-light/20 shadow-xs p-6 rounded-2xl">
          <h3 className="text-lg font-serif font-bold text-sakura-primary-dark mb-4">
            Detail Pernikahan
          </h3>
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <dt className="text-xs uppercase tracking-wider text-sakura-charcoal-muted/80 font-bold">
                Pengantin Pria
              </dt>
              <dd className="text-base font-semibold text-sakura-charcoal mt-1">
                {client.settings.groom_nickname}
              </dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wider text-sakura-charcoal-muted/80 font-bold">
                Pengantin Wanita
              </dt>
              <dd className="text-base font-semibold text-sakura-charcoal mt-1">
                {client.settings.bride_nickname}
              </dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wider text-sakura-charcoal-muted/80 font-bold">
                Tanggal Pernikahan
              </dt>
              <dd className="text-base font-semibold text-sakura-charcoal mt-1">
                {new Date(wedding_date).toLocaleDateString("id-ID", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wider text-sakura-charcoal-muted/80 font-bold">Tema</dt>
              <dd className="text-base font-semibold text-sakura-charcoal mt-1 capitalize">
                {client.theme}
              </dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wider text-sakura-charcoal-muted/80 font-bold">
                Lokasi Resepsi
              </dt>
              <dd className="text-sm text-sakura-charcoal mt-1 leading-relaxed">
                {client.settings.resepsi_location || "-"}
              </dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wider text-sakura-charcoal-muted/80 font-bold">
                Waktu Resepsi
              </dt>
              <dd className="text-sm text-sakura-charcoal mt-1">
                {client.settings.resepsi_start_time} -{" "}
                {client.settings.resepsi_end_time}
              </dd>
            </div>
          </dl>
        </div>

        {/* Client Contact */}
        <div className="bg-white border border-sakura-primary-light/20 shadow-xs p-6 rounded-2xl">
          <h3 className="text-lg font-serif font-bold text-sakura-primary-dark mb-4">
            Kontak Klien
          </h3>
          <dl className="space-y-4">
            <div>
              <dt className="text-xs uppercase tracking-wider text-sakura-charcoal-muted/80 font-bold">Email</dt>
              <dd className="text-sm text-sakura-charcoal mt-1">{client.email}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wider text-sakura-charcoal-muted/80 font-bold">Telepon</dt>
              <dd className="text-sm text-sakura-charcoal mt-1">
                <a
                  href={`https://wa.me/${formatWhatsAppNumber(client.phone)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-600 hover:text-emerald-700 font-bold transition-colors inline-flex items-center gap-1"
                >
                  {client.phone} (WhatsApp) ↗
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wider text-sakura-charcoal-muted/80 font-bold">Dibuat Pada</dt>
              <dd className="text-sm text-sakura-charcoal-muted mt-1">
                {new Date(client.created_at).toLocaleString("id-ID")}
              </dd>
            </div>
          </dl>
        </div>
      </div>

      {/* Google Drive Link Request Modal */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in"
          onClick={closeModal}
        >
          <div 
            className="bg-white border border-sakura-primary-light/20 shadow-2xl p-6 rounded-3xl max-w-md w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-serif font-bold text-sakura-primary-dark mb-2">
              Kirim Link Drive Asset
            </h3>
            <p className="text-xs text-sakura-charcoal-muted mb-4 leading-relaxed font-sans">
              Masukkan URL Google Drive folder tempat klien mengunggah foto pengantin, foto galeri, dan kustom musik.
            </p>
            
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                if (!driveLink.trim()) {
                  alert("Mohon isi Link Google Drive terlebih dahulu.");
                  return;
                }
                
                const clientPhoneClean = formatWhatsAppNumber(client.phone);
                const message = `Bila ada foto pengantin, foto gallery, dan kustom musik bisa di upload pada Link Google Drive ini ya: ${driveLink.trim()}.`;
                const waLink = `https://wa.me/${clientPhoneClean}?text=${encodeURIComponent(message)}`;
                
                window.open(waLink, "_blank");
                closeModal();
              }}
              className="space-y-4"
            >
              <div className="flex flex-col gap-1.5">
                <label htmlFor="drive-link" className="text-xs uppercase tracking-wider text-sakura-charcoal-muted font-bold">
                  Link Google Drive
                </label>
                <input
                  type="url"
                  id="drive-link"
                  value={driveLink}
                  onChange={(e) => setDriveLink(e.target.value)}
                  placeholder="https://drive.google.com/..."
                  className="w-full px-4 py-3 bg-[#FAF9F5] border border-sakura-primary-light/35 rounded-xl text-xs text-sakura-charcoal focus:outline-none focus:border-sakura-primary transition-all font-sans"
                  required
                  autoFocus
                />
              </div>

              <div className="flex gap-3 justify-end pt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2.5 border border-sakura-primary-light/40 rounded-xl text-xs font-bold bg-white text-sakura-charcoal hover:bg-sakura-bg transition-all cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-sakura-primary hover:bg-sakura-primary-dark text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-sakura-primary/20 cursor-pointer"
                >
                  Kirim via WhatsApp
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
