"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const quotes = [
  {
    text: "Aku menggembala hawa nafsu, bukan ditundukkan olehnya.",
    source: "Catatan Kegelapan",
    author: "Santri Angon",
  },
  {
    text: "Setiap mimpi adalah surat dari alam bawah sadar yang belum terbaca.",
    source: "Dream Log I",
    author: "Santri Angon",
  },
  {
    text: "Menulis adalah cara jiwa berbicara ketika mulut terlalu lelah untuk berkata.",
    source: "Refleksi",
    author: "Santri Angon",
  },
  {
    text: "Prak burukeun — segerakan kesadaran. Ulah edan, kudu eling — jangan gila, tetap waspada.",
    source: "Mimpi Pertama",
    author: "Prabu Danling",
  },
  {
    text: "Perjalanan sejati bukan tentang memindahkan tubuh, tapi memindahkan kesadaran.",
    source: "Pertemuan di Perempatan Waktu",
    author: "Santri Angon",
  },
  {
    text: "Dalam sunyi, aku menemukan bahwa cahaya sejati tidak datang dari luar, tapi menyala dari dalam.",
    source: "Dialog dengan Kegelapan",
    author: "Santri Angon",
  },
];

export function QuoteCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-advance
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % quotes.length);
    }, 8000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const goToPrevious = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + quotes.length) % quotes.length);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % quotes.length);
      }, 8000);
    }
  };

  const goToNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % quotes.length);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % quotes.length);
      }, 8000);
    }
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -50 : 50,
      opacity: 0,
    }),
  };

  return (
    <div className="relative max-w-3xl mx-auto">
      {/* Card with solid background for guaranteed text contrast */}
      <div className="relative bg-card rounded-3xl border border-border/50 px-8 py-12 shadow-lg shadow-dream-gold/5">
        {/* Header */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <Sparkles className="w-4 h-4 text-dream-gold" />
          <span className="text-sm text-dream-gold tracking-widest uppercase">
            Kutipan Hari Ini
          </span>
          <Sparkles className="w-4 h-4 text-dream-gold" />
        </div>

        {/* Quote container */}
        <div className="relative h-48 flex items-center justify-center overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="absolute text-center"
            >
              <Quote className="w-8 h-8 text-dream-gold/40 mx-auto mb-4" />
              <p className="font-serif-display text-xl sm:text-2xl italic mb-4 text-foreground leading-relaxed">
                &ldquo;{quotes[currentIndex].text}&rdquo;
              </p>
              <p className="text-sm text-muted-foreground">
                — {quotes[currentIndex].author}, <span className="italic">{quotes[currentIndex].source}</span>
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-4 mt-6">
          <button
            onClick={goToPrevious}
            className="w-10 h-10 rounded-full border border-border/50 flex items-center justify-center hover:border-dream-gold/50 hover:bg-dream-gold/5 transition-colors"
            aria-label="Previous quote"
          >
            <ChevronLeft className="w-5 h-5 text-muted-foreground" />
          </button>

          {/* Dots */}
          <div className="flex items-center gap-2">
            {quotes.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300",
                  index === currentIndex
                    ? "w-6 bg-dream-gold"
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                )}
                aria-label={`Go to quote ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={goToNext}
            className="w-10 h-10 rounded-full border border-border/50 flex items-center justify-center hover:border-dream-gold/50 hover:bg-dream-gold/5 transition-colors"
            aria-label="Next quote"
          >
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>
      </div>
    </div>
  );
}
