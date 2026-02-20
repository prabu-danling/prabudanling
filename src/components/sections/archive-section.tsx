"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Archive, Search, Tag, Filter, Grid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// Archive data - combined from works and dreams
const archiveData = [
  {
    id: "a1",
    type: "puisi",
    title: "Dialog dengan Kegelapan",
    theme: "kesadaran",
    date: "2024-03-15",
    excerpt: "Di malam yang tak berbintang, aku berbicara dengan bayanganku sendiri...",
  },
  {
    id: "a2",
    type: "esai",
    title: "Menggembala Hawa Nafsu",
    theme: "nafsu",
    date: "2024-02-28",
    excerpt: "Apa artinya menjadi penggembala atas diri sendiri?",
  },
  {
    id: "a3",
    type: "mimpi",
    title: "Pertemuan dengan Bayangan",
    theme: "mimpi",
    date: "2024-03-20",
    excerpt: "Malam ini aku bermimpi bertemu dengan bayanganku sendiri...",
  },
  {
    id: "a4",
    type: "puisi",
    title: "Surat untuk Tuhan yang Mendengar",
    theme: "ruhani",
    date: "2024-01-10",
    excerpt: "Ya Tuhan, aku menulis ini bukan karena Engkau butuh surat dariku...",
  },
  {
    id: "a5",
    type: "cerpen",
    title: "Pertemuan di Perempatan Waktu",
    theme: "mimpi",
    date: "2023-12-20",
    excerpt: "Ia berdiri di perempatan itu setiap malam, menunggu sesuatu...",
  },
  {
    id: "a6",
    type: "mimpi",
    title: "Kota Tanpa Warna",
    theme: "mimpi",
    date: "2024-03-15",
    excerpt: "Aku berjalan di kota yang semua warnanya telah diambil...",
  },
  {
    id: "a7",
    type: "esai",
    title: "Eling: Seni Terjaga dalam Tidur",
    theme: "kesadaran",
    date: "2024-01-25",
    excerpt: "Eling bukan sekadar ingat. Eling adalah kesadaran yang menyala...",
  },
  {
    id: "a8",
    type: "puisi",
    title: "Doa untuk yang Terlelap",
    theme: "ruhani",
    date: "2024-02-14",
    excerpt: "Semoga mereka yang terlelap menemukan jalan pulang...",
  },
  {
    id: "a9",
    type: "mimpi",
    title: "Surat dari Masa Depan",
    theme: "kesadaran",
    date: "2024-03-08",
    excerpt: "Dalam mimpi, aku menerima surat yang ditulis dengan tanganku sendiri...",
  },
  {
    id: "a10",
    type: "esai",
    title: "Nafsu: Musuh atau Teman?",
    theme: "nafsu",
    date: "2024-02-05",
    excerpt: "Selama ini kita diajari untuk memerangi nafsu...",
  },
  {
    id: "a11",
    type: "puisi",
    title: "Lautan dalam Secangkir",
    theme: "kesadaran",
    date: "2024-01-18",
    excerpt: "Ada lautan dalam setiap secangkir kopi pagi...",
  },
  {
    id: "a12",
    type: "cerpen",
    title: "Penjaga Pintu",
    theme: "ruhani",
    date: "2024-01-05",
    excerpt: "Di depan pintu besar itu, seorang tua duduk setia menunggu...",
  },
];

const themes = [
  { id: "semua", label: "Semua", color: "text-foreground" },
  { id: "kesadaran", label: "Kesadaran", color: "text-dream-gold" },
  { id: "nafsu", label: "Nafsu", color: "text-dream-blue" },
  { id: "mimpi", label: "Mimpi", color: "text-dream-green" },
  { id: "ruhani", label: "Ruhani", color: "text-dream-purple" },
  { id: "eling", label: "Eling", color: "text-dream-gold" },
];

const typeLabels: Record<string, string> = {
  puisi: "Puisi",
  esai: "Esai",
  cerpen: "Cerpen",
  mimpi: "Dream Log",
};

const themeColors: Record<string, string> = {
  kesadaran: "bg-dream-gold/20 text-dream-gold border-dream-gold/30",
  nafsu: "bg-dream-blue/20 text-dream-blue border-dream-blue/30",
  mimpi: "bg-dream-green/20 text-dream-green border-dream-green/30",
  ruhani: "bg-dream-purple/20 text-dream-purple border-dream-purple/30",
  eling: "bg-dream-gold/20 text-dream-gold border-dream-gold/30",
};

// Archive item component
function ArchiveItem({ 
  item, 
  viewMode 
}: { 
  item: typeof archiveData[0];
  viewMode: "grid" | "list";
}) {
  if (viewMode === "list") {
    return (
      <motion.div
        layout
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
        className="group"
      >
        <div className="flex items-center gap-4 p-4 rounded-lg hover:bg-card/50 transition-colors cursor-pointer border border-transparent hover:border-border/50">
          <div className="flex-1 min-w-0">
            <h4 className="font-medium truncate group-hover:text-dream-gold transition-colors">
              {item.title}
            </h4>
            <p className="text-sm text-muted-foreground truncate">
              {item.excerpt}
            </p>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <Badge variant="outline" className={cn("text-xs", themeColors[item.theme])}>
              {item.theme}
            </Badge>
            <span className="text-xs text-muted-foreground">
              {new Date(item.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
            </span>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
    >
      <Card className={cn(
        "group cursor-pointer transition-all duration-300",
        "bg-card/30 border-border/30 hover:border-dream-gold/30",
        "hover:shadow-lg hover:shadow-dream-gold/5"
      )}>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-muted-foreground capitalize">
              {typeLabels[item.type]}
            </span>
            <Badge variant="outline" className={cn("text-xs", themeColors[item.theme])}>
              {item.theme}
            </Badge>
          </div>
          <h4 className="font-serif-display text-base mb-2 group-hover:text-dream-gold transition-colors line-clamp-1">
            {item.title}
          </h4>
          <p className="text-xs text-muted-foreground line-clamp-2">
            {item.excerpt}
          </p>
          <div className="text-xs text-muted-foreground mt-3">
            {new Date(item.date).toLocaleDateString('id-ID', {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            })}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function ArchiveSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeTheme, setActiveTheme] = useState("semua");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["2%", "-2%"]);

  // Filter items
  const filteredItems = archiveData.filter((item) => {
    const matchesTheme = activeTheme === "semua" || item.theme === activeTheme;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTheme && matchesSearch;
  });

  return (
    <section
      ref={containerRef}
      id="arsip"
      className="relative py-16 sm:py-24 lg:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />

      <motion.div style={{ y }} className="relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 mb-4">
              <Archive className="w-5 h-5 text-dream-gold" />
              <span className="text-sm text-dream-gold tracking-widest uppercase">
                Koleksi Lengkap
              </span>
            </div>
            <h2 className="font-serif-display text-fluid-2xl mb-6">
              Arsip & Koleksi
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Jelajahi seluruh karya berdasarkan tema. Setiap tulisan adalah jejak perjalanan jiwa.
            </p>
          </motion.div>

          {/* Search and filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8"
          >
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              {/* Search */}
              <div className="relative w-full md:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Cari karya..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-card/50 border-border/50"
                />
              </div>

              {/* View mode toggle */}
              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="icon"
                  className={cn("w-9 h-9", viewMode === "grid" && "bg-dream-gold text-background")}
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="icon"
                  className={cn("w-9 h-9", viewMode === "list" && "bg-dream-gold text-background")}
                  onClick={() => setViewMode("list")}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Theme filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex items-center gap-2 flex-wrap justify-center mb-8"
          >
            {themes.map((theme) => (
              <Button
                key={theme.id}
                variant={activeTheme === theme.id ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveTheme(theme.id)}
                className={cn(
                  "rounded-full transition-all duration-300",
                  activeTheme === theme.id 
                    ? "bg-dream-gold text-background hover:bg-dream-gold/90"
                    : "hover:border-dream-gold/50"
                )}
              >
                {theme.label}
              </Button>
            ))}
          </motion.div>

          {/* Results count */}
          <div className="text-center text-sm text-muted-foreground mb-6">
            Menampilkan {filteredItems.length} dari {archiveData.length} karya
          </div>

          {/* Archive grid/list */}
          <AnimatePresence mode="popLayout">
            <div className={cn(
              viewMode === "grid" 
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
                : "space-y-1"
            )}>
              {filteredItems.map((item) => (
                <ArchiveItem key={item.id} item={item} viewMode={viewMode} />
              ))}
            </div>
          </AnimatePresence>

          {/* Empty state */}
          {filteredItems.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <Archive className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground">
                Tidak ada karya yang ditemukan dengan filter ini.
              </p>
            </motion.div>
          )}

        </div>
      </motion.div>
    </section>
  );
}
