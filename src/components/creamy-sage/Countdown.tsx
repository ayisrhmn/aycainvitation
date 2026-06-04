"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountdownProps {
  targetDate: string; // Format: "YYYY-MM-DDTHH:mm:ss"
}

export default function Countdown({ targetDate }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date();
      let newTimeLeft: TimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

      if (difference > 0) {
        newTimeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }
      return newTimeLeft;
    };

    const timerId = setTimeout(() => {
      setIsMounted(true);
      setTimeLeft(calculateTimeLeft());
    }, 0);

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => {
      clearTimeout(timerId);
      clearInterval(timer);
    };
  }, [targetDate]);

  if (!isMounted) {
    return (
      <div className="flex justify-center gap-4 py-8">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="flex flex-col items-center justify-center w-20 h-20 sm:w-24 sm:h-24 bg-white/50 backdrop-blur border border-rose-gold-light/20 rounded-xl"
          >
            <span className="text-3xl sm:text-4xl font-serif text-rose-gold-dark">
              00
            </span>
            <span className="text-[11px] sm:text-xs uppercase tracking-wider text-charcoal-muted mt-1">
              ...
            </span>
          </div>
        ))}
      </div>
    );
  }

  const items = [
    { label: "Hari", value: timeLeft.days },
    { label: "Jam", value: timeLeft.hours },
    { label: "Menit", value: timeLeft.minutes },
    { label: "Detik", value: timeLeft.seconds },
  ];

  return (
    <div className="flex justify-center gap-3 sm:gap-4 py-6">
      {items.map((item, index) => (
        <motion.div
          key={item.label}
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1, duration: 0.6 }}
          className="flex flex-col items-center justify-center w-20 h-20 sm:w-24 sm:h-24 bg-white/70 backdrop-blur border border-rose-gold-light/30 rounded-2xl shadow-sm shadow-rose-gold-light/5"
        >
          <span className="text-3xl sm:text-4xl font-serif text-rose-gold-dark font-medium leading-none">
            {String(item.value).padStart(2, "0")}
          </span>
          <span className="text-[11px] sm:text-xs uppercase tracking-widest text-charcoal-muted mt-1.5 font-medium">
            {item.label}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
