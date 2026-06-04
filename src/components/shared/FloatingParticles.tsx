"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface FloatingParticlesProps {
  /** Array of rgba/hex strings for the falling petals. The colors will be distributed evenly. */
  colors?: string[];
  /** Amount of particles to render. Defaults to 30. */
  count?: number;
}

export default function FloatingParticles({ 
  colors = ["rgba(255, 255, 255, 0.5)"],
  count = 30 
}: FloatingParticlesProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  const particles = Array.from({ length: count });

  return (
    <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-md h-screen overflow-hidden pointer-events-none z-40">
      {particles.map((_, i) => {
        const color = colors[i % colors.length];

        const size = Math.random() * 6 + 4;
        const left = Math.random() * 100;
        const duration = Math.random() * 10 + 10;
        const delay = Math.random() * -20;
        const swingX = Math.random() * 40 - 20;

        return (
          <motion.div
            key={i}
            initial={{ y: -50, x: 0, opacity: 0, rotate: Math.random() * 360 }}
            animate={{
              y: "110vh",
              x: [0, swingX, -swingX, swingX, 0],
              opacity: [0, 0.8, 1, 0.8, 0],
              rotate: Math.random() * 720 + 360,
            }}
            transition={{
              duration: duration,
              repeat: Infinity,
              delay: delay,
              ease: "linear",
            }}
            className="absolute top-0"
            style={{
              left: `${left}%`,
              width: size,
              height: size * 1.2,
              backgroundColor: color,
              borderRadius: "50% 0 50% 50%",
              boxShadow: "inset 2px 2px 4px rgba(255,255,255,0.3)",
            }}
          />
        );
      })}
    </div>
  );
}
