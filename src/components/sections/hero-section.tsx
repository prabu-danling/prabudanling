"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { ArrowDown, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  // Mouse parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 150 };
  const mouseXSpring = useSpring(mouseX, springConfig);
  const mouseYSpring = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX / innerWidth - 0.5) * 20;
      const y = (clientY / innerHeight - 0.5) * 20;
      mouseX.set(x);
      mouseY.set(y);
      setMousePosition({ x: clientX, y: clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const scrollToSection = (href: string) => {
    const element = document.getElementById(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={containerRef}
      id="beranda"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Main content */}
      <motion.div
        style={{ y, opacity, scale }}
        className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex items-center justify-center gap-2 mb-4"
          >
            <Sparkles className="w-4 h-4 text-dream-gold" />
            <span className="text-sm text-muted-foreground tracking-widest uppercase">
              Tech Futurist • Master Sage Polymath
            </span>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="font-serif-display text-fluid-3xl mb-4"
          >
            <span className="block text-foreground">Santri Angon</span>
            <span className="block text-dream-gold mt-2">Prabu Danling</span>
          </motion.h1>

          {/* Credential line */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-sm text-muted-foreground mb-2"
          >
            Tn. H. Gugun Gunara, CMC, MBA, CFA, PMP, Six Sigma Black Belt
          </motion.p>
          
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.75 }}
            className="text-xs text-dream-gold mb-4"
          >
            (Muhammad Lutfi Azmi)
          </motion.p>
          
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-sm text-muted-foreground mb-4"
          >
            Tech Futurist • Master Sage Polymath • Senior Konsultan Bisnis & IT
          </motion.p>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="text-fluid-base text-muted-foreground mb-6 max-w-xl"
          >
            Membangkitkan kesadaran diri, mencerdaskan kehidupan bangsa, dan ikut melaksanakan ketertiban dunia
          </motion.p>

          {/* Poetic subtext */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 1.2 }}
            className="text-whisper text-muted-foreground mb-8 max-w-lg"
          >
            &ldquo;Prak burukeun — segerakan kesadaran. 
            Ulah edan, kudu eling — jangan gila, tetap waspada.&rdquo;
          </motion.p>

          {/* Mission badges */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="flex flex-wrap justify-center gap-2 mb-8"
          >
            <span className="px-3 py-1 rounded-full bg-dream-gold/10 border border-dream-gold/20 text-xs text-dream-gold">
              1 Miliar Jiwa
            </span>
            <span className="px-3 py-1 rounded-full bg-dream-blue/10 border border-dream-blue/20 text-xs text-dream-blue">
              500 Buku
            </span>
            <span className="px-3 py-1 rounded-full bg-dream-purple/10 border border-dream-purple/20 text-xs text-dream-purple">
              100 Jurnal
            </span>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              size="lg"
              className="bg-dream-gold/90 hover:bg-dream-gold text-background font-medium px-8 h-12 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-dream-gold/20"
              onClick={() => scrollToSection("karya")}
            >
              <span>Masuk ke Mimpi</span>
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              className="border-border/50 hover:border-dream-gold/50 h-12 rounded-full px-8 transition-all duration-300"
              onClick={() => scrollToSection("tentang")}
            >
              <span>Kenali Sang Penggembala</span>
            </Button>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 cursor-pointer"
          onClick={() => scrollToSection("tentang")}
        >
          <span className="text-xs text-muted-foreground tracking-widest uppercase">
            Scroll
          </span>
          <ArrowDown className="w-4 h-4 text-dream-gold/50" />
        </motion.div>
      </motion.div>
    </section>
  );
}
