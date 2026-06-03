"use client";

import { useEffect, useRef, useState } from "react";
import { Music, Volume2, VolumeX } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface AudioPlayerProps {
  playTrigger: boolean;
  musicTitle?: string;
  musicUrl?: string;
}

export default function AudioPlayer({
  playTrigger,
  musicTitle,
  musicUrl,
}: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);

  const [showInfo, setShowInfo] = useState<boolean>(true);

  useEffect(() => {
    // Inisialisasi audio di client side menggunakan berkas lokal yang andal
    audioRef.current = new Audio(musicUrl);
    audioRef.current.loop = true;
    audioRef.current.volume = 0.5; // Volume sedang agar tidak mengagetkan

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [musicUrl]);

  useEffect(() => {
    if (playTrigger) {
      setShowInfo(true);
      const timer = setTimeout(() => {
        setShowInfo(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [playTrigger]);

  useEffect(() => {
    if (playTrigger && audioRef.current && !hasInteracted) {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          setHasInteracted(true);
        })
        .catch((err) => {
          console.log(
            "Autoplay dicegah oleh browser, menunggu interaksi pengguna.",
            err
          );
        });
    }
  }, [playTrigger, hasInteracted]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.error("Gagal memutar audio:", err);
        });
    }
  };

  return (
    <AnimatePresence>
      {playTrigger && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            delay: 0.5,
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-3"
        >
          {/* Label Informasi Musik Desktop (Selalu Tampil) */}
          <div className="hidden lg:flex flex-col items-end px-3 py-1.5 bg-white/80 backdrop-blur-md border border-emerald-primary-light/30 rounded-xl shadow-md text-right select-none">
            <span className="text-[10px] uppercase tracking-wider text-emerald-charcoal-muted">
              Musik Latar
            </span>
            <span
              title={musicTitle}
              className="text-[11px] font-semibold text-emerald-primary max-w-[160px] truncate"
            >
              {musicTitle}
            </span>
          </div>

          {/* Label Informasi Musik Mobile (Auto-Hide) */}
          <AnimatePresence>
            {showInfo && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="flex lg:hidden flex-col items-end px-3 py-1.5 bg-white/80 backdrop-blur-md border border-emerald-primary-light/30 rounded-xl shadow-md text-right select-none"
              >
                <span className="text-[10px] uppercase tracking-wider text-emerald-charcoal-muted">
                  Musik Latar
                </span>
                <span
                  title={musicTitle}
                  className="text-[11px] font-semibold text-emerald-primary truncate max-w-[140px] sm:max-w-xs"
                >
                  {musicTitle}
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Tombol Musik Utama */}
          <button
            onClick={togglePlay}
            className="group relative flex items-center justify-center w-12 h-12 bg-white border border-emerald-primary-light/40 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
            aria-label={isPlaying ? "Matikan Musik" : "Putar Musik"}
          >
            {/* Cincin Emerald Berputar saat Bermain */}
            <div
              className={`absolute inset-0.5 border border-dashed border-emerald-primary rounded-full ${isPlaying ? "animate-[spin_20s_linear_infinite]" : ""}`}
            />

            {/* Efek visualizer equalizer minimalis melayang */}
            {isPlaying ? (
              <div className="flex items-end gap-0.5 h-4 w-4 justify-center">
                <span
                  className="w-0.5 bg-emerald-primary rounded-full animate-[equalizer_0.8s_ease-in-out_infinite]"
                  style={{ height: "40%" }}
                />
                <span
                  className="w-0.5 bg-emerald-primary rounded-full animate-[equalizer_1.2s_ease-in-out_infinite_0.2s]"
                  style={{ height: "80%" }}
                />
                <span
                  className="w-0.5 bg-emerald-primary rounded-full animate-[equalizer_1.0s_ease-in-out_infinite_0.4s]"
                  style={{ height: "60%" }}
                />
                <span
                  className="w-0.5 bg-emerald-primary rounded-full animate-[equalizer_0.9s_ease-in-out_infinite_0.1s]"
                  style={{ height: "50%" }}
                />
              </div>
            ) : (
              <Music className="w-4 h-4 text-emerald-charcoal-muted stroke-[1.5]" />
            )}

            {/* Indikator Volume Kecil */}
            <div className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 bg-emerald-primary text-white rounded-full border border-white shadow shadow-emerald-primary-dark/20">
              {isPlaying ? (
                <Volume2 className="w-2.5 h-2.5" />
              ) : (
                <VolumeX className="w-2.5 h-2.5" />
              )}
            </div>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
