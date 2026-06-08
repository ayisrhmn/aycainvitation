"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Gift, Copy, Check, Heart, HeartHandshake } from "lucide-react";
import { format, parseISO } from "date-fns";
import { id } from "date-fns/locale";
import Envelope from "@/components/emerald-elegance/Envelope";
import AudioPlayer from "@/components/emerald-elegance/AudioPlayer";
import Countdown from "@/components/emerald-elegance/Countdown";
import RsvpForm from "@/components/emerald-elegance/RsvpForm";
import WishesWall from "@/components/emerald-elegance/WishesWall";
import FloatingParticles from "@/components/shared/FloatingParticles";
import { WeddingConfig, RsvpWish } from "@/types";
import Link from "next/link";

interface EmeraldEleganceThemeProps {
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

export default function EmeraldEleganceTheme({
  config,
  wishes,
  wishesLoading,
  onRefreshWishes,
  clientSlug,
  musicTitle,
  musicUrl,
}: EmeraldEleganceThemeProps) {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  // Helper untuk mendapatkan setting dinamis
  const getSetting = (key: keyof WeddingConfig): string => {
    return config[key] || "";
  };

  // Helper untuk membaca nilai config klien secara langsung
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

  // --- Calendar Computation ---
  const akadDateStr = getSetting("akad_date");
  let calYear = 2026;
  let calMonth = 4; // May (0-indexed)
  let calDay = 31;
  if (akadDateStr && akadDateStr.includes("-")) {
    const parts = akadDateStr.split("-");
    calYear = parseInt(parts[0], 10);
    calMonth = parseInt(parts[1], 10) - 1;
    calDay = parseInt(parts[2], 10);
  }
  const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();
  const firstDayIndex = new Date(calYear, calMonth, 1).getDay(); // 0: Sun, 1: Mon, ...
  const monthNames = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];
  const monthName = monthNames[calMonth] || "Mei";
  const daysOfWeek = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];

  const calendarCells = [];
  for (let i = 0; i < firstDayIndex; i++) {
    calendarCells.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    calendarCells.push(i);
  }

  return (
    <div className="min-h-screen bg-emerald-bg-dark/40 flex justify-center items-start overflow-x-hidden w-full">
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
            className="w-full max-w-md bg-emerald-mesh bg-noise text-emerald-charcoal shadow-2xl relative min-h-screen flex flex-col justify-start border-x border-emerald-primary-light/20 pb-20"
          >
            <FloatingParticles
              colors={[
                "rgba(18, 63, 53, 0.4)",
                "rgba(176, 155, 124, 0.6)",
                "rgba(132, 169, 140, 0.5)",
              ]}
            />
            {/* 1. SECTION HERO COVER */}
            <section className="relative flex flex-col items-center py-16 sm:py-20 px-4 sm:px-6 text-center overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(#f6f8f5_30%,#ecf0eb_100%)] opacity-80 pointer-events-none" />
              <div className="absolute top-6 left-6 sm:top-10 sm:left-10 w-16 h-16 sm:w-24 sm:h-24 border-l border-t border-emerald-primary-light/40 pointer-events-none" />
              <div className="absolute top-6 right-6 sm:top-10 sm:right-10 w-16 h-16 sm:w-24 sm:h-24 border-r border-t border-emerald-primary-light/40 pointer-events-none" />
              <div className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10 w-16 h-16 sm:w-24 sm:h-24 border-l border-b border-emerald-primary-light/40 pointer-events-none" />
              <div className="absolute bottom-6 right-6 sm:bottom-10 sm:right-10 w-16 h-16 sm:w-24 sm:h-24 border-r border-b border-emerald-primary-light/40 pointer-events-none" />

              <div className="relative z-10 mt-2 sm:mt-6">
                <span className="text-xs sm:text-sm uppercase tracking-[0.4em] text-emerald-charcoal-muted font-bold">
                  Walimatul &apos;Ursy
                </span>
                <h2 className="font-script text-5xl sm:text-6xl text-emerald-primary mt-2">
                  The Wedding Of
                </h2>
              </div>

              {/* Inisial & Nama Mempelai */}
              <div className="relative z-10 flex flex-col items-center mt-6 sm:mt-10 pt-24 sm:pt-28">
                <div className="relative group">
                  {/* Floral Decor Bottom Left (Behind Frame for depth) */}
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.8, duration: 1.2 }}
                    className="absolute -bottom-6 -left-8 sm:-left-12 z-30 pointer-events-none"
                  >
                    <img
                      src="/images/emerald-elegance/flower-2-emerald.png"
                      alt="Floral Ornament Bottom Left"
                      className="w-36 sm:w-40 h-auto object-contain drop-shadow-md"
                    />
                  </motion.div>

                  {/* Frame Name */}
                  <motion.div
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: 0.2, duration: 1, ease: "easeOut" }}
                    className="w-[260px] sm:w-[300px] h-[360px] sm:h-[400px] rounded-t-full border border-emerald-primary-light/30 shadow-[0_20px_50px_rgba(0,0,0,0.4)] bg-emerald-primary p-2 relative z-10 mx-auto"
                  >
                    <div className="w-full h-full rounded-t-full border-[1.5px] border-white/40 flex flex-col items-center justify-center pt-8 sm:pt-12 pb-6">
                      <motion.h1
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.6, duration: 1 }}
                        className="font-script text-5xl sm:text-6xl text-white tracking-wide leading-tight text-center drop-shadow-md relative z-10"
                      >
                        {firstName} <br />
                        <span className="text-3xl sm:text-4xl font-script text-white/80 my-3 block">
                          &amp;
                        </span>
                        {secondName}
                      </motion.h1>
                    </div>
                  </motion.div>

                  {/* Floral Centerpiece Overlay Top (In Front of Frame) */}
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1.2 }}
                    className="absolute -top-16 sm:-top-20 left-1/2 -translate-x-1/2 z-30 flex items-center justify-center pointer-events-none"
                  >
                    <img
                      src="/images/emerald-elegance/flower-emerald.png"
                      alt="Floral Ornament Top"
                      className="w-56 sm:w-64 h-auto object-contain drop-shadow-[0_10px_15px_rgba(0,0,0,0.3)]"
                    />
                  </motion.div>

                  {/* Floral Decor Bottom Right (In Front of Frame) */}
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.7, duration: 1.2 }}
                    className="absolute -bottom-10 -right-12 sm:-right-16 z-30 pointer-events-none"
                  >
                    <img
                      src="/images/emerald-elegance/flower-1-emerald.png"
                      alt="Floral Ornament Bottom Right"
                      className="w-32 sm:w-36 h-auto object-contain drop-shadow-xl"
                    />
                  </motion.div>
                </div>
              </div>

              {/* Floral Bottom Center (Below Frame) */}
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.8, duration: 1.2 }}
                className="relative z-10 flex items-center justify-center mt-6 sm:mt-10 mb-4 sm:mb-6 pointer-events-none w-full"
              >
                <img
                  src="/images/emerald-elegance/flower-3-emerald.png"
                  alt="Floral Decor Bottom Center"
                  className="w-[280px] sm:w-[360px] h-auto object-contain drop-shadow-md"
                />
              </motion.div>

              {/* Tanggal & Swipe Info */}
              <div className="relative z-10 mb-2 sm:mb-6">
                <p className="font-serif text-base sm:text-lg tracking-widest text-emerald-primary font-bold">
                  {formatIndonesianDate(getSetting("akad_date")).toUpperCase()}
                </p>
                <div className="w-1.5 h-1.5 bg-emerald-accent rounded-full mx-auto my-2 sm:my-3 animate-ping" />
                <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-emerald-charcoal-muted font-bold block">
                  Scroll ke Bawah
                </span>
              </div>
            </section>

            {/* 1.5. SECTION SAVE THE DATE / CALENDAR */}
            <section className="px-8 py-10 flex flex-col items-center justify-center relative border-b border-emerald-primary-light/10">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="w-full max-w-[320px]"
              >
                <div className="text-center mb-8">
                  <h3 className="font-script text-6xl text-emerald-primary">
                    {monthName}
                  </h3>
                </div>

                <div className="grid grid-cols-7 gap-y-6 text-center text-emerald-charcoal">
                  {/* Header Hari */}
                  {daysOfWeek.map((day, idx) => (
                    <div
                      key={`header-${idx}`}
                      className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-emerald-charcoal-muted"
                    >
                      {day}
                    </div>
                  ))}

                  {/* Grid Tanggal */}
                  {calendarCells.map((cell, idx) => {
                    const isEventDate = cell === calDay;
                    return (
                      <div
                        key={`cell-${idx}`}
                        className="relative flex items-center justify-center h-8 sm:h-10"
                      >
                        {cell ? (
                          <>
                            {isEventDate ? (
                              <div className="absolute inset-0 flex items-center justify-center">
                                <Heart className="w-8 h-8 sm:w-10 sm:h-10 fill-emerald-primary text-emerald-primary" />
                                <span className="absolute text-[11px] sm:text-[13px] font-bold text-cream z-10">
                                  {cell}
                                </span>
                              </div>
                            ) : (
                              <span className="text-xs sm:text-sm font-semibold text-emerald-charcoal z-10">
                                {cell}
                              </span>
                            )}
                          </>
                        ) : null}
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            </section>

            {/* 2. SECTION QUOTE / KATA PENGANTAR */}
            <section className="px-8 py-10 text-center border-b border-emerald-primary-light/10 relative">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-emerald-bg border border-emerald-primary-light/40 flex items-center justify-center text-emerald-primary shadow-sm">
                <Heart className="w-4.5 h-4.5 fill-emerald-primary/20 stroke-[1.5]" />
              </div>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="flex flex-col items-center gap-4"
              >
                <h3 className="font-script text-3xl text-emerald-primary">
                  {getSetting("quote_reference")}
                </h3>
                <p className="text-sm text-emerald-charcoal leading-relaxed font-sans px-2 italic font-medium">
                  &quot;{getSetting("quote")}&quot;
                </p>

                {/* Foto Bersama Kedua Mempelai */}
                <div className="relative mt-6">
                  {/* Ornamen Bunga Overlay */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="absolute -bottom-4 -left-6 w-28 h-auto z-10 pointer-events-none drop-shadow-md"
                  >
                    <img
                      src="/images/emerald-elegance/flower-1-emerald.png"
                      alt="Floral Decoration"
                      className="w-full h-full object-contain"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 1, ease: "easeOut" }}
                    className="w-64 h-80 rounded-t-full border border-emerald-primary-light/40 overflow-hidden shadow-lg bg-white/30 backdrop-blur-sm p-1.5 relative z-0 mx-auto"
                  >
                    <div className="w-full h-full rounded-t-full overflow-hidden group cursor-pointer">
                      <img
                        src="/images/bride-groom.png"
                        alt="Kedua Mempelai"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </section>

            {/* 3. SECTION MEMPELAI (BRIDE & GROOM) */}
            <section className="px-8 py-12 flex flex-col gap-5 relative overflow-hidden bg-emerald-bg z-20">
              {/* Background Backdrop Satin */}
              <div className="absolute inset-0 pointer-events-none z-0 opacity-20">
                <img
                  src="/images/emerald-elegance/backdrop-emerald.png"
                  alt="Backdrop Section"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Wave Divider Atas */}
              <svg
                viewBox="0 0 1440 100"
                className="w-full h-12 absolute top-0 left-0 text-emerald-bg z-10 drop-shadow-sm"
                preserveAspectRatio="none"
              >
                <path
                  fill="currentColor"
                  d="M0,0 C240,120 480,120 720,50 C960,-20 1200,-20 1440,50 L1440,0 L0,0 Z"
                />
              </svg>

              {/* Wave Divider Bawah */}
              <svg
                viewBox="0 0 1440 100"
                className="w-full h-12 absolute bottom-0 left-0 text-emerald-bg z-10 transform rotate-180 drop-shadow-sm"
                preserveAspectRatio="none"
              >
                <path
                  fill="currentColor"
                  d="M0,0 C240,120 480,120 720,50 C960,-20 1200,-20 1440,50 L1440,0 L0,0 Z"
                />
              </svg>

              <div className="text-center relative z-10 mt-2 -mb-12!">
                <span className="text-xs uppercase tracking-[0.3em] text-emerald-charcoal-muted font-bold">
                  {isBrideFirst
                    ? "Mempelai Wanita & Pria"
                    : "Mempelai Pria & Wanita"}
                </span>
                <h3 className="font-script text-4xl text-emerald-primary mt-1">
                  Kedua Mempelai
                </h3>
              </div>

              {/* Staggered Grid Layout Mempelai */}
              <div className="grid grid-cols-2 gap-x-1 relative z-10 w-full mt-4">
                {/* Left Column */}
                <div className="flex flex-col">
                  {/* Top Item: Avatar Mempelai 1 */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="w-full flex justify-start"
                  >
                    <img
                      src={
                        isBrideFirst
                          ? "/images/emerald-elegance/bride-stand.png"
                          : "/images/emerald-elegance/groom-stand.png"
                      }
                      alt={
                        isBrideFirst
                          ? getSetting("bride_fullname")
                          : getSetting("groom_fullname")
                      }
                      className="w-[170px] xs:w-[190px] h-auto object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.15)]"
                    />
                  </motion.div>

                  {/* Bottom Item: Details Mempelai 2 */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="mt-6 text-right pr-2 translate-x-4 relative z-20"
                  >
                    <h4 className="font-script text-4xl text-emerald-primary">
                      {isBrideFirst
                        ? getSetting("groom_fullname")
                        : getSetting("bride_fullname")}
                    </h4>
                    <p className="text-[11px] uppercase tracking-wider text-emerald-charcoal-muted font-bold mt-2 mb-1">
                      {isBrideFirst
                        ? "Putra Kedua dari:"
                        : "Putri Pertama dari:"}
                    </p>
                    <p className="text-sm text-emerald-charcoal font-bold leading-relaxed">
                      Bapak{" "}
                      {isBrideFirst
                        ? getSetting("groom_father")
                        : getSetting("bride_father")}
                      <br />
                      <span className="font-serif italic text-xs text-emerald-accent-dark/80">
                        &amp;
                      </span>{" "}
                      Ibu{" "}
                      {isBrideFirst
                        ? getSetting("groom_mother")
                        : getSetting("bride_mother")}
                    </p>
                  </motion.div>
                </div>

                {/* Right Column */}
                <div className="flex flex-col pt-14">
                  {/* Top Item: Details Mempelai 1 */}
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-left pr-2 min-h-[140px] flex flex-col justify-center -ml-6 relative z-20"
                  >
                    <h4 className="font-script text-4xl text-emerald-primary leading-snug">
                      {isBrideFirst
                        ? getSetting("bride_fullname")
                        : getSetting("groom_fullname")}
                    </h4>
                    <p className="text-[11px] uppercase tracking-wider text-emerald-charcoal-muted font-bold mt-2 mb-1">
                      {isBrideFirst
                        ? "Putri Pertama dari:"
                        : "Putra Kedua dari:"}
                    </p>
                    <p className="text-sm text-emerald-charcoal font-bold leading-relaxed">
                      Bapak{" "}
                      {isBrideFirst
                        ? getSetting("bride_father")
                        : getSetting("groom_father")}
                      <br />
                      <span className="font-serif italic text-xs text-emerald-accent-dark/80">
                        &amp;
                      </span>{" "}
                      Ibu{" "}
                      {isBrideFirst
                        ? getSetting("bride_mother")
                        : getSetting("groom_mother")}
                    </p>
                  </motion.div>

                  {/* Bottom Item: Avatar Mempelai 2 */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="w-full flex justify-end -mt-4"
                  >
                    <img
                      src={
                        isBrideFirst
                          ? "/images/emerald-elegance/groom-stand.png"
                          : "/images/emerald-elegance/bride-stand.png"
                      }
                      alt={
                        isBrideFirst
                          ? getSetting("groom_fullname")
                          : getSetting("bride_fullname")
                      }
                      className="w-[170px] xs:w-[190px] h-auto object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.15)]"
                    />
                  </motion.div>
                </div>
              </div>
            </section>

            {/* 4. SECTION ACARA & LOKASI */}
            <section className="px-8 pt-[240px] pb-10 flex flex-col gap-8 border-b border-emerald-primary-light/10 relative">
              {/* Curtain Decorative Header */}
              <div className="absolute -top-6 sm:-top-8 inset-x-0 w-full pointer-events-none select-none z-10 flex justify-center">
                <motion.img
                  initial={{ y: -50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  src="/images/emerald-elegance/curtain-emerald.png"
                  alt="Curtain Ornament"
                  className="w-full h-auto object-cover max-w-md origin-top"
                />
              </div>
              <div className="text-center">
                <span className="text-xs uppercase tracking-[0.3em] text-emerald-charcoal-muted font-bold">
                  Waktu &amp; Tempat
                </span>
                <h3 className="font-script text-4xl text-emerald-primary mt-1">
                  Informasi Acara
                </h3>
              </div>

              {/* Akad Nikah Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white/70 backdrop-blur-md border border-emerald-accent/30 p-6 rounded-2xl flex flex-col items-center text-center shadow-[0_8px_32px_rgba(176,155,124,0.15)] relative overflow-hidden"
              >
                <div className="absolute top-0 inset-x-0 h-1 bg-emerald-accent" />
                <span className="text-xs uppercase tracking-widest text-emerald-accent-dark font-bold font-sans">
                  Akad Nikah
                </span>
                <h4 className="font-serif text-xl font-bold text-emerald-charcoal mt-2 mb-3">
                  {formatIndonesianDate(getSetting("akad_date"))}
                </h4>
                <p className="text-sm text-emerald-charcoal font-bold">
                  Pukul {formatIndonesianTime(getSetting("akad_start_time"))} -{" "}
                  {formatIndonesianTime(getSetting("akad_end_time"))}{" "}
                  {formatIndonesianTime(getSetting("akad_end_time")) ===
                  "Selesai"
                    ? ""
                    : "WIB"}
                </p>
                <p className="text-xs sm:text-sm text-emerald-charcoal mt-2 leading-relaxed px-2 font-bold">
                  {getSetting("akad_location")}
                </p>

                {/* Tombol Map Akad Nikah */}
                <a
                  href={getSetting("akad_maps_url")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 flex items-center justify-center gap-1.5 py-2.5 px-5 bg-emerald-accent/20 hover:bg-emerald-accent/35 text-emerald-accent-dark rounded-xl text-xs font-bold tracking-wider uppercase transition-all cursor-pointer shadow-sm shadow-emerald-accent/5 animate-shimmer"
                >
                  <MapPin className="w-4 h-4" />
                  <span>Peta Lokasi Akad</span>
                </a>
              </motion.div>

              {/* Resepsi Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-white/70 backdrop-blur-md border border-emerald-accent/30 p-6 rounded-2xl flex flex-col items-center text-center shadow-[0_8px_32px_rgba(176,155,124,0.15)] relative overflow-hidden"
              >
                <div className="absolute top-0 inset-x-0 h-1 bg-emerald-primary" />
                <span className="text-xs uppercase tracking-widest text-emerald-primary font-bold font-sans">
                  Resepsi Pernikahan
                </span>
                <h4 className="font-serif text-xl font-bold text-emerald-charcoal mt-2 mb-3">
                  {formatIndonesianDate(getSetting("resepsi_date"))}
                </h4>
                <p className="text-sm text-emerald-charcoal font-bold">
                  Pukul {formatIndonesianTime(getSetting("resepsi_start_time"))}{" "}
                  - {formatIndonesianTime(getSetting("resepsi_end_time"))}{" "}
                  {formatIndonesianTime(getSetting("resepsi_end_time")) ===
                  "Selesai"
                    ? ""
                    : "WIB"}
                </p>
                <p className="text-xs sm:text-sm text-emerald-charcoal mt-2 leading-relaxed px-2 font-bold">
                  {getSetting("resepsi_location")}
                </p>

                {/* Tombol Map Resepsi */}
                <a
                  href={getSetting("resepsi_maps_url")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 flex items-center justify-center gap-1.5 py-2.5 px-5 bg-emerald-primary/10 hover:bg-emerald-primary/20 text-emerald-primary rounded-xl text-xs font-bold tracking-wider uppercase transition-all cursor-pointer shadow-sm shadow-emerald-primary-light/5 animate-shimmer"
                >
                  <MapPin className="w-4 h-4" />
                  <span>Peta Lokasi Resepsi</span>
                </a>
              </motion.div>
            </section>

            {/* 5. COUNTDOWN TIMER */}
            <section className="px-8 py-10 bg-emerald-bg-dark/30 border-b border-emerald-primary-light/10 text-center">
              <span className="text-xs uppercase tracking-[0.3em] text-emerald-charcoal-muted font-bold block mb-1">
                Momen Bahagia
              </span>
              <h3 className="font-script text-4xl text-emerald-primary mb-4">
                Hitung Mundur
              </h3>

              <Countdown targetDate={getSetting("wedding_date")} />

              <p className="text-xs text-emerald-charcoal-muted font-sans mt-3 font-bold">
                Kami tidak sabar menyambut kehadiran Anda di hari istimewa kami.
              </p>

              {/* Ornamen Bunga Bawah Countdown */}
              <div className="flex justify-center -mb-6 px-0 sm:px-4">
                <motion.img
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  src="/images/emerald-elegance/flower-3-emerald.png"
                  alt="Floral Ornament"
                  className="w-full max-w-lg sm:max-w-3xl h-auto object-contain pointer-events-none drop-shadow-sm"
                />
              </div>
            </section>

            {/* 6. KADO DIGITAL / BANK DETAILS */}
            {((getRawConfig("bank_name_1") && getRawConfig("bank_account_1")) ||
              (getRawConfig("bank_name_2") &&
                getRawConfig("bank_account_2"))) && (
              <section className="px-8 py-10 flex flex-col gap-8 border-b border-emerald-primary-light/10 bg-linear-to-b from-emerald-bg to-emerald-bg-dark/25">
                <div className="text-center">
                  <Gift className="w-6 h-6 text-emerald-primary mx-auto mb-2" />
                  <span className="text-xs uppercase tracking-[0.3em] text-emerald-charcoal-muted font-bold">
                    Kado Digital
                  </span>
                  <h3 className="font-script text-4xl text-emerald-primary mt-1">
                    Kirim Hadiah
                  </h3>
                  <p className="text-sm text-emerald-charcoal px-4 mt-3 leading-relaxed font-sans font-medium">
                    Bagi bapak/ibu/saudara/i yang ingin memberikan tanda kasih
                    untuk kami, dapat mengirimkannya secara cashless melalui
                    rekening di bawah ini:
                  </p>
                </div>

                {/* Rekening Card 1 */}
                {getRawConfig("bank_name_1") &&
                  getRawConfig("bank_account_1") && (
                    <div className="bg-white/80 p-5 border border-emerald-primary-light/20 rounded-2xl shadow-sm flex flex-col gap-3 relative">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-bold text-[#0066AE] font-sans">
                          {getRawConfig("bank_name_1")}
                        </span>
                        <span className="text-xs uppercase tracking-wider text-emerald-primary font-bold">
                          {getRawConfig("bank_holder_1")}
                        </span>
                      </div>
                      <div className="flex justify-between items-center bg-emerald-bg/40 p-3 rounded-xl border border-emerald-primary-light/10 mt-1">
                        <span className="text-base font-bold tracking-wider text-emerald-charcoal font-mono select-all">
                          {getRawConfig("bank_account_1")}
                        </span>
                        <button
                          onClick={() =>
                            copyToClipboard(
                              getRawConfig("bank_account_1"),
                              getRawConfig("bank_name_1") || "Bank 1"
                            )
                          }
                          className="p-1.5 hover:bg-emerald-primary-light/20 rounded-lg text-emerald-charcoal-muted transition-all cursor-pointer"
                          aria-label={`Salin nomor rekening ${getRawConfig("bank_name_1")}`}
                        >
                          {copiedText === getRawConfig("bank_name_1") ? (
                            <Check className="w-4.5 h-4.5 text-emerald-primary" />
                          ) : (
                            <Copy className="w-4.5 h-4.5" />
                          )}
                        </button>
                      </div>
                    </div>
                  )}

                {/* Rekening Card 2 */}
                {getRawConfig("bank_name_2") &&
                  getRawConfig("bank_account_2") && (
                    <div className="bg-white/80 p-5 border border-emerald-primary-light/20 rounded-2xl shadow-sm flex flex-col gap-3 relative">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-bold text-[#006633] font-sans">
                          {getRawConfig("bank_name_2")}
                        </span>
                        <span className="text-xs uppercase tracking-wider text-emerald-primary font-bold">
                          {getRawConfig("bank_holder_2")}
                        </span>
                      </div>
                      <div className="flex justify-between items-center bg-emerald-bg/40 p-3 rounded-xl border border-emerald-primary-light/10 mt-1">
                        <span className="text-base font-bold tracking-wider text-emerald-charcoal font-mono select-all">
                          {getRawConfig("bank_account_2")}
                        </span>
                        <button
                          onClick={() =>
                            copyToClipboard(
                              getRawConfig("bank_account_2"),
                              getRawConfig("bank_name_2") || "Bank 2"
                            )
                          }
                          className="p-1.5 hover:bg-emerald-primary-light/20 rounded-lg text-emerald-charcoal-muted transition-all cursor-pointer"
                          aria-label={`Salin nomor rekening ${getRawConfig("bank_name_2")}`}
                        >
                          {copiedText === getRawConfig("bank_name_2") ? (
                            <Check className="w-4.5 h-4.5 text-emerald-primary" />
                          ) : (
                            <Copy className="w-4.5 h-4.5" />
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
                      className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2 bg-emerald-primary text-white text-xs rounded-xl shadow-lg flex items-center gap-2 border border-white/20"
                    >
                      <Check className="w-4.5 h-4.5" />
                      <span>Nomor Rekening {copiedText} Berhasil Disalin!</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </section>
            )}

            {/* 7. RSVP FORM & WISHES BOARD */}
            <section className="px-6 py-10 flex flex-col gap-10 bg-emerald-bg">
              <div className="text-center px-4">
                <span className="text-xs uppercase tracking-[0.3em] text-emerald-charcoal-muted font-bold">
                  Form Kehadiran &amp; Doa
                </span>
                <h3 className="font-script text-4xl text-emerald-primary mt-1">
                  RSVP
                </h3>
                <p className="text-sm text-emerald-charcoal mt-2 font-sans font-medium">
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
            <footer className="px-8 py-16 text-center border-t border-emerald-primary-light/10 relative overflow-hidden bg-linear-to-b from-emerald-bg to-emerald-bg-dark/40">
              <span className="text-xs uppercase tracking-[0.4em] text-emerald-charcoal-muted block mb-4 font-bold">
                Ucapan Terima Kasih
              </span>
              <p className="text-sm text-emerald-charcoal leading-relaxed font-sans px-4 mb-6 italic">
                &quot;Merupakan suatu kehormatan dan kebahagiaan bagi kami
                apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa
                restu untuk perjalanan hidup baru kami.&quot;
              </p>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="flex justify-center mb-6"
              >
                <img
                  src="/images/emerald-elegance/flower-2-emerald.png"
                  alt="Footer Floral"
                  className="w-80 h-auto object-contain pointer-events-none drop-shadow-sm"
                />
              </motion.div>

              <h2 className="font-script text-5xl text-emerald-primary mt-4">
                {firstName} &amp; {secondName}
              </h2>

              <div className="w-1.5 h-1.5 bg-emerald-accent rounded-full mx-auto mt-4" />

              <p className="text-[10px] text-emerald-charcoal-muted font-sans mt-8 uppercase tracking-widest font-bold">
                &copy; 2026{" "}
                <Link
                  href="/"
                  className="hover:underline text-emerald-primary hover:text-emerald-primary-dark transition-colors font-bold"
                >
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
