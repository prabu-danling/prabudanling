"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { 
  Quote, Feather, Moon, Sun, Heart, 
  Building2, GraduationCap, PenTool, Sparkles,
  Wheat, Truck, Zap, Cpu, FlaskConical, BookOpen
} from "lucide-react";
import { cn } from "@/lib/utils";

// 4 Identities - Complete Personal Branding
const identityCards = [
  {
    icon: Building2,
    title: "Gugun Gunara",
    subtitle: "Nama Duniawi • Negara & Sistem",
    description: "Arsitek kenegaraan, konsultan korporasi, dan perancang governance. CMC, MBA, CFA, PMP, Six Sigma Black Belt. Beroperasi di ranah hukum, bisnis, legal, dan sistem kelembagaan.",
    color: "dream-green",
    domain: "Duniawi",
  },
  {
    icon: GraduationCap,
    title: "Muhammad Lutfi Azmi",
    subtitle: "Nama Ilahi • Ruhani & Akademik",
    description: "Profesor peradaban digital, penulis jurnal internasional, filsuf dan ulama futuristik. Menghadap ilahi dengan riset ilmiah, metodologi PhD, dan kebenaran abadi.",
    color: "dream-purple",
    domain: "Ruhani",
  },
  {
    icon: PenTool,
    title: "Prabu Danling",
    subtitle: "Nama Eksekusi • Strategi & Kepemimpinan",
    description: "Penulis 500 buku, orator kepemimpinan, eksekutor visi bangsa. Prak burukeun — segerakan kesadaran. Ulah edan, kudu eling — jangan gila, tetap waspada.",
    color: "dream-blue",
    domain: "Eksekusi",
  },
  {
    icon: Sparkles,
    title: "Santri Angon",
    subtitle: "Nama Refleksi • Spiritual & Inspiratif",
    description: "Penyair jiwa, mentor mereka yang terluka, penjaga nilai Ilahi dalam sistem. Santri: pelajar sejati. Angon: menggembala hawa nafsu — menjaga kesadaran tetap terjaga.",
    color: "dream-gold",
    domain: "Refleksi",
  },
];

// 7 Polymath Disciplines
const polymathDisciplines = [
  { icon: Building2, label: "Manajemen Strategis & Governance", color: "text-dream-gold" },
  { icon: Wheat, label: "Ketahanan Pangan & Agribisnis", color: "text-dream-green" },
  { icon: Truck, label: "Logistik & Supply Chain Sovereignty", color: "text-dream-blue" },
  { icon: Zap, label: "Energi & Keberlanjutan", color: "text-dream-purple" },
  { icon: Cpu, label: "Teknologi & Kecerdasan Buatan", color: "text-dream-blue" },
  { icon: FlaskConical, label: "Industri Kimia & Bioteknologi", color: "text-dream-green" },
  { icon: BookOpen, label: "Penulisan, Komunikasi & Publishing", color: "text-dream-gold" },
];

// Mission targets
const missionTargets = [
  { value: "1", suffix: " Miliar", label: "Jiwa Terdampak" },
  { value: "500", suffix: "", label: "Buku" },
  { value: "100", suffix: "", label: "Jurnal Internasional" },
];

const quotes = [
  {
    text: "Aku menggembala hawa nafsu, bukan ditundukkan olehnya.",
    source: "Catatan Kegelapan",
  },
  {
    text: "Setiap mimpi adalah surat dari alam bawah sadar yang belum terbaca.",
    source: "Dream Log I",
  },
  {
    text: "Menulis adalah cara jiwa berbicara ketika mulut terlalu lelah untuk berkata.",
    source: "Refleksi",
  },
];

function IdentityCard({ 
  item, 
  index 
}: { 
  item: typeof identityCards[0]; 
  index: number;
}) {
  const Icon = item.icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="group relative"
    >
      <div className={cn(
        "relative p-6 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm",
        "transition-all duration-500",
        "hover:border-dream-gold/30 hover:bg-card/80",
        "hover:shadow-lg hover:shadow-dream-gold/5"
      )}>
        {/* Domain badge */}
        <div className={cn(
          "absolute top-4 right-4 px-2 py-0.5 rounded-full text-[10px] font-medium tracking-wider uppercase",
          item.color === "dream-gold" && "bg-dream-gold/10 text-dream-gold",
          item.color === "dream-blue" && "bg-dream-blue/10 text-dream-blue",
          item.color === "dream-green" && "bg-dream-green/10 text-dream-green",
          item.color === "dream-purple" && "bg-dream-purple/10 text-dream-purple",
        )}>
          {item.domain}
        </div>

        {/* Icon */}
        <div className={cn(
          "w-12 h-12 rounded-xl flex items-center justify-center mb-4",
          "bg-gradient-to-br from-dream-gold/10 to-dream-blue/10",
          "group-hover:from-dream-gold/20 group-hover:to-dream-blue/20",
          "transition-all duration-500"
        )}>
          <Icon className={cn(
            "w-6 h-6",
            item.color === "dream-gold" && "text-dream-gold",
            item.color === "dream-blue" && "text-dream-blue",
            item.color === "dream-green" && "text-dream-green",
            item.color === "dream-purple" && "text-dream-purple",
          )} />
        </div>

        {/* Title */}
        <h3 className="font-serif-display text-xl mb-1 group-hover:text-dream-gold transition-colors duration-300">
          {item.title}
        </h3>
        
        {/* Subtitle */}
        <p className="text-sm text-dream-gold mb-3">
          {item.subtitle}
        </p>
        
        {/* Description */}
        <p className="text-muted-foreground text-sm leading-relaxed">
          {item.description}
        </p>

        {/* Decorative corner */}
        <div className="absolute bottom-0 right-0 w-16 h-16 overflow-hidden rounded-br-2xl">
          <div className={cn(
            "absolute bottom-0 right-0 w-px h-8",
            item.color === "dream-gold" && "bg-gradient-to-t from-dream-gold/30 to-transparent",
            item.color === "dream-blue" && "bg-gradient-to-t from-dream-blue/30 to-transparent",
            item.color === "dream-green" && "bg-gradient-to-t from-dream-green/30 to-transparent",
            item.color === "dream-purple" && "bg-gradient-to-t from-dream-purple/30 to-transparent",
            "opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          )} />
        </div>
      </div>
    </motion.div>
  );
}

export function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]);

  return (
    <section
      ref={containerRef}
      id="tentang"
      className="relative py-16 sm:py-24 lg:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-card via-background to-card" />
      
      {/* Decorative pattern */}
      <div className="absolute inset-0 pattern-sunda opacity-30" />

      <motion.div style={{ y }} className="relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 sm:mb-16 lg:mb-20"
          >
            <span className="text-xs sm:text-sm text-dream-gold tracking-widest uppercase mb-3 sm:mb-4 block">
              Tech Futurist • Master Sage Polymath
            </span>
            <h2 className="font-serif-display text-fluid-2xl mb-4 sm:mb-6">
              Satu Jiwa, Empat Dimensi
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base lg:text-lg px-2">
              Tn. H. Gugun Gunara, CMC, MBA, CFA, PMP, Six Sigma Black Belt — 
              <span className="text-dream-gold"> Tech Futurist</span>, 
              <span className="text-dream-blue"> Master Sage Polymath</span>, 
              <span className="text-dream-green"> Senior Konsultan Bisnis & IT</span>.
            </p>
          </motion.div>

          {/* Identity cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-12 sm:mb-16">
            {identityCards.map((item, index) => (
              <IdentityCard key={item.title} item={item} index={index} />
            ))}
          </div>

          {/* 7 Polymath Disciplines */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-12 sm:mb-16"
          >
            <div className="text-center mb-6 sm:mb-8">
              <h3 className="font-serif-display text-xl sm:text-2xl mb-2">
                Tujuh Disiplin Polymath
              </h3>
              <p className="text-sm text-muted-foreground">
                Keahlian lintas bidang yang menyatu dalam satu kesadaran
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 max-w-4xl mx-auto">
              {polymathDisciplines.map((discipline, index) => {
                const Icon = discipline.icon;
                return (
                  <motion.div
                    key={discipline.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className={cn(
                      "flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full",
                      "bg-card/50 border border-border/50 backdrop-blur-sm",
                      "hover:border-dream-gold/30 transition-all duration-300 cursor-default"
                    )}
                  >
                    <Icon className={cn("w-4 h-4", discipline.color)} />
                    <span className="text-xs sm:text-sm text-foreground">{discipline.label}</span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Mission Targets */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16 sm:mb-24"
          >
            <div className="relative p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-dream-gold/5 via-dream-purple/5 to-dream-blue/5 border border-border/30">
              <div className="text-center mb-6">
                <h3 className="font-serif-display text-xl sm:text-2xl mb-2">
                  Misi Peradaban
                </h3>
                <p className="text-sm text-muted-foreground">
                  Warisan yang ditinggalkan untuk generasi mendatang
                </p>
              </div>
              
              <div className="grid grid-cols-3 gap-4 sm:gap-6 max-w-2xl mx-auto">
                {missionTargets.map((target, index) => (
                  <motion.div
                    key={target.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="text-center"
                  >
                    <div className="font-serif-display text-2xl sm:text-4xl text-dream-gold mb-1">
                      {target.value}<span className="text-lg sm:text-2xl">{target.suffix}</span>
                    </div>
                    <div className="text-xs sm:text-sm text-muted-foreground">
                      {target.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Quotes section */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="max-w-4xl mx-auto"
          >
            <div className="divider-dream mb-8 sm:mb-12" />
            
            <div className="space-y-8 sm:space-y-12">
              {quotes.map((quote, index) => (
                <motion.blockquote
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className={cn(
                    "relative pl-4 sm:pl-6 border-l-2 border-dream-gold/30",
                    "sm:text-right sm:pr-6 sm:border-l-0 sm:border-r-2 sm:pl-0"
                  )}
                >
                  <Quote className={cn(
                    "absolute w-5 h-5 sm:w-6 sm:h-6 text-dream-gold/20 -top-2",
                    "left-0 sm:right-0"
                  )} />
                  <p className="font-serif-display text-lg sm:text-xl lg:text-2xl italic mb-2 text-foreground/90">
                    &ldquo;{quote.text}&rdquo;
                  </p>
                  <cite className="text-xs sm:text-sm text-muted-foreground not-italic">
                    — {quote.source}
                  </cite>
                </motion.blockquote>
              ))}
            </div>

            <div className="divider-dream mt-8 sm:mt-12" />
          </motion.div>

          {/* Philosophy */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mt-12 sm:mt-16 lg:mt-20"
          >
            <div className="inline-flex flex-col items-center">
              <p className="font-serif-display text-xl sm:text-2xl text-dream-gold mb-3 sm:mb-4">
                اِنَّا لِلّٰهِ وَاِنَّا اِلَيْهِ رَاجِعُوْنَ
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground italic">
                Sesungguhnya kita miliki Allah, dan kepada-Nya kita kembali
              </p>
            </div>
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
}
