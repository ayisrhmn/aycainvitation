"use client";

import { motion } from "framer-motion";
import { MessageSquare, Calendar, Check, X } from "lucide-react";

interface WishItem {
  name: string;
  attendance: string;
  guestsCount?: number;
  wish: string;
  timestamp: string;
}

interface WishesWallProps {
  wishes: WishItem[];
  isLoading: boolean;
}

export default function WishesWall({ wishes, isLoading }: WishesWallProps) {
  // Helper format tanggal bersahabat dalam Bahasa Indonesia
  const formatFriendlyDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return "";

      const diffMs = Date.now() - date.getTime();
      const diffMin = Math.floor(diffMs / 60000);
      const diffHr = Math.floor(diffMin / 60);

      if (diffMin < 1) return "Baru saja";
      if (diffMin < 60) return `${diffMin} menit yang lalu`;
      if (diffHr < 24) return `${diffHr} jam yang lalu`;

      return date.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    } catch {
      return "";
    }
  };

  // Mendapatkan inisial nama untuk avatar
  const getInitials = (nameStr: string) => {
    const trimmed = nameStr.trim();
    if (!trimmed) return "?";
    const parts = trimmed.split(/\s+/);
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  // Generator warna soft berdasarkan inisial agar avatar bervariasi secara konsisten
  const getAvatarBg = (nameStr: string) => {
    const charCodeSum = nameStr
      .split("")
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const colors = [
      "bg-[#dfd5c6] text-[#6e5d3f]", // Bronze/Sand soft
      "bg-[#cde0dc] text-[#123f35]", // Emerald light soft
      "bg-[#e2e8e4] text-[#2e5d4e]", // Sage soft
      "bg-[#f0ece1] text-[#7a6a53]", // Warm Ivory soft
      "bg-[#edf1ec] text-[#3e524d]", // Muted Teal soft
    ];
    return colors[charCodeSum % colors.length];
  };

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Header Wishes Wall */}
      <div className="flex items-center justify-between border-b border-emerald-primary-light/20 pb-3">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-emerald-accent" />
          <span className="text-sm font-semibold tracking-wider uppercase text-emerald-charcoal">
            Buku Tamu ({wishes.length})
          </span>
        </div>

        {isLoading && (
          <span className="text-xs text-emerald-charcoal-muted animate-pulse font-sans font-medium">
            Menyegarkan doa...
          </span>
        )}
      </div>

      {/* Kontainer Ucapan */}
      <div className="w-full max-h-87.5 overflow-y-auto pr-1 flex flex-col gap-3.5 scrollbar-thin">
        {isLoading && wishes.length === 0 ? (
          /* Skeleton Loader saat memuat awal */
          [...Array(3)].map((_, i) => (
            <div
              key={i}
              className="flex gap-3 bg-white/50 p-4 border border-emerald-primary-light/10 rounded-2xl animate-pulse"
            >
              <div className="w-10 h-10 rounded-full bg-emerald-primary-light/20 shrink-0" />
              <div className="flex-1 flex flex-col gap-2">
                <div className="h-3 w-28 bg-emerald-primary-light/20 rounded" />
                <div className="h-3 w-full bg-emerald-primary-light/10 rounded" />
                <div className="h-3 w-4/5 bg-emerald-primary-light/10 rounded" />
              </div>
            </div>
          ))
        ) : wishes.length === 0 ? (
          /* State jika tidak ada ucapan */
          <div className="text-center py-10 bg-white/40 border border-dashed border-emerald-primary-light/30 rounded-2xl">
            <p className="text-sm text-emerald-charcoal-muted font-sans px-4 font-medium">
              Belum ada ucapan. Jadilah yang pertama memberikan doa restu kepada
              kedua mempelai!
            </p>
          </div>
        ) : (
          /* Render ucapan */
          wishes.map((item, index) => (
            <motion.div
              key={index}
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: Math.min(index * 0.05, 0.4), duration: 0.5 }}
              className="flex gap-3 bg-white/60 p-4 border border-emerald-primary-light/20 rounded-2xl shadow-sm relative hover:bg-white transition-all duration-300"
            >
              {/* Avatar Bulat dengan Inisial */}
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-serif text-sm font-semibold shrink-0 shadow-inner ${getAvatarBg(item.name)}`}
              >
                {getInitials(item.name)}
              </div>

              {/* Detail Ucapan */}
              <div className="flex-1 flex flex-col gap-1 min-w-0">
                <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1">
                  <h4 className="text-sm font-bold text-emerald-charcoal truncate font-sans">
                    {item.name}
                  </h4>

                  {/* Badge Kehadiran */}
                  <span
                    className={`text-[10px] px-3 py-1 rounded-full font-bold font-sans flex items-center gap-1.5 shadow-2xs border ${
                      item.attendance === "Hadir"
                        ? "bg-emerald-100 text-emerald-800 border-emerald-300/60"
                        : "bg-rose-100 text-rose-800 border-rose-300/60"
                    }`}
                  >
                    {item.attendance === "Hadir" ? (
                      <>
                        <Check className="w-3 h-3 shrink-0 stroke-3" />
                        <span>Hadir ({item.guestsCount || 1} Pax)</span>
                      </>
                    ) : (
                      <>
                        <X className="w-3 h-3 shrink-0 stroke-3" />
                        <span>Tidak Hadir</span>
                      </>
                    )}
                  </span>
                </div>

                {/* Friendly Timestamp */}
                {item.timestamp && (
                  <div className="flex items-center gap-1 text-[10px] text-emerald-charcoal-muted/70 font-sans font-medium">
                    <Calendar className="w-3 h-3" />
                    <span>{formatFriendlyDate(item.timestamp)}</span>
                  </div>
                )}

                {/* Teks Doa / Ucapan */}
                <p className="text-sm text-emerald-charcoal leading-relaxed font-sans mt-1.5 wrap-break-word whitespace-pre-line bg-emerald-bg/40 p-2.5 rounded-xl border border-emerald-primary-light/10 font-medium">
                  {item.wish}
                </p>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
