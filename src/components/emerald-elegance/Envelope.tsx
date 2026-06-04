"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MailOpen } from "lucide-react";

interface EnvelopeProps {
  onOpen: () => void;
  groomName?: string;
  brideName?: string;
}

export default function Envelope({
  onOpen,
  groomName,
  brideName,
}: EnvelopeProps) {
  const [guestName, setGuestName] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    // Mengambil parameter nama tamu dari URL (?to=Nama+Tamu)
    const params = new URLSearchParams(window.location.search);
    const to = params.get("to") || params.get("recipient") || "Tamu Undangan";
    const timerId = setTimeout(() => {
      setGuestName(to);
    }, 0);
    return () => clearTimeout(timerId);
  }, []);

  const handleOpen = () => {
    setIsOpen(true);
    // Jalankan callback untuk memicu lagu dan menampilkan konten utama setelah animasi selesai
    setTimeout(() => {
      onOpen();
    }, 1200); // Sinkron dengan durasi animasi exit
  };

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            y: "-100vh",
            opacity: 0,
            transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-between px-6 py-16 bg-linear-to-b from-emerald-bg via-emerald-bg-dark to-emerald-bg text-emerald-charcoal select-none overflow-hidden"
        >
          {/* Ornamen Botani Pojok Atas */}
          <div className="absolute top-0 left-0 w-32 h-32 opacity-15 pointer-events-none">
            <svg
              viewBox="0 0 100 100"
              fill="currentColor"
              className="w-full h-full text-emerald-primary"
            >
              <path d="M0,0 Q30,10 40,40 Q10,30 0,0 M0,0 Q10,30 30,50 Q20,20 0,0" />
            </svg>
          </div>
          <div className="absolute top-0 right-0 w-32 h-32 opacity-15 pointer-events-none transform scale-x-[-1]">
            <svg
              viewBox="0 0 100 100"
              fill="currentColor"
              className="w-full h-full text-emerald-primary"
            >
              <path d="M0,0 Q30,10 40,40 Q10,30 0,0 M0,0 Q10,30 30,50 Q20,20 0,0" />
            </svg>
          </div>

          {/* Pengantin Singkat Header */}
          <motion.div
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-center mt-4 sm:mt-8 z-10"
          >
            <span className="text-sm uppercase tracking-[0.3em] text-emerald-charcoal-muted font-bold">
              Undangan Pernikahan
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl mt-4 text-emerald-primary tracking-wide">
              {groomName || "Arya"} &amp; {brideName || "Nabila"}
            </h1>
          </motion.div>

          {/* Grup Tengah (Ilustrasi + Kotak) */}
          <div className="flex flex-col items-center justify-center grow w-full z-10 py-4">
            {/* Ilustrasi Cover */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{
                scale: 1,
                opacity: 1,
                y: [0, -8, 0],
              }}
              transition={{
                scale: { delay: 0.3, duration: 1 },
                opacity: { delay: 0.3, duration: 1 },
                y: {
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1.3,
                },
              }}
              className="w-44 h-44 sm:w-56 sm:h-56 relative flex items-center justify-center mb-4 sm:mb-8 z-10"
            >
              <img
                src="/images/cover.png"
                alt="Wedding Envelope Illustration"
                className="w-full h-full object-contain filter drop-shadow-[0_8px_16px_rgba(18,63,53,0.15)]"
              />
            </motion.div>

            {/* Kotak Penerima Undangan */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="w-full max-w-sm p-6 py-5 sm:p-8 text-center bg-white/80 backdrop-blur-md border border-emerald-primary-light/40 rounded-2xl shadow-xl shadow-emerald-primary-light/10 relative z-20"
            >
              {/* Hiasan Frame Minimalis */}
              <div className="absolute inset-2 border border-emerald-primary-light/20 rounded-xl pointer-events-none" />

              <p className="text-xs uppercase tracking-widest text-emerald-charcoal font-sans mb-3 font-bold">
                Kepada Yth. Bapak/Ibu/Saudara/i:
              </p>

              <h2 className="font-serif text-2xl font-bold text-emerald-primary mt-2 mb-4 tracking-wide wrap-break-word">
                {guestName}
              </h2>

              <p className="text-xs sm:text-sm text-emerald-charcoal leading-relaxed font-sans px-2 font-medium">
                Tanpa mengurangi rasa hormat, kami mengundang Anda untuk hadir
                di hari bahagia pernikahan kami.
              </p>
            </motion.div>
          </div>

          {/* Stempel Lilin (Wax Seal) sebagai Tombol Buka */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col items-center gap-3 sm:gap-4 mb-4 sm:mb-8 z-10"
          >
            <button
              onClick={handleOpen}
              className="group relative flex items-center justify-center w-20 h-20 bg-linear-to-br from-emerald-primary to-emerald-primary-dark rounded-full shadow-lg shadow-emerald-primary-dark/30 hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
              aria-label="Buka Undangan"
            >
              {/* Efek Denyut Latar Belakang */}
              <div className="absolute inset-0 bg-emerald-primary-light rounded-full scale-110 opacity-20 animate-ping group-hover:animate-none" />

              {/* SVG Wax Seal Detail */}
              <div className="absolute inset-1.5 border-2 border-dashed border-white/30 rounded-full" />

              {/* Icon / Inisial */}
              <div className="flex flex-col items-center text-white">
                <MailOpen className="w-7 h-7 stroke-[1.5]" />
              </div>
            </button>

            <span className="text-sm tracking-widest text-emerald-charcoal font-bold animate-pulse">
              BUKA UNDANGAN
            </span>
          </motion.div>

          {/* Ornamen Botani Pojok Bawah */}
          <div className="absolute bottom-0 left-0 w-32 h-32 opacity-15 pointer-events-none transform scale-y-[-1]">
            <svg
              viewBox="0 0 100 100"
              fill="currentColor"
              className="w-full h-full text-emerald-primary"
            >
              <path d="M0,0 Q30,10 40,40 Q10,30 0,0 M0,0 Q10,30 30,50 Q20,20 0,0" />
            </svg>
          </div>
          <div className="absolute bottom-0 right-0 w-32 h-32 opacity-15 pointer-events-none transform scale-[-1]">
            <svg
              viewBox="0 0 100 100"
              fill="currentColor"
              className="w-full h-full text-emerald-primary"
            >
              <path d="M0,0 Q30,10 40,40 Q10,30 0,0 M0,0 Q10,30 30,50 Q20,20 0,0" />
            </svg>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
