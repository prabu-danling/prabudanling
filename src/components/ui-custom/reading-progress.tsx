"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

interface ReadingProgressProps {
  className?: string;
}

export function ReadingProgress({ className }: ReadingProgressProps) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div
      className={className}
      style={{ scaleX }}
      initial={{ opacity: 0 }}
      animate={{ opacity: show ? 1 : 0 }}
      transition={{ duration: 0.3 }}
    />
  );
}

// Chapter-style reading progress for long content
export function ChapterProgress({ 
  current, 
  total 
}: { 
  current: number; 
  total: number;
}) {
  const progress = (current / total) * 100;

  return (
    <div className="flex items-center gap-3 text-sm">
      <span className="text-muted-foreground">Bagian {current} dari {total}</span>
      <div className="flex-1 h-1 bg-muted rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-dream-gold"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
