"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useSpring, useTransform } from "framer-motion";
import { BookOpen, Moon, Heart, Calendar, PenTool, Sparkles, Feather } from "lucide-react";
import { cn } from "@/lib/utils";

// Animated counter component
function AnimatedCounter({ 
  value, 
  suffix = "", 
  duration = 2,
  delay = 0,
  inView
}: { 
  value: number; 
  suffix?: string;
  duration?: number;
  delay?: number;
  inView: boolean;
}) {
  const [hasAnimated, setHasAnimated] = useState(false);
  const spring = useSpring(0, { 
    damping: 20, 
    stiffness: 50,
    duration: duration * 1000 
  });
  const display = useTransform(spring, (current) => {
    if (value >= 1000) {
      return (Math.round(current * 10) / 10).toFixed(1);
    }
    return Math.round(current).toString();
  });

  useEffect(() => {
    if (inView && !hasAnimated) {
      const timeout = setTimeout(() => {
        spring.set(value);
        setHasAnimated(true);
      }, delay * 1000);
      return () => clearTimeout(timeout);
    }
  }, [inView, hasAnimated, spring, value, delay]);

  if (!inView) {
    return <span>0{suffix}</span>;
  }

  return (
    <motion.span className="tabular-nums">
      <motion.span>{display}</motion.span>
      {suffix}
    </motion.span>
  );
}

// Stats data - updated with 15+ years since 2009
const stats = [
  {
    icon: BookOpen,
    value: 127,
    suffix: "",
    label: "Karya Ditulis",
    color: "text-dream-gold",
    bgColor: "bg-dream-gold/10",
    glowColor: "shadow-dream-gold/20",
  },
  {
    icon: Moon,
    value: 89,
    suffix: "",
    label: "Mimpi Tercatat",
    color: "text-dream-blue",
    bgColor: "bg-dream-blue/10",
    glowColor: "shadow-dream-blue/20",
  },
  {
    icon: Heart,
    value: 2.4,
    suffix: "K",
    label: "Pembaca",
    color: "text-dream-purple",
    bgColor: "bg-dream-purple/10",
    glowColor: "shadow-dream-purple/20",
  },
  {
    icon: Calendar,
    value: 15,
    suffix: "+",
    label: "Tahun Menulis",
    sublabel: "Sejak 2009",
    color: "text-dream-green",
    bgColor: "bg-dream-green/10",
    glowColor: "shadow-dream-green/20",
  },
];

// Floating particles for background
function FloatingParticle({ delay, x, y }: { delay: number; x: string; y: string }) {
  return (
    <motion.div
      className="absolute w-1 h-1 rounded-full bg-dream-gold/30"
      style={{ left: x, top: y }}
      animate={{
        y: [0, -20, 0],
        opacity: [0.3, 0.6, 0.3],
      }}
      transition={{
        duration: 3,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

export function StatsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section ref={containerRef} className="py-16 sm:py-20 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gradient orbs */}
        <motion.div
          className="absolute top-1/2 left-1/4 w-64 h-64 bg-dream-gold/5 rounded-full blur-3xl"
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-1/2 right-1/4 w-64 h-64 bg-dream-blue/5 rounded-full blur-3xl"
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.5, 0.3, 0.5] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        
        {/* Floating particles */}
        <FloatingParticle delay={0} x="10%" y="20%" />
        <FloatingParticle delay={0.5} x="30%" y="80%" />
        <FloatingParticle delay={1} x="70%" y="30%" />
        <FloatingParticle delay={1.5} x="90%" y="70%" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-12"
        >
          <motion.div
            className="inline-flex items-center gap-2 mb-3 sm:mb-4"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
          >
            <Sparkles className="w-4 h-4 text-dream-gold" />
            <span className="text-xs sm:text-sm text-dream-gold tracking-widest uppercase">
              Perjalanan
            </span>
            <Sparkles className="w-4 h-4 text-dream-gold" />
          </motion.div>
          
          <motion.h2
            className="font-serif-display text-fluid-xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Jejak yang Telah Dilewati
          </motion.h2>
          
          <motion.p
            className="text-muted-foreground text-sm mt-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Perjalanan 15 tahun menggembala kata-kata
          </motion.p>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.15,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group"
              >
                <div className={cn(
                  "relative p-5 sm:p-6 rounded-2xl border border-border/30",
                  "bg-card/30 backdrop-blur-sm",
                  "hover:border-dream-gold/30 hover:shadow-xl",
                  `hover:${stat.glowColor}`,
                  "transition-all duration-500 text-center",
                  "overflow-hidden"
                )}>
                  {/* Animated glow background on hover */}
                  <motion.div
                    className={cn(
                      "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500",
                      stat.bgColor
                    )}
                    style={{ filter: "blur(20px)" }}
                  />
                  
                  {/* Icon */}
                  <motion.div
                    className={cn(
                      "relative w-12 h-12 rounded-xl mx-auto mb-3 sm:mb-4 flex items-center justify-center",
                      stat.bgColor
                    )}
                    whileInView={{ rotate: [0, 10, -10, 0] }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.15 + 0.3 }}
                  >
                    <Icon className={cn("w-6 h-6", stat.color)} />
                  </motion.div>

                  {/* Value with animated counter */}
                  <div className={cn(
                    "relative font-serif-display text-3xl sm:text-4xl mb-1",
                    stat.color
                  )}>
                    <AnimatedCounter 
                      value={stat.value} 
                      suffix={stat.suffix}
                      duration={2}
                      delay={index * 0.15}
                      inView={isInView}
                    />
                  </div>

                  {/* Label */}
                  <div className="relative text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                  
                  {/* Sublabel for years */}
                  {stat.sublabel && (
                    <motion.div
                      className="relative text-xs text-muted-foreground/70 mt-1"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.15 + 0.8 }}
                    >
                      {stat.sublabel}
                    </motion.div>
                  )}

                  {/* Decorative corner */}
                  <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden rounded-tr-2xl">
                    <motion.div
                      className={cn(
                        "absolute top-0 right-0 w-8 h-px",
                        `bg-gradient-to-l from-transparent to-transparent`
                      )}
                      whileHover={{ 
                        background: `linear-gradient(to left, transparent, var(--dream-${stat.color.includes('gold') ? 'gold' : stat.color.includes('blue') ? 'blue' : stat.color.includes('purple') ? 'purple' : 'green'})/30, transparent)` 
                      }}
                    />
                  </div>
                  
                  {/* Bottom progress line */}
                  <motion.div
                    className={cn("absolute bottom-0 left-0 h-0.5", stat.color.replace('text-', 'bg-'))}
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: index * 0.15 + 0.5, ease: "easeOut" }}
                    style={{ opacity: 0.3 }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
        
        {/* Bottom quote */}
        <motion.div
          className="text-center mt-10 sm:mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 border border-border/30">
            <Feather className="w-4 h-4 text-dream-gold" />
            <span className="text-xs sm:text-sm text-muted-foreground italic">
              "Setiap angka adalah jiwa yang tersentuh"
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
