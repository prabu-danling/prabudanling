"use client";

import { motion } from "framer-motion";
import { 
  BookOpen, 
  Moon, 
  Clock, 
  TrendingUp, 
  Calendar,
  BarChart3,
  Target,
  Award
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const stats = [
  { 
    label: "Total Kata", 
    value: "45,230", 
    change: "+2,450 bulan ini",
    icon: BookOpen,
    color: "text-dream-gold",
    bgColor: "bg-dream-gold/10"
  },
  { 
    label: "Jam Menulis", 
    value: "127", 
    change: "18 jam minggu ini",
    icon: Clock,
    color: "text-dream-blue",
    bgColor: "bg-dream-blue/10"
  },
  { 
    label: "Streak", 
    value: "23 hari", 
    change: "Rekor: 45 hari",
    icon: Target,
    color: "text-dream-green",
    bgColor: "bg-dream-green/10"
  },
  { 
    label: "Mimpi Dicatat", 
    value: "89", 
    change: "12 mimpi jelas",
    icon: Moon,
    color: "text-dream-purple",
    bgColor: "bg-dream-purple/10"
  },
];

const weeklyData = [
  { day: "Sen", words: 1200 },
  { day: "Sel", words: 800 },
  { day: "Rab", words: 1500 },
  { day: "Kam", words: 600 },
  { day: "Jum", words: 900 },
  { day: "Sab", words: 2000 },
  { day: "Min", words: 1700 },
];

export function WritingInsights() {
  const maxWords = Math.max(...weeklyData.map(d => d.words));

  return (
    <div className="space-y-6">
      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-card/30 border-border/30 hover:border-dream-gold/30 transition-all duration-300">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", stat.bgColor)}>
                      <Icon className={cn("w-5 h-5", stat.color)} />
                    </div>
                  </div>
                  <div className="font-serif-display text-2xl mb-1">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                  <div className={cn("text-xs mt-2", stat.color)}>{stat.change}</div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Weekly chart */}
      <Card className="bg-card/30 border-border/30">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-dream-gold" />
            Kata Minggu Ini
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-end justify-between h-32 gap-2">
            {weeklyData.map((day, index) => (
              <motion.div
                key={day.day}
                className="flex-1 flex flex-col items-center gap-2"
                initial={{ height: 0 }}
                animate={{ height: "auto" }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <div className="w-full flex-1 relative">
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 rounded-t bg-gradient-to-t from-dream-gold/50 to-dream-gold/20"
                    initial={{ height: 0 }}
                    animate={{ height: `${(day.words / maxWords) * 100}%` }}
                    transition={{ delay: index * 0.1 + 0.2, duration: 0.5, ease: "easeOut" }}
                  />
                </div>
                <span className="text-xs text-muted-foreground">{day.day}</span>
              </motion.div>
            ))}
          </div>
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/30">
            <span className="text-xs text-muted-foreground">Total: 8,700 kata</span>
            <span className="text-xs text-dream-green flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              +15% dari minggu lalu
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card className="bg-card/30 border-border/30">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center gap-2">
            <Award className="w-4 h-4 text-dream-gold" />
            Pencapaian
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-3">
            {[
              { emoji: "✍️", label: "100 Karya", unlocked: true },
              { emoji: "🌙", label: "100 Mimpi", unlocked: true },
              { emoji: "🔥", label: "30 Hari", unlocked: true },
              { emoji: "📚", label: "50K Kata", unlocked: false },
            ].map((achievement) => (
              <div
                key={achievement.label}
                className={cn(
                  "flex flex-col items-center gap-1 p-3 rounded-lg",
                  achievement.unlocked 
                    ? "bg-dream-gold/10" 
                    : "bg-muted/30 opacity-50"
                )}
              >
                <span className="text-2xl">{achievement.emoji}</span>
                <span className="text-[10px] text-muted-foreground text-center">
                  {achievement.label}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
