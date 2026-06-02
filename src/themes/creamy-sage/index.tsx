"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Gift, Copy, Check, Heart, HeartHandshake } from "lucide-react";
import { format, parseISO } from "date-fns";
import { id } from "date-fns/locale";
import Envelope from "@/components/creamy-sage/Envelope";
import AudioPlayer from "@/components/creamy-sage/AudioPlayer";
import Countdown from "@/components/creamy-sage/Countdown";
import RsvpForm from "@/components/creamy-sage/RsvpForm";
import WishesWall from "@/components/creamy-sage/WishesWall";
import { WeddingConfig, RsvpWish } from "@/types";
import Link from "next/link";

interface CreamySageThemeProps {
  config: WeddingConfig;
  wishes: RsvpWish[];
  wishesLoading: boolean;
  onRefreshWishes: () => void;
  clientSlug?: string;
  musicTitle?: string;
  musicUrl?: string;
}

// Helper format tanggal dalam Bahasa Indonesia menggunakan date-fns
const formatIndonesianDate = (dateStr: string): string => {
  try {
    if (!dateStr) return "";

    let parsed = new Date(dateStr);

    if (isNaN(parsed.getTime())) {
      const cleanDate = dateStr.split("T")[0];
      parsed = parseISO(cleanDate);
    }

    if (isNaN(parsed.getTime())) {
      return dateStr;
    }

    return format(parsed, "EEEE, d MMMM yyyy", { locale: id });
  } catch {
    return dateStr;
  }
};

// Helper format waktu (mengekstrak HH:MM)
const formatIndonesianTime = (timeStr: string): string => {
  try {
    if (!timeStr) return "";

    if (timeStr.toLowerCase().includes("selesai")) {
      return "Selesai";
    }

    const match = timeStr.match(/(\d{1,2})[:.](\d{2})/);
    if (match) {
      const hours = match[1].padStart(2, "0");
      const minutes = match[2];
      return `${hours}:${minutes}`;
    }

    return timeStr;
  } catch {
    return timeStr;
  }
};

export default function CreamySageTheme({
  config,
  wishes,
  wishesLoading,
  onRefreshWishes,
  clientSlug,
  musicTitle,
  musicUrl,
}: CreamySageThemeProps) {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  // Helper untuk mendapatkan setting dinamis
  const getSetting = (key: keyof WeddingConfig): string => {
    return config[key] || "";
  };

  // Helper untuk membaca nilai config klien secara langsung
  // Digunakan untuk pengecekan visibilitas section (misal: apakah rekening benar-benar diisi klien)
  const getRawConfig = (key: keyof WeddingConfig): string => {
    return config[key] || "";
  };

  // Apakah urutan mempelai dimulai dari wanita?
  const isBrideFirst = getSetting("couple_order") === "bride_first";

  // Nama pertama & kedua sesuai urutan pilihan klien
  const firstName = isBrideFirst
    ? getSetting("bride_nickname")
    : getSetting("groom_nickname");
  const secondName = isBrideFirst
    ? getSetting("groom_nickname")
    : getSetting("bride_nickname");
  const firstInitial = firstName[0] || (isBrideFirst ? "N" : "A");
  const secondInitial = secondName[0] || (isBrideFirst ? "A" : "N");

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => {
      setCopiedText(null);
    }, 2000);
  };

  // Helper untuk mengekstrak inisial nama asli (mengabaikan gelar akademik)
  const getInitials = (fullname: string, fallback: string): string => {
    try {
      const cleanName = fullname.split(",")[0].trim();
      const parts = cleanName.split(/\s+/).filter((p) => p.length > 1);
      if (parts.length === 0) return fallback;
      if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    } catch {
      return fallback;
    }
  };

  return (
    <div className="min-h-screen bg-cream-dark/40 flex justify-center items-start overflow-x-hidden w-full">
      {/* Pembuka Amplop Digital */}
      <Envelope
        onOpen={() => setIsOpened(true)}
        groomName={firstName}
        brideName={secondName}
      />

      {/* Kontrol Musik Melayang */}
      <AudioPlayer
        playTrigger={isOpened}
        musicTitle={musicTitle}
        musicUrl={musicUrl}
      />

      {/* Konten Utama Undangan */}
      <AnimatePresence>
        {isOpened && (
          <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="w-full max-w-md bg-cream text-charcoal shadow-2xl relative min-h-screen flex flex-col justify-start border-x border-rose-gold-light/20 pb-20"
          >
            {/* 1. SECTION HERO COVER */}
            <section className="relative h-[85vh] flex flex-col items-center justify-between py-16 px-6 text-center overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(#FAF9F5_30%,#F3F0E6_100%)] opacity-80 pointer-events-none" />
              <div className="absolute top-10 left-10 w-24 h-24 border-l border-t border-rose-gold-light/40 pointer-events-none" />
              <div className="absolute top-10 right-10 w-24 h-24 border-r border-t border-rose-gold-light/40 pointer-events-none" />
              <div className="absolute bottom-10 left-10 w-24 h-24 border-l border-b border-rose-gold-light/40 pointer-events-none" />
              <div className="absolute bottom-10 right-10 w-24 h-24 border-r border-b border-rose-gold-light/40 pointer-events-none" />

              <div className="relative z-10 mt-6">
                <span className="text-[10px] uppercase tracking-[0.4em] text-charcoal-muted">
                  Walimatul &apos;Ursy
                </span>
                <h2 className="font-serif text-3xl font-light text-rose-gold-dark mt-2 tracking-widest">
                  THE WEDDING OF
                </h2>
              </div>

              {/* Inisial & Nama Mempelai */}
              <div className="relative z-10 my-auto flex flex-col items-center">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 1 }}
                  className="w-20 h-20 rounded-full border border-rose-gold-light/50 flex items-center justify-center font-serif text-3xl text-rose-gold-dark mb-6 bg-white/30 backdrop-blur-sm"
                >
                  {firstInitial} &amp; {secondInitial}
                </motion.div>
                <motion.h1
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 1 }}
                  className="font-serif text-5xl font-light text-rose-gold-dark tracking-wide leading-tight"
                >
                  {firstName} <br />
                  <span className="text-3xl font-serif italic text-charcoal-muted font-light my-2 block">
                    &amp;
                  </span>
                  {secondName}
                </motion.h1>
              </div>

              {/* Tanggal & Swipe Info */}
              <div className="relative z-10 mb-6">
                <p className="font-serif text-lg tracking-widest text-rose-gold-dark font-medium">
                  {formatIndonesianDate(getSetting("akad_date")).toUpperCase()}
                </p>
                <div className="w-1.5 h-1.5 bg-rose-gold rounded-full mx-auto my-3 animate-ping" />
                <span className="text-[9px] uppercase tracking-[0.3em] text-charcoal-muted block">
                  Scroll ke Bawah
                </span>
              </div>
            </section>

            {/* 2. SECTION QUOTE / KATA PENGANTAR */}
            <section className="px-8 py-16 text-center border-b border-rose-gold-light/10 relative">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-cream border border-rose-gold-light/40 flex items-center justify-center text-rose-gold-dark shadow-sm">
                <Heart className="w-3.5 h-3.5 fill-rose-gold-dark/20 stroke-[1.5]" />
              </div>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="flex flex-col items-center gap-4"
              >
                <h3 className="font-serif italic text-rose-gold-dark text-lg">
                  {getSetting("quote_reference")}
                </h3>
                <p className="text-xs text-charcoal-muted leading-relaxed font-sans px-2 italic">
                  &quot;{getSetting("quote")}&quot;
                </p>
              </motion.div>
            </section>

            {/* 3. SECTION MEMPELAI (BRIDE & GROOM) */}
            <section className="px-8 py-16 flex flex-col gap-14 border-b border-rose-gold-light/10 bg-linear-to-b from-cream to-cream-dark/20">
              <div className="text-center">
                <span className="text-[10px] uppercase tracking-[0.3em] text-charcoal-muted">
                  {isBrideFirst
                    ? "Mempelai Wanita & Pria"
                    : "Mempelai Pria & Wanita"}
                </span>
                <h3 className="font-serif text-2xl font-light text-rose-gold-dark mt-1">
                  KEDUA MEMPELAI
                </h3>
              </div>

              {/* Card Mempelai Pertama (Pria atau Wanita sesuai urutan) */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center flex flex-col items-center gap-2"
              >
                <div
                  className={`w-24 h-24 rounded-full border-2 border-rose-gold/30 flex items-center justify-center shadow-md mb-3 relative overflow-hidden ${isBrideFirst ? "bg-linear-to-br from-[#E2E7D5] to-white" : "bg-linear-to-br from-[#DFCDBC] to-white"}`}
                >
                  <span
                    className={`font-serif text-3xl font-semibold ${isBrideFirst ? "text-sage" : "text-rose-gold-dark"}`}
                  >
                    {isBrideFirst
                      ? getInitials(getSetting("bride_fullname"), "NP")
                      : getInitials(getSetting("groom_fullname"), "AW")}
                  </span>
                </div>
                <h4 className="font-serif text-xl font-bold text-rose-gold-dark tracking-wide">
                  {isBrideFirst
                    ? getSetting("bride_fullname")
                    : getSetting("groom_fullname")}
                </h4>
                <p className="text-[10px] uppercase tracking-wider text-charcoal-muted">
                  {isBrideFirst ? "Putri Pertama dari:" : "Putra Kedua dari:"}
                </p>
                <p className="text-xs text-charcoal font-medium">
                  {isBrideFirst
                    ? getSetting("bride_father")
                    : getSetting("groom_father")}
                </p>
                <p className="text-xs text-charcoal font-medium">
                  {isBrideFirst
                    ? getSetting("bride_mother")
                    : getSetting("groom_mother")}
                </p>
              </motion.div>

              {/* Pembatas Elegan */}
              <div className="flex items-center justify-center gap-3">
                <div className="h-px w-12 bg-rose-gold-light/40" />
                <HeartHandshake className="w-4 h-4 text-rose-gold stroke-[1.2]" />
                <div className="h-px w-12 bg-rose-gold-light/40" />
              </div>

              {/* Card Mempelai Kedua */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center flex flex-col items-center gap-2"
              >
                <div
                  className={`w-24 h-24 rounded-full border-2 border-rose-gold/30 flex items-center justify-center shadow-md mb-3 relative overflow-hidden ${isBrideFirst ? "bg-linear-to-br from-[#DFCDBC] to-white" : "bg-linear-to-br from-[#E2E7D5] to-white"}`}
                >
                  <span
                    className={`font-serif text-3xl font-semibold ${isBrideFirst ? "text-rose-gold-dark" : "text-sage"}`}
                  >
                    {isBrideFirst
                      ? getInitials(getSetting("groom_fullname"), "AW")
                      : getInitials(getSetting("bride_fullname"), "NP")}
                  </span>
                </div>
                <h4 className="font-serif text-xl font-bold text-rose-gold-dark tracking-wide">
                  {isBrideFirst
                    ? getSetting("groom_fullname")
                    : getSetting("bride_fullname")}
                </h4>
                <p className="text-[10px] uppercase tracking-wider text-charcoal-muted">
                  {isBrideFirst ? "Putra Kedua dari:" : "Putri Pertama dari:"}
                </p>
                <p className="text-xs text-charcoal font-medium">
                  {isBrideFirst
                    ? getSetting("groom_father")
                    : getSetting("bride_father")}
                </p>
                <p className="text-xs text-charcoal font-medium">
                  {isBrideFirst
                    ? getSetting("groom_mother")
                    : getSetting("bride_mother")}
                </p>
              </motion.div>
            </section>

            {/* 4. SECTION ACARA & LOKASI */}
            <section className="px-8 py-16 flex flex-col gap-8 border-b border-rose-gold-light/10 relative">
              <div className="text-center">
                <span className="text-[10px] uppercase tracking-[0.3em] text-charcoal-muted">
                  Waktu &amp; Tempat
                </span>
                <h3 className="font-serif text-2xl font-light text-rose-gold-dark mt-1">
                  INFORMASI ACARA
                </h3>
              </div>

              {/* Akad Nikah Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white/60 backdrop-blur-sm border border-rose-gold-light/20 p-6 rounded-2xl flex flex-col items-center text-center shadow-sm relative overflow-hidden"
              >
                <div className="absolute top-0 inset-x-0 h-1 bg-rose-gold-light" />
                <span className="text-[10px] uppercase tracking-widest text-rose-gold-dark font-bold font-sans">
                  Akad Nikah
                </span>
                <h4 className="font-serif text-lg font-bold text-charcoal mt-2 mb-3">
                  {formatIndonesianDate(getSetting("akad_date"))}
                </h4>
                <p className="text-xs text-charcoal font-semibold">
                  Pukul {formatIndonesianTime(getSetting("akad_start_time"))} -{" "}
                  {formatIndonesianTime(getSetting("akad_end_time"))}{" "}
                  {formatIndonesianTime(getSetting("akad_end_time")) ===
                  "Selesai"
                    ? ""
                    : "WIB"}
                </p>
                <p className="text-[10px] text-charcoal-muted mt-2 leading-relaxed px-2">
                  {getSetting("akad_location")}
                </p>

                {/* Tombol Map Akad Nikah */}
                <a
                  href={getSetting("akad_maps_url")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 flex items-center justify-center gap-1.5 py-2.5 px-5 bg-rose-gold-light/20 hover:bg-rose-gold-light/35 text-rose-gold-dark rounded-xl text-[10px] font-semibold tracking-wider uppercase transition-all cursor-pointer shadow-sm shadow-rose-gold-light/5"
                >
                  <MapPin className="w-3 h-3" />
                  <span>Peta Lokasi Akad</span>
                </a>
              </motion.div>

              {/* Resepsi Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-white/60 backdrop-blur-sm border border-rose-gold-light/20 p-6 rounded-2xl flex flex-col items-center text-center shadow-sm relative overflow-hidden"
              >
                <div className="absolute top-0 inset-x-0 h-1 bg-sage" />
                <span className="text-[10px] uppercase tracking-widest text-sage font-bold font-sans">
                  Resepsi Pernikahan
                </span>
                <h4 className="font-serif text-lg font-bold text-charcoal mt-2 mb-3">
                  {formatIndonesianDate(getSetting("resepsi_date"))}
                </h4>
                <p className="text-xs text-charcoal font-semibold">
                  Pukul {formatIndonesianTime(getSetting("resepsi_start_time"))}{" "}
                  - {formatIndonesianTime(getSetting("resepsi_end_time"))}{" "}
                  {formatIndonesianTime(getSetting("resepsi_end_time")) ===
                  "Selesai"
                    ? ""
                    : "WIB"}
                </p>
                <p className="text-[10px] text-charcoal-muted mt-2 leading-relaxed px-2">
                  {getSetting("resepsi_location")}
                </p>

                {/* Tombol Map Resepsi */}
                <a
                  href={getSetting("resepsi_maps_url")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 flex items-center justify-center gap-1.5 py-2.5 px-5 bg-sage/10 hover:bg-sage/20 text-sage rounded-xl text-[10px] font-semibold tracking-wider uppercase transition-all cursor-pointer shadow-sm shadow-sage/5"
                >
                  <MapPin className="w-3 h-3" />
                  <span>Peta Lokasi Resepsi</span>
                </a>
              </motion.div>
            </section>

            {/* 5. COUNTDOWN TIMER */}
            <section className="px-8 py-16 bg-[#F3F0E6]/30 border-b border-rose-gold-light/10 text-center">
              <span className="text-[10px] uppercase tracking-[0.3em] text-charcoal-muted block mb-1">
                Momen Bahagia
              </span>
              <h3 className="font-serif text-2xl font-light text-rose-gold-dark mb-4">
                HITUNG MUNDUR
              </h3>

              <Countdown targetDate={getSetting("wedding_date")} />

              <p className="text-[10px] text-charcoal-muted font-sans mt-3">
                Kami tidak sabar menyambut kehadiran Anda di hari istimewa kami.
              </p>
            </section>

            {/* 6. KADO DIGITAL / BANK DETAILS */}
            {((getRawConfig("bank_name_1") && getRawConfig("bank_account_1")) ||
              (getRawConfig("bank_name_2") &&
                getRawConfig("bank_account_2"))) && (
              <section className="px-8 py-16 flex flex-col gap-8 border-b border-rose-gold-light/10 bg-linear-to-b from-cream to-cream-dark/20">
                <div className="text-center">
                  <Gift className="w-5 h-5 text-rose-gold-dark mx-auto mb-2" />
                  <span className="text-[10px] uppercase tracking-[0.3em] text-charcoal-muted">
                    Kado Digital
                  </span>
                  <h3 className="font-serif text-2xl font-light text-rose-gold-dark mt-1">
                    AMPLOP DIGITAL
                  </h3>
                  <p className="text-xs text-charcoal-muted px-4 mt-3 leading-relaxed font-sans">
                    Bagi bapak/ibu/saudara/i yang ingin memberikan tanda kasih
                    untuk kami, dapat mengirimkannya secara cashless melalui
                    rekening di bawah ini:
                  </p>
                </div>

                {/* Rekening Card 1 */}
                {getRawConfig("bank_name_1") &&
                  getRawConfig("bank_account_1") && (
                    <div className="bg-white/80 p-5 border border-rose-gold-light/20 rounded-2xl shadow-sm flex flex-col gap-3 relative">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-[#0066AE] font-sans">
                          {getRawConfig("bank_name_1")}
                        </span>
                        <span className="text-[9px] uppercase tracking-wider text-rose-gold-dark font-medium">
                          {getRawConfig("bank_holder_1")}
                        </span>
                      </div>
                      <div className="flex justify-between items-center bg-[#FAF9F5] p-3 rounded-xl border border-rose-gold-light/10 mt-1">
                        <span className="text-sm font-semibold tracking-wider text-charcoal font-mono select-all">
                          {getRawConfig("bank_account_1")}
                        </span>
                        <button
                          onClick={() =>
                            copyToClipboard(
                              getRawConfig("bank_account_1"),
                              getRawConfig("bank_name_1") || "Bank 1"
                            )
                          }
                          className="p-1.5 hover:bg-rose-gold-light/20 rounded-lg text-charcoal-muted transition-all cursor-pointer"
                          aria-label={`Salin nomor rekening ${getRawConfig("bank_name_1")}`}
                        >
                          {copiedText === getRawConfig("bank_name_1") ? (
                            <Check className="w-4 h-4 text-sage" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>
                  )}

                {/* Rekening Card 2 */}
                {getRawConfig("bank_name_2") &&
                  getRawConfig("bank_account_2") && (
                    <div className="bg-white/80 p-5 border border-rose-gold-light/20 rounded-2xl shadow-sm flex flex-col gap-3 relative">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-[#006633] font-sans">
                          {getRawConfig("bank_name_2")}
                        </span>
                        <span className="text-[9px] uppercase tracking-wider text-rose-gold-dark font-medium">
                          {getRawConfig("bank_holder_2")}
                        </span>
                      </div>
                      <div className="flex justify-between items-center bg-[#FAF9F5] p-3 rounded-xl border border-rose-gold-light/10 mt-1">
                        <span className="text-sm font-semibold tracking-wider text-charcoal font-mono select-all">
                          {getRawConfig("bank_account_2")}
                        </span>
                        <button
                          onClick={() =>
                            copyToClipboard(
                              getRawConfig("bank_account_2"),
                              getRawConfig("bank_name_2") || "Bank 2"
                            )
                          }
                          className="p-1.5 hover:bg-rose-gold-light/20 rounded-lg text-charcoal-muted transition-all cursor-pointer"
                          aria-label={`Salin nomor rekening ${getRawConfig("bank_name_2")}`}
                        >
                          {copiedText === getRawConfig("bank_name_2") ? (
                            <Check className="w-4 h-4 text-sage" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>
                  )}

                {/* Notifikasi Rekening Disalin */}
                <AnimatePresence>
                  {copiedText && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2 bg-sage text-white text-xs rounded-xl shadow-lg flex items-center gap-2 border border-white/20"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Nomor Rekening {copiedText} Berhasil Disalin!</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </section>
            )}

            {/* 7. RSVP FORM & WISHES BOARD */}
            <section className="px-6 py-16 flex flex-col gap-10 bg-cream">
              <div className="text-center px-4">
                <span className="text-[10px] uppercase tracking-[0.3em] text-charcoal-muted">
                  Form Kehadiran &amp; Doa
                </span>
                <h3 className="font-serif text-2xl font-light text-rose-gold-dark mt-1">
                  KONFIRMASI RSVP
                </h3>
                <p className="text-xs text-charcoal-muted mt-2 font-sans">
                  Bantu kami mempersiapkan kenyamanan acara dengan mengisi
                  kehadiran Anda beserta ucapan doa restu terindah di bawah ini.
                </p>
              </div>

              {/* RSVP Form */}
              <RsvpForm
                onSuccess={onRefreshWishes}
                wishes={wishes}
                clientSlug={clientSlug}
              />

              {/* Wishes Board (Buku Tamu Digital) */}
              <WishesWall wishes={wishes} isLoading={wishesLoading} />
            </section>

            {/* 8. SECTION FOOTER */}
            <footer className="px-8 py-16 text-center border-t border-rose-gold-light/10 relative overflow-hidden bg-linear-to-b from-cream to-cream-dark/40">
              <span className="text-[9px] uppercase tracking-[0.4em] text-charcoal-muted block mb-4">
                Ucapan Terima Kasih
              </span>
              <p className="text-xs text-charcoal-muted leading-relaxed font-sans px-4 mb-8 italic">
                &quot;Merupakan suatu kehormatan dan kebahagiaan bagi kami
                apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa
                restu untuk perjalanan hidup baru kami.&quot;
              </p>

              <h2 className="font-serif text-3xl font-light text-rose-gold-dark tracking-widest mt-4">
                {firstName} &amp; {secondName}
              </h2>

              <div className="w-1.5 h-1.5 bg-rose-gold rounded-full mx-auto mt-4" />

              <p className="text-[9px] text-charcoal-muted font-sans mt-8 uppercase tracking-widest">
                &copy; 2026{" "}
                <Link href="/" className="hover:underline text-rose-gold-dark hover:text-rose-gold transition-colors font-medium">
                  Aycainvitation
                </Link>{" "}
                &bull; Created with Love
              </p>
            </footer>
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
}
