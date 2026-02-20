"use client";

import { motion } from "framer-motion";
import { Cloud, Sparkles, Sun, Moon, Heart, Wind } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/lib/store/app-store";

const moods = [
  { id: "melancholic", label: "Melankolis", icon: Cloud, color: "text-dream-blue", bg: "bg-dream-blue/10" },
  { id: "contemplative", label: "Kontemplatif", icon: Sparkles, color: "text-dream-gold", bg: "bg-dream-gold/10" },
  { id: "peaceful", label: "Tenang", icon: Sun, color: "text-dream-green", bg: "bg-dream-green/10" },
  { id: "curious", label: "Ingin Tahu", icon: Moon, color: "text-dream-purple", bg: "bg-dream-purple/10" },
  { id: "inspired", label: "Terinspirasi", icon: Heart, color: "text-dream-gold", bg: "bg-dream-gold/10" },
  { id: "serene", label: "Damai", icon: Wind, color: "text-dream-blue", bg: "bg-dream-blue/10" },
];

export function MoodSelector() {
  const { currentMood, setCurrentMood } = useAppStore();

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground text-center">
        Bagaimana perasaanmu hari ini?
      </p>
      <div className="grid grid-cols-3 gap-3">
        {moods.map((mood) => {
          const Icon = mood.icon;
          const isSelected = currentMood === mood.id;
          
          return (
            <motion.button
              key={mood.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setCurrentMood(isSelected ? null : mood.id)}
              className={cn(
                "flex flex-col items-center gap-2 p-4 rounded-xl border transition-all duration-300",
                isSelected
                  ? `${mood.bg} border-current ${mood.color}`
                  : "border-border/50 hover:border-dream-gold/30 bg-card/30"
              )}
            >
              <Icon className={cn("w-5 h-5", isSelected ? mood.color : "text-muted-foreground")} />
              <span className={cn(
                "text-xs font-medium",
                isSelected ? mood.color : "text-muted-foreground"
              )}>
                {mood.label}
              </span>
            </motion.button>
          );
        })}
      </div>
      {currentMood && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs text-center text-muted-foreground"
        >
          Karya akan difilter berdasarkan mood yang kamu pilih
        </motion.p>
      )}
    </div>
  );
}
