"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  X,
  Send,
  AlertCircle,
  Loader2,
  ChevronDown,
} from "lucide-react";

interface WishItem {
  name: string;
  attendance: string;
  guestsCount?: number;
  wish: string;
  timestamp: string;
}

interface RsvpFormProps {
  onSuccess: () => void;
  wishes?: WishItem[];
  clientSlug?: string;
}

export default function RsvpForm({
  onSuccess,
  wishes = [],
  clientSlug,
}: RsvpFormProps) {
  const [name, setName] = useState<string>("");
  const [attendance, setAttendance] = useState<string>("");
  const [guestsCount, setGuestsCount] = useState<string>("1");
  const [wish, setWish] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");

  useEffect(() => {
    // Prefill nama dari query param URL jika ada
    const params = new URLSearchParams(window.location.search);
    const to = params.get("to") || params.get("recipient") || "";
    const timerId = setTimeout(() => {
      setName(to);

      // 1. Cek dari localStorage (Client-Side)
      if (to.trim()) {
        const storageKey = `wedding_rsvp_submitted_${to.trim().toLowerCase()}`;
        if (localStorage.getItem(storageKey) === "true") {
          setIsSuccess(true);
          return;
        }
      }

      // 2. Cek dari daftar wishes (Server-Side data yang ditarik dari awal)
      if (to.trim() && wishes.length > 0) {
        const alreadySubmitted = wishes.some(
          (item) => item.name.trim().toLowerCase() === to.trim().toLowerCase()
        );
        if (alreadySubmitted) {
          setIsSuccess(true);
        }
      }
    }, 0);
    return () => clearTimeout(timerId);
  }, [wishes]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMsg("Mohon masukkan nama Anda.");
      return;
    }
    if (!attendance) {
      setErrorMsg("Mohon konfirmasi kehadiran Anda.");
      return;
    }

    setIsLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          clientSlug,
          name: name.trim(),
          attendance,
          guestsCount: attendance === "Hadir" ? parseInt(guestsCount, 10) : 0,
          wish: wish.trim(),
        }),
      });

      const result = await res.json();

      if (res.ok && result.status === "success") {
        // Simpan flag di localStorage agar tidak mengisi ulang di perangkat yang sama
        if (name.trim()) {
          const trimmedName = name.trim();
          const storageKey = `wedding_rsvp_submitted_${trimmedName.toLowerCase()}`;
          localStorage.setItem(storageKey, "true");

          // Simpan data ucapan lengkap ke local wishes list untuk demo mode
          const localWishesKey = `wedding_local_wishes_${clientSlug || "emerald-elegance"}`;
          try {
            const existingLocal = JSON.parse(
              localStorage.getItem(localWishesKey) || "[]"
            );
            const newWish = {
              name: trimmedName,
              attendance,
              guestsCount:
                attendance === "Hadir" ? parseInt(guestsCount, 10) : 0,
              wish: wish.trim(),
              timestamp: new Date().toISOString(),
            };
            existingLocal.unshift(newWish);
            localStorage.setItem(localWishesKey, JSON.stringify(existingLocal));
          } catch (e) {
            console.error("Gagal menyimpan ucapan lokal:", e);
          }
        }
        setIsSuccess(true);
        setWish("");
        // Beri waktu animasi sukses selesai sebelum memanggil callback penyegaran data
        setTimeout(() => {
          onSuccess();
        }, 1000);
      } else {
        throw new Error(result.message || "Gagal menyimpan konfirmasi.");
      }
    } catch (err: unknown) {
      console.error(err);
      const errMsg =
        err instanceof Error
          ? err.message
          : "Koneksi bermasalah, silakan coba lagi.";
      setErrorMsg(errMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full bg-white/80 backdrop-blur-md border border-emerald-primary-light/30 rounded-3xl p-6 sm:p-8 shadow-xl shadow-emerald-primary-light/5 relative overflow-hidden">
      {/* Hiasan Frame Tipis */}
      <div className="absolute inset-2 border border-emerald-primary-light/20 rounded-2xl pointer-events-none" />

      <AnimatePresence mode="wait">
        {!isSuccess ? (
          <motion.form
            key="rsvp-form"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            className="flex flex-col gap-5 relative z-10"
          >
            {/* Input Nama */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="name"
                className="text-xs sm:text-sm uppercase tracking-widest text-emerald-charcoal font-bold"
              >
                Nama Lengkap
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Masukkan nama Anda"
                className="w-full px-4 py-3 bg-emerald-bg border border-emerald-primary-light/30 rounded-xl text-sm text-emerald-charcoal focus:outline-none focus:border-emerald-primary focus:ring-1 focus:ring-emerald-primary transition-all"
                disabled={isLoading}
                required
              />
            </div>

            {/* Opsi Kehadiran */}
            <div className="flex flex-col gap-2">
              <span className="text-xs sm:text-sm uppercase tracking-widest text-emerald-charcoal font-bold">
                Konfirmasi Kehadiran
              </span>
              <div className="grid grid-cols-2 gap-3">
                {/* Opsi Hadir */}
                <button
                  type="button"
                  onClick={() => setAttendance("Hadir")}
                  className={`flex flex-col items-center justify-center py-3.5 px-4 rounded-xl border text-sm transition-all duration-300 cursor-pointer ${
                    attendance === "Hadir"
                      ? "bg-emerald-primary border-emerald-primary text-white font-bold shadow-lg shadow-emerald-primary/30 scale-[1.04]"
                      : "bg-emerald-50/40 border-emerald-200/60 text-emerald-800/80 hover:bg-emerald-50 hover:border-emerald-300"
                  }`}
                  disabled={isLoading}
                >
                  <Check
                    className={`w-6 h-6 mb-1 transition-colors ${attendance === "Hadir" ? "text-white stroke-3" : "text-emerald-primary"}`}
                  />
                  <span>Hadir</span>
                </button>

                {/* Opsi Tidak Hadir */}
                <button
                  type="button"
                  onClick={() => {
                    setAttendance("Tidak Hadir");
                    setGuestsCount("0");
                  }}
                  className={`flex flex-col items-center justify-center py-3.5 px-4 rounded-xl border text-sm transition-all duration-300 cursor-pointer ${
                    attendance === "Tidak Hadir"
                      ? "bg-rose-700 border-rose-700 text-white font-bold shadow-lg shadow-rose-700/30 scale-[1.04]"
                      : "bg-rose-50/40 border-rose-200/60 text-rose-800/80 hover:bg-rose-50 hover:border-rose-300"
                  }`}
                  disabled={isLoading}
                >
                  <X
                    className={`w-6 h-6 mb-1 transition-colors ${attendance === "Tidak Hadir" ? "text-white stroke-3" : "text-rose-700"}`}
                  />
                  <span>Tidak Hadir</span>
                </button>
              </div>
            </div>

            {/* Jumlah Tamu (Conditional) */}
            <AnimatePresence>
              {attendance === "Hadir" && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col gap-1.5 overflow-hidden"
                >
                  <label
                    htmlFor="guests"
                    className="text-xs sm:text-sm uppercase tracking-widest text-emerald-charcoal font-bold"
                  >
                    Jumlah Tamu (Pax)
                  </label>
                  <div className="relative">
                    <select
                      id="guests"
                      value={guestsCount}
                      onChange={(e) => setGuestsCount(e.target.value)}
                      className="w-full px-4 py-3 bg-emerald-bg border border-emerald-primary-light/30 rounded-xl text-sm text-emerald-charcoal focus:outline-none focus:border-emerald-primary transition-all appearance-none pr-10 cursor-pointer"
                      disabled={isLoading}
                    >
                      <option value="1">1 Orang</option>
                      <option value="2">2 Orang</option>
                      <option value="3">3 Orang</option>
                      <option value="4">4 Orang</option>
                    </select>
                    <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-emerald-charcoal-muted/60">
                      <ChevronDown className="w-5 h-5" />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Input Ucapan & Doa */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="wish"
                className="text-xs sm:text-sm uppercase tracking-widest text-emerald-charcoal font-bold"
              >
                Ucapan &amp; Doa Restu
              </label>
              <textarea
                id="wish"
                value={wish}
                onChange={(e) => setWish(e.target.value)}
                placeholder="Tulis ucapan selamat dan doa restu Anda di sini..."
                rows={4}
                className="w-full px-4 py-3 bg-emerald-bg border border-emerald-primary-light/30 rounded-xl text-sm text-emerald-charcoal placeholder:text-emerald-charcoal-muted/50 focus:outline-none focus:border-emerald-primary focus:ring-1 focus:ring-emerald-primary transition-all resize-none"
                disabled={isLoading}
              />
            </div>

            {/* Error Message */}
            <AnimatePresence>
              {errorMsg && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 text-red-800 text-xs rounded-xl"
                >
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <span>{errorMsg}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Tombol Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-emerald-primary hover:bg-emerald-primary-dark text-white rounded-xl text-sm font-medium tracking-wider uppercase transition-all shadow-md shadow-emerald-primary/20 hover:shadow-lg disabled:opacity-75 disabled:cursor-not-allowed cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Mengirimkan...</span>
                </>
              ) : (
                <>
                  <Send className="w-4.5 h-4.5" />
                  <span>Kirim Konfirmasi</span>
                </>
              )}
            </button>
          </motion.form>
        ) : (
          /* Tampilan Sukses */
          <motion.div
            key="success-screen"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="flex flex-col items-center justify-center text-center py-10 relative z-10"
          >
            <div className="w-16 h-16 bg-emerald-primary/10 rounded-full flex items-center justify-center text-emerald-primary mb-4 border border-emerald-primary/20 shadow-inner">
              <Check className="w-10 h-10 stroke-[2.5]" />
            </div>

            <h3 className="font-serif text-2xl font-bold text-emerald-primary mb-2">
              Terima Kasih!
            </h3>

            <p className="text-sm text-emerald-charcoal font-medium leading-relaxed max-w-xs">
              Konfirmasi kehadiran dan ucapan doa restu Anda telah tersimpan
              dengan aman di buku tamu kami.
            </p>
            <p className="font-serif text-base italic text-emerald-accent-dark mt-4 font-bold leading-relaxed px-4">
              Sampai jumpa di hari bahagia kami, <br />
              kami sangat menantikan kehadiran Anda!
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
