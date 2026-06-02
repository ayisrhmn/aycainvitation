"use client";

import { useState, useCallback, useEffect } from "react";
import CreamySageTheme from "@/themes/creamy-sage";
import { WeddingConfig, RsvpWish } from "@/types";
import { getClientMusic } from "@/lib/clients";

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

  switch (theme) {
    case "creamy-sage":
    default:
      return (
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
  }
}
