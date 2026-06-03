"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Loader2, Sparkles } from "lucide-react";

interface ThemeColor {
  name: string;
  hex: string;
}

interface DemoTheme {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  colors: ThemeColor[];
  is_coming_soon: boolean;
}

interface ThemeCatalogProps {
  selectedTheme: string;
  setSelectedTheme: (theme: string) => void;
}

export default function ThemeCatalog({
  selectedTheme,
  setSelectedTheme,
}: ThemeCatalogProps) {
  const [themes, setThemes] = useState<DemoTheme[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string>("");

  useEffect(() => {
    async function fetchThemes() {
      try {
        const res = await fetch("/api/demo-themes");
        if (!res.ok) {
          throw new Error("Gagal mengambil data katalog tema");
        }
        const result = await res.json();
        if (result.status === "success" && Array.isArray(result.data)) {
          setThemes(result.data);
        } else {
          throw new Error(result.message || "Gagal mengambil katalog tema");
        }
      } catch (err) {
        console.error("Error fetching demo themes:", err);
        setErrorMsg("Gagal memuat katalog desain. Silakan segarkan halaman.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchThemes();
  }, []);

  return (
    <section className="py-20 px-6 max-w-6xl mx-auto relative z-10">
      <div className="text-center mb-14">
        <span className="text-[10px] uppercase tracking-[0.3em] text-sakura-charcoal-muted font-bold block mb-1">
          Katalog Desain
        </span>
        <h2 className="font-serif text-3xl font-light text-sakura-primary tracking-wide">
          PILIHAN TEMA ESTETIK
        </h2>
        <p className="text-xs text-sakura-charcoal-muted mt-2 max-w-md mx-auto">
          Setiap tema dirancang secara eksklusif dengan transisi animasi halus
          dan tata letak yang ramah seluler.
        </p>
      </div>

      {isLoading ? (
        /* Premium Skeleton Loading State */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto justify-center">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="bg-white rounded-3xl border border-sage-light/20 overflow-hidden shadow-xs flex flex-col h-[400px] animate-pulse"
            >
              <div className="h-56 bg-cream-dark/20 flex flex-col items-center justify-center p-6 relative overflow-hidden" />
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div className="flex flex-col gap-2.5">
                  <div className="h-5 bg-charcoal/10 rounded-md w-1/3" />
                  <div className="h-3 bg-charcoal/10 rounded-md w-full mt-2" />
                  <div className="h-3 bg-charcoal/10 rounded-md w-5/6" />
                  <div className="h-3 bg-charcoal/10 rounded-md w-4/5" />
                </div>
                <div className="flex gap-3 mt-6">
                  <div className="flex-1 h-9 bg-charcoal/5 rounded-xl" />
                  <div className="flex-1 h-9 bg-charcoal/5 rounded-xl" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : errorMsg ? (
        /* Error Alert State */
        <div className="max-w-md mx-auto bg-red-50 border border-red-200 rounded-2xl p-6 text-center shadow-xs">
          <p className="text-sm text-red-800 font-medium mb-3">{errorMsg}</p>
          <button
            onClick={() => {
              setIsLoading(true);
              setErrorMsg("");
              window.location.reload();
            }}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold uppercase transition-all tracking-wider cursor-pointer"
          >
            Segarkan Halaman
          </button>
        </div>
      ) : (
        /* Dynamic Loaded Theme Catalog */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto justify-center">
          {themes.map((theme) => {
            if (theme.is_coming_soon) {
              return (
                <div
                  key={theme.slug}
                  className="bg-[#FCFAF7]/80 rounded-3xl border border-dashed border-[#C39B78]/40 overflow-hidden flex flex-col opacity-80 relative"
                >
                  {/* Coming Soon Preview Placeholder */}
                  <div className="h-56 bg-[#F5EBE0]/60 flex flex-col items-center justify-center p-6 text-center border-b border-[#C39B78]/25 relative">
                    <div className="absolute inset-0 bg-[radial-gradient(#FCFAF7_30%,#F5EBE0_100%)] opacity-80" />
                    <div className="relative z-10">
                      <span className="text-[10px] uppercase tracking-widest text-[#A57E58] block font-bold mb-1">
                        {theme.tagline}
                      </span>
                      <div className="font-serif text-2xl text-[#5C4033]">
                        {theme.name} Theme
                      </div>
                      <span className="mt-2 text-[9px] px-2 py-0.5 bg-[#A57E58]/10 text-[#A57E58] rounded-full font-bold uppercase inline-block">
                        Coming Soon
                      </span>
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-serif text-lg font-bold text-[#5C4033]">
                        {theme.name}
                      </h4>
                      <p className="text-xs text-[#7C6053] mt-2 leading-relaxed">
                        {theme.description}
                      </p>
                    </div>
                    <button
                      disabled
                      className="mt-6 w-full py-2.5 px-4 bg-[#8C7A6B]/5 text-[#8C7A6B]/50 rounded-xl text-xs font-semibold tracking-wider uppercase cursor-not-allowed"
                    >
                      Dalam Pengembangan
                    </button>
                  </div>
                </div>
              );
            }

            const isEmerald = theme.slug === 'emerald-elegance';
            const styles = isEmerald
              ? {
                  cardBorder: selectedTheme === theme.slug ? "border-emerald-primary ring-1 ring-emerald-primary" : "border-emerald-accent-light/30",
                  titleText: "text-emerald-primary",
                  buttonOutline: "border-emerald-accent hover:bg-emerald-accent-light/10 text-emerald-accent-dark",
                  buttonFill: selectedTheme === theme.slug ? "bg-emerald-primary text-white shadow-md shadow-emerald-primary/20" : "bg-charcoal/5 text-charcoal hover:bg-charcoal/10"
                }
              : {
                  cardBorder: selectedTheme === theme.slug ? "border-sage ring-1 ring-sage" : "border-sage-light/30",
                  titleText: "text-sage-dark",
                  buttonOutline: "border-rose-gold-light hover:bg-rose-gold-light/10 text-rose-gold-dark",
                  buttonFill: selectedTheme === theme.slug ? "bg-sage text-white shadow-md shadow-sage/20" : "bg-charcoal/5 text-charcoal hover:bg-charcoal/10"
                };

            // Active/Previewable theme card
            return (
              <motion.div
                key={theme.slug}
                whileHover={{ y: -5 }}
                className={`bg-white rounded-3xl border overflow-hidden shadow-md flex flex-col transition-all duration-300 ${styles.cardBorder}`}
              >
                {/* Visual Preview Placeholder */}
                <div className="h-56 bg-cream-dark/50 flex flex-col items-center justify-center p-6 relative overflow-hidden text-center border-b border-rose-gold-light/20">
                  <div className="absolute inset-0 bg-[radial-gradient(#FAF9F5_30%,#F3F0E6_100%)] opacity-80" />
                  <div className="relative z-10">
                    <span className="text-[9px] uppercase tracking-widest text-charcoal-muted block mb-1">
                      {theme.tagline}
                    </span>
                    <h3 className={`font-serif text-2xl ${styles.titleText}`}>
                      {theme.name} Theme
                    </h3>
                    <div className="flex gap-2 justify-center mt-3">
                      {(theme.colors || []).map((color, idx) => (
                        <span
                          key={idx}
                          className="w-4 h-4 rounded-full border border-charcoal/5"
                          style={{ backgroundColor: color.hex }}
                          title={color.name}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-serif text-lg font-bold text-charcoal">
                      {theme.name}
                    </h4>
                    <p className="text-xs text-charcoal-muted mt-2 leading-relaxed">
                      {theme.description}
                    </p>
                  </div>
                  <div className="flex gap-3 mt-6">
                    <a
                      href={`/${theme.slug}?to=Nama+Tamu`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 px-4 border rounded-xl text-xs font-semibold tracking-wider uppercase transition-all ${styles.buttonOutline}`}
                    >
                      <span>Preview Tema</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <button
                      onClick={() => {
                        setSelectedTheme(theme.slug);
                        document
                          .getElementById("order-form")
                          ?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold tracking-wider uppercase transition-all cursor-pointer ${styles.buttonFill}`}
                    >
                      {selectedTheme === theme.slug ? "Terpilih" : "Pilih Tema"}
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </section>
  );
}
