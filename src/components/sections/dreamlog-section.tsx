"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Moon, Star, Cloud, Sun, Sparkles, Eye, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Dream log data
const dreamLogs = [
  {
    id: "d1",
    date: "2024-03-20",
    title: "Pertemuan dengan Bayangan",
    content: "Malam ini aku bermimpi bertemu dengan bayanganku sendiri. Ia berdiri di tepi sungai yang airnya hitam seperti tinta. 'Aku adalah kamu yang kauabaikan,' katanya. 'Aku adalah rindu yang kaukubur.' Aku terbangun dengan wajah basah — bukan air mata, tapi embun yang turun dari langit-langit kamar.",
    symbols: ["sungai", "bayangan", "tinta"],
    lucidity: "high",
    mood: "melancholic",
  },
  {
    id: "d2", 
    date: "2024-03-15",
    title: "Kota Tanpa Warna",
    content: "Aku berjalan di kota yang semua warnanya telah diambil. Bangunan, mobil, pohon, bahkan langit — semuanya abu-abu. Satu-satunya warna adalah kunang-kunang yang melayang di udara, membentuk kalimat: 'Carilah yang hilang.' Aku terbangun dengan pertanyaan: apa yang telah aku hilangkan?",
    symbols: ["kota", "warna", "kunang-kunang"],
    lucidity: "medium",
    mood: "contemplative",
  },
  {
    id: "d3",
    date: "2024-03-08",
    title: "Surat dari Masa Depan",
    content: "Dalam mimpi, aku menerima surat yang ditulis dengan tanganku sendiri, tapi tulisannya lebih tua, lebih goyah. Isinya: 'Jangan takut. Semua yang kaukhawatirkan tidak akan terjadi. Dan yang terjadi, tidak seburuk yang kaukira.' Surat itu berbau kertas tua dan hujan.",
    symbols: ["surat", "waktu", "tangan"],
    lucidity: "high",
    mood: "peaceful",
  },
  {
    id: "d4",
    date: "2024-02-28",
    title: "Perpustakaan Malam",
    content: "Aku berada di perpustakaan raksasa yang tak berujung. Setiap buku adalah mimpi seseorang. Aku mencari buku dengan namaku, dan menemukannya di rak paling atas. Tapi halamannya kosong — aku belum menulisnya. Atau mungkin, aku sedang menulisnya sekarang.",
    symbols: ["perpustakaan", "buku", "tangga"],
    lucidity: "medium",
    mood: "curious",
  },
  {
    id: "d5",
    date: "2024-02-14",
    title: "Taman di Atas Awan",
    content: "Di balik kabut, aku menemukan taman yang mengambang di atas awan. Bunga-bunganya terbuat dari cahaya, dan setiap kali kupetik, ia berubah menjadi musik. Seseorang berbisik: 'Ini adalah taman kenangan yang kau rawat dengan baik.' Aku terbangun dengan harum yang tak bisa kusebut namanya.",
    symbols: ["taman", "awan", "bunga", "musik"],
    lucidity: "low",
    mood: "serene",
  },
  {
    id: "d6",
    date: "2024-02-01",
    title: "Cermin yang Tak Memantulkan",
    content: "Aku berdiri di depan cermin raksasa, tapi pantulanku tidak ada. Yang ada adalah wajah-wajah orang asing yang bergantian muncul, satu per satu. Setiap wajah menatapku dengan mata penuh makna, lalu menghilang. Wajah terakhir yang muncul adalah wajahku sendiri, tapi tersenyum — senyum yang belum pernah kulihat di kaca biasa.",
    symbols: ["cermin", "wajah", "identitas"],
    lucidity: "high",
    mood: "profound",
  },
];

const lucidityLevels = {
  high: { label: "Jelas", color: "text-dream-gold", icon: Sun },
  medium: { label: "Separuh", color: "text-dream-blue", icon: Cloud },
  low: { label: "Kabur", color: "text-muted-foreground", icon: Moon },
};

const moodIcons: Record<string, typeof Star> = {
  melancholic: Cloud,
  contemplative: Eye,
  peaceful: Sparkles,
  curious: Star,
  serene: Moon,
  profound: Sun,
};

// Timeline item component
function TimelineItem({ 
  log, 
  index, 
  isLast 
}: { 
  log: typeof dreamLogs[0]; 
  index: number;
  isLast: boolean;
}) {
  const LucidityIcon = lucidityLevels[log.lucidity as keyof typeof lucidityLevels].icon;
  const MoodIcon = moodIcons[log.mood] || Star;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative"
    >
      {/* Timeline line */}
      {!isLast && (
        <div className="absolute left-[19px] top-10 w-px h-full bg-gradient-to-b from-dream-gold/30 via-dream-gold/10 to-transparent" />
      )}

      {/* Content card */}
      <Card className={cn(
        "ml-10 bg-card/50 border-border/50",
        "hover:border-dream-gold/30 hover:shadow-lg hover:shadow-dream-gold/5",
        "transition-all duration-500"
      )}>
        <CardContent className="p-4 sm:p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-3 sm:mb-4">
            <div className="flex-1">
              <h3 className="font-serif-display text-base sm:text-lg mb-1">
                {log.title}
              </h3>
              <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-muted-foreground">
                <Calendar className="w-3 h-3" />
                <span className="truncate">
                  {new Date(log.date).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                  })}
                </span>
              </div>
            </div>
            {/* Timeline dot */}
            <div className="absolute left-0 top-0">
              <motion.div
                whileHover={{ scale: 1.2 }}
                className="w-10 h-10 rounded-full bg-card border-2 border-dream-gold/50 flex items-center justify-center -translate-x-[19px]"
              >
                <Moon className="w-4 h-4 text-dream-gold" />
              </motion.div>
            </div>
            <div className="flex items-center gap-1 ml-2">
              <LucidityIcon className={cn(
                "w-3.5 h-3.5 sm:w-4 sm:h-4",
                lucidityLevels[log.lucidity as keyof typeof lucidityLevels].color
              )} />
              <span className={cn(
                "text-[10px] sm:text-xs",
                lucidityLevels[log.lucidity as keyof typeof lucidityLevels].color
              )}>
                {lucidityLevels[log.lucidity as keyof typeof lucidityLevels].label}
              </span>
            </div>
          </div>

          {/* Content */}
          <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4 line-clamp-3 sm:line-clamp-none">
            {log.content}
          </p>

          {/* Symbols */}
          <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
            {log.symbols.map((symbol) => (
              <span
                key={symbol}
                className="px-2 py-0.5 sm:py-1 text-[10px] sm:text-xs rounded-full bg-muted/50 text-muted-foreground"
              >
                #{symbol}
              </span>
            ))}
            <MoodIcon className="w-3 h-3 ml-auto text-dream-blue/70" />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function DreamLogSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showAll, setShowAll] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["2%", "-2%"]);
  
  const displayedLogs = showAll ? dreamLogs : dreamLogs.slice(0, 3);

  return (
    <section
      ref={containerRef}
      id="dreamlog"
      className="relative py-16 sm:py-24 lg:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-card/50 via-background to-card/50" />
      
      {/* Decorative elements - Hidden on mobile for performance */}
      <motion.div
        style={{ y }}
        className="hidden sm:block absolute top-20 left-10 w-32 h-32 bg-dream-blue/5 rounded-full blur-3xl"
      />
      <motion.div
        style={{ y }}
        className="hidden sm:block absolute bottom-20 right-10 w-40 h-40 bg-dream-purple/5 rounded-full blur-3xl"
      />

      <div className="relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-10 sm:mb-16"
          >
            <div className="inline-flex items-center gap-2 mb-3 sm:mb-4">
              <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-dream-blue" />
              <span className="text-xs sm:text-sm text-dream-blue tracking-widest uppercase">
                Jurnal Malam
              </span>
            </div>
            <h2 className="font-serif-display text-fluid-2xl mb-4 sm:mb-6">
              Dream Log
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base px-2">
              Catatan mimpi sebagai karya sastra. Setiap malam adalah surat dari alam bawah sadar.
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="max-w-3xl mx-auto">
            <div className="space-y-6 sm:space-y-8">
              {displayedLogs.map((log, index) => (
                <TimelineItem
                  key={log.id}
                  log={log}
                  index={index}
                  isLast={index === displayedLogs.length - 1 && !showAll}
                />
              ))}
            </div>

            {/* Show more button */}
            {!showAll && dreamLogs.length > 3 && (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-center mt-8 sm:mt-12"
              >
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowAll(true)}
                  className="rounded-full border-dream-blue/30 hover:border-dream-blue hover:bg-dream-blue/10 text-sm"
                >
                  <Moon className="w-4 h-4 mr-2" />
                  <span>Buka Mimpi Lainnya</span>
                </Button>
              </motion.div>
            )}
          </div>

          {/* Dream statistics */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-12 sm:mt-20"
          >
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-2xl mx-auto">
              {[
                { value: "156", label: "Mimpi Tercatat" },
                { value: "42", label: "Mimpi Jelas" },
                { value: "89", label: "Simbol Unik" },
                { value: "3", label: "Tahun Bercerita" },
              ].map((stat, index) => (
                <div
                  key={stat.label}
                  className="text-center p-3 sm:p-4 rounded-xl bg-card/30 border border-border/30"
                >
                  <div className="font-serif-display text-xl sm:text-2xl text-dream-gold mb-0.5 sm:mb-1">
                    {stat.value}
                  </div>
                  <div className="text-[10px] sm:text-xs text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
