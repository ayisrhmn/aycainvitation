"use client";

import { useState } from "react";
import {
  Sparkles,
  Calendar,
  MapPin,
  Gift,
  Music,
  Heart,
  Loader2,
  Check,
  Wand2,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface OrderFormProps {
  selectedTheme: string;
}

const INITIAL_FORM_DATA = {
  // Kontak Klien
  clientName: "",
  clientEmail: "",
  clientPhone: "",
  clientSlug: "",

  // Mempelai Pria
  groom_nickname: "",
  groom_fullname: "",
  groom_father: "",
  groom_mother: "",

  // Mempelai Wanita
  bride_nickname: "",
  bride_fullname: "",
  bride_father: "",
  bride_mother: "",

  // Acara Akad
  wedding_date: "",
  akad_date: "",
  akad_start_time: "09:00",
  akad_end_time: "10:30",
  akad_location: "",
  akad_maps_url: "",

  // Acara Resepsi
  resepsi_date: "",
  resepsi_start_time: "11:00",
  resepsi_end_time: "Selesai",
  resepsi_location: "",
  resepsi_maps_url: "",

  // Kado Digital & Quotes
  bank_name_1: "BANK BCA",
  bank_account_1: "",
  bank_holder_1: "",
  bank_name_2: "BANK MANDIRI",
  bank_account_2: "",
  bank_holder_2: "",
  quote:
    "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu isteri-isteri dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya...",
  quote_reference: "QS. Ar-Rum: 21",

  // Urutan tampilan nama mempelai
  couple_order: "groom_first" as "groom_first" | "bride_first",
};

export default function OrderForm({ selectedTheme }: OrderFormProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [successData, setSuccessData] = useState<{
    redirectUrl: string;
    slug: string;
  } | null>(null);

  // Form State
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Hanya izinkan huruf kecil, angka, strip, dan underscore
    const value = e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, "");
    setFormData((prev) => ({
      ...prev,
      clientSlug: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    // Validasi Dasar
    if (
      !formData.clientName ||
      !formData.clientEmail ||
      !formData.clientPhone ||
      !formData.clientSlug
    ) {
      setErrorMsg("Mohon lengkapi Data Pemesan.");
      return;
    }
    if (
      !formData.groom_nickname ||
      !formData.bride_nickname ||
      !formData.wedding_date
    ) {
      setErrorMsg("Mohon lengkapi Nama Pengantin dan Tanggal Pernikahan.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          theme: selectedTheme,
        }),
      });

      const result = await response.json();

      if (response.ok && result.status === "success") {
        setSuccessData({
          redirectUrl: result.redirectUrl,
          slug: formData.clientSlug,
        });

        // Reset Form ke state semula
        setFormData(INITIAL_FORM_DATA);

        // Arahkan otomatis ke WA setelah 1.5 detik
        setTimeout(() => {
          window.open(result.redirectUrl, "_blank");
        }, 1500);
      } else {
        throw new Error(result.message || "Gagal mengirimkan pemesanan.");
      }
    } catch (err: unknown) {
      console.error(err);
      setErrorMsg(
        err instanceof Error
          ? err.message
          : "Terjadi kesalahan koneksi, silakan coba lagi."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* 3. ORDER FORM SECTION */}
      <section
        id="order-form"
        className="py-20 px-6 bg-sakura-bg-dark/30 border-t border-sakura-primary-light/20 relative z-10"
      >
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <Sparkles className="w-5 h-5 text-sakura-primary mx-auto mb-2" />
            <span className="text-[10px] uppercase tracking-[0.3em] text-sakura-charcoal-muted font-bold block mb-1">
              Formulir Order
            </span>
            <h2 className="font-serif text-3xl text-sakura-primary tracking-wide">
              LENGKAPI DETAIL UNDANGAN
            </h2>
            <p className="text-xs text-sakura-charcoal-muted mt-2">
              Isi data di bawah ini dengan lengkap. Setelah klik
              &quot;Pesan&quot;, Anda akan diarahkan ke WhatsApp Admin untuk
              aktivasi pembayaran.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-white border border-sakura-primary-light/20 rounded-3xl p-6 sm:p-10 shadow-xl shadow-sakura-primary/5 relative overflow-hidden"
          >
            <div className="absolute inset-2 border border-sakura-primary-light/15 rounded-2xl pointer-events-none" />

            <div className="relative z-10 flex flex-col gap-10">
              {/* GROUP 1: DATA PEMESAN */}
              <div>
                <h3 className="font-serif text-lg text-sakura-primary-dark border-b border-sakura-primary-light/20 pb-2 mb-5 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-sakura-primary-light/40 text-sakura-primary-dark flex items-center justify-center text-xs font-bold">
                    1
                  </span>
                  <span>Data Pemesan &amp; Alamat Web</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] uppercase tracking-wider text-sakura-charcoal font-bold">
                      Nama Klien
                    </label>
                    <input
                      type="text"
                      name="clientName"
                      value={formData.clientName}
                      onChange={handleChange}
                      placeholder="Nama Lengkap Anda"
                      className="w-full px-4 py-2.5 bg-sakura-bg border border-sakura-primary-light/40 rounded-xl text-sm focus:outline-none focus:border-sakura-primary focus:ring-1 focus:ring-sakura-primary transition-all"
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] uppercase tracking-wider text-sakura-charcoal font-bold">
                      Email Klien
                    </label>
                    <input
                      type="email"
                      name="clientEmail"
                      value={formData.clientEmail}
                      onChange={handleChange}
                      placeholder="contoh@gmail.com"
                      className="w-full px-4 py-2.5 bg-sakura-bg border border-sakura-primary-light/40 rounded-xl text-sm focus:outline-none focus:border-sakura-primary focus:ring-1 focus:ring-sakura-primary transition-all"
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] uppercase tracking-wider text-sakura-charcoal font-bold">
                      No. WhatsApp Klien
                    </label>
                    <input
                      type="tel"
                      name="clientPhone"
                      value={formData.clientPhone}
                      onChange={handleChange}
                      placeholder="081234567890"
                      className="w-full px-4 py-2.5 bg-sakura-bg border border-sakura-primary-light/40 rounded-xl text-sm focus:outline-none focus:border-sakura-primary focus:ring-1 focus:ring-sakura-primary transition-all"
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] uppercase tracking-wider text-sakura-charcoal font-bold">
                      Alamat Web Undangan Kustom (Slug)
                    </label>
                    <div className="relative flex items-center">
                      <span className="absolute left-3 text-xs text-sakura-charcoal-muted/50 select-none">
                        /
                      </span>
                      <input
                        type="text"
                        name="clientSlug"
                        value={formData.clientSlug}
                        onChange={handleSlugChange}
                        placeholder="budi-ani"
                        className="w-full pl-6 pr-4 py-2.5 bg-sakura-bg border border-sakura-primary-light/40 rounded-xl text-sm focus:outline-none focus:border-sakura-primary focus:ring-1 focus:ring-sakura-primary transition-all font-mono"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* GROUP 2: MEMPELAI PRIA & WANITA */}
              <div>
                <h3 className="font-serif text-lg text-sakura-primary-dark border-b border-sakura-primary-light/20 pb-2 mb-5 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-sakura-primary-light/40 text-sakura-primary-dark flex items-center justify-center text-xs font-bold">
                    2
                  </span>
                  <span>Informasi Kedua Mempelai</span>
                </h3>

                {/* Toggle Urutan Nama Mempelai */}
                <div className="mb-6 p-4 bg-sakura-bg rounded-2xl border border-sakura-primary-light/20">
                  <p className="text-[10px] uppercase tracking-wider text-sakura-charcoal font-bold mb-3">
                    Urutan Nama di Undangan
                  </p>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      id="order-groom-first"
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          couple_order: "groom_first",
                        }))
                      }
                      className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold tracking-wide transition-all border ${
                        formData.couple_order === "groom_first"
                          ? "bg-sakura-primary text-white border-sakura-primary shadow-md shadow-sakura-primary/20"
                          : "bg-white text-sakura-charcoal border-sakura-primary-light/40 hover:border-sakura-primary"
                      }`}
                    >
                      🤵 Pria &amp; 👰 Wanita
                    </button>
                    <button
                      type="button"
                      id="order-bride-first"
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          couple_order: "bride_first",
                        }))
                      }
                      className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold tracking-wide transition-all border ${
                        formData.couple_order === "bride_first"
                          ? "bg-sakura-primary text-white border-sakura-primary shadow-md shadow-sakura-primary/20"
                          : "bg-white text-sakura-charcoal border-sakura-primary-light/40 hover:border-sakura-primary"
                      }`}
                    >
                      👰 Wanita &amp; 🤵 Pria
                    </button>
                  </div>
                </div>

                {/* Sub-section Mempelai: urutan mengikuti couple_order */}
                {(() => {
                  const groomSection = (
                    <div key="groom">
                      <h4 className="text-xs uppercase tracking-wider text-sakura-primary font-bold mb-3">
                        &bull; Mempelai Pria
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                        <div className="flex flex-col gap-1">
                          <label className="text-[10px] uppercase tracking-wider text-sakura-charcoal font-bold">
                            Nama Panggilan Pria
                          </label>
                          <input
                            type="text"
                            name="groom_nickname"
                            value={formData.groom_nickname}
                            onChange={handleChange}
                            placeholder="Sena"
                            className="w-full px-4 py-2.5 bg-sakura-bg border border-sakura-primary-light/40 rounded-xl text-sm focus:outline-none focus:border-sakura-primary focus:ring-1 focus:ring-sakura-primary transition-all"
                            required
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <label className="text-[10px] uppercase tracking-wider text-sakura-charcoal font-bold">
                            Nama Lengkap Pria &amp; Gelar
                          </label>
                          <input
                            type="text"
                            name="groom_fullname"
                            value={formData.groom_fullname}
                            onChange={handleChange}
                            placeholder="Sena Wiratama, S.T."
                            className="w-full px-4 py-2.5 bg-sakura-bg border border-sakura-primary-light/40 rounded-xl text-sm focus:outline-none focus:border-sakura-primary focus:ring-1 focus:ring-sakura-primary transition-all"
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <label className="text-[10px] uppercase tracking-wider text-sakura-charcoal font-bold">
                            Nama Ayah Pria
                          </label>
                          <input
                            type="text"
                            name="groom_father"
                            value={formData.groom_father}
                            onChange={handleChange}
                            placeholder="Ir. H. Joko Santoso"
                            className="w-full px-4 py-2.5 bg-sakura-bg border border-sakura-primary-light/40 rounded-xl text-sm focus:outline-none focus:border-sakura-primary focus:ring-1 focus:ring-sakura-primary transition-all"
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <label className="text-[10px] uppercase tracking-wider text-sakura-charcoal font-bold">
                            Nama Ibu Pria
                          </label>
                          <input
                            type="text"
                            name="groom_mother"
                            value={formData.groom_mother}
                            onChange={handleChange}
                            placeholder="Hj. Retno Lestari, S.Pd."
                            className="w-full px-4 py-2.5 bg-sakura-bg border border-sakura-primary-light/40 rounded-xl text-sm focus:outline-none focus:border-sakura-primary focus:ring-1 focus:ring-sakura-primary transition-all"
                          />
                        </div>
                      </div>
                    </div>
                  );

                  const brideSection = (
                    <div key="bride">
                      <h4 className="text-xs uppercase tracking-wider text-sakura-primary font-bold mb-3">
                        &bull; Mempelai Wanita
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                        <div className="flex flex-col gap-1">
                          <label className="text-[10px] uppercase tracking-wider text-sakura-charcoal font-bold">
                            Nama Panggilan Wanita
                          </label>
                          <input
                            type="text"
                            name="bride_nickname"
                            value={formData.bride_nickname}
                            onChange={handleChange}
                            placeholder="Davina"
                            className="w-full px-4 py-2.5 bg-sakura-bg border border-sakura-primary-light/40 rounded-xl text-sm focus:outline-none focus:border-sakura-primary focus:ring-1 focus:ring-sakura-primary transition-all"
                            required
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <label className="text-[10px] uppercase tracking-wider text-sakura-charcoal font-bold">
                            Nama Lengkap Wanita &amp; Gelar
                          </label>
                          <input
                            type="text"
                            name="bride_fullname"
                            value={formData.bride_fullname}
                            onChange={handleChange}
                            placeholder="Davina Putri, S.Ds."
                            className="w-full px-4 py-2.5 bg-sakura-bg border border-sakura-primary-light/40 rounded-xl text-sm focus:outline-none focus:border-sakura-primary focus:ring-1 focus:ring-sakura-primary transition-all"
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <label className="text-[10px] uppercase tracking-wider text-sakura-charcoal font-bold">
                            Nama Ayah Wanita
                          </label>
                          <input
                            type="text"
                            name="bride_father"
                            value={formData.bride_father}
                            onChange={handleChange}
                            placeholder="H. Ahmad Fauzi, M.B.A."
                            className="w-full px-4 py-2.5 bg-sakura-bg border border-sakura-primary-light/40 rounded-xl text-sm focus:outline-none focus:border-sakura-primary focus:ring-1 focus:ring-sakura-primary transition-all"
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <label className="text-[10px] uppercase tracking-wider text-sakura-charcoal font-bold">
                            Nama Ibu Wanita
                          </label>
                          <input
                            type="text"
                            name="bride_mother"
                            value={formData.bride_mother}
                            onChange={handleChange}
                            placeholder="Hj. Fatimah Azzahra"
                            className="w-full px-4 py-2.5 bg-sakura-bg border border-sakura-primary-light/40 rounded-xl text-sm focus:outline-none focus:border-sakura-primary focus:ring-1 focus:ring-sakura-primary transition-all"
                          />
                        </div>
                      </div>
                    </div>
                  );

                  return formData.couple_order === "bride_first"
                    ? [brideSection, groomSection]
                    : [groomSection, brideSection];
                })()}
              </div>

              {/* GROUP 3: WAKTU & LOKASI ACARA */}
              <div>
                <h3 className="font-serif text-lg text-sakura-primary-dark border-b border-sakura-primary-light/20 pb-2 mb-5 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-sakura-primary-light/40 text-sakura-primary-dark flex items-center justify-center text-xs font-bold">
                    3
                  </span>
                  <span>Waktu &amp; Tempat Acara</span>
                </h3>

                <div className="flex flex-col gap-1 mb-4">
                  <label className="text-[10px] uppercase tracking-wider text-sakura-charcoal font-bold">
                    Target Tanggal Pernikahan (untuk Countdown)
                  </label>
                  <input
                    type="datetime-local"
                    name="wedding_date"
                    value={formData.wedding_date}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-sakura-bg border border-sakura-primary-light/40 rounded-xl text-sm focus:outline-none focus:border-sakura-primary focus:ring-1 focus:ring-sakura-primary transition-all"
                    required
                  />
                </div>

                {/* Akad Nikah */}
                <h4 className="text-xs uppercase tracking-wider text-sakura-primary font-bold mb-3 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Akad Nikah</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] uppercase tracking-wider text-sakura-charcoal font-bold">
                      Tanggal Akad
                    </label>
                    <input
                      type="date"
                      name="akad_date"
                      value={formData.akad_date}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 bg-sakura-bg border border-sakura-primary-light/40 rounded-xl text-sm focus:outline-none focus:border-sakura-primary focus:ring-1 focus:ring-sakura-primary transition-all"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] uppercase tracking-wider text-sakura-charcoal font-bold">
                      Mulai Jam
                    </label>
                    <input
                      type="text"
                      name="akad_start_time"
                      value={formData.akad_start_time}
                      onChange={handleChange}
                      placeholder="09:00"
                      className="w-full px-4 py-2.5 bg-sakura-bg border border-sakura-primary-light/40 rounded-xl text-sm focus:outline-none focus:border-sakura-primary focus:ring-1 focus:ring-sakura-primary transition-all"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] uppercase tracking-wider text-sakura-charcoal font-bold">
                      Selesai Jam
                    </label>
                    <input
                      type="text"
                      name="akad_end_time"
                      value={formData.akad_end_time}
                      onChange={handleChange}
                      placeholder="10:30"
                      className="w-full px-4 py-2.5 bg-sakura-bg border border-sakura-primary-light/40 rounded-xl text-sm focus:outline-none focus:border-sakura-primary focus:ring-1 focus:ring-sakura-primary transition-all"
                    />
                  </div>
                  <div className="flex flex-col gap-1 sm:col-span-2">
                    <label className="text-[10px] uppercase tracking-wider text-sakura-charcoal font-bold">
                      Nama &amp; Alamat Tempat Akad
                    </label>
                    <input
                      type="text"
                      name="akad_location"
                      value={formData.akad_location}
                      onChange={handleChange}
                      placeholder="Masjid Sasana Kriya, TMII"
                      className="w-full px-4 py-2.5 bg-sakura-bg border border-sakura-primary-light/40 rounded-xl text-sm focus:outline-none focus:border-sakura-primary focus:ring-1 focus:ring-sakura-primary transition-all"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] uppercase tracking-wider text-sakura-charcoal font-bold">
                      Link Google Maps Akad
                    </label>
                    <input
                      type="url"
                      name="akad_maps_url"
                      value={formData.akad_maps_url}
                      onChange={handleChange}
                      placeholder="https://maps.app.goo.gl/..."
                      className="w-full px-4 py-2.5 bg-sakura-bg border border-sakura-primary-light/40 rounded-xl text-sm focus:outline-none focus:border-sakura-primary focus:ring-1 focus:ring-sakura-primary transition-all"
                    />
                  </div>
                </div>

                {/* Resepsi Pernikahan */}
                <h4 className="text-xs uppercase tracking-wider text-sakura-primary font-bold mb-3 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Resepsi Pernikahan</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] uppercase tracking-wider text-sakura-charcoal font-bold">
                      Tanggal Resepsi
                    </label>
                    <input
                      type="date"
                      name="resepsi_date"
                      value={formData.resepsi_date}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 bg-sakura-bg border border-sakura-primary-light/40 rounded-xl text-sm focus:outline-none focus:border-sakura-primary focus:ring-1 focus:ring-sakura-primary transition-all"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] uppercase tracking-wider text-sakura-charcoal font-bold">
                      Mulai Jam
                    </label>
                    <input
                      type="text"
                      name="resepsi_start_time"
                      value={formData.resepsi_start_time}
                      onChange={handleChange}
                      placeholder="11:00"
                      className="w-full px-4 py-2.5 bg-sakura-bg border border-sakura-primary-light/40 rounded-xl text-sm focus:outline-none focus:border-sakura-primary focus:ring-1 focus:ring-sakura-primary transition-all"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] uppercase tracking-wider text-sakura-charcoal font-bold">
                      Selesai Jam
                    </label>
                    <input
                      type="text"
                      name="resepsi_end_time"
                      value={formData.resepsi_end_time}
                      onChange={handleChange}
                      placeholder="Selesai"
                      className="w-full px-4 py-2.5 bg-sakura-bg border border-sakura-primary-light/40 rounded-xl text-sm focus:outline-none focus:border-sakura-primary focus:ring-1 focus:ring-sakura-primary transition-all"
                    />
                  </div>
                  <div className="flex flex-col gap-1 sm:col-span-2">
                    <label className="text-[10px] uppercase tracking-wider text-sakura-charcoal font-bold">
                      Nama &amp; Alamat Tempat Resepsi
                    </label>
                    <input
                      type="text"
                      name="resepsi_location"
                      value={formData.resepsi_location}
                      onChange={handleChange}
                      placeholder="Gedung Sasana Kriya, TMII"
                      className="w-full px-4 py-2.5 bg-sakura-bg border border-sakura-primary-light/40 rounded-xl text-sm focus:outline-none focus:border-sakura-primary focus:ring-1 focus:ring-sakura-primary transition-all"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] uppercase tracking-wider text-sakura-charcoal font-bold">
                      Link Google Maps Resepsi
                    </label>
                    <input
                      type="url"
                      name="resepsi_maps_url"
                      value={formData.resepsi_maps_url}
                      onChange={handleChange}
                      placeholder="https://maps.app.goo.gl/..."
                      className="w-full px-4 py-2.5 bg-sakura-bg border border-sakura-primary-light/40 rounded-xl text-sm focus:outline-none focus:border-sakura-primary focus:ring-1 focus:ring-sakura-primary transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* GROUP 4: KADO DIGITAL & QUOTE */}
              <div>
                <h3 className="font-serif text-lg text-sakura-primary-dark border-b border-sakura-primary-light/20 pb-2 mb-5 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-sakura-primary-light/40 text-sakura-primary-dark flex items-center justify-center text-xs font-bold">
                    4
                  </span>
                  <span>Kado Digital &amp; Kutipan Pernikahan</span>
                </h3>

                {/* Rekening 1 */}
                <h4 className="text-xs uppercase tracking-wider text-sakura-primary font-bold mb-3 flex items-center gap-1.5">
                  <Gift className="w-3.5 h-3.5" />
                  <span>Rekening 1 (Opsional)</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] uppercase tracking-wider text-sakura-charcoal font-bold">
                      Nama Bank / E-Wallet
                    </label>
                    <input
                      type="text"
                      name="bank_name_1"
                      value={formData.bank_name_1}
                      onChange={handleChange}
                      placeholder="BANK BCA"
                      className="w-full px-4 py-2.5 bg-sakura-bg border border-sakura-primary-light/40 rounded-xl text-sm focus:outline-none focus:border-sakura-primary focus:ring-1 focus:ring-sakura-primary transition-all"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] uppercase tracking-wider text-sakura-charcoal font-bold">
                      Nomor Rekening
                    </label>
                    <input
                      type="text"
                      name="bank_account_1"
                      value={formData.bank_account_1}
                      onChange={handleChange}
                      placeholder="1234567890"
                      className="w-full px-4 py-2.5 bg-sakura-bg border border-sakura-primary-light/40 rounded-xl text-sm focus:outline-none focus:border-sakura-primary focus:ring-1 focus:ring-sakura-primary transition-all"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] uppercase tracking-wider text-sakura-charcoal font-bold">
                      Atas Nama Pemilik
                    </label>
                    <input
                      type="text"
                      name="bank_holder_1"
                      value={formData.bank_holder_1}
                      onChange={handleChange}
                      placeholder="Sena Wiratama"
                      className="w-full px-4 py-2.5 bg-sakura-bg border border-sakura-primary-light/40 rounded-xl text-sm focus:outline-none focus:border-sakura-primary focus:ring-1 focus:ring-sakura-primary transition-all"
                    />
                  </div>
                </div>

                {/* Rekening 2 */}
                <h4 className="text-xs uppercase tracking-wider text-sakura-primary font-bold mb-3 flex items-center gap-1.5">
                  <Gift className="w-3.5 h-3.5" />
                  <span>Rekening 2 (Opsional)</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] uppercase tracking-wider text-sakura-charcoal font-bold">
                      Nama Bank / E-Wallet
                    </label>
                    <input
                      type="text"
                      name="bank_name_2"
                      value={formData.bank_name_2}
                      onChange={handleChange}
                      placeholder="BANK MANDIRI"
                      className="w-full px-4 py-2.5 bg-sakura-bg border border-sakura-primary-light/40 rounded-xl text-sm focus:outline-none focus:border-sakura-primary focus:ring-1 focus:ring-sakura-primary transition-all"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] uppercase tracking-wider text-sakura-charcoal font-bold">
                      Nomor Rekening
                    </label>
                    <input
                      type="text"
                      name="bank_account_2"
                      value={formData.bank_account_2}
                      onChange={handleChange}
                      placeholder="987654321098"
                      className="w-full px-4 py-2.5 bg-sakura-bg border border-sakura-primary-light/40 rounded-xl text-sm focus:outline-none focus:border-sakura-primary focus:ring-1 focus:ring-sakura-primary transition-all"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] uppercase tracking-wider text-sakura-charcoal font-bold">
                      Atas Nama Pemilik
                    </label>
                    <input
                      type="text"
                      name="bank_holder_2"
                      value={formData.bank_holder_2}
                      onChange={handleChange}
                      placeholder="Davina Putri"
                      className="w-full px-4 py-2.5 bg-sakura-bg border border-sakura-primary-light/40 rounded-xl text-sm focus:outline-none focus:border-sakura-primary focus:ring-1 focus:ring-sakura-primary transition-all"
                    />
                  </div>
                </div>

                {/* Quotes */}
                <h4 className="text-xs uppercase tracking-wider text-sakura-primary font-bold mb-3 flex items-center gap-1.5">
                  <Music className="w-3.5 h-3.5" />
                  <span>Quotes / Kata Pengantar</span>
                </h4>
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] uppercase tracking-wider text-sakura-charcoal font-bold">
                      Isi Kutipan
                    </label>
                    <textarea
                      name="quote"
                      value={formData.quote}
                      onChange={handleChange}
                      rows={3}
                      className="w-full px-4 py-2.5 bg-sakura-bg border border-sakura-primary-light/40 rounded-xl text-sm focus:outline-none focus:border-sakura-primary focus:ring-1 focus:ring-sakura-primary transition-all resize-none"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] uppercase tracking-wider text-sakura-charcoal font-bold">
                      Sumber / Referensi Kutipan
                    </label>
                    <input
                      type="text"
                      name="quote_reference"
                      value={formData.quote_reference}
                      onChange={handleChange}
                      placeholder="QS. Ar-Rum: 21"
                      className="w-full px-4 py-2.5 bg-sakura-bg border border-sakura-primary-light/40 rounded-xl text-sm focus:outline-none focus:border-sakura-primary focus:ring-1 focus:ring-sakura-primary transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Error Message */}
            <AnimatePresence>
              {errorMsg && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-6 p-4 bg-red-50 border border-red-200 text-red-800 text-xs rounded-xl flex items-center gap-2"
                >
                  <Heart className="w-4 h-4 text-red-600 fill-red-600/10 shrink-0" />
                  <span>{errorMsg}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || !!successData}
              className="mt-8 w-full flex items-center justify-center gap-2 py-4 bg-sakura-primary hover:bg-sakura-primary-dark text-white rounded-xl text-sm font-bold tracking-wider uppercase transition-all shadow-md shadow-sakura-primary/20 hover:shadow-lg disabled:opacity-75 disabled:cursor-not-allowed cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Memproses Pemesanan Anda...</span>
                </>
              ) : successData ? (
                <>
                  <Check className="w-4 h-4 stroke-[2.5]" />
                  <span>Berhasil, Mengalihkan ke WhatsApp...</span>
                </>
              ) : (
                <>
                  <Wand2 className="w-4 h-4" />
                  <span>Pesan Undangan Sekarang</span>
                </>
              )}
            </button>
          </form>
        </div>
      </section>

      {/* 4. SUCCESS OVERLAY MODAL */}
      <AnimatePresence>
        {successData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-sakura-charcoal/70 backdrop-blur-sm p-6"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-white max-w-md w-full p-8 rounded-3xl border border-sakura-primary-light/40 shadow-2xl relative text-center overflow-hidden"
            >
              <div className="absolute inset-2 border border-dashed border-sakura-primary-light/20 rounded-2xl pointer-events-none" />

              {/* Tombol Tutup Modal */}
              <button
                type="button"
                onClick={() => setSuccessData(null)}
                className="absolute top-4 right-4 z-20 p-1.5 rounded-full text-sakura-charcoal-muted hover:bg-sakura-primary-light/10 hover:text-sakura-primary-dark transition-all cursor-pointer"
                aria-label="Tutup"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mx-auto mb-4 border border-emerald-200">
                <Check className="w-8 h-8 stroke-[2.5]" />
              </div>

              <h3 className="font-serif text-2xl font-semibold text-sakura-primary-dark mb-2">
                Pemesanan Sukses!
              </h3>

              <p className="text-xs text-sakura-charcoal-muted leading-relaxed font-sans mb-6">
                Undangan pernikahan Anda untuk alamat{" "}
                <strong>aycainvitation.vercel.app/{successData.slug}</strong>{" "}
                berhasil dibuat dan sedang menunggu aktivasi pembayaran.
              </p>

              <div className="flex flex-col gap-3">
                <a
                  href={successData.redirectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 py-3 px-6 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold tracking-wider uppercase transition-all shadow-md shadow-emerald-600/20 cursor-pointer"
                >
                  Hubungi Admin via WA Sekarang
                </a>
                <p className="text-[10px] text-sakura-charcoal-muted">
                  (Jika Anda tidak dialihkan secara otomatis, silakan klik
                  tombol di atas)
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
