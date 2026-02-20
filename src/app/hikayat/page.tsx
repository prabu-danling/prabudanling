"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { 
  Moon, Sun, Star, Feather, Heart, Quote,
  ArrowDown, ChevronDown, Sparkles, BookOpen
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Pre-computed static particle positions for SSR consistency
// These values are hardcoded to prevent hydration mismatches
const STATIC_PARTICLES = [
  { id: 0, x: 15.25, y: 25.33, size: 2.15, duration: 12, delay: 0.5 },
  { id: 1, x: 45.67, y: 60.12, size: 1.85, duration: 18, delay: 1.2 },
  { id: 2, x: 75.33, y: 35.78, size: 2.45, duration: 15, delay: 2.1 },
  { id: 3, x: 25.15, y: 80.45, size: 1.95, duration: 22, delay: 0.8 },
  { id: 4, x: 60.28, y: 15.67, size: 2.35, duration: 14, delay: 3.2 },
  { id: 5, x: 85.92, y: 70.22, size: 1.75, duration: 20, delay: 1.5 },
  { id: 6, x: 10.44, y: 45.56, size: 2.55, duration: 16, delay: 2.8 },
  { id: 7, x: 55.33, y: 90.11, size: 1.65, duration: 24, delay: 0.3 },
  { id: 8, x: 35.72, y: 10.22, size: 2.25, duration: 13, delay: 4.1 },
  { id: 9, x: 70.85, y: 55.44, size: 1.45, duration: 19, delay: 1.8 },
  { id: 10, x: 20.55, y: 65.89, size: 2.05, duration: 17, delay: 2.5 },
  { id: 11, x: 90.22, y: 30.56, size: 1.85, duration: 21, delay: 0.9 },
  { id: 12, x: 40.12, y: 85.33, size: 2.65, duration: 15, delay: 3.5 },
  { id: 13, x: 65.77, y: 40.55, size: 1.55, duration: 23, delay: 1.1 },
  { id: 14, x: 5.78, y: 95.22, size: 2.35, duration: 14, delay: 4.2 },
  { id: 15, x: 50.44, y: 5.11, size: 1.95, duration: 18, delay: 2.2 },
  { id: 16, x: 80.66, y: 75.78, size: 2.15, duration: 16, delay: 0.6 },
  { id: 17, x: 30.33, y: 50.77, size: 1.75, duration: 20, delay: 3.8 },
  { id: 18, x: 95.11, y: 20.44, size: 2.45, duration: 12, delay: 1.4 },
  { id: 19, x: 12.77, y: 72.11, size: 1.65, duration: 22, delay: 2.9 },
  { id: 20, x: 18.33, y: 32.55, size: 2.55, duration: 15, delay: 0.7 },
  { id: 21, x: 78.44, y: 92.66, size: 1.85, duration: 19, delay: 3.3 },
  { id: 22, x: 42.99, y: 48.33, size: 2.25, duration: 17, delay: 1.6 },
  { id: 23, x: 67.11, y: 8.77, size: 1.55, duration: 21, delay: 4.4 },
  { id: 24, x: 23.66, y: 58.22, size: 2.05, duration: 14, delay: 0.4 },
  { id: 25, x: 88.55, y: 43.11, size: 1.95, duration: 18, delay: 2.6 },
  { id: 26, x: 53.22, y: 78.99, size: 2.35, duration: 16, delay: 3.1 },
  { id: 27, x: 7.44, y: 18.66, size: 1.75, duration: 20, delay: 1.3 },
  { id: 28, x: 33.88, y: 68.44, size: 2.15, duration: 13, delay: 4.5 },
  { id: 29, x: 72.99, y: 27.33, size: 1.65, duration: 22, delay: 0.2 },
];

// Animated background particles - using pre-computed static values
function FloatingParticles() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {STATIC_PARTICLES.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-dream-gold/20"
          style={{
            left: `${p.x.toFixed(2)}%`,
            top: `${p.y.toFixed(2)}%`,
            width: `${p.size.toFixed(2)}px`,
            height: `${p.size.toFixed(2)}px`,
          }}
          animate={{
            y: [0, -1000],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}

// Chapter component with scroll animation
function Chapter({
  number,
  title,
  content,
  index,
}: {
  number: string;
  title: string;
  content: React.ReactNode;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.3], [50, 0]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, y }}
      className="min-h-screen flex items-center justify-center py-20 px-4"
    >
      <div className="max-w-4xl mx-auto">
        {/* Chapter number */}
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          className="flex items-center gap-4 mb-8"
        >
          <div className="w-16 h-16 rounded-full bg-dream-gold/10 flex items-center justify-center">
            <span className="font-serif-display text-2xl text-dream-gold">{number}</span>
          </div>
          <div className="flex-1 h-px bg-gradient-to-r from-dream-gold/50 to-transparent" />
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="font-serif-display text-3xl md:text-4xl mb-8 text-dream-gold"
        >
          {title}
        </motion.h2>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="prose prose-invert prose-lg max-w-none"
        >
          <div className="font-serif leading-relaxed text-lg space-y-6 text-foreground/90">
            {content}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

// Sabda highlight component
function SabdaHighlight({ text }: { text: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="relative py-8 px-6 md:px-12"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-dream-gold/5 via-dream-purple/5 to-dream-gold/5 rounded-3xl" />
      <div className="relative">
        <Quote className="w-12 h-12 text-dream-gold/30 mb-4" />
        <p className="font-serif-display text-2xl md:text-4xl text-center leading-relaxed">
          <span className="text-dream-gold">"</span>
          {text}
          <span className="text-dream-gold">"</span>
        </p>
        <p className="text-center mt-6 text-muted-foreground italic">
          — Sabda Leluhur Padjajaran
        </p>
      </div>
    </motion.div>
  );
}

// Main Hikayat Page
export default function HikayatPage() {
  const [showScrollHint, setShowScrollHint] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowScrollHint(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const chapters = [
    {
      number: "I",
      title: "Pembukaan: Dari Kegelapan Lahir Cahaya",
      content: (
        <>
          <p>
            Di antara lipatan waktu yang sunyi, ketika malam menjadi guru paling kejam, 
            ada dua nama yang terlahir bukan dari kemewahan, melainkan dari rahim 
            penderitaan yang paling dalam.
          </p>
          <p>
            Bukan dari istana yang megah, bukan dari takhta yang berkilau emas, 
            tapi dari tanah Padjajaran yang basah oleh air mata, dari dada yang sesak 
            oleh beban terlalu berat untuk dipikul seorang diri.
          </p>
          <p className="text-dream-gold font-medium">
            SANTRI ANGON dan PRABU DANLING—dua nama, satu jiwa, satu ruh yang terpecah 
            untuk menggenggam dua dunia sekaligus: Dunia batin yang penuh pergulatan, 
            dan dunia luar yang menuntut aksi tanpa ampun.
          </p>
          <p>
            Ini bukan dongeng. Ini bukan mitologi yang lahir dari imajinasi pujangga tua. 
            Ini adalah sabda leluhur yang berbisik melalui riyadoh tujuh hari, melalui 
            keheningan yang memecah ego menjadi serpihan, melalui cahaya yang datang 
            bukan dari matahari, melainkan dari kedalaman ruh yang hampir padam.
          </p>
        </>
      ),
    },
    {
      number: "II",
      title: "Mimpi Yang Datang Tujuh Kali",
      content: (
        <>
          <p>
            Ada rahasia yang tersimpan bertahun-tahun, sebuah misteri yang datang di 
            masa kanak-kanak, ketika jiwa masih murni dan mata hati belum tertutup 
            oleh debu dunia.
          </p>
          <p className="text-dream-purple font-medium text-xl">
            Tujuh kali. Tujuh kali mimpi yang sama datang mengetuk pintu kesadaran.
          </p>
          <p>
            Di malam-malam yang sunyi ketika seorang anak tidur dengan polos, tanpa tahu 
            bahwa ia sedang menerima pesan dari dimensi yang tidak terlihat.
          </p>
          <p>
            Dalam mimpi itu—Ada istana kuno yang megah, arsitektur kayu dan batu yang anggun, 
            taman luas dengan air yang mengalir jernih seperti kebijaksanaan, dan sosok 
            di singgasana dengan aura yang begitu kuat hingga membuat jiwa bergetar.
          </p>
          <p>
            Sosok itu menatap—wajah tidak jelas, namun tatapan itu menembus hingga ke dasar jiwa, 
            seolah berbisik tanpa suara: <span className="text-dream-gold">"Ingatlah. Jangan lupa."</span>
          </p>
          <p>
            Dan dalam mimpi itu terdengar dua nama: <strong>SANTRI ANGON</strong> dan <strong>PRABU DANLING</strong>
          </p>
        </>
      ),
    },
    {
      number: "III",
      title: "Perjalanan Panjang Mencerna Makna",
      content: (
        <>
          <p>Bertahun-tahun berlalu. Nama-nama itu kadang muncul dalam ingatan, seperti gema jauh dari masa lalu yang tidak bisa dijelaskan.</p>
          <p>Apa artinya Santri Angon? Siapa Prabu Danling? Mengapa mimpi itu datang tujuh kali? Apa hubungannya dengan diriku?</p>
          <p>Tidak ada jawaban. Hanya kebingungan yang makin dalam seiring waktu berjalan.</p>
          <p>
            Hidup terus bergulir—ada kesuksesan yang memabukkan, ada kejatuhan yang menghancurkan, 
            ada malam-malam panjang yang penuh air mata, ada siang-siang yang dipenuhi perjuangan tanpa henti.
          </p>
          <p>
            Dan dalam setiap fase itu, nama-nama itu tetap tersimpan di sudut hati, menunggu waktu 
            yang tepat untuk diungkapkan, menunggu kematangan jiwa untuk memahami.
          </p>
          <p className="text-dream-blue italic">
            Butuh waktu bertahun-tahun. Butuh jatuh bangun berkali-kali. Butuh kehilangan hampir segalanya. 
            Butuh perjalanan panjang yang melelahkan. Untuk akhirnya memahami...
          </p>
          <p className="text-dream-gold font-medium">
            Nama-nama itu bukan hanya kata-kata. Nama-nama itu adalah identitas spiritual 
            yang telah dititipkan sejak masa kanak-kanak, menunggu pemiliknya cukup dewasa untuk menerimanya.
          </p>
        </>
      ),
    },
    {
      number: "IV",
      title: "Silaturahmi Ke Seluruh Nusantara",
      content: (
        <>
          <p>Ada panggilan yang tidak bisa ditolak—untuk berkeliling Nusantara, dari ujung Sumatera hingga Papua, dari pantai utara Jawa hingga pegunungan Sulawesi, mencari guru-guru yang bijaksana.</p>
          <p><strong>Guru-guru yang masih bernyawa:</strong></p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Para kiai di pesantren-pesantren tua</li>
            <li>Para sesepuh yang hidup di lereng gunung</li>
            <li>Para pemikir yang menyembunyikan kedalaman di balik kesederhanaan</li>
            <li>Para praktisi spiritual yang tidak pernah mencari panggung</li>
          </ul>
          <p><strong>Guru-guru yang sudah tanpa jasad:</strong></p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Para wali yang makamnya masih diziarahi</li>
            <li>Para leluhur yang ruhnya masih membimbing melalui mimpi dan isyarat</li>
            <li>Para arwah yang hadir dalam riyadoh dan kontemplasi</li>
            <li>Para pendahulu yang meninggalkan jejak kebijaksanaan dalam kitab-kitab kuning</li>
          </ul>
        </>
      ),
    },
    {
      number: "V",
      title: "Di Ujung Jurang",
      content: (
        <>
          <p className="text-red-400 font-medium">
            Ada malam yang paling gelap—lebih gelap dari semua malam yang pernah dilewati...
          </p>
          <p>
            Ketika beban dunia terasa seperti gunung yang menimpa dada, ketika tidak ada lagi 
            air mata yang bisa keluar karena sudah kering, ketika nafas terasa seperti silet 
            yang merobek paru-paru.
          </p>
          <p>Di malam itu, pikiran berbisik dengan sangat meyakinkan:</p>
          <p className="text-red-400 italic text-xl">"Sudah cukup. Akhiri saja semua ini."</p>
          <p>
            Tapi di detik terakhir—DI DETIK YANG PALING KRITIS ITU—Muncul wajah-wajah:
            Wajah tiga anak yang masih membutuhkan ayah, wajah para guru yang sudah mengajarkan 
            begitu banyak dengan sabar, wajah sesepuh yang pernah berkata: 
            <span className="text-dream-gold">"Kamu dipilih untuk ujian ini karena kamu dipercaya bisa melewatinya."</span>
          </p>
          <p className="text-dream-gold font-medium text-xl">
            Dan terdengar suara—bukan dari telinga, tapi dari dalam hati:
            <br />"Amanahmu belum selesai."
          </p>
        </>
      ),
    },
    {
      number: "VI",
      title: "Santri Angon: Penggembala Jiwa",
      content: (
        <>
          <p>
            <strong>Santri Angon</strong> bukanlah gelar yang dipersembahkan oleh universitas ternama, 
            bukan mahkota yang dikenakan di pesta kebanggaan, bukan sertifikat yang dipajang di dinding ruang tamu.
          </p>
          <p>
            Santri Angon adalah pengakuan jujur—bahwa di dalam diri setiap manusia, ada kawanan nafsui 
            liar yang mengembara tanpa arah, ada ego yang berteriak lebih keras dari akal sehat, 
            ada ambisi yang membakar tanpa peduli siapa yang hangus.
          </p>
          <p className="text-dream-green font-medium">
            <strong>Angon—menggembala.</strong> Bukan membunuh. Bukan melarikan diri. 
            Tapi mengendalikan dengan penuh kasih namun tegas.
          </p>
          <p>
            Seperti penggembala sejati di lembah yang sunyi, ia berjalan di antara kawanan hewannya, 
            memastikan tidak ada yang tersesat ke jurang, memastikan tidak ada yang dimangsa oleh 
            serigala keputusasaan, memastikan semua kembali ke kandang dengan selamat saat matahari terbenam.
          </p>
          <p className="text-dream-purple italic">
            Di dalam tradisi Islam, ini disebut <strong>Mujāhadah Nafs</strong>—perjuangan melawan 
            diri sendiri, musuh terbesar yang tidur di dalam tubuh yang sama.
          </p>
        </>
      ),
    },
    {
      number: "VII",
      title: "Prabu Danling: Sang Pemimpin",
      content: (
        <>
          <p>
            <strong>Prabu</strong> bukan raja yang duduk di singgasana megah, menunggu pengikut 
            membawakan piala kemuliaan.
          </p>
          <p className="text-dream-gold font-medium text-xl">
            Prabu adalah <strong>Prak Burukeun</strong>—Segera laksanakan! Eksekusi tanpa menunda!
          </p>
          <p>
            Tapi di balik keberanian itu, ada <strong>Danling</strong>—sebuah peringatan spiritual yang dalam:
          </p>
          <SabdaHighlight text="Jangan Edan, Tapi Harus Eling" />
          <p>
            <strong>Edan</strong> adalah terlena, adalah lupa, adalah mabuk oleh kesuksesan sementara, 
            adalah terhanyut dalam arus dunia yang penuh topeng palsu.
          </p>
          <p>
            <strong>Eling</strong> adalah ingat, adalah sadar, adalah terjaga, adalah tidak pernah 
            melupakan dari mana kita datang dan ke mana kita akan kembali.
          </p>
        </>
      ),
    },
    {
      number: "VIII",
      title: "Beban Yang Mustahil",
      content: (
        <>
          <p>
            Ada malam-malam ketika beban terasa seperti gunung, ketika tanggung jawab menumpuk 
            seperti awan mendung yang tak kunjung reda...
          </p>
          <p className="text-muted-foreground italic">Beban yang menurut logika manusia: mustahil.</p>
          <p>Tapi di tengah kegelapan itu, ada bisikan lembut:</p>
          <div className="bg-gradient-to-r from-dream-gold/10 to-dream-purple/10 p-6 rounded-xl my-6">
            <p className="font-serif text-xl text-center text-dream-gold">
              "Lā yukallifullāhu nafsan illā wus'ahā."
            </p>
            <p className="text-center mt-2 text-muted-foreground">
              "Allah tidak membebani seseorang melainkan sesuai dengan kesanggupannya." (QS. Al-Baqarah: 286)
            </p>
          </div>
          <p>
            Jika beban ini ada di pundakmu, maka Ar-Rahman telah melihat kekuatan tersembunyi 
            di dalam dirimu yang bahkan engkau sendiri tidak tahu.
          </p>
          <p className="text-dream-green font-medium">
            "Fa inna ma&apos;al &apos;usri yusrā, inna ma&apos;al &apos;usri yusrā."
            <br />
            <span className="text-sm text-muted-foreground">
              "Sesungguhnya bersama kesulitan ada kemudahan." (QS. Ash-Sharh: 5-6)
            </span>
          </p>
        </>
      ),
    },
    {
      number: "IX",
      title: "Sabda Leluhur",
      content: (
        <>
          <p>
            Di hari ketujuh riyadoh, ketika tubuh lemah dan ego telah hancur berkeping-keping, 
            ketika air mata telah mengalir sampai kering, ketika keheningan menjadi lebih nyaring 
            dari teriakan dunia—
          </p>
          <p className="text-dream-gold text-xl font-medium text-center my-8">
            CAHAYA DATANG.
          </p>
          <p>
            Cahaya yang sama dari mimpi tujuh kali di masa kanak-kanak. Bukan cahaya lampu. 
            Bukan cahaya matahari. Tapi cahaya dari dalam—dari jantung, dari ruh, dari tempat 
            paling dalam dari keberadaan.
          </p>
          <p>Dan di dalam cahaya itu, terdengar SUARA—berbicara dalam bahasa Sunda kuno:</p>
          <div className="my-8 py-8 px-6 bg-gradient-to-r from-dream-gold/10 via-dream-purple/10 to-dream-blue/10 rounded-2xl">
            <p className="font-serif-display text-3xl md:text-4xl text-center text-dream-gold leading-relaxed">
              "PRAK BURUKEUN GEURA SADAR DAN ELING,
              <br />
              JANGAN EDAN TAPI HARUS ELING."
            </p>
            <p className="text-center mt-6 text-muted-foreground">
              Artinya: "Segera laksanakan dengan selalu sadar dan ingat, jangan terlena tetapi harus selalu mengingat."
            </p>
          </div>
        </>
      ),
    },
  ];

  return (
    <main className="min-h-screen bg-background relative">
      {/* Floating particles */}
      <FloatingParticles />

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center relative px-4">
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute inset-0 bg-gradient-radial from-dream-gold/20 via-transparent to-transparent"
          />
        </div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative text-center max-w-4xl mx-auto"
        >
          {/* Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
            className="flex justify-center mb-8"
          >
            <div className="relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                className="w-24 h-24 rounded-full bg-dream-gold/10 flex items-center justify-center"
              >
                <Feather className="w-12 h-12 text-dream-gold" />
              </motion.div>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 rounded-full border border-dream-gold/30"
              />
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="font-serif-display text-4xl md:text-6xl lg:text-7xl mb-6"
          >
            <span className="text-dream-gold">HIKAYAT</span>
            <br />
            <span className="text-foreground">SANTRI ANGON</span>
            <br />
            <span className="text-muted-foreground">&amp;</span>
            <br />
            <span className="text-foreground">PRABU DANLING</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-xl md:text-2xl text-muted-foreground mb-4 font-serif italic"
          >
            Sabda Leluhur dari Padjajaran yang Terlupakan
          </motion.p>

          {/* Quote */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="mt-8 p-6 bg-card/30 backdrop-blur-sm rounded-2xl border border-border/30"
          >
            <p className="text-lg md:text-xl font-serif text-dream-gold">
              "Prak Burukeun, Ulah Edan, Kudu Eling"
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Segera laksanakan, jangan terlena, tetap waspada
            </p>
          </motion.div>

          {/* Author */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="mt-8 text-muted-foreground"
          >
            <p>M. Lutfi Azmi / Gugun Gunara</p>
            <p className="text-sm">Prabu Danling / Santri Angon</p>
          </motion.div>
        </motion.div>

        {/* Scroll hint */}
        <AnimatePresence>
          {showScrollHint && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute bottom-8 left-1/2 -translate-x-1/2"
            >
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="flex flex-col items-center gap-2 text-muted-foreground"
              >
                <span className="text-sm">Scroll untuk membaca</span>
                <ChevronDown className="w-5 h-5" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Chapters */}
      <div className="relative">
        {/* Progress bar */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-dream-gold via-dream-purple to-dream-blue origin-left z-50"
          style={{ scaleX: useTransform(useScroll().scrollYProgress, [0, 1], [0, 1]) }}
        />

        {chapters.map((chapter, index) => (
          <Chapter
            key={chapter.number}
            number={chapter.number}
            title={chapter.title}
            content={chapter.content}
            index={index}
          />
        ))}
      </div>

      {/* Closing Section */}
      <section className="min-h-screen flex items-center justify-center py-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <Heart className="w-16 h-16 text-dream-gold mx-auto mb-8" />
          <h2 className="font-serif-display text-3xl md:text-4xl mb-6">
            Penutup: Undangan Untuk Semua
          </h2>
          <div className="font-serif leading-relaxed text-lg space-y-6 text-foreground/90 text-left">
            <p>
              Wahai jiwa yang lelah, yang merasa dunia telah menutup semua pintu, 
              yang merasa tidak ada lagi yang percaya, yang merasa beban terlalu berat...
            </p>
            <p className="text-dream-gold font-medium text-center">
              Ketahuilah: SANTRI ANGON &amp; PRABU DANLING bukan cerita tentang kesempurnaan.
            </p>
            <p>
              Ini adalah cerita tentang kejatuhan dan kebangkitan, tentang kehancuran dan 
              rekonstruksi, tentang malam yang paling gelap sebelum fajar tiba, tentang 
              hampir bunuh diri namun diselamatkan oleh amanah yang belum selesai.
            </p>
          </div>
          <div className="mt-12">
            <Button
              asChild
              className="bg-dream-gold/90 hover:bg-dream-gold text-background"
            >
              <a href="/">Kembali ke Portal</a>
            </Button>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
