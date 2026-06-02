"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function SakuraPetals() {
  const [isMounted, setIsMounted] = useState(false);
  const [petals, setPetals] = useState<
    Array<{
      id: number;
      startX: number;
      delay: number;
      duration: number;
      size: number;
    }>
  >([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMounted(true);
      setPetals(
        Array.from({ length: 20 }).map((_, i) => ({
          id: i,
          startX: Math.random() * 100,
          delay: Math.random() * 12,
          duration: 15 + Math.random() * 20,
          size: 8 + Math.random() * 12,
        }))
      );
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          initial={{
            opacity: 0,
            x: `${petal.startX}vw`,
            y: "-5%",
            rotate: 0,
          }}
          animate={{
            opacity: [0, 0.6, 0.6, 0],
            y: "105%",
            x: [
              `${petal.startX}vw`,
              `${petal.startX - 8}vw`,
              `${petal.startX + 4}vw`,
            ],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: petal.duration,
            repeat: Infinity,
            delay: petal.delay,
            ease: "linear",
          }}
          className="absolute bg-sakura-accent/40 shadow-xs"
          style={{
            width: petal.size,
            height: petal.size * 1.4,
            borderRadius: "50% 0% 50% 50%",
            transformOrigin: "center",
          }}
        />
      ))}
    </div>
  );
}
