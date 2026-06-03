"use client";

import { useState, useCallback, useEffect } from "react";
import CreamySageTheme from "@/themes/creamy-sage";
import EmeraldEleganceTheme from "@/themes/emerald-elegance";
import { WeddingConfig, RsvpWish } from "@/types";
import { getClientMusic } from "@/lib/clients";
import { Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface WrapperProps {
  theme: string;
  clientSlug: string;
  initialConfig: WeddingConfig;
  initialWishes: RsvpWish[];
  isDemo?: boolean;
}

export default function ClientThemeWrapper({
  theme,
  clientSlug,
  initialConfig,
  initialWishes,
  isDemo = false,
}: WrapperProps) {
  const [wishes, setWishes] = useState<RsvpWish[]>(initialWishes);
  const [wishesLoading, setWishesLoading] = useState<boolean>(false);
  const [showPreloader, setShowPreloader] = useState<boolean>(true);

  // Efek mematikan preloader setelah jeda buatan (1.5s)
  useEffect(() => {
    const timer = setTimeout(() => setShowPreloader(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Fallback ke lagu lokal kustom atau default tema
  const clientMusic = getClientMusic(clientSlug, theme);
  const musicTitle = initialConfig.music_title || clientMusic.title;
  const musicUrl = initialConfig.music_url || clientMusic.fileUrl;

  // Fungsi utilitas untuk menggabungkan ucapan server & local storage (hanya untuk Mode Demo)
  const mergeLocalWishes = useCallback(
    (fetched: RsvpWish[]) => {
      if (!isDemo || typeof window === "undefined") return fetched;
      const localWishesKey = `wedding_local_wishes_${clientSlug}`;
      const local = JSON.parse(localStorage.getItem(localWishesKey) || "[]");
      const all = [...local, ...fetched];
      const seen = new Set<string>();
      return all.filter((w) => {
        const nameKey = w.name.trim().toLowerCase();
        if (seen.has(nameKey)) return false;
        seen.add(nameKey);
        return true;
      });
    },
    [clientSlug, isDemo]
  );

  // Muat ucapan lokal saat mount pertama kali jika Mode Demo
  useEffect(() => {
    if (isDemo) {
      const timer = setTimeout(() => {
        setWishes((prev) => mergeLocalWishes(prev));
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [isDemo, mergeLocalWishes]);

  const fetchWishes = useCallback(async () => {
    setWishesLoading(true);
    try {
      const res = await fetch(`/api/rsvp?slug=${clientSlug}`);
      const result = await res.json();
      if (res.ok && result.status === "success") {
        const fetchedData = result.data || [];
        setWishes(isDemo ? mergeLocalWishes(fetchedData) : fetchedData);
      }
    } catch (err) {
      console.error("Gagal menyegarkan buku tamu:", err);
    } finally {
      setWishesLoading(false);
    }
  }, [clientSlug, isDemo, mergeLocalWishes]);

  const isEmerald = theme === "emerald-elegance";
  const bgClass = isEmerald ? "bg-emerald-bg" : "bg-[#FAF9F5]";
  const gradientClass = isEmerald
    ? "bg-[radial-gradient(#ecf0eb_30%,#f6f8f5_100%)]"
    : "bg-[radial-gradient(#F3F0E6_30%,#FAF9F5_100%)]";
  const borderColor = isEmerald
    ? "border-emerald-primary/40"
    : "border-rose-gold-light/40";
  const pingColor = isEmerald
    ? "border-emerald-primary/40"
    : "border-rose-gold/40";
  const heartColor = isEmerald
    ? "text-emerald-primary fill-emerald-primary/20"
    : "text-rose-gold fill-rose-gold/20";

  let renderedTheme;
  switch (theme) {
    case "emerald-elegance":
      renderedTheme = (
        <EmeraldEleganceTheme
          config={initialConfig}
          wishes={wishes}
          wishesLoading={wishesLoading}
          onRefreshWishes={fetchWishes}
          clientSlug={clientSlug}
          musicTitle={musicTitle}
          musicUrl={musicUrl}
        />
      );
      break;
    case "creamy-sage":
    default:
      renderedTheme = (
        <CreamySageTheme
          config={initialConfig}
          wishes={wishes}
          wishesLoading={wishesLoading}
          onRefreshWishes={fetchWishes}
          clientSlug={clientSlug}
          musicTitle={musicTitle}
          musicUrl={musicUrl}
        />
      );
      break;
  }

  const scrollbarStyles = isEmerald
    ? `
      ::-webkit-scrollbar-track { background: var(--color-emerald-bg) !important; }
      ::-webkit-scrollbar-thumb { background: var(--color-emerald-primary-light) !important; }
      ::-webkit-scrollbar-thumb:hover { background: var(--color-emerald-primary) !important; }
      * { scrollbar-color: var(--color-emerald-primary-light) var(--color-emerald-bg) !important; }
    `
    : `
      ::-webkit-scrollbar-track { background: var(--color-cream) !important; }
      ::-webkit-scrollbar-thumb { background: var(--color-rose-gold-light) !important; }
      ::-webkit-scrollbar-thumb:hover { background: var(--color-rose-gold) !important; }
      * { scrollbar-color: var(--color-rose-gold-light) var(--color-cream) !important; }
    `;

  return (
    <>
      <style>{scrollbarStyles}</style>
      <AnimatePresence>
        {showPreloader && (
          <motion.div
            key="preloader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className={`fixed inset-0 z-9999 flex flex-col items-center justify-center overflow-hidden select-none ${bgClass}`}
          >
            <div
              className={`absolute inset-0 opacity-60 pointer-events-none ${gradientClass}`}
            />

            <div className="relative z-10 flex flex-col items-center">
              <div
                className={`w-20 h-20 bg-white/60 backdrop-blur-md rounded-full border ${borderColor} flex items-center justify-center mb-6 shadow-md shadow-black/5 relative`}
              >
                <div
                  className={`absolute inset-0 border ${pingColor} rounded-full animate-ping opacity-40`}
                  style={{ animationDuration: "2s" }}
                ></div>
                <Heart
                  className={`w-8 h-8 ${heartColor} animate-pulse`}
                  style={{ animationDuration: "1.5s" }}
                />
              </div>

              <span
                className="text-[11px] uppercase tracking-[0.4em] text-charcoal font-medium font-sans animate-pulse"
                style={{ animationDuration: "2s" }}
              >
                Memuat Undangan
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {renderedTheme}
    </>
  );
}
