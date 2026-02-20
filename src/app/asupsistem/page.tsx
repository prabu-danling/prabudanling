"use client";

import { useState, useSyncExternalStore } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Moon,
  FileText,
  Quote,
  Settings,
  Plus,
  Edit,
  Trash2,
  Eye,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Save,
  X,
  BarChart3,
  Users,
  Calendar,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/lib/store/app-store";

// Types
type Tab = "overview" | "works" | "dreamlogs" | "quotes";

// Sample data for demo
const sampleWorks = [
  {
    id: "1",
    title: "Dialog dengan Kegelapan",
    type: "puisi",
    theme: "kesadaran",
    isPublished: true,
    isFeatured: true,
    viewCount: 234,
    createdAt: "2024-03-15",
  },
  {
    id: "2",
    title: "Menggembala Hawa Nafsu",
    type: "esai",
    theme: "nafsu",
    isPublished: true,
    isFeatured: true,
    viewCount: 456,
    createdAt: "2024-02-28",
  },
  {
    id: "3",
    title: "Surat untuk Tuhan yang Mendengar",
    type: "puisi",
    theme: "ruhani",
    isPublished: true,
    isFeatured: false,
    viewCount: 189,
    createdAt: "2024-01-10",
  },
  {
    id: "4",
    title: "Pertemuan di Perempatan Waktu",
    type: "cerpen",
    theme: "mimpi",
    isPublished: true,
    isFeatured: true,
    viewCount: 312,
    createdAt: "2023-12-20",
  },
  {
    id: "5",
    title: "Lautan dalam Secangkir",
    type: "puisi",
    theme: "kesadaran",
    isPublished: true,
    isFeatured: false,
    viewCount: 145,
    createdAt: "2024-01-18",
  },
];

const sampleDreamLogs = [
  {
    id: "1",
    title: "Pertemuan dengan Bayangan",
    lucidity: "high",
    mood: "melancholic",
    isLucid: true,
    dreamDate: "2024-03-20",
  },
  {
    id: "2",
    title: "Kota Tanpa Warna",
    lucidity: "medium",
    mood: "contemplative",
    isLucid: false,
    dreamDate: "2024-03-15",
  },
  {
    id: "3",
    title: "Surat dari Masa Depan",
    lucidity: "high",
    mood: "peaceful",
    isLucid: true,
    dreamDate: "2024-03-08",
  },
];

// Stats card component
function StatCard({
  title,
  value,
  icon: Icon,
  color,
  trend,
}: {
  title: string;
  value: string;
  icon: typeof BookOpen;
  color: string;
  trend?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="bg-card/50 border-border/50 hover:border-dream-gold/30 transition-all duration-300">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", color)}>
              <Icon className="w-6 h-6" />
            </div>
            {trend && (
              <span className="text-xs text-dream-green flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                {trend}
              </span>
            )}
          </div>
          <div className="font-serif-display text-3xl mb-1">{value}</div>
          <div className="text-sm text-muted-foreground">{title}</div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// Work editor modal
function WorkEditorModal({
  isOpen,
  onClose,
  work,
  onSave,
}: {
  isOpen: boolean;
  onClose: () => void;
  work: typeof sampleWorks[0] | null;
  onSave: (data: Record<string, unknown>) => void;
}) {
  const [formData, setFormData] = useState({
    title: work?.title || "",
    type: work?.type || "puisi",
    theme: work?.theme || "kesadaran",
    content: "",
    excerpt: "",
  });

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <div className="absolute inset-0 bg-background/95 backdrop-blur-xl" onClick={onClose} />
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl bg-card border border-border shadow-2xl"
      >
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="font-serif-display text-xl">
            {work ? "Edit Karya" : "Tambah Karya Baru"}
          </h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Judul</label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Judul karya..."
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Tipe</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full h-10 px-3 rounded-lg border border-border bg-background"
                >
                  <option value="puisi">Puisi</option>
                  <option value="esai">Esai</option>
                  <option value="cerpen">Cerpen</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Tema</label>
                <select
                  value={formData.theme}
                  onChange={(e) => setFormData({ ...formData, theme: e.target.value })}
                  className="w-full h-10 px-3 rounded-lg border border-border bg-background"
                >
                  <option value="kesadaran">Kesadaran</option>
                  <option value="nafsu">Nafsu</option>
                  <option value="mimpi">Mimpi</option>
                  <option value="ruhani">Ruhani</option>
                </select>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Ringkasan</label>
              <Textarea
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                placeholder="Ringkasan singkat..."
                rows={2}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Konten</label>
              <Textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="Tulis karya di sini..."
                rows={10}
                className="font-serif leading-relaxed"
              />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end gap-3 p-6 border-t border-border">
          <Button variant="outline" onClick={onClose}>
            Batal
          </Button>
          <Button
            className="bg-dream-gold/90 hover:bg-dream-gold text-background"
            onClick={() => onSave(formData)}
          >
            <Save className="w-4 h-4 mr-2" />
            Simpan
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Main Admin Panel
export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingWork, setEditingWork] = useState<typeof sampleWorks[0] | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const tabs = [
    { id: "overview" as Tab, label: "Overview", icon: BarChart3 },
    { id: "works" as Tab, label: "Karya", icon: BookOpen },
    { id: "dreamlogs" as Tab, label: "Dream Log", icon: Moon },
    { id: "quotes" as Tab, label: "Kutipan", icon: Quote },
  ];

  const handleSave = async (data: Record<string, unknown>) => {
    setIsSaving(true);
    // Simulate save
    await new Promise((r) => setTimeout(r, 1000));
    setIsSaving(false);
    setIsEditorOpen(false);
    setEditingWork(null);
  };

  const filteredWorks = sampleWorks.filter((work) => {
    const matchesSearch = work.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterType === "all" || work.type === filterType;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-dream-gold/20 flex items-center justify-center">
                <Settings className="w-5 h-5 text-dream-gold" />
              </div>
              <div>
                <h1 className="font-serif-display text-xl">Admin Panel</h1>
                <p className="text-xs text-muted-foreground">Kelola Portal Kesadaran</p>
              </div>
            </div>
            <Button
              variant="outline"
              className="gap-2"
              onClick={() => {
                setEditingWork(null);
                setIsEditorOpen(true);
              }}
            >
              <Plus className="w-4 h-4" />
              Tambah Karya
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <nav className="space-y-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300",
                      activeTab === tab.id
                        ? "bg-dream-gold/10 text-dream-gold border border-dream-gold/20"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </aside>

          {/* Main content */}
          <main className="flex-1">
            <AnimatePresence mode="wait">
              {activeTab === "overview" && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  <h2 className="font-serif-display text-2xl">Overview</h2>

                  {/* Stats grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatCard
                      title="Total Karya"
                      value="127"
                      icon={BookOpen}
                      color="bg-dream-gold/10 text-dream-gold"
                      trend="+12%"
                    />
                    <StatCard
                      title="Dream Logs"
                      value="89"
                      icon={Moon}
                      color="bg-dream-blue/10 text-dream-blue"
                      trend="+8%"
                    />
                    <StatCard
                      title="Pembaca"
                      value="2.4K"
                      icon={Users}
                      color="bg-dream-purple/10 text-dream-purple"
                      trend="+24%"
                    />
                    <StatCard
                      title="Views Bulan Ini"
                      value="8.5K"
                      icon={Eye}
                      color="bg-dream-green/10 text-dream-green"
                      trend="+18%"
                    />
                  </div>

                  {/* Recent activity */}
                  <Card className="bg-card/50 border-border/50">
                    <CardHeader>
                      <CardTitle className="text-lg">Aktivitas Terbaru</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {sampleWorks.slice(0, 5).map((work) => (
                          <div
                            key={work.id}
                            className="flex items-center justify-between py-2 border-b border-border/30 last:border-0"
                          >
                            <div className="flex items-center gap-3">
                              <FileText className="w-4 h-4 text-muted-foreground" />
                              <div>
                                <p className="font-medium text-sm">{work.title}</p>
                                <p className="text-xs text-muted-foreground">
                                  {new Date(work.createdAt).toLocaleDateString("id-ID")}
                                </p>
                              </div>
                            </div>
                            <Badge variant="outline" className="text-xs">
                              {work.type}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {activeTab === "works" && (
                <motion.div
                  key="works"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between">
                    <h2 className="font-serif-display text-2xl">Karya</h2>
                    <div className="flex items-center gap-3">
                      {/* Search */}
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          placeholder="Cari karya..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-10 w-48"
                        />
                      </div>
                      {/* Filter */}
                      <select
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                        className="h-10 px-3 rounded-lg border border-border bg-background"
                      >
                        <option value="all">Semua Tipe</option>
                        <option value="puisi">Puisi</option>
                        <option value="esai">Esai</option>
                        <option value="cerpen">Cerpen</option>
                      </select>
                    </div>
                  </div>

                  {/* Works table */}
                  <Card className="bg-card/50 border-border/50">
                    <CardContent className="p-0">
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead className="border-b border-border">
                            <tr>
                              <th className="text-left p-4 font-medium">Judul</th>
                              <th className="text-left p-4 font-medium">Tipe</th>
                              <th className="text-left p-4 font-medium">Tema</th>
                              <th className="text-left p-4 font-medium">Views</th>
                              <th className="text-left p-4 font-medium">Status</th>
                              <th className="text-right p-4 font-medium">Aksi</th>
                            </tr>
                          </thead>
                          <tbody>
                            {filteredWorks.map((work) => (
                              <tr key={work.id} className="border-b border-border/30 last:border-0 hover:bg-muted/30 transition-colors">
                                <td className="p-4">
                                  <div>
                                    <p className="font-medium">{work.title}</p>
                                    <p className="text-xs text-muted-foreground">
                                      {new Date(work.createdAt).toLocaleDateString("id-ID")}
                                    </p>
                                  </div>
                                </td>
                                <td className="p-4">
                                  <Badge variant="outline" className="capitalize">
                                    {work.type}
                                  </Badge>
                                </td>
                                <td className="p-4">
                                  <span className="text-sm capitalize text-muted-foreground">
                                    {work.theme}
                                  </span>
                                </td>
                                <td className="p-4">
                                  <span className="text-sm">{work.viewCount}</span>
                                </td>
                                <td className="p-4">
                                  {work.isFeatured ? (
                                    <Badge className="bg-dream-gold/20 text-dream-gold border-dream-gold/30">
                                      Featured
                                    </Badge>
                                  ) : work.isPublished ? (
                                    <Badge className="bg-dream-green/20 text-dream-green border-dream-green/30">
                                      Published
                                    </Badge>
                                  ) : (
                                    <Badge variant="outline">Draft</Badge>
                                  )}
                                </td>
                                <td className="p-4">
                                  <div className="flex items-center justify-end gap-2">
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="w-8 h-8"
                                      onClick={() => {
                                        setEditingWork(work);
                                        setIsEditorOpen(true);
                                      }}
                                    >
                                      <Edit className="w-4 h-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="w-8 h-8 text-destructive">
                                      <Trash2 className="w-4 h-4" />
                                    </Button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {activeTab === "dreamlogs" && (
                <motion.div
                  key="dreamlogs"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between">
                    <h2 className="font-serif-display text-2xl">Dream Log</h2>
                    <Button variant="outline" className="gap-2">
                      <Plus className="w-4 h-4" />
                      Tambah Mimpi
                    </Button>
                  </div>

                  <div className="grid gap-4">
                    {sampleDreamLogs.map((log) => (
                      <Card key={log.id} className="bg-card/50 border-border/50">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex items-start gap-4">
                              <div className="w-10 h-10 rounded-xl bg-dream-blue/10 flex items-center justify-center flex-shrink-0">
                                <Moon className="w-5 h-5 text-dream-blue" />
                              </div>
                              <div>
                                <h3 className="font-medium mb-1">{log.title}</h3>
                                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                  <span>{new Date(log.dreamDate).toLocaleDateString("id-ID")}</span>
                                  <span>•</span>
                                  <span className="capitalize">{log.lucidity} lucidity</span>
                                  <span>•</span>
                                  <span className="capitalize">{log.mood}</span>
                                  {log.isLucid && (
                                    <>
                                      <span>•</span>
                                      <Badge className="bg-dream-purple/20 text-dream-purple text-[10px]">
                                        Lucid
                                      </Badge>
                                    </>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="icon" className="w-8 h-8">
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="w-8 h-8 text-destructive">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === "quotes" && (
                <motion.div
                  key="quotes"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between">
                    <h2 className="font-serif-display text-2xl">Kutipan</h2>
                    <Button variant="outline" className="gap-2">
                      <Plus className="w-4 h-4" />
                      Tambah Kutipan
                    </Button>
                  </div>

                  <div className="grid gap-4">
                    {[
                      { id: "1", text: "Aku menggembala hawa nafsu, bukan ditundukkan olehnya.", source: "Catatan Kegelapan", isFeatured: true },
                      { id: "2", text: "Setiap mimpi adalah surat dari alam bawah sadar yang belum terbaca.", source: "Dream Log I", isFeatured: true },
                      { id: "3", text: "Menulis adalah cara jiwa berbicara ketika mulut terlalu lelah untuk berkata.", source: "Refleksi", isFeatured: true },
                    ].map((quote) => (
                      <Card key={quote.id} className="bg-card/50 border-border/50">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <p className="font-serif italic text-lg mb-2">"{quote.text}"</p>
                              <p className="text-sm text-muted-foreground">— {quote.source}</p>
                            </div>
                            <div className="flex items-center gap-2 ml-4">
                              {quote.isFeatured && (
                                <Badge className="bg-dream-gold/20 text-dream-gold">Featured</Badge>
                              )}
                              <Button variant="ghost" size="icon" className="w-8 h-8">
                                <Edit className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </main>
        </div>
      </div>

      {/* Work Editor Modal */}
      <AnimatePresence>
        {isEditorOpen && (
          <WorkEditorModal
            isOpen={isEditorOpen}
            onClose={() => {
              setIsEditorOpen(false);
              setEditingWork(null);
            }}
            work={editingWork}
            onSave={handleSave}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
