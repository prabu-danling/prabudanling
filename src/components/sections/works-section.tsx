"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { BookOpen, Quote, Bookmark, X, ArrowRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

// Sample works data
const worksData = [
  {
    id: "1",
    type: "puisi",
    title: "Dialog dengan Kegelapan",
    excerpt: "Di malam yang tak berbintang, aku berbicara dengan bayanganku sendiri...",
    content: `Di malam yang tak berbintang,
aku berbicara dengan bayanganku sendiri.

"Siapa engkau?" tanyaku.
"Aku adalah engkau yang tak kunjung mengakui,"
jawabnya dengan suara yang familiar.

Kegelapan bukan musuh,
ia adalah kanvas kosong
tempat jiwa melukis rahasia.

Dalam sunyi, aku menemukan
bahwa cahaya sejati
tidak datang dari luar,
tapi menyala dari dalam.

— Malam ke-27, Bulan Kesunyian`,
    date: "2024-03-15",
    theme: "kesadaran",
    readingTime: "2 menit",
  },
  {
    id: "2",
    type: "esai",
    title: "Menggembala Hawa Nafsu: Sebuah Refleksi",
    excerpt: "Apa artinya menjadi penggembala atas diri sendiri? Bukan menguasai, bukan pula menindas...",
    content: `Apa artinya menjadi penggembala atas diri sendiri?

Bukan menguasai, bukan pula menindas. Menggembala adalah seni menemani — menemani hawa nafsu yang kadang mengamuk seperti badai, kadang mendekap lembut seperti embun pagi.

**I. Mengenali Kawanan**

Seorang penggembala mengenal setiap ekor dombanya. Ia tahu mana yang suka melangkah, mana yang sering tersesat, mana yang pemalu, dan mana yang berani. Demikian pula dengan hawa nafsu — ia bukan satu, melainkan kawanan yang terdiri dari berbagai bentuk: hasrat, keinginan, ketakutan, dan harapan.

**II. Padang Rumput Hati**

Hati adalah padang rumput. Kadang hijau dan subur, kadang kering dan gersang. Tugas penggembala adalah membawa kawanan ke padang yang tepat, di waktu yang tepat. Terlalu lama di padang subur akan membuat nafsu liar dan rakus. Terlalu lama di padang gersang akan membuatnya lemah dan putus asa.

**III. Tongkat dan Seruling**

Dua alat seorang penggembala: tongkat untuk menunjukkan jalan, dan seruling untuk menghibur. Dalam konteks jiwa, tongkat adalah kesadaran — yang menunjukkan arah ketika kabut tebal menyelimuti. Seruling adalah seni — yang mengubah kesunyian menjadi melodi, penderitaan menjadi keindahan.

**IV. Kembali ke Kandang**

Setiap senja, penggembala membawa kawanan pulang. Bukan karena malam menakutkan, tapi karena istirahat itu perlu. Jiwa yang terus berlari tanpa henti akan kelelahan. Dalam kandang yang hangat, kawanan beristirahat, memulihkan diri, bersiap untuk esok hari.

Demikianlah seni menggembala hawa nafsu — bukan perang, bukan penaklukan, melainkan tarian harmonis antara kesadaran dan keinginan, antara langkah dan hentian, antara suara dan senyap.`,
    date: "2024-02-28",
    theme: "nafsu",
    readingTime: "8 menit",
  },
  {
    id: "3",
    type: "puisi",
    title: "Surat untuk Tuhan yang Mendengar",
    excerpt: "Ya Tuhan, aku menulis ini bukan karena Engkau butuh surat dariku...",
    content: `Ya Tuhan,

Aku menulis ini bukan karena Engkau butuh surat dariku. Engkau Maha Mengetahui, Maha Mendengar, Maha Melihat. Tapi aku butuh menulis, karena kadang lidah terlalu kaku untuk berdoa.

Aku tidak meminta kekayaan — ia bisa membuatku lupa.
Aku tidak meminta kemasyhuran — ia bisa membuatku sombong.
Aku tidak meminta keabadian — ia bisa membuatku takabur.

Aku hanya meminta satu hal:
Jangan biarkan aku lupa.

Jangan biarkan aku lupa dari mana aku datang.
Jangan biarkan aku lupa ke mana aku akan kembali.
Jangan biarkan aku lupa bahwa setiap napas adalah pinjaman.

Dan ketika aku mulai lupa — karena aku pasti akan lupa —
kirimkanlah sesuatu yang membuatku teringat.
Bisa jadi melalui sepatah kata,
bisa jadi melalui tatapan mata,
bisa jadi melalui kesunyian yang sangat dalam.

Aku tahu Engkau mendengar.
Bukan karena aku merasa istimewa.
Tapi karena Engkau adalah Dzat yang Mendengar.

Dan itu cukup.
Itu lebih dari cukup.

— Seorang yang terus berusaha mengingat`,
    date: "2024-01-10",
    theme: "ruhani",
    readingTime: "3 menit",
  },
  {
    id: "4",
    type: "cerpen",
    title: "Pertemuan di Perempatan Waktu",
    excerpt: "Ia berdiri di perempatan itu setiap malam, menunggu sesuatu yang ia sendiri tak yakin apa...",
    content: `Ia berdiri di perempatan itu setiap malam, menunggu sesuatu yang ia sendiri tak yakin apa.

Perempatan itu biasa saja — empat jalan yang bertemu di bawah pohon beringin tua. Tapi bagi Prabu, tempat itu istimewa. Di situlah waktu tampaknya melambat, seolah ia berada di antara dua dunia.

Malam itu, bulan purnama menggantung rendah, memancarkan cahaya perak yang menari-nari di dedaunan. Prabu, seperti biasa, menunggu.

"Apa yang kau tunggu?" suara itu datang dari belakangnya.

Prabu menoleh. Seorang tua berjubah putih berdiri di sana, wajahnya samar seperti bayangan di air.

"Aku... tidak tahu," jawab Prabu jujur. "Mungkin aku menunggu diriku sendiri."

Orang tua itu tersenyum. "Menunggu diri sendiri adalah pekerjaan paling sulit. Karena diri itu tidak pernah diam. Ia bergerak, berubah, bersembunyi."

"Lalu bagaimana aku bisa menemukannya?"

"Dengan berhenti mencari," kata orang tua itu, duduk di batu di bawah pohon. "Kau liat jalan-jalan ini? Masing-masing mengarah ke tempat yang berbeda. Tapi semua bermuara pada satu titik — tempat kau berdiri sekarang."

Prabu memandang keempat jalan itu. Satu menuju kota dengan lampu-lampunya yang gemerlap. Satu menuju desa dengan asap dapur yang mengepul. Satu menuju hutan dengan gelap yang menyeramkan. Dan satu menuju pantai dengan suara ombak yang terdengar samar.

"Jadi... aku tidak perlu pergi ke mana-mana?"

"Kau sudah di mana kau seharusnya," orang tua itu bangkit. "Perjalanan sejati bukan tentang memindahkan tubuh dari satu tempat ke tempat lain. Tapi tentang memindahkan kesadaran dari gelap ke terang, dari tidur ke terjaga."

Sebelum Prabu sempat bertanya lebih lanjut, orang tua itu sudah menghilang, meninggalkan hanya embun pagi yang mulai turun.

Dan Prabu, untuk pertama kalinya, pulang tanpa rasa penasaran. Ia tahu sekarang — yang ia tunggu bukanlah sesuatu yang akan datang. Ia menunggu kesadarannya sendiri untuk terjaga.

Dan malam itu, ia akhirnya terjaga.`,
    date: "2023-12-20",
    theme: "mimpi",
    readingTime: "6 menit",
  },
];

const typeColors: Record<string, string> = {
  puisi: "bg-dream-gold/20 text-dream-gold border-dream-gold/30",
  esai: "bg-dream-blue/20 text-dream-blue border-dream-blue/30",
  cerpen: "bg-dream-green/20 text-dream-green border-dream-green/30",
};

const themeColors: Record<string, string> = {
  kesadaran: "text-dream-gold",
  nafsu: "text-dream-blue",
  ruhani: "text-dream-purple",
  mimpi: "text-dream-green",
};

// Work card component
function WorkCard({ 
  work, 
  onClick,
  index 
}: { 
  work: typeof worksData[0]; 
  onClick: () => void;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card 
        className={cn(
          "group cursor-pointer transition-all duration-500",
          "bg-card/50 border-border/50 hover:border-dream-gold/30",
          "hover:shadow-xl hover:shadow-dream-gold/5",
          "hover:-translate-y-1"
        )}
        onClick={onClick}
      >
        <CardContent className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <Badge 
              variant="outline" 
              className={cn("text-xs", typeColors[work.type])}
            >
              {work.type.charAt(0).toUpperCase() + work.type.slice(1)}
            </Badge>
            <div className="flex items-center gap-1 text-muted-foreground text-xs">
              <Clock className="w-3 h-3" />
              {work.readingTime}
            </div>
          </div>

          {/* Title */}
          <h3 className="font-serif-display text-xl mb-3 group-hover:text-dream-gold transition-colors duration-300">
            {work.title}
          </h3>

          {/* Excerpt */}
          <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-2">
            {work.excerpt}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between">
            <span className={cn("text-xs capitalize", themeColors[work.theme])}>
              #{work.theme}
            </span>
            <span className="text-xs text-muted-foreground">
              {new Date(work.date).toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
              })}
            </span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// Reading modal component
function ReadingModal({ 
  work, 
  onClose 
}: { 
  work: typeof worksData[0] | null; 
  onClose: () => void;
}) {
  const [saved, setSaved] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  if (!work) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-background/95 backdrop-blur-xl" />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative w-full max-w-3xl max-h-[90vh] sm:max-h-[85vh] overflow-hidden rounded-xl sm:rounded-2xl bg-card border border-border shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between p-4 sm:p-6 border-b border-border bg-card/95 backdrop-blur-sm">
          <div className="flex items-center gap-2 sm:gap-3">
            <Badge 
              variant="outline" 
              className={cn("text-[10px] sm:text-xs", typeColors[work.type])}
            >
              {work.type.charAt(0).toUpperCase() + work.type.slice(1)}
            </Badge>
            <span className={cn("text-[10px] sm:text-xs capitalize", themeColors[work.theme])}>
              #{work.theme}
            </span>
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="w-8 h-8 sm:w-9 sm:h-9"
              onClick={() => setSaved(!saved)}
            >
              <Bookmark className={cn(
                "w-4 h-4 transition-colors",
                saved && "fill-dream-gold text-dream-gold"
              )} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="w-8 h-8 sm:w-9 sm:h-9"
              onClick={onClose}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div 
          ref={contentRef}
          className="overflow-y-auto max-h-[calc(90vh-70px)] sm:max-h-[calc(85vh-80px)] scrollbar-dream"
        >
          <div className="p-4 sm:p-6 lg:p-10">
            {/* Title */}
            <h2 className="font-serif-display text-2xl sm:text-3xl lg:text-4xl mb-2 text-center">
              {work.title}
            </h2>

            {/* Meta */}
            <div className="flex items-center justify-center gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground mb-6 sm:mb-8">
              <span>{work.readingTime}</span>
              <span>•</span>
              <span>
                {new Date(work.date).toLocaleDateString('id-ID', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </span>
            </div>

            <div className="divider-dream mb-6 sm:mb-8" />

            {/* Content - Reading mode */}
            <div className="reading-mode text-sm sm:text-base">
              {work.content.split('\n\n').map((paragraph, i) => (
                <p key={i} className="whitespace-pre-line">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="divider-dream mt-6 sm:mt-8 mb-4 sm:mb-6" />

            {/* Footer quote */}
            <div className="text-center">
              <p className="text-xs sm:text-sm text-muted-foreground italic">
                &ldquo;Tulisan adalah jejak jiwa yang lewat&rdquo;
              </p>
              <p className="text-[10px] sm:text-xs text-muted-foreground mt-2">
                — Santri Angon
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function WorksSection() {
  const [selectedWork, setSelectedWork] = useState<typeof worksData[0] | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("semua");
  
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["3%", "-3%"]);

  const filters = ["semua", "puisi", "esai", "cerpen"];
  
  const filteredWorks = activeFilter === "semua" 
    ? worksData 
    : worksData.filter(work => work.type === activeFilter);

  return (
    <section
      ref={containerRef}
      id="karya"
      className="relative py-16 sm:py-24 lg:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/50 to-background" />

      <motion.div style={{ y }} className="relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8 sm:mb-12"
          >
            <div className="inline-flex items-center gap-2 mb-3 sm:mb-4">
              <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-dream-gold" />
              <span className="text-xs sm:text-sm text-dream-gold tracking-widest uppercase">
                Perpustakaan Jiwa
              </span>
            </div>
            <h2 className="font-serif-display text-fluid-2xl mb-4 sm:mb-6">
              Karya Tulis
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base px-2">
              Puisi, esai, dan cerita yang lahir dari kesunyian dan percakapan dengan jiwa.
              Setiap kata adalah jejak perjalanan.
            </p>
          </motion.div>

          {/* Filter tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center justify-center gap-1.5 sm:gap-2 mb-8 sm:mb-12 overflow-x-auto px-2"
          >
            {filters.map((filter) => (
              <Button
                key={filter}
                variant={activeFilter === filter ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveFilter(filter)}
                className={cn(
                  "rounded-full px-3 sm:px-5 capitalize transition-all duration-300 text-xs sm:text-sm",
                  activeFilter === filter 
                    && "bg-dream-gold text-background hover:bg-dream-gold/90"
                )}
              >
                {filter}
              </Button>
            ))}
          </motion.div>

          {/* Works grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <AnimatePresence mode="popLayout">
              {filteredWorks.map((work, index) => (
                <WorkCard
                  key={work.id}
                  work={work}
                  index={index}
                  onClick={() => setSelectedWork(work)}
                />
              ))}
            </AnimatePresence>
          </div>

          {/* View all link */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-center mt-8 sm:mt-12"
          >
            <Button
              variant="outline"
              size="sm"
              className="rounded-full group text-sm"
              onClick={() => {
                const arsipSection = document.getElementById("arsip");
                arsipSection?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <span>Lihat Arsip Lengkap</span>
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>

        </div>
      </motion.div>

      {/* Reading modal */}
      <AnimatePresence>
        {selectedWork && (
          <ReadingModal
            work={selectedWork}
            onClose={() => setSelectedWork(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
