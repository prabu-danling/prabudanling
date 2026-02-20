"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Globe, BookOpen, Feather, ArrowRight, 
  Check, Star, Heart
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { languages } from "@/lib/store/language-store";

// Language progress data
const languageProgress = [
  { code: "id", name: "Bahasa Indonesia", flag: "🇮🇩", progress: 100, level: "Native", status: "Akar Kekuatan" },
  { code: "en", name: "English", flag: "🇬🇧", progress: 95, level: "Advanced", status: "Jembatan ke Dunia" },
  { code: "su", name: "Basa Sunda", flag: "☀️", progress: 90, level: "Native", status: "Warisan Budaya" },
  { code: "ar", name: "العربية", flag: "🇸🇦", progress: 40, level: "Intermediate", status: "Pintu Keempat" },
  { code: "ru", name: "Русский", flag: "🇷🇺", progress: 30, level: "Beginner", status: "Pintu Kelima" },
  { code: "de", name: "Deutsch", flag: "🇩🇪", progress: 25, level: "Beginner", status: "Pintu Keenam" },
  { code: "zh", name: "中文", flag: "🇨🇳", progress: 20, level: "Beginner", status: "Pintu Ketujuh" },
  { code: "fr", name: "Français", flag: "🇫🇷", progress: 15, level: "Beginner", status: "Pintu Kedelapan" },
  { code: "it", name: "Italiano", flag: "🇮🇹", progress: 10, level: "Beginner", status: "Pintu Kesembilan" },
  { code: "hi", name: "हिन्दी", flag: "🇮🇳", progress: 10, level: "Beginner", status: "Pintu Kesepuluh" },
];

// Animated language card
function LanguageCard({ lang, index }: { lang: typeof languageProgress[0]; index: number }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), index * 100);
    return () => clearTimeout(timer);
  }, [index]);

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return "bg-dream-gold";
    if (progress >= 50) return "bg-dream-green";
    if (progress >= 30) return "bg-dream-blue";
    return "bg-dream-purple";
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -30 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
    >
      <Card className="bg-card/30 border-border/30 hover:border-dream-gold/30 transition-all duration-300 overflow-hidden group">
        <CardContent className="p-0">
          <div className="flex items-center p-4 gap-4">
            {/* Flag */}
            <motion.div
              whileHover={{ scale: 1.2, rotate: 5 }}
              className="text-4xl"
            >
              {lang.flag}
            </motion.div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-medium truncate">{lang.name}</h3>
                {lang.progress >= 80 && (
                  <Star className="w-4 h-4 text-dream-gold fill-dream-gold" />
                )}
              </div>
              <p className="text-xs text-muted-foreground mb-2">{lang.status}</p>
              
              {/* Progress bar */}
              <div className="relative h-2 bg-muted rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: isVisible ? `${lang.progress}%` : 0 }}
                  transition={{ duration: 1, delay: index * 0.05 + 0.3 }}
                  className={cn("absolute inset-y-0 left-0 rounded-full", getProgressColor(lang.progress))}
                />
              </div>
            </div>

            {/* Level */}
            <div className="text-right">
              <span className={cn(
                "text-xs px-2 py-1 rounded-full",
                lang.progress >= 80 ? "bg-dream-gold/10 text-dream-gold" :
                lang.progress >= 50 ? "bg-dream-green/10 text-dream-green" :
                "bg-muted text-muted-foreground"
              )}>
                {lang.level}
              </span>
              <p className="text-lg font-bold mt-1">{lang.progress}%</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// Globe animation
function AnimatedGlobe() {
  const flags = languages.slice(0, 20).map(l => l.flag);

  return (
    <div className="relative w-64 h-64 mx-auto">
      {/* Center */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0"
      >
        <div className="absolute inset-4 rounded-full border-2 border-dream-gold/20" />
        <div className="absolute inset-8 rounded-full border border-dream-blue/20" />
        <div className="absolute inset-12 rounded-full border border-dream-purple/20" />
      </motion.div>

      {/* Orbiting flags */}
      {flags.slice(0, 8).map((flag, i) => {
        const angle = (i / 8) * 360;
        const radius = 100;
        return (
          <motion.div
            key={i}
            className="absolute text-2xl"
            animate={{
              x: [0, Math.cos((angle * Math.PI) / 180) * radius],
              y: [0, Math.sin((angle * Math.PI) / 180) * radius],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: "reverse",
              delay: i * 0.5,
            }}
            style={{
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            {flag}
          </motion.div>
        );
      })}

      {/* Center icon */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-16 h-16 rounded-full bg-dream-gold/10 flex items-center justify-center"
        >
          <Globe className="w-8 h-8 text-dream-gold" />
        </motion.div>
      </div>
    </div>
  );
}

// Main Polyglot Page
export default function PolyglotPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center relative px-4 py-20">
        {/* Background */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              background: [
                "radial-gradient(circle at 20% 20%, rgba(212, 165, 116, 0.1) 0%, transparent 50%)",
                "radial-gradient(circle at 80% 80%, rgba(167, 139, 250, 0.1) 0%, transparent 50%)",
                "radial-gradient(circle at 20% 20%, rgba(212, 165, 116, 0.1) 0%, transparent 50%)",
              ],
            }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute inset-0"
          />
        </div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 max-w-4xl mx-auto text-center"
        >
          {/* Globe Animation */}
          <AnimatedGlobe />

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="font-serif-display text-4xl md:text-6xl mt-12 mb-6"
          >
            <span className="text-dream-gold">Perjalanan</span>
            <br />
            <span className="text-foreground">Sepuluh Bahasa</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xl text-muted-foreground mb-4"
          >
            Novel Inspiratif: Konsultan Polyglot Indonesia
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-muted-foreground italic mb-8"
          >
            Karya: Prabu Danling / Santri Angon (Muhammad Lutfi Azmi)
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="grid grid-cols-3 gap-4 max-w-md mx-auto mb-12"
          >
            <div className="bg-card/30 backdrop-blur-sm rounded-xl p-4 border border-border/30">
              <p className="text-3xl font-bold text-dream-gold">10</p>
              <p className="text-xs text-muted-foreground">Bahasa</p>
            </div>
            <div className="bg-card/30 backdrop-blur-sm rounded-xl p-4 border border-border/30">
              <p className="text-3xl font-bold text-dream-green">3</p>
              <p className="text-xs text-muted-foreground">Mastered</p>
            </div>
            <div className="bg-card/30 backdrop-blur-sm rounded-xl p-4 border border-border/30">
              <p className="text-3xl font-bold text-dream-blue">7</p>
              <p className="text-xs text-muted-foreground">Learning</p>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            <Button
              asChild
              className="bg-dream-gold/90 hover:bg-dream-gold text-background"
            >
              <a href="#journey">
                Mulai Perjalanan
                <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* Journey Section */}
      <section id="journey" className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <BookOpen className="w-12 h-12 text-dream-gold mx-auto mb-4" />
            <h2 className="font-serif-display text-3xl mb-4">
              BAGIAN I: FONDASI TANAH AIR
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Dari tanah kelahiran, tiga bahasa membentuk identitas: Indonesia, Inggris, dan Sunda. 
              Tiga bahasa, satu fondasi kuat untuk menaklukkan dunia.
            </p>
          </motion.div>

          {/* Language Progress */}
          <div className="space-y-4">
            {languageProgress.map((lang, index) => (
              <LanguageCard key={lang.code} lang={lang} index={index} />
            ))}
          </div>

          {/* Vision Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20 text-center"
          >
            <div className="bg-gradient-to-r from-dream-gold/5 via-dream-purple/5 to-dream-blue/5 rounded-3xl p-8 border border-border/30">
              <Feather className="w-16 h-16 text-dream-gold mx-auto mb-6" />
              <h3 className="font-serif-display text-2xl mb-4">
                Kapitalis Polyglot Indonesia
              </h3>
              <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
                Aku tidak sekadar belajar bahasa. Aku sedang membangun sesuatu yang belum pernah 
                ada sebelumnya di negeriku: seorang konsultan polyglot yang menguasai 10 bahasa 
                dengan kedalaman, bukan hanya dari sisi linguistik, tetapi juga budaya, bisnis, dan filosofi.
              </p>
              <div className="flex items-center justify-center gap-2 text-dream-gold">
                <Heart className="w-4 h-4" />
                <span className="text-sm italic">Padjajaran, 06 Januari 2026 - 17 Rajab 1447 Hijriah</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-border/30">
        <div className="max-w-4xl mx-auto text-center">
          <Button
            asChild
            variant="outline"
          >
            <a href="/">Kembali ke Portal Kesadaran</a>
          </Button>
        </div>
      </footer>
    </main>
  );
}
