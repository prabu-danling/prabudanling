"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { 
  User, Mail, Calendar, BookOpen, Moon, Award, 
  TrendingUp, Settings, LogOut, Feather, Crown,
  Star, Heart, PenTool
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMemberStore } from "@/lib/store/member-store";
import { cn } from "@/lib/utils";

const tierColors = {
  free: "bg-muted text-muted-foreground",
  supporter: "bg-dream-blue/20 text-dream-blue",
  patron: "bg-dream-purple/20 text-dream-purple",
  legend: "bg-dream-gold/20 text-dream-gold",
};

const tierIcons = {
  free: User,
  supporter: Star,
  patron: Crown,
  legend: Feather,
};

const achievements = [
  { icon: "✍️", name: "Pena Awal", desc: "Membaca 10 karya", earned: true },
  { icon: "🌙", name: "Pemburu Mimpi", desc: "Mencatat 5 mimpi", earned: true },
  { icon: "🔥", name: "Api Semangat", desc: "Streak 7 hari", earned: false },
  { icon: "📚", name: "Penjelajah Kata", desc: "Membaca 100 karya", earned: false },
  { icon: "💎", name: "Jiwa Kristal", desc: "Premium member", earned: false },
];

export default function ProfilePage() {
  const { member, isAuthenticated, logout } = useMemberStore();

  useEffect(() => {
    if (!isAuthenticated) {
      window.location.href = "/member/login";
    }
  }, [isAuthenticated]);

  if (!member) return null;

  const TierIcon = tierIcons[member.tier];

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="relative bg-gradient-to-br from-dream-gold/10 via-background to-dream-purple/10 py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* Avatar */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="relative"
            >
              <div className="w-28 h-28 rounded-full bg-gradient-to-br from-dream-gold/30 to-dream-purple/30 flex items-center justify-center">
                <User className="w-14 h-14 text-dream-gold" />
              </div>
              <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-card border-2 border-dream-gold flex items-center justify-center">
                <TierIcon className="w-5 h-5 text-dream-gold" />
              </div>
            </motion.div>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-center md:text-left"
            >
              <h1 className="font-serif-display text-3xl mb-2">{member.name}</h1>
              <p className="text-muted-foreground mb-2">@{member.username}</p>
              <Badge className={tierColors[member.tier]}>
                <TierIcon className="w-3 h-3 mr-1" />
                {member.tier.charAt(0).toUpperCase() + member.tier.slice(1)} Member
              </Badge>
            </motion.div>

            {/* Actions */}
            <div className="md:ml-auto flex gap-2">
              <Button variant="outline" size="icon">
                <Settings className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={handleLogout}>
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: BookOpen, label: "Karya Dibaca", value: member.worksRead, color: "text-dream-gold" },
            { icon: PenTool, label: "Kata Ditulis", value: member.wordsWritten, color: "text-dream-blue" },
            { icon: TrendingUp, label: "Streak", value: `${member.streak} hari`, color: "text-dream-green" },
            { icon: Award, label: "Achievements", value: "2/5", color: "text-dream-purple" },
          ].map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="bg-card/30 border-border/30">
                  <CardContent className="p-4 text-center">
                    <Icon className={cn("w-6 h-6 mx-auto mb-2", stat.color)} />
                    <div className="font-serif-display text-2xl">{stat.value}</div>
                    <div className="text-xs text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Tabs */}
        <Tabs defaultValue="activity" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="activity">Aktivitas</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="bookmarks">Tersimpan</TabsTrigger>
            <TabsTrigger value="settings">Pengaturan</TabsTrigger>
          </TabsList>

          <TabsContent value="activity" className="mt-6">
            <Card className="bg-card/30 border-border/30">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Aktivitas Terbaru
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { action: "Membaca", target: "Dialog dengan Kegelapan", time: "2 jam lalu" },
                    { action: "Bookmark", target: "Surat untuk Tuhan", time: "5 jam lalu" },
                    { action: "Menulis", target: "150 kata dalam AI Assistant", time: "Kemarin" },
                    { action: "Login", target: "", time: "2 hari lalu" },
                  ].map((activity, i) => (
                    <div key={i} className="flex items-center justify-between py-2 border-b border-border/30 last:border-0">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-dream-gold/10 flex items-center justify-center">
                          {activity.action === "Membaca" && <BookOpen className="w-4 h-4 text-dream-gold" />}
                          {activity.action === "Bookmark" && <Heart className="w-4 h-4 text-dream-purple" />}
                          {activity.action === "Menulis" && <PenTool className="w-4 h-4 text-dream-blue" />}
                          {activity.action === "Login" && <User className="w-4 h-4 text-dream-green" />}
                        </div>
                        <div>
                          <p className="text-sm">{activity.action}</p>
                          {activity.target && (
                            <p className="text-xs text-muted-foreground">{activity.target}</p>
                          )}
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="achievements" className="mt-6">
            <Card className="bg-card/30 border-border/30">
              <CardContent className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {achievements.map((achievement, i) => (
                    <motion.div
                      key={achievement.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                      className={cn(
                        "flex flex-col items-center gap-2 p-4 rounded-xl border transition-all",
                        achievement.earned
                          ? "border-dream-gold/30 bg-dream-gold/5"
                          : "border-border/30 opacity-50"
                      )}
                    >
                      <span className="text-3xl">{achievement.icon}</span>
                      <span className="text-sm font-medium text-center">{achievement.name}</span>
                      <span className="text-xs text-muted-foreground text-center">{achievement.desc}</span>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bookmarks" className="mt-6">
            <Card className="bg-card/30 border-border/30">
              <CardContent className="p-6 text-center">
                <Heart className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                <p className="text-muted-foreground">
                  Belum ada karya yang disimpan
                </p>
                <Button variant="outline" className="mt-4" asChild>
                  <a href="/#karya">Jelajahi Karya</a>
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="mt-6">
            <Card className="bg-card/30 border-border/30">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b border-border/30">
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-sm text-muted-foreground">{member.email}</p>
                    </div>
                    <Button variant="outline" size="sm">Ubah</Button>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-border/30">
                    <div>
                      <p className="font-medium">Password</p>
                      <p className="text-sm text-muted-foreground">••••••••</p>
                    </div>
                    <Button variant="outline" size="sm">Ubah</Button>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <div>
                      <p className="font-medium">Tema</p>
                      <p className="text-sm text-muted-foreground">Dark mode</p>
                    </div>
                    <Button variant="outline" size="sm">Ubah</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
