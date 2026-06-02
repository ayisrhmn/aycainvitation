"use client";

import { useState } from "react";
import { ArrowRight, Flower2, Sparkles, ShieldCheck, Zap } from "lucide-react";
import { motion } from "framer-motion";
import SakuraPetals from "@/components/landing-page/SakuraPetals";
import ThemeCatalog from "@/components/landing-page/ThemeCatalog";
import OrderForm from "@/components/landing-page/OrderForm";
import Link from "next/link";

export default function LandingClientPage() {
  const [selectedTheme, setSelectedTheme] = useState<string>("creamy-sage");

  return (
    <div className="min-h-screen bg-sakura-bg text-sakura-charcoal font-sans selection:bg-sakura-primary-light/40 relative">
      {/* Background Sakura Petals */}
      <SakuraPetals />

      {/* 1. HERO SECTION */}
      <header className="relative py-24 px-6 text-center overflow-hidden border-b border-sakura-primary-light/30 bg-linear-to-b from-sakura-bg via-white to-sakura-bg-dark/40">
        <div className="absolute top-0 inset-x-0 h-1 bg-linear-to-r from-sakura-primary-dark via-sakura-accent to-sakura-primary-light" />

        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center relative z-10 max-w-4xl mx-auto"
        >
          <div className="flex items-center gap-2 mb-4 bg-white/70 px-4 py-1.5 rounded-full border border-sakura-primary-light/20 backdrop-blur-xs">
            <Flower2 className="w-5 h-5 text-sakura-primary animate-pulse stroke-[1.5]" />
            <span className="font-serif text-xs sm:text-sm tracking-[0.25em] text-sakura-primary-dark uppercase font-semibold">
              Aycainvitation
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light text-sakura-charcoal tracking-wide leading-tight">
            Undangan Pernikahan Web{" "}
            <span className="font-serif italic text-sakura-primary block sm:inline">
              Premium
            </span>
            ,{" "}
            <span className="font-serif italic text-sakura-primary block sm:inline">
              Murah
            </span>{" "}
            &amp;{" "}
            <span className="font-serif italic text-sakura-primary block sm:inline">
              Instan
            </span>
          </h1>

          <p className="text-sm sm:text-base text-sakura-charcoal-muted max-w-xl mt-6 leading-relaxed">
            Buat website undangan pernikahan impian Anda hanya dalam 5 menit.
            Dilengkapi dengan buku tamu digital (Wishes Wall) dan konfirmasi
            kehadiran RSVP online otomatis secara praktis, instan, dan aman.
          </p>

          <a
            href="#order-form"
            className="mt-8 flex items-center gap-2 py-3 px-8 bg-sakura-primary hover:bg-sakura-primary-dark hover:scale-[1.03] text-white rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300 shadow-md shadow-sakura-primary/25"
          >
            <span>Mulai Buat Undangan</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          {/* 3 Pillars / Core Strengths Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 w-full text-left">
            <div className="bg-white/60 backdrop-blur-xs p-6 rounded-2xl border border-sakura-primary-light/20 shadow-xs">
              <div className="w-10 h-10 bg-sakura-primary/10 rounded-xl flex items-center justify-center text-sakura-primary mb-4 border border-sakura-primary-light/20">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-sakura-primary-dark">
                Premium Design
              </h3>
              <p className="text-xs text-sakura-charcoal-muted mt-2 leading-relaxed">
                Desain elegan &amp; eksklusif dengan musik latar, animasi
                partikel kelopak sakura gugur, dan navigasi ramah seluler
                (mobile responsive).
              </p>
            </div>

            <div className="bg-white/60 backdrop-blur-xs p-6 rounded-2xl border border-sakura-primary-light/20 shadow-xs">
              <div className="w-10 h-10 bg-sakura-primary/10 rounded-xl flex items-center justify-center text-sakura-primary mb-4 border border-sakura-primary-light/20">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-sakura-primary-dark">
                Harga Termurah
              </h3>
              <p className="text-xs text-sakura-charcoal-muted mt-2 leading-relaxed">
                Satu harga sangat hemat untuk semua fitur premium tanpa biaya
                tambahan tersembunyi. Lebih hemat &amp; ramah di kantong.
              </p>
            </div>

            <div className="bg-white/60 backdrop-blur-xs p-6 rounded-2xl border border-sakura-primary-light/20 shadow-xs">
              <div className="w-10 h-10 bg-sakura-primary/10 rounded-xl flex items-center justify-center text-sakura-primary mb-4 border border-sakura-primary-light/20">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-sakura-primary-dark">
                Mudah &amp; Instan
              </h3>
              <p className="text-xs text-sakura-charcoal-muted mt-2 leading-relaxed">
                Isi data online, aktifkan dalam hitungan menit secara instan,
                dan terima ucapan doa serta konfirmasi kehadiran RSVP secara
                otomatis.
              </p>
            </div>
          </div>
        </motion.div>
      </header>

      {/* KELEBIHAN / BENEFIT SECTION */}
      <section className="py-20 px-6 max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <span className="text-[10px] uppercase tracking-[0.3em] text-sakura-charcoal-muted font-bold block mb-1">
            Mengapa Memilih Kami?
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-light text-sakura-primary tracking-wide">
            SOLUSI UNDANGAN PERNIKAHAN TERBAIK
          </h2>
          <p className="text-xs sm:text-sm text-sakura-charcoal-muted mt-2 max-w-xl mx-auto">
            Kami menggabungkan kemewahan desain premium, kepraktisan sistem
            instan, dan harga yang sangat murah untuk hari bahagia Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* PREMIUM */}
          <div className="bg-white/40 hover:bg-white/80 p-8 rounded-3xl border border-sakura-primary-light/10 hover:border-sakura-primary-light/40 shadow-xs hover:shadow-md transition-all duration-300 group flex flex-col justify-between">
            <div>
              <div className="text-sakura-primary text-xs font-bold tracking-widest uppercase mb-2">
                01 / PREMIUM
              </div>
              <h3 className="font-serif text-xl font-semibold text-sakura-primary-dark mb-4">
                Desain Elegan &amp; Fitur Mewah
              </h3>
              <ul className="text-xs text-sakura-charcoal-muted space-y-2 mb-6">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-sakura-primary" />
                  <span>Musik latar romantis pilihan Anda</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-sakura-primary" />
                  <span>Navigasi halaman &amp; transisi yang mulus</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-sakura-primary" />
                  <span>Tampilan mobile-responsive sangat responsif</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-sakura-primary" />
                  <span>Galeri foto &amp; peta lokasi Google Maps</span>
                </li>
              </ul>
            </div>
            <p className="text-[11px] italic text-sakura-primary font-medium">
              Tampil mewah &amp; memikat tamu undangan Anda.
            </p>
          </div>

          {/* MURAH */}
          <div className="bg-white/40 hover:bg-white/80 p-8 rounded-3xl border border-sakura-primary-light/10 hover:border-sakura-primary-light/40 shadow-xs hover:shadow-md transition-all duration-300 group flex flex-col justify-between">
            <div>
              <div className="text-sakura-primary text-xs font-bold tracking-widest uppercase mb-2">
                02 / MURAH
              </div>
              <h3 className="font-serif text-xl font-semibold text-sakura-primary-dark mb-4">
                Harga Hemat &amp; Transparan
              </h3>
              <ul className="text-xs text-sakura-charcoal-muted space-y-2 mb-6">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-sakura-primary" />
                  <span>Satu harga flat, tanpa biaya tambahan</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-sakura-primary" />
                  <span>Masa aktif panjang tanpa batasan kuota tamu</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-sakura-primary" />
                  <span>Hemat ratusan ribu dibanding cetak fisik</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-sakura-primary" />
                  <span>Bisa sebar undangan tanpa batas (unlimited)</span>
                </li>
              </ul>
            </div>
            <p className="text-[11px] italic text-sakura-primary font-medium">
              Solusi paling hemat &amp; ekonomis untuk budget pernikahan.
            </p>
          </div>

          {/* MUDAH / INSTAN */}
          <div className="bg-white/40 hover:bg-white/80 p-8 rounded-3xl border border-sakura-primary-light/10 hover:border-sakura-primary-light/40 shadow-xs hover:shadow-md transition-all duration-300 group flex flex-col justify-between">
            <div>
              <div className="text-sakura-primary text-xs font-bold tracking-widest uppercase mb-2">
                03 / MUDAH &amp; INSTAN
              </div>
              <h3 className="font-serif text-xl font-semibold text-sakura-primary-dark mb-4">
                Pengerjaan 5 Menit Secara Instan
              </h3>
              <ul className="text-xs text-sakura-charcoal-muted space-y-2 mb-6">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-sakura-primary" />
                  <span>Cukup isi formulir online yang sederhana</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-sakura-primary" />
                  <span>Undangan aktif seketika setelah pembayaran</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-sakura-primary" />
                  <span>
                    Buku tamu digital (Wishes Wall) terintegrasi langsung
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-sakura-primary" />
                  <span>
                    Pantau rekap tamu RSVP &amp; doa ucapan restu secara online
                  </span>
                </li>
              </ul>
            </div>
            <p className="text-[11px] italic text-sakura-primary font-medium">
              Sangat praktis, cepat, dan tidak merepotkan Anda.
            </p>
          </div>
        </div>
      </section>

      {/* 2. CATALOG SECTION (PREVIEW THEMES) */}
      <ThemeCatalog
        selectedTheme={selectedTheme}
        setSelectedTheme={setSelectedTheme}
      />

      {/* 3. ORDER FORM SECTION & OVERLAYS */}
      <OrderForm selectedTheme={selectedTheme} />

      {/* 5. FOOTER */}
      <footer className="py-12 border-t border-sakura-primary-light/20 text-center bg-sakura-bg-dark/40 text-sakura-charcoal-muted text-[10px] font-sans uppercase tracking-widest relative z-10">
        <p>
          &copy; 2026{" "}
          <Link href="/" className="hover:underline text-sakura-primary">
            Aycainvitation
          </Link>{" "}
          &bull; Created with Love
        </p>
      </footer>
    </div>
  );
}
