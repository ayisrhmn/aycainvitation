"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Flower2 } from "lucide-react";
import SakuraPetals from "@/components/landing-page/SakuraPetals";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-sakura-bg text-sakura-charcoal font-sans selection:bg-sakura-primary-light/40 relative flex items-center justify-center p-6 overflow-hidden">
      {/* Background Sakura Petals */}
      <SakuraPetals />

      <div className="absolute top-0 inset-x-0 h-1 bg-linear-to-r from-sakura-primary-dark via-sakura-accent to-sakura-primary-light" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-md w-full bg-white/70 backdrop-blur-md rounded-3xl border border-sakura-primary-light/25 p-8 sm:p-10 text-center shadow-lg shadow-sakura-primary/5 flex flex-col items-center"
      >
        {/* Logo Branding */}
        <div className="flex items-center gap-2 mb-8 bg-white/80 px-3 py-1.5 rounded-full border border-sakura-primary-light/10 shadow-xs">
          <img
            src="/logo.png"
            alt="Aycainvitation Logo"
            className="w-8 h-8 object-contain rounded-full bg-sakura-primary/5 p-0.5"
          />
          <span className="font-serif text-sm sm:text-base tracking-[0.2em] text-sakura-primary-dark uppercase font-semibold">
            Aycainvitation
          </span>
        </div>

        <h1 className="font-serif text-6xl sm:text-7xl text-sakura-primary-dark tracking-wide mb-2">
          404
        </h1>
        <h2 className="font-serif text-xl sm:text-2xl text-sakura-charcoal font-medium tracking-wide mb-4">
          Halaman Tidak Ditemukan
        </h2>
        <p className="text-xs sm:text-sm text-sakura-charcoal-muted leading-relaxed mb-8 max-w-xs">
          Maaf, halaman undangan digital atau produk yang Anda tuju tidak
          ditemukan atau telah dipindahkan.
        </p>

        <Link
          href="/"
          className="flex items-center justify-center gap-2 w-full py-3 px-6 bg-sakura-primary hover:bg-sakura-primary-dark hover:scale-[1.02] text-white rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300 shadow-md shadow-sakura-primary/25"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Beranda</span>
        </Link>
      </motion.div>
    </div>
  );
}
