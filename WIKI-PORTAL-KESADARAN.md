# 📚 WIKI PORTAL KESADARAN
## Panduan Super Lengkap Pengembangan & Navigasi
### Santri Angon / Prabu Danling - Writer's Website

---

# 📖 DAFTAR ISI

1. [Pendahuluan](#pendahuluan)
2. [Arsitektur Sistem](#arsitektur-sistem)
3. [Roadmap 30 Fitur Masa Depan](#roadmap-30-fitur)
4. [Panduan Per Role](#panduan-per-role)
5. [Panduan Admin Panel](#panduan-admin-panel)
6. [Panduan Member System](#panduan-member-system)
7. [Panduan Guest Experience](#panduan-guest-experience)
8. [Animasi & Styling Guide](#animasi-styling-guide)
9. [Database Schema Guide](#database-schema-guide)
10. [API Routes Guide](#api-routes-guide)
11. [Deployment & Production](#deployment-production)

---

# 1. PENDAHULUAN <a name="pendahuluan"></a>

## 1.1 Visi Proyek

**Portal Kesadaran** bukan sekadar website portofolio penulis, melainkan:
- 🏛️ **Perpustakaan Mimpi Digital** - Arsip karya dan catatan mimpi
- 🎭 **Panggung Sastra Hidup** - Interaksi dinamis dengan pembaca
- 🌟 **Portal Transformasi** - Menjadi pilot peradaban baru melalui kesadaran

## 1.2 Identitas Penulis

| Aspek | Detail |
|-------|--------|
| **Nama Asli** | Gugun Gunara |
| **Nama Islam** | Muhammad Lutfi Azmi |
| **Nama Pena 1** | Santri Angon (Santri = pelajar sejati, Angon = menggembala hawa nafsu) |
| **Nama Pena 2** | Prabu Danling (Prak burukeun = segerakan kesadaran, Danling = ulah edan kudu eling) |

## 1.3 Tech Stack

```
┌─────────────────────────────────────────────────────────────┐
│                    PORTAL KESADARAN STACK                    │
├─────────────────────────────────────────────────────────────┤
│  FRONTEND                                                    │
│  ├── Next.js 16 (App Router, SSR + SSG)                    │
│  ├── TypeScript 5 (Strict Mode)                            │
│  ├── Tailwind CSS 4 (Custom Dream Theme)                   │
│  ├── Framer Motion (Animations)                            │
│  └── shadcn/ui (Components)                                │
├─────────────────────────────────────────────────────────────┤
│  STATE MANAGEMENT                                            │
│  ├── Zustand (Client State)                                │
│  └── TanStack Query (Server State)                         │
├─────────────────────────────────────────────────────────────┤
│  BACKEND                                                     │
│  ├── Next.js API Routes                                    │
│  ├── Prisma ORM                                            │
│  └── SQLite (Development) → Supabase (Production)          │
├─────────────────────────────────────────────────────────────┤
│  AI CAPABILITIES (z-ai-web-dev-sdk)                        │
│  ├── LLM (Text Generation)                                 │
│  ├── VLM (Vision Understanding)                            │
│  ├── TTS (Text to Speech)                                  │
│  ├── ASR (Speech to Text)                                  │
│  ├── Image Generation                                      │
│  └── Video Generation                                      │
├─────────────────────────────────────────────────────────────┤
│  HOSTING                                                     │
│  └── Vercel (Free Tier)                                    │
└─────────────────────────────────────────────────────────────┘
```

---

# 2. ARSITEKTUR SISTEM <a name="arsitektur-sistem"></a>

## 2.1 Struktur Folder

```
src/
├── app/                          # Next.js App Router
│   ├── page.tsx                  # Halaman utama (single-page)
│   ├── layout.tsx                # Root layout
│   ├── globals.css               # Global styles & CSS variables
│   ├── admin/                    # Admin Panel
│   │   └── page.tsx              # Dashboard admin
│   ├── member/                   # Member Area
│   │   ├── login/page.tsx        # Login page
│   │   ├── register/page.tsx     # Registration page
│   │   └── profile/page.tsx      # Member profile
│   ├── features/                 # Futuristic Features
│   │   └── page.tsx              # 10 fitur futuristik
│   └── api/                      # API Routes
│       ├── works/                # CRUD karya
│       ├── dreamlogs/            # CRUD dream log
│       ├── quotes/               # CRUD quotes
│       ├── contact/              # Contact form
│       ├── auth/                 # Authentication
│       │   ├── login/            # Login endpoint
│       │   └── register/         # Register endpoint
│       └── ai/                   # AI endpoints
│           ├── writing-assistant/
│           └── dream-interpretation/
│
├── components/
│   ├── layout/                   # Layout components
│   │   ├── navigation.tsx        # Navigation bar
│   │   ├── footer.tsx            # Footer
│   │   └── theme-provider.tsx    # Theme context
│   ├── sections/                 # Page sections
│   │   ├── hero-section.tsx      # Hero dengan partikel
│   │   ├── about-section.tsx     # Tentang penulis
│   │   ├── works-section.tsx     # Karya tulis
│   │   ├── dreamlog-section.tsx  # Catatan mimpi
│   │   ├── archive-section.tsx   # Arsip
│   │   ├── contact-section.tsx   # Kontak
│   │   └── stats-section.tsx     # Statistik
│   ├── ui-custom/                # Custom components
│   │   ├── quote-carousel.tsx    # Carousel kutipan
│   │   ├── newsletter-section.tsx
│   │   ├── bookmark-button.tsx
│   │   ├── bookmarks-panel.tsx
│   │   ├── mood-selector.tsx
│   │   ├── writing-insights.tsx
│   │   ├── reading-progress.tsx
│   │   └── share-buttons.tsx
│   └── ui/                       # shadcn/ui components
│
├── lib/
│   ├── utils.ts                  # Utility functions
│   ├── db.ts                     # Prisma client
│   ├── store/                    # Zustand stores
│   │   ├── app-store.ts          # App state (bookmarks, mood)
│   │   └── member-store.ts       # Member auth state
│   └── hooks/                    # Custom hooks
│       └── use-api.ts            # API fetching hooks
│
└── prisma/
    ├── schema.prisma             # Database schema
    └── seed.ts                   # Seed data
```

## 2.2 Database Models

```prisma
// ====================
// MEMBER SYSTEM
// ====================
model Member {
  id            String    @id @default(cuid())
  email         String    @unique
  name          String
  username      String?   @unique
  avatar        String?
  bio           String?
  password      String    // Hashed
  
  // Subscription Tier
  tier          MemberTier @default(free)
  subscriptionStart DateTime?
  subscriptionEnd   DateTime?
  
  // Stats
  worksRead     Int       @default(0)
  wordsWritten  Int       @default(0)
  streak        Int       @default(0)
  lastActive    DateTime  @default(now())
  
  // Relations
  bookmarks     Bookmark[]
  readingProgress ReadingProgress[]
  challenges    ChallengeParticipant[]
  achievements  AchievementEarned[]
  activities    ActivityLog[]
}

enum MemberTier {
  free       // Gratis
  supporter  // Rp 50K/bulan
  patron     // Rp 150K/bulan
  legend     // Rp 500K/bulan
}

// ====================
// CONTENT MODELS
// ====================
model Work {
  id          String   @id @default(cuid())
  title       String
  slug        String   @unique
  type        WorkType          // puisi, esai, cerpen, artikel
  excerpt     String
  content     String
  theme       String             // kesadaran, nafsu, mimpi, ruhani, eling
  tags        String?            // JSON array
  coverImage  String?
  readingTime Int      @default(0)
  isPublished Boolean  @default(true)
  isFeatured  Boolean  @default(false)
  viewCount   Int      @default(0)
  likeCount   Int      @default(0)
  
  // AI Enhancement
  aiSummary   String?
  sentiment   String?
  keywords    String?
  
  // NFT Certificate
  nftTokenId  String?
  nftMintedAt DateTime?
}

model DreamLog {
  id          String      @id @default(cuid())
  title       String
  slug        String      @unique
  content     String
  symbols     String?     // JSON array of dream symbols
  lucidity    LucidityLevel
  mood        String?
  dreamDate   DateTime
  isRecurring Boolean     @default(false)
  isLucid     Boolean     @default(false)
  notes       String?
  
  // AI Interpretation
  aiInterpretation String?
  archetype   String?
}

model Quote {
  id          String   @id @default(cuid())
  text        String
  source      String?
  author      String?  @default("Santri Angon")
  workId      String?
  isFeatured  Boolean  @default(false)
}
```

---

# 3. ROADMAP 30 FITUR MASA DEPAN <a name="roadmap-30-fitur"></a>

## 🎯 FASE 1: Foundation (Fitur 1-5)

### 1. 📝 Enhanced Rich Text Editor

**Deskripsi:** Editor WYSIWYG untuk menulis karya dengan formatting lengkap

**Lokasi File:** `src/components/ui-custom/rich-text-editor.tsx`

**Implementasi:**

```tsx
"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bold, Italic, Underline, Strikethrough,
  List, ListOrdered, Quote, Code,
  AlignLeft, AlignCenter, AlignRight,
  Link, Image, Heading1, Heading2,
  Undo, Redo, Save, Eye, Download
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

// Toolbar button with animation
function ToolbarButton({ 
  icon: Icon, 
  active = false, 
  onClick,
  title 
}: { 
  icon: typeof Bold;
  active?: boolean;
  onClick: () => void;
  title: string;
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      title={title}
      className={cn(
        "p-2 rounded-lg transition-all duration-200",
        active 
          ? "bg-dream-gold/20 text-dream-gold" 
          : "hover:bg-muted text-muted-foreground hover:text-foreground"
      )}
    >
      <Icon className="w-4 h-4" />
    </motion.button>
  );
}

// Main Rich Text Editor
export function RichTextEditor({
  initialContent = "",
  onSave,
  placeholder = "Mulai menulis..."
}: {
  initialContent?: string;
  onSave?: (content: string, html: string) => void;
  placeholder?: string;
}) {
  const [content, setContent] = useState(initialContent);
  const [activeFormats, setActiveFormats] = useState<string[]>([]);
  const [isPreview, setIsPreview] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [isSaving, setIsSaving] = useState(false);

  // Format handlers
  const handleFormat = useCallback((format: string) => {
    // Implementation for formatting
    document.execCommand(format, false, undefined);
    setActiveFormats(prev => 
      prev.includes(format) 
        ? prev.filter(f => f !== format)
        : [...prev, format]
    );
  }, []);

  // Handle content change
  const handleContentChange = useCallback((e: React.FormEvent<HTMLDivElement>) => {
    const text = e.currentTarget.innerText || "";
    setContent(text);
    setWordCount(text.split(/\s+/).filter(Boolean).length);
  }, []);

  // Save handler
  const handleSave = useCallback(async () => {
    if (!onSave) return;
    setIsSaving(true);
    await onSave(content, content);
    setIsSaving(false);
  }, [content, onSave]);

  // Export to markdown
  const exportMarkdown = useCallback(() => {
    const blob = new Blob([content], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "karya.md";
    a.click();
  }, [content]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="border border-border rounded-xl overflow-hidden bg-card/30"
    >
      {/* Toolbar */}
      <div className="flex items-center justify-between p-2 border-b border-border bg-muted/30">
        <div className="flex items-center gap-1 flex-wrap">
          {/* Text formatting */}
          <div className="flex items-center gap-1 pr-2 border-r border-border">
            <ToolbarButton icon={Bold} onClick={() => handleFormat("bold")} title="Bold" />
            <ToolbarButton icon={Italic} onClick={() => handleFormat("italic")} title="Italic" />
            <ToolbarButton icon={Underline} onClick={() => handleFormat("underline")} title="Underline" />
            <ToolbarButton icon={Strikethrough} onClick={() => handleFormat("strikethrough")} title="Strikethrough" />
          </div>

          {/* Headings */}
          <div className="flex items-center gap-1 px-2 border-r border-border">
            <ToolbarButton icon={Heading1} onClick={() => handleFormat("h1")} title="Heading 1" />
            <ToolbarButton icon={Heading2} onClick={() => handleFormat("h2")} title="Heading 2" />
          </div>

          {/* Lists */}
          <div className="flex items-center gap-1 px-2 border-r border-border">
            <ToolbarButton icon={List} onClick={() => handleFormat("insertUnorderedList")} title="Bullet List" />
            <ToolbarButton icon={ListOrdered} onClick={() => handleFormat("insertOrderedList")} title="Numbered List" />
          </div>

          {/* Alignment */}
          <div className="flex items-center gap-1 px-2 border-r border-border">
            <ToolbarButton icon={AlignLeft} onClick={() => handleFormat("justifyLeft")} title="Align Left" />
            <ToolbarButton icon={AlignCenter} onClick={() => handleFormat("justifyCenter")} title="Align Center" />
            <ToolbarButton icon={AlignRight} onClick={() => handleFormat("justifyRight")} title="Align Right" />
          </div>

          {/* Insert */}
          <div className="flex items-center gap-1 px-2 border-r border-border">
            <ToolbarButton icon={Link} onClick={() => handleFormat("createLink")} title="Insert Link" />
            <ToolbarButton icon={Image} onClick={() => handleFormat("insertImage")} title="Insert Image" />
            <ToolbarButton icon={Quote} onClick={() => handleFormat("formatBlock")} title="Quote" />
            <ToolbarButton icon={Code} onClick={() => handleFormat("formatBlock")} title="Code Block" />
          </div>

          {/* History */}
          <div className="flex items-center gap-1 pl-2">
            <ToolbarButton icon={Undo} onClick={() => handleFormat("undo")} title="Undo" />
            <ToolbarButton icon={Redo} onClick={() => handleFormat("redo")} title="Redo" />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <motion.span 
            key={wordCount}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            className="text-xs text-muted-foreground"
          >
            {wordCount} kata
          </motion.span>
          <Button variant="ghost" size="sm" onClick={() => setIsPreview(!isPreview)}>
            <Eye className="w-4 h-4 mr-1" />
            Preview
          </Button>
          <Button variant="ghost" size="sm" onClick={exportMarkdown}>
            <Download className="w-4 h-4 mr-1" />
            Export
          </Button>
          <Button 
            size="sm" 
            onClick={handleSave}
            disabled={isSaving}
            className="bg-dream-gold/90 hover:bg-dream-gold text-background"
          >
            <Save className="w-4 h-4 mr-1" />
            {isSaving ? "Menyimpan..." : "Simpan"}
          </Button>
        </div>
      </div>

      {/* Editor / Preview */}
      <AnimatePresence mode="wait">
        {isPreview ? (
          <motion.div
            key="preview"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-[400px] p-6 font-serif leading-relaxed prose prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        ) : (
          <motion.div
            key="editor"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            contentEditable
            onInput={handleContentChange}
            className="min-h-[400px] p-6 focus:outline-none font-serif leading-relaxed"
            data-placeholder={placeholder}
            suppressContentEditableWarning
          >
            {initialContent}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
```

**Cara Menambahkan di Admin Panel:**

1. Buka `src/app/admin/page.tsx`
2. Import komponen:
```tsx
import { RichTextEditor } from "@/components/ui-custom/rich-text-editor";
```
3. Gunakan di dalam modal editor karya:
```tsx
<RichTextEditor
  initialContent={editingWork?.content || ""}
  onSave={handleSaveContent}
  placeholder="Tulis karya Anda di sini..."
/>
```

---

### 2. 🔐 Advanced Authentication System

**Deskripsi:** Sistem autentikasi lengkap dengan OAuth, email verification, password reset

**Lokasi File:** 
- `src/app/api/auth/[...nextauth]/route.ts`
- `src/lib/auth.ts`

**Implementasi:**

```tsx
// src/lib/auth.ts
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { db } from "./db";
import { simpleHash } from "./crypto";

export const authOptions: NextAuthOptions = {
  providers: [
    // Credentials (Email/Password)
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const member = await db.member.findUnique({
          where: { email: credentials.email }
        });

        if (!member || member.password !== simpleHash(credentials.password)) {
          return null;
        }

        return {
          id: member.id,
          email: member.email,
          name: member.name,
          image: member.avatar,
          tier: member.tier
        };
      }
    }),

    // Google OAuth
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.tier = user.tier;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.tier = token.tier as string;
      }
      return session;
    }
  },

  pages: {
    signIn: "/member/login",
    signUp: "/member/register",
    error: "/member/login",
  }
};
```

---

### 3. 📊 Analytics Dashboard

**Deskripsi:** Dashboard analitik untuk tracking pengunjung, karya populer, engagement

**Lokasi File:** `src/components/ui-custom/analytics-dashboard.tsx`

**Implementasi:**

```tsx
"use client";

import { motion } from "framer-motion";
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  TrendingUp, Users, Eye, Clock, Globe, BookOpen,
  Moon, Heart, Share2
} from "lucide-react";

const COLORS = ["#d4a574", "#4ade80", "#60a5fa", "#a78bfa", "#f472b6"];

// Animated stat card
function AnimatedStatCard({
  title,
  value,
  change,
  icon: Icon,
  color
}: {
  title: string;
  value: string | number;
  change?: number;
  icon: typeof Eye;
  color: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="bg-card/30 border-border/30 hover:border-dream-gold/30 transition-all duration-300">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <motion.div 
              className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}
              whileHover={{ rotate: 5 }}
            >
              <Icon className="w-6 h-6" />
            </motion.div>
            {change !== undefined && (
              <motion.span
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                className={`text-xs flex items-center gap-1 ${
                  change >= 0 ? "text-dream-green" : "text-red-400"
                }`}
              >
                <TrendingUp className={`w-3 h-3 ${change < 0 ? "rotate-180" : ""}`} />
                {Math.abs(change)}%
              </motion.span>
            )}
          </div>
          <motion.div 
            className="font-serif-display text-3xl mb-1"
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
          >
            {value}
          </motion.div>
          <div className="text-sm text-muted-foreground">{title}</div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// Main Analytics Dashboard
export function AnalyticsDashboard() {
  // Sample data - replace with real data from API
  const pageViews = [
    { name: "Sen", views: 4000, visitors: 2400 },
    { name: "Sel", views: 3000, visitors: 1398 },
    { name: "Rab", views: 2000, visitors: 9800 },
    { name: "Kam", views: 2780, visitors: 3908 },
    { name: "Jum", views: 1890, visitors: 4800 },
    { name: "Sab", views: 2390, visitors: 3800 },
    { name: "Min", views: 3490, visitors: 4300 },
  ];

  const topWorks = [
    { name: "Dialog dengan Kegelapan", views: 4500, reads: 2300 },
    { name: "Menggembala Hawa Nafsu", views: 3200, reads: 1800 },
    { name: "Surat untuk Tuhan", views: 2800, reads: 1500 },
    { name: "Pertemuan di Perempatan", views: 2100, reads: 1200 },
    { name: "Lautan dalam Secangkir", views: 1800, reads: 900 },
  ];

  const demographics = [
    { name: "Indonesia", value: 65 },
    { name: "Malaysia", value: 15 },
    { name: "Singapore", value: 10 },
    { name: "Lainnya", value: 10 },
  ];

  const deviceData = [
    { name: "Mobile", value: 60, color: "#d4a574" },
    { name: "Desktop", value: 30, color: "#4ade80" },
    { name: "Tablet", value: 10, color: "#60a5fa" },
  ];

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <AnimatedStatCard
          title="Total Views"
          value="24.5K"
          change={12}
          icon={Eye}
          color="bg-dream-gold/10 text-dream-gold"
        />
        <AnimatedStatCard
          title="Pengunjung Unik"
          value="8.2K"
          change={8}
          icon={Users}
          color="bg-dream-green/10 text-dream-green"
        />
        <AnimatedStatCard
          title="Waktu Baca Rata-rata"
          value="4:32"
          change={5}
          icon={Clock}
          color="bg-dream-blue/10 text-dream-blue"
        />
        <AnimatedStatCard
          title="Engagement Rate"
          value="68%"
          change={-2}
          icon={Heart}
          color="bg-dream-purple/10 text-dream-purple"
        />
      </div>

      {/* Charts */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="content">Konten</TabsTrigger>
          <TabsTrigger value="audience">Audiens</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Line Chart - Traffic */}
            <Card className="bg-card/30 border-border/30">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-dream-gold" />
                  Traffic Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={pageViews}>
                      <defs>
                        <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#d4a574" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#d4a574" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                      <XAxis dataKey="name" stroke="#888" />
                      <YAxis stroke="#888" />
                      <Tooltip 
                        contentStyle={{ 
                          background: "#1a1a1a", 
                          border: "1px solid #333",
                          borderRadius: "8px"
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="views"
                        stroke="#d4a574"
                        fillOpacity={1}
                        fill="url(#colorViews)"
                        animationDuration={1500}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Pie Chart - Devices */}
            <Card className="bg-card/30 border-border/30">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Globe className="w-5 h-5 text-dream-green" />
                  Device Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={deviceData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                        animationDuration={1000}
                      >
                        {deviceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex justify-center gap-4 mt-4">
                  {deviceData.map((item) => (
                    <div key={item.name} className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ background: item.color }}
                      />
                      <span className="text-sm text-muted-foreground">
                        {item.name} ({item.value}%)
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="content" className="mt-6">
          {/* Top Works */}
          <Card className="bg-card/30 border-border/30">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-dream-blue" />
                Karya Terpopuler
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={topWorks} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis type="number" stroke="#888" />
                    <YAxis dataKey="name" type="category" stroke="#888" width={150} />
                    <Tooltip 
                      contentStyle={{ 
                        background: "#1a1a1a", 
                        border: "1px solid #333",
                        borderRadius: "8px"
                      }}
                    />
                    <Bar 
                      dataKey="views" 
                      fill="#d4a574" 
                      radius={[0, 4, 4, 0]}
                      animationDuration={1000}
                    />
                    <Bar 
                      dataKey="reads" 
                      fill="#4ade80" 
                      radius={[0, 4, 4, 0]}
                      animationDuration={1000}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audience" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Demographics */}
            <Card className="bg-card/30 border-border/30">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Globe className="w-5 h-5 text-dream-purple" />
                  Lokasi Pengunjung
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {demographics.map((demo, index) => (
                    <motion.div
                      key={demo.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="space-y-2"
                    >
                      <div className="flex justify-between text-sm">
                        <span>{demo.name}</span>
                        <span className="text-muted-foreground">{demo.value}%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${demo.value}%` }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                          className="h-full rounded-full"
                          style={{ background: COLORS[index] }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Activity Timeline */}
            <Card className="bg-card/30 border-border/30">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Clock className="w-5 h-5 text-dream-gold" />
                  Aktivitas Terbaru
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-64 overflow-y-auto">
                  {[
                    { action: "Membaca", target: "Dialog dengan Kegelapan", time: "2 menit lalu" },
                    { action: "Bookmark", target: "Surat untuk Tuhan", time: "5 menit lalu" },
                    { action: "Share", target: "Menggembala Hawa Nafsu", time: "10 menit lalu" },
                    { action: "Komentar", target: "Pertemuan di Perempatan", time: "15 menit lalu" },
                    { action: "Daftar Member", target: "user@email.com", time: "30 menit lalu" },
                  ].map((activity, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-3 py-2 border-b border-border/30 last:border-0"
                    >
                      <div className="w-8 h-8 rounded-lg bg-dream-gold/10 flex items-center justify-center">
                        {activity.action === "Membaca" && <BookOpen className="w-4 h-4 text-dream-gold" />}
                        {activity.action === "Bookmark" && <Heart className="w-4 h-4 text-dream-purple" />}
                        {activity.action === "Share" && <Share2 className="w-4 h-4 text-dream-blue" />}
                        {activity.action === "Komentar" && <Moon className="w-4 h-4 text-dream-green" />}
                        {activity.action === "Daftar Member" && <Users className="w-4 h-4 text-dream-gold" />}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm">{activity.action}</p>
                        <p className="text-xs text-muted-foreground">{activity.target}</p>
                      </div>
                      <span className="text-xs text-muted-foreground">{activity.time}</span>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
```

---

### 4. 💬 Comment System

**Deskripsi:** Sistem komentar untuk setiap karya dengan threading dan likes

**Lokasi File:**
- `src/components/ui-custom/comment-section.tsx`
- `src/app/api/comments/route.ts`

**Database Model:**

```prisma
model Comment {
  id        String   @id @default(cuid())
  content   String
  workId    String
  work      Work     @relation(fields: [workId], references: [id], onDelete: Cascade)
  memberId  String?
  member    Member?  @relation(fields: [memberId], references: [id], onDelete: SetNull)
  parentId  String?  // For threaded comments
  parent    Comment? @relation("CommentReplies", fields: [parentId], references: [id], onDelete: Cascade)
  replies   Comment[] @relation("CommentReplies")
  likeCount Int      @default(0)
  isEdited  Boolean  @default(false)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([workId])
  @@index([memberId])
}
```

**Implementasi Komponen:**

```tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MessageCircle, Heart, Reply, MoreHorizontal,
  Edit, Trash2, Flag, Send
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface Comment {
  id: string;
  content: string;
  author: {
    name: string;
    avatar?: string;
  };
  likeCount: number;
  isLiked?: boolean;
  createdAt: string;
  replies?: Comment[];
}

// Single comment component
function CommentCard({
  comment,
  depth = 0,
  onReply,
  onLike,
  onDelete
}: {
  comment: Comment;
  depth?: number;
  onReply: (id: string) => void;
  onLike: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  const [showReplies, setShowReplies] = useState(false);
  const isReply = depth > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "relative",
        isReply && "ml-12 pl-4 border-l-2 border-dream-gold/20"
      )}
    >
      <div className="flex gap-3 py-4">
        {/* Avatar */}
        <motion.div whileHover={{ scale: 1.05 }}>
          <Avatar className="w-10 h-10">
            <AvatarImage src={comment.author.avatar} />
            <AvatarFallback className="bg-dream-gold/20 text-dream-gold">
              {comment.author.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
        </motion.div>

        {/* Content */}
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2">
            <span className="font-medium text-sm">{comment.author.name}</span>
            <span className="text-xs text-muted-foreground">
              {comment.createdAt}
            </span>
          </div>
          
          <p className="text-sm leading-relaxed">{comment.content}</p>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onLike(comment.id)}
              className={cn(
                "flex items-center gap-1 text-xs transition-colors",
                comment.isLiked 
                  ? "text-red-400" 
                  : "text-muted-foreground hover:text-red-400"
              )}
            >
              <Heart className={cn("w-4 h-4", comment.isLiked && "fill-current")} />
              {comment.likeCount > 0 && comment.likeCount}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onReply(comment.id)}
              className="flex items-center gap-1 text-xs text-muted-foreground hover:text-dream-gold transition-colors"
            >
              <Reply className="w-4 h-4" />
              Balas
            </motion.button>

            {depth === 0 && comment.replies && comment.replies.length > 0 && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => setShowReplies(!showReplies)}
                className="flex items-center gap-1 text-xs text-dream-gold"
              >
                <MessageCircle className="w-4 h-4" />
                {comment.replies.length} balasan
              </motion.button>
            )}
          </div>

          {/* Replies */}
          <AnimatePresence>
            {showReplies && comment.replies && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-2 space-y-2"
              >
                {comment.replies.map((reply) => (
                  <CommentCard
                    key={reply.id}
                    comment={reply}
                    depth={depth + 1}
                    onReply={onReply}
                    onLike={onLike}
                    onDelete={onDelete}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

// Main Comment Section
export function CommentSection({ workId }: { workId: string }) {
  const [newComment, setNewComment] = useState("");
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sample comments - replace with API data
  const comments: Comment[] = [
    {
      id: "1",
      content: "Puisi ini menyentuh hati saya. Terima kasih telah berbagi.",
      author: { name: "Budi Santoso" },
      likeCount: 12,
      isLiked: false,
      createdAt: "2 jam lalu",
      replies: [
        {
          id: "1-1",
          content: "Saya juga merasakan hal yang sama. Kata-katanya sangat dalam.",
          author: { name: "Siti Rahayu" },
          likeCount: 5,
          createdAt: "1 jam lalu"
        }
      ]
    },
    {
      id: "2",
      content: "Setiap baris membawa makna yang berbeda. Luar biasa!",
      author: { name: "Andi Prasetyo" },
      likeCount: 8,
      createdAt: "5 jam lalu"
    }
  ];

  const handleSubmit = async () => {
    if (!newComment.trim()) return;
    setIsSubmitting(true);
    // API call here
    await new Promise(r => setTimeout(r, 1000));
    setNewComment("");
    setReplyTo(null);
    setIsSubmitting(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center gap-2">
        <MessageCircle className="w-5 h-5 text-dream-gold" />
        <h3 className="font-serif-display text-xl">
          Komentar ({comments.length})
        </h3>
      </div>

      {/* Input */}
      <Card className="bg-card/30 border-border/30">
        <CardContent className="p-4">
          <div className="flex gap-3">
            <Avatar className="w-10 h-10">
              <AvatarFallback className="bg-dream-gold/20 text-dream-gold">
                U
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-3">
              {replyTo && (
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Reply className="w-3 h-3" />
                  Membalas komentar
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setReplyTo(null)}
                    className="h-6 px-2"
                  >
                    Batal
                  </Button>
                </div>
              )}
              <div className="flex gap-2">
                <Input
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder={replyTo ? "Tulis balasan..." : "Tulis komentar..."}
                  className="flex-1"
                />
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    onClick={handleSubmit}
                    disabled={isSubmitting || !newComment.trim()}
                    className="bg-dream-gold/90 hover:bg-dream-gold text-background"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Comments List */}
      <div className="space-y-4">
        {comments.map((comment) => (
          <CommentCard
            key={comment.id}
            comment={comment}
            onReply={(id) => setReplyTo(id)}
            onLike={(id) => console.log("Like", id)}
            onDelete={(id) => console.log("Delete", id)}
          />
        ))}
      </div>
    </motion.div>
  );
}
```

---

### 5. 📧 Newsletter System

**Deskripsi:** Sistem newsletter dengan email templates, scheduling, dan tracking

**Lokasi File:**
- `src/app/api/newsletter/route.ts`
- `src/components/ui-custom/newsletter-manager.tsx`

**Database Model:**

```prisma
model Newsletter {
  id          String   @id @default(cuid())
  subject     String
  content     String   // HTML content
  plainText   String?
  status      NewsletterStatus @default(draft)
  scheduledAt DateTime?
  sentAt      DateTime?
  recipientCount Int   @default(0)
  openRate    Float?
  clickRate   Float?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@index([status])
}

model NewsletterSubscriber {
  id          String   @id @default(cuid())
  email       String   @unique
  name        String?
  isActive    Boolean  @default(true)
  verifiedAt  DateTime?
  unsubscribedAt DateTime?
  createdAt   DateTime @default(now())

  @@index([email])
  @@index([isActive])
}

enum NewsletterStatus {
  draft
  scheduled
  sending
  sent
  failed
}
```

---

## 🎯 FASE 2: Engagement (Fitur 6-12)

### 6. 🏆 Gamification System

**Deskripsi:** Sistem poin, badges, leaderboard untuk engagement

**Database Models:**

```prisma
model Achievement {
  id          String   @id @default(cuid())
  name        String
  description String
  icon        String   // Emoji or icon name
  requirement String   // JSON requirements
  rarity      Rarity
  points      Int      @default(0)
  createdAt   DateTime @default(now())

  earned      AchievementEarned[]
}

model AchievementEarned {
  id            String      @id @default(cuid())
  memberId      String
  member        Member      @relation(fields: [memberId], references: [id], onDelete: Cascade)
  achievementId String
  achievement   Achievement @relation(fields: [achievementId], references: [id], onDelete: Cascade)
  earnedAt      DateTime    @default(now())

  @@unique([memberId, achievementId])
}

enum Rarity {
  common     // 70% chance
  uncommon   // 20% chance
  rare       // 8% chance
  epic       // 1.9% chance
  legendary  // 0.1% chance
}
```

**Achievement List:**

| Icon | Name | Description | Requirement | Rarity |
|------|------|-------------|-------------|--------|
| ✍️ | Pena Awal | Membaca 10 karya | worksRead >= 10 | common |
| 🌙 | Pemburu Mimpi | Mencatat 5 mimpi | dreams >= 5 | common |
| 🔥 | Api Semangat | Streak 7 hari | streak >= 7 | uncommon |
| 📚 | Penjelajah Kata | Membaca 100 karya | worksRead >= 100 | rare |
| 💎 | Jiwa Kristal | Premium member | tier >= patron | epic |
| 🌟 | Bintang Fajar | Featured writer | featured >= 1 | legendary |

---

### 7. 🎨 Theme Customization

**Deskripsi:** Custom themes, fonts, colors untuk personalisasi

**Implementasi:**

```tsx
// src/components/ui-custom/theme-customizer.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Palette, Type, Sun, Moon, Monitor, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const themes = [
  { name: "Midnight", value: "midnight", color: "#0a0a0f", accent: "#d4a574" },
  { name: "Forest", value: "forest", color: "#0f1a0f", accent: "#4ade80" },
  { name: "Ocean", value: "ocean", color: "#0f1419", accent: "#60a5fa" },
  { name: "Sunset", value: "sunset", color: "#1a0f0f", accent: "#f472b6" },
  { name: "Aurora", value: "aurora", color: "#0f0f1a", accent: "#a78bfa" },
];

const fonts = [
  { name: "Playfair Display", value: "playfair", preview: "Serif Elegan" },
  { name: "Lora", value: "lora", preview: "Serif Modern" },
  { name: "Merriweather", value: "merriweather", preview: "Serif Klasik" },
  { name: "Source Serif Pro", value: "source-serif", preview: "Serif Profesional" },
];

export function ThemeCustomizer() {
  const [selectedTheme, setSelectedTheme] = useState("midnight");
  const [selectedFont, setSelectedFont] = useState("playfair");
  const [fontSize, setFontSize] = useState(16);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Color Themes */}
      <Card className="bg-card/30 border-border/30">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Palette className="w-5 h-5 text-dream-gold" />
            Tema Warna
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-5 gap-3">
            {themes.map((theme) => (
              <motion.button
                key={theme.value}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedTheme(theme.value)}
                className={cn(
                  "relative aspect-square rounded-xl overflow-hidden border-2 transition-all",
                  selectedTheme === theme.value
                    ? "border-dream-gold ring-2 ring-dream-gold/20"
                    : "border-transparent hover:border-border"
                )}
              >
                <div
                  className="absolute inset-0"
                  style={{ background: theme.color }}
                />
                <div
                  className="absolute bottom-0 left-0 right-0 h-1/3"
                  style={{ background: theme.accent, opacity: 0.3 }}
                />
                {selectedTheme === theme.value && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute inset-0 flex items-center justify-center bg-black/50"
                  >
                    <Check className="w-6 h-6 text-white" />
                  </motion.div>
                )}
                <span className="absolute bottom-1 left-1 text-[10px] text-white/70">
                  {theme.name}
                </span>
              </motion.button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Font Selection */}
      <Card className="bg-card/30 border-border/30">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Type className="w-5 h-5 text-dream-blue" />
            Font
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {fonts.map((font) => (
              <motion.button
                key={font.value}
                whileHover={{ x: 5 }}
                onClick={() => setSelectedFont(font.value)}
                className={cn(
                  "w-full flex items-center justify-between p-3 rounded-lg border transition-all",
                  selectedFont === font.value
                    ? "border-dream-gold bg-dream-gold/10"
                    : "border-border hover:border-dream-gold/50"
                )}
              >
                <div className="text-left">
                  <p className="font-medium">{font.name}</p>
                  <p className="text-sm text-muted-foreground">{font.preview}</p>
                </div>
                {selectedFont === font.value && (
                  <Check className="w-5 h-5 text-dream-gold" />
                )}
              </motion.button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Font Size */}
      <Card className="bg-card/30 border-border/30">
        <CardHeader>
          <CardTitle className="text-lg">Ukuran Font</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">A</span>
            <input
              type="range"
              min={12}
              max={24}
              value={fontSize}
              onChange={(e) => setFontSize(Number(e.target.value))}
              className="flex-1 accent-dream-gold"
            />
            <span className="text-lg text-muted-foreground">A</span>
          </div>
          <p className="text-center mt-2 text-sm">
            {fontSize}px
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
```

---

### 8. 🔔 Notification System

**Deskripsi:** Push notifications, email alerts, in-app notifications

**Database Model:**

```prisma
model Notification {
  id          String           @id @default(cuid())
  memberId    String
  member      Member           @relation(fields: [memberId], references: [id], onDelete: Cascade)
  type        NotificationType
  title       String
  content     String
  link        String?
  isRead      Boolean          @default(false)
  readAt      DateTime?
  createdAt   DateTime         @default(now())

  @@index([memberId])
  @@index([isRead])
}

enum NotificationType {
  new_work
  new_comment
  new_follower
  achievement
  newsletter
  mention
  system
}
```

---

### 9. 🔍 Advanced Search

**Deskripsi:** Full-text search dengan filters, suggestions, history

**Implementasi:**

```tsx
// src/components/ui-custom/advanced-search.tsx
"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, X, Filter, Clock, TrendingUp,
  BookOpen, Moon, Quote, User
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface SearchResult {
  id: string;
  type: "work" | "dream" | "quote";
  title: string;
  excerpt: string;
  highlight?: string;
}

export function AdvancedSearch({ onClose }: { onClose?: () => void }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState<string[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([
    "kesadaran",
    "mimpi",
    "nafsu"
  ]);

  const filterOptions = [
    { value: "puisi", label: "Puisi", icon: BookOpen },
    { value: "esai", label: "Esai", icon: BookOpen },
    { value: "dream", label: "Dream Log", icon: Moon },
    { value: "quote", label: "Kutipan", icon: Quote },
  ];

  const search = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    // Simulate API call
    await new Promise(r => setTimeout(r, 300));

    // Sample results
    setResults([
      {
        id: "1",
        type: "work",
        title: "Dialog dengan Kegelapan",
        excerpt: "...tentang kesadaran yang muncul dari kegelapan...",
        highlight: `...<mark>${searchQuery}</mark>...`
      },
      {
        id: "2",
        type: "dream",
        title: "Pertemuan dengan Bayangan",
        excerpt: "...mimpi tentang pertemuan dengan diri sendiri..."
      },
    ]);

    setIsLoading(false);
  }, []);

  useEffect(() => {
    const debounce = setTimeout(() => {
      search(query);
    }, 300);

    return () => clearTimeout(debounce);
  }, [query, search]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4"
    >
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-background/80 backdrop-blur-xl"
        onClick={onClose}
      />

      {/* Search Container */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="relative w-full max-w-2xl bg-card border border-border rounded-2xl shadow-2xl overflow-hidden"
      >
        {/* Input */}
        <div className="flex items-center gap-3 p-4 border-b border-border">
          <Search className="w-5 h-5 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari karya, mimpi, kutipan..."
            className="border-0 focus-visible:ring-0 text-lg"
            autoFocus
          />
          {query && (
            <Button variant="ghost" size="icon" onClick={() => setQuery("")}>
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 p-4 border-b border-border bg-muted/30">
          <Filter className="w-4 h-4 text-muted-foreground" />
          {filterOptions.map((filter) => {
            const Icon = filter.icon;
            const isActive = filters.includes(filter.value);
            return (
              <motion.button
                key={filter.value}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setFilters(prev =>
                    isActive
                      ? prev.filter(f => f !== filter.value)
                      : [...prev, filter.value]
                  );
                }}
                className={cn(
                  "flex items-center gap-1 px-3 py-1.5 rounded-full text-sm transition-all",
                  isActive
                    ? "bg-dream-gold/20 text-dream-gold border border-dream-gold/30"
                    : "bg-muted text-muted-foreground hover:text-foreground"
                )}
              >
                <Icon className="w-3 h-3" />
                {filter.label}
              </motion.button>
            );
          })}
        </div>

        {/* Content */}
        <div className="max-h-[60vh] overflow-y-auto">
          <AnimatePresence mode="wait">
            {!query && recentSearches.length > 0 ? (
              <motion.div
                key="recent"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-4"
              >
                <div className="flex items-center gap-2 mb-3 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  Pencarian Terakhir
                </div>
                <div className="flex flex-wrap gap-2">
                  {recentSearches.map((search) => (
                    <motion.button
                      key={search}
                      whileHover={{ scale: 1.05 }}
                      onClick={() => setQuery(search)}
                      className="px-3 py-1.5 rounded-full bg-muted text-sm hover:bg-dream-gold/10 hover:text-dream-gold transition-colors"
                    >
                      {search}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            ) : isLoading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-center py-12"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-8 h-8 border-2 border-dream-gold border-t-transparent rounded-full"
                />
              </motion.div>
            ) : results.length > 0 ? (
              <motion.div
                key="results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="divide-y divide-border"
              >
                {results.map((result, index) => (
                  <motion.button
                    key={result.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="w-full flex items-start gap-3 p-4 hover:bg-muted/50 transition-colors text-left"
                  >
                    <div className={cn(
                      "w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0",
                      result.type === "work" && "bg-dream-gold/10 text-dream-gold",
                      result.type === "dream" && "bg-dream-purple/10 text-dream-purple",
                      result.type === "quote" && "bg-dream-blue/10 text-dream-blue"
                    )}>
                      {result.type === "work" && <BookOpen className="w-5 h-5" />}
                      {result.type === "dream" && <Moon className="w-5 h-5" />}
                      {result.type === "quote" && <Quote className="w-5 h-5" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{result.title}</p>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {result.excerpt}
                      </p>
                    </div>
                    <Badge variant="outline" className="flex-shrink-0">
                      {result.type}
                    </Badge>
                  </motion.button>
                ))}
              </motion.div>
            ) : query ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-12 text-muted-foreground"
              >
                <Search className="w-12 h-12 mb-4 opacity-50" />
                <p>Tidak ada hasil untuk "{query}"</p>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}
```

---

### 10. 📱 PWA (Progressive Web App)

**Deskripsi:** Offline support, install prompt, push notifications

**Files:**
- `public/manifest.json`
- `public/sw.js`
- `src/app/pwa/route.ts`

**manifest.json:**

```json
{
  "name": "Portal Kesadaran - Santri Angon",
  "short_name": "Portal Kesadaran",
  "description": "Portal kesadaran, perpustakaan mimpi, dan panggung sastra hidup",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#0a0a0f",
  "theme_color": "#d4a574",
  "orientation": "portrait-primary",
  "icons": [
    {
      "src": "/icons/icon-72x72.png",
      "sizes": "72x72",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-96x96.png",
      "sizes": "96x96",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-128x128.png",
      "sizes": "128x128",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-144x144.png",
      "sizes": "144x144",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-152x152.png",
      "sizes": "152x152",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-384x384.png",
      "sizes": "384x384",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ],
  "screenshots": [
    {
      "src": "/screenshots/home.png",
      "sizes": "1080x1920",
      "type": "image/png",
      "form_factor": "narrow"
    }
  ],
  "categories": ["books", "lifestyle", "social"],
  "shortcuts": [
    {
      "name": "Karya Baru",
      "short_name": "Karya",
      "description": "Lihat karya terbaru",
      "url": "/#karya",
      "icons": [{ "src": "/icons/karya-icon.png", "sizes": "96x96" }]
    },
    {
      "name": "Dream Log",
      "short_name": "Mimpi",
      "description": "Catatan mimpi",
      "url": "/#dreamlog",
      "icons": [{ "src": "/icons/dream-icon.png", "sizes": "96x96" }]
    }
  ]
}
```

---

### 11. 🌐 Multi-language Support

**Deskripsi:** Internationalization (i18n) untuk Bahasa Indonesia & English

**Implementasi:**

```tsx
// src/lib/i18n.ts
export const translations = {
  id: {
    nav: {
      home: "Beranda",
      about: "Tentang",
      works: "Karya",
      dreamlog: "Dream Log",
      archive: "Arsip",
      contact: "Kontak"
    },
    hero: {
      title: "Portal Kesadaran",
      subtitle: "Menggembala mimpi, menahan nafsu, menyapa dunia"
    },
    works: {
      title: "Karya Tulis",
      readMore: "Baca Selengkapnya",
      readingTime: "menit baca"
    }
  },
  en: {
    nav: {
      home: "Home",
      about: "About",
      works: "Works",
      dreamlog: "Dream Log",
      archive: "Archive",
      contact: "Contact"
    },
    hero: {
      title: "Portal of Consciousness",
      subtitle: "Herding dreams, restraining desires, greeting the world"
    },
    works: {
      title: "Written Works",
      readMore: "Read More",
      readingTime: "min read"
    }
  }
};

export type Locale = keyof typeof translations;
```

---

### 12. 📈 SEO & Social Sharing

**Deskripsi:** Optimized SEO, Open Graph, Twitter Cards, Structured Data

**Implementasi di layout.tsx:**

```tsx
// src/app/layout.tsx
import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://santriangon.com"),
  title: {
    default: "Santri Angon | Portal Kesadaran",
    template: "%s | Santri Angon"
  },
  description: "Portal kesadaran, perpustakaan mimpi, dan panggung sastra hidup. Menggembala mimpi, menahan nafsu, menyapa dunia.",
  keywords: [
    "sastra Indonesia",
    "puisi",
    "esai",
    "kesadaran",
    "mimpi",
    "spiritualitas",
    "Santri Angon",
    "Prabu Danling"
  ],
  authors: [{ name: "Gugun Gunara", url: "https://santriangon.com" }],
  creator: "Gugun Gunara",
  publisher: "Santri Angon",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    alternateLocale: "en_US",
    url: "https://santriangon.com",
    siteName: "Portal Kesadaran",
    title: "Santri Angon | Portal Kesadaran",
    description: "Portal kesadaran, perpustakaan mimpi, dan panggung sastra hidup",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Santri Angon - Portal Kesadaran"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Santri Angon | Portal Kesadaran",
    description: "Portal kesadaran, perpustakaan mimpi, dan panggung sastra hidup",
    images: ["/og-image.png"],
    creator: "@santriangon"
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code"
  }
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f5f5" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0f" }
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5
};
```

---

## 🎯 FASE 3: AI & Advanced (Fitur 13-20)

### 13. 🤖 AI Writing Assistant (Enhanced)

**Deskripsi:** AI untuk membantu menulis dengan suggestions, grammar check, style analysis

**API Implementation:**

```tsx
// src/app/api/ai/writing-assistant/route.ts
import { NextRequest, NextResponse } from "next/server";
import { LLM } from "z-ai-web-dev-sdk";

export async function POST(request: NextRequest) {
  try {
    const { prompt, type, style } = await request.json();

    const systemPrompt = `Kamu adalah asisten penulis kreatif bernama "Angon AI" 
    yang membantu menulis karya sastra dalam Bahasa Indonesia. 
    Gaya penulisan: puitis, filosofis, spiritual, dan mendalam.
    Nama penulis: Santri Angon / Prabu Danling.`;

    const llm = new LLM();
    const response = await llm.chat({
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: generatePrompt(prompt, type, style) }
      ],
      temperature: 0.8,
      maxTokens: 2000
    });

    return NextResponse.json({
      success: true,
      data: {
        suggestions: parseSuggestions(response.content),
        metadata: {
          style: style,
          type: type,
          generatedAt: new Date().toISOString()
        }
      }
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Gagal generate konten" },
      { status: 500 }
    );
  }
}

function generatePrompt(prompt: string, type: string, style: string): string {
  const prompts = {
    puisi: `Buatkan 3 variasi puisi dengan tema "${prompt}".
    Gaya: ${style || "filosofis dan spiritual"}
    Setiap variasi harus berbeda nuansa.`,

    esai: `Buatkan outline esai tentang "${prompt}".
    Struktur: Pendahuluan, 3 Poin Utama, Kesimpulan.
    Gaya: ${style || "reflektif dan mendalam"}`,

    cerpen: `Buatkan kerangka cerpen dengan premis "${prompt}".
    Sertakan: Tokoh, Konflik, Klimaks, Resolusi.
    Gaya: ${style || "misterius dan puitis"}`
  };

  return prompts[type as keyof typeof prompts] || prompts.puisi;
}
```

---

### 14. 🎤 Voice to Poetry

**Deskripsi:** Speech-to-text untuk dikte puisi, lalu convert ke format puitis

**Implementation dengan ASR:**

```tsx
// src/components/ui-custom/voice-to-poetry.tsx
"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, Square, Wand2, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function VoiceToPoetry() {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [poem, setPoem] = useState("");

  // Voice recording using Web Speech API
  const startRecording = useCallback(() => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Browser tidak mendukung Speech Recognition");
      return;
    }

    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "id-ID";

    recognition.onresult = (event: any) => {
      let finalTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        finalTranscript += event.results[i][0].transcript;
      }
      setTranscript(finalTranscript);
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error:", event.error);
      setIsRecording(false);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    recognition.start();
    setIsRecording(true);

    // Store recognition instance for stopping
    (window as any).currentRecognition = recognition;
  }, []);

  const stopRecording = useCallback(() => {
    const recognition = (window as any).currentRecognition;
    if (recognition) {
      recognition.stop();
    }
    setIsRecording(false);
  }, []);

  const convertToPoem = async () => {
    if (!transcript) return;
    setIsProcessing(true);

    try {
      const response = await fetch("/api/ai/writing-assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: transcript,
          type: "puisi",
          style: "natural dan mengalir"
        })
      });

      const data = await response.json();
      if (data.success) {
        setPoem(data.data.suggestions[0]);
      }
    } catch (error) {
      console.error("Error converting to poem:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Recording Button */}
      <div className="flex flex-col items-center gap-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={isRecording ? stopRecording : startRecording}
          className={cn(
            "w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300",
            isRecording
              ? "bg-red-500 hover:bg-red-600 animate-pulse"
              : "bg-dream-blue/20 hover:bg-dream-blue/30 border-2 border-dream-blue/30"
          )}
        >
          {isRecording ? (
            <Square className="w-8 h-8 text-white" />
          ) : (
            <Mic className="w-10 h-10 text-dream-blue" />
          )}
        </motion.button>

        <p className="text-sm text-muted-foreground">
          {isRecording ? "Mendengarkan... Klik untuk berhenti" : "Klik untuk mulai berbicara"}
        </p>

        {isRecording && (
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="flex gap-1"
          >
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ height: [10, 30, 10] }}
                transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
                className="w-1 bg-dream-blue rounded-full"
              />
            ))}
          </motion.div>
        )}
      </div>

      {/* Transcript */}
      <AnimatePresence>
        {transcript && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <Card className="bg-card/30 border-border/30">
              <CardContent className="p-4">
                <p className="mb-4">{transcript}</p>
                <Button
                  onClick={convertToPoem}
                  disabled={isProcessing}
                  className="bg-dream-purple/90 hover:bg-dream-purple"
                >
                  <Wand2 className="w-4 h-4 mr-2" />
                  {isProcessing ? "Mengubah..." : "Ubah ke Puisi"}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Generated Poem */}
      <AnimatePresence>
        {poem && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <Card className="bg-dream-purple/5 border-dream-purple/20">
              <CardContent className="p-6">
                <pre className="whitespace-pre-wrap font-serif text-center leading-relaxed mb-4">
                  {poem}
                </pre>
                <div className="flex justify-center gap-2">
                  <Button variant="outline" size="sm">
                    <Copy className="w-4 h-4 mr-2" />
                    Salin
                  </Button>
                  <Button variant="outline" size="sm">
                    Simpan ke Karya
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
```

---

### 15. 🌙 Dream Interpretation AI

**Deskripsi:** AI untuk menafsirkan mimpi berdasarkan simbol dan arketipe Jung

**Implementation:**

```tsx
// src/app/api/ai/dream-interpretation/route.ts
import { NextRequest, NextResponse } from "next/server";
import { LLM } from "z-ai-web-dev-sdk";

export async function POST(request: NextRequest) {
  try {
    const { dreamContent } = await request.json();

    const systemPrompt = `Kamu adalah ahli oneirologi (ilmu mimpi) dengan pendekatan 
    Jungian archetype. Tugasmu menafsirkan mimpi berdasarkan:
    
    1. Simbol-simbol dalam mimpi
    2. Arketipe Jung (Shadow, Anima/Animus, Self, Persona, Hero)
    3. Konteks spiritual dan kesadaran
    4. Panduan refleksi personal
    
    Respon dalam format JSON:
    {
      "summary": "Ringkasan mimpi dan makna umum",
      "symbols": [
        {"symbol": "nama simbol", "meaning": "makna simbol"}
      ],
      "archetype": "Nama arketipe dominan",
      "guidance": "Panduan refleksi untuk pemimpi"
    }`;

    const llm = new LLM();
    const response = await llm.chat({
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: `Tafsirkan mimpi ini:\n\n${dreamContent}` }
      ],
      temperature: 0.7,
      maxTokens: 1500
    });

    // Parse JSON from response
    const interpretation = JSON.parse(response.content);

    return NextResponse.json({
      success: true,
      data: interpretation
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Gagal menafsirkan mimpi" },
      { status: 500 }
    );
  }
}
```

---

### 16. 📊 Reading Analytics Personal

**Deskripsi:** Tracking kebiasaan membaca per user, insights, recommendations

---

### 17. 🎯 Smart Recommendations

**Deskripsi:** AI-powered content recommendations berdasarkan mood, history

---

### 18. 🏅 Writing Challenges & Streaks

**Deskripsi:** Tantangan menulis dengan target, deadline, rewards

---

### 19. 📱 QR Code Magic Share

**Deskripsi:** QR code unik untuk setiap karya, tracking scans

---

### 20. 🎙️ Live Reading Room

**Deskripsi:** Streaming sesi baca puisi dengan WebRTC

---

## 🎯 FASE 4: Premium Features (Fitur 21-25)

### 21. 💎 NFT Certificates

**Deskripsi:** NFT untuk karya digital sebagai sertifikat keaslian

---

### 22. 🧠 Mind Map Writing

**Deskripsi:** Visual mind map untuk brainstorming ide

---

### 23. 📚 E-book Generator

**Deskripsi:** Export kumpulan karya ke format EPUB/PDF

---

### 24. 🎨 AI Image Generation for Covers

**Deskripsi:** Generate cover image dengan AI untuk setiap karya

---

### 25. 🤝 Collaboration Writing

**Deskripsi:** Fitur kolaborasi menulis bersama member lain

---

## 🎯 FASE 5: Enterprise Features (Fitur 26-30)

### 26. 📊 Admin Analytics Pro

**Deskripsi:** Dashboard analitik lengkap untuk admin

---

### 27. 🔐 Role-Based Access Control (RBAC)

**Deskripsi:** Sistem permission untuk berbagai role

---

### 28. 📧 Email Marketing Integration

**Deskripsi:** Integrasi dengan email marketing services

---

### 29. 💳 Payment Integration

**Deskripsi:** Payment gateway untuk membership premium

---

### 30. 🌐 API & Webhooks

**Deskripsi:** Public API dan webhooks untuk integrasi eksternal

---

# 4. PANDUAN PER ROLE <a name="panduan-per-role"></a>

## 4.1 Role Hierarchy

```
┌─────────────────────────────────────────────────────────────┐
│                      ROLE HIERARCHY                          │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  SUPER ADMIN ──────────────────────────────────────────────│
│  ├── Full access ke semua fitur                            │
│  ├── Kelola semua users                                    │
│  ├── Kelola konten                                         │
│  ├── Akses analytics                                       │
│  └── Konfigurasi sistem                                    │
│                                                              │
│  MEMBER (Logged In) ───────────────────────────────────────│
│  ├── Free Tier                                             │
│  │   ├── Baca semua karya published                        │
│  │   ├── Bookmark 10 karya                                 │
│  │   ├── Komentar                                          │
│  │   └── Newsletter                                        │
│  │                                                         │
│  ├── Supporter (Rp 50K/bulan)                              │
│  │   ├── Semua fitur Free                                  │
│  │   ├── Bookmark unlimited                                │
│  │   ├── Reading insights                                  │
│  │   └── Badge Supporter                                   │
│  │                                                         │
│  ├── Patron (Rp 150K/bulan)                                │
│  │   ├── Semua fitur Supporter                             │
│  │   ├── Early access                                      │
│  │   ├── AI Writing Assistant                              │
│  │   └── Badge Patron                                      │
│  │                                                         │
│  └── Legend (Rp 500K/bulan)                                │
│      ├── Semua fitur Patron                                │
│      ├── Personal mentoring                                │
│      ├── NFT certificate                                   │
│      └── Badge Legend                                      │
│                                                              │
│  GUEST (Not Logged In) ────────────────────────────────────│
│  ├── Baca karya published                                  │
│  ├── Lihat Dream Log                                       │
│  ├── Subscribe newsletter                                  │
│  └── Kirim pesan kontak                                    │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## 4.2 Permission Matrix

| Fitur | Guest | Free | Supporter | Patron | Legend | Admin |
|-------|-------|------|-----------|--------|--------|-------|
| Baca karya | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Bookmark | ❌ | 10 | ∞ | ∞ | ∞ | ∞ |
| Komentar | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Newsletter | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Reading Stats | ❌ | ❌ | ✅ | ✅ | ✅ | ✅ |
| AI Assistant | ❌ | ❌ | ❌ | ✅ | ✅ | ✅ |
| NFT Certificate | ❌ | ❌ | ❌ | ❌ | ✅ | ✅ |
| Admin Panel | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ |
| CRUD Konten | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ |
| User Management | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ |

---

# 5. PANDUAN ADMIN PANEL <a name="panduan-admin-panel"></a>

## 5.1 Struktur Admin Panel

```
/admin
├── Overview (Dashboard)
│   ├── Stats Overview (Karya, Mimpi, Pembaca, Views)
│   ├── Recent Activity Feed
│   ├── Quick Actions
│   └── Notifications
│
├── Karya Management
│   ├── List View (Table)
│   ├── Create/Edit Modal
│   ├── Rich Text Editor
│   ├── Cover Image Upload
│   ├── Publish/Draft Toggle
│   └── Feature Toggle
│
├── Dream Log Management
│   ├── Timeline View
│   ├── Create/Edit Modal
│   ├── Lucidity Indicator
│   ├── Mood Selector
│   └── AI Interpretation
│
├── Quotes Management
│   ├── List View
│   ├── Create/Edit
│   ├── Feature Toggle
│   └── Link to Work
│
├── Members Management
│   ├── User List
│   ├── Tier Management
│   ├── Activity Log
│   └── Ban/Unban
│
├── Comments Moderation
│   ├── Pending Comments
│   ├── Approve/Reject
│   └── Reported Comments
│
├── Analytics
│   ├── Traffic Overview
│   ├── Content Performance
│   ├── User Engagement
│   └── Export Reports
│
├── Newsletter
│   ├── Subscriber List
│   ├── Create Campaign
│   ├── Schedule Send
│   └── Track Opens
│
└── Settings
    ├── Site Configuration
    ├── Theme Settings
    ├── SEO Settings
    └── API Keys
```

## 5.2 Cara Menambah Menu Admin Baru

**Step 1: Tambah ke Navigation**

Buka `src/app/admin/page.tsx`, cari array `tabs`:

```tsx
const tabs = [
  { id: "overview" as Tab, label: "Overview", icon: BarChart3 },
  { id: "works" as Tab, label: "Karya", icon: BookOpen },
  { id: "dreamlogs" as Tab, label: "Dream Log", icon: Moon },
  { id: "quotes" as Tab, label: "Kutipan", icon: Quote },
  // TAMBAHKAN BARU DI SINI:
  { id: "members" as Tab, label: "Members", icon: Users },
  { id: "analytics" as Tab, label: "Analytics", icon: TrendingUp },
];
```

**Step 2: Tambah Tab Content**

```tsx
{activeTab === "members" && (
  <motion.div
    key="members"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
  >
    {/* Content members di sini */}
    <MembersManagement />
  </motion.div>
)}
```

**Step 3: Buat Komponen**

Buat file baru `src/components/admin/members-management.tsx`:

```tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Users, Crown, Star, Search } from "lucide-react";
// ... implementation
```

---

# 6. PANDUAN MEMBER SYSTEM <a name="panduan-member-system"></a>

## 6.1 Authentication Flow

```
┌─────────────────────────────────────────────────────────────┐
│                   AUTHENTICATION FLOW                        │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  REGISTER                                                    │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ 1. User isi form (name, email, password)            │   │
│  │ 2. Validasi di client                                │   │
│  │ 3. POST /api/auth/register                          │   │
│  │ 4. Server validasi                                   │   │
│  │ 5. Hash password                                     │   │
│  │ 6. Create Member record                              │   │
│  │ 7. Generate session token                            │   │
│  │ 8. Return member data + token                        │   │
│  │ 9. Store di Zustand (persist to localStorage)       │   │
│  │ 10. Redirect ke /member/profile                     │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
│  LOGIN                                                       │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ 1. User isi form (email, password)                  │   │
│  │ 2. POST /api/auth/login                              │   │
│  │ 3. Server cari member by email                       │   │
│  │ 4. Verify password hash                              │   │
│  │ 5. Generate session token                            │   │
│  │ 6. Update lastActive                                 │   │
│  │ 7. Return member data + token                        │   │
│  │ 8. Store di Zustand                                  │   │
│  │ 9. Redirect ke /member/profile                      │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
│  LOGOUT                                                      │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ 1. Clear Zustand store                               │   │
│  │ 2. Clear localStorage                                │   │
│  │ 3. Redirect ke /                                     │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## 6.2 Protected Routes

Buat middleware untuk protected routes:

```tsx
// src/app/member/profile/page.tsx
"use client";

import { useEffect } from "react";
import { useMemberStore } from "@/lib/store/member-store";

export default function ProfilePage() {
  const { member, isAuthenticated } = useMemberStore();

  useEffect(() => {
    // Redirect jika belum login
    if (!isAuthenticated) {
      window.location.href = "/member/login";
    }
  }, [isAuthenticated]);

  // Loading state
  if (!member) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-2 border-dream-gold border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    // Profile content
  );
}
```

---

# 7. PANDUAN GUEST EXPERIENCE <a name="panduan-guest-experience"></a>

## 7.1 Guest Features

| Fitur | Keterangan |
|-------|------------|
| Baca Karya | Full access ke semua karya published |
| Dream Log | Lihat semua catatan mimpi |
| Archive | Browse dan filter arsip |
| Newsletter | Subscribe ke newsletter |
| Contact | Kirim pesan via form |
| Social Share | Share karya ke sosmed |

## 7.2 Guest Limitations

| Fitur | Keterangan |
|-------|------------|
| Bookmark | Perlu login |
| Komentar | Perlu login |
| Reading Stats | Perlu login |
| AI Features | Perlu tier tertentu |

## 7.3 Upgrade Prompt

Tampilkan prompt untuk upgrade ke member saat guest mencoba fitur premium:

```tsx
// src/components/ui-custom/upgrade-prompt.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Crown, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function UpgradePrompt({
  isOpen,
  onClose,
  feature
}: {
  isOpen: boolean;
  onClose: () => void;
  feature: string;
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} />

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <Card className="bg-card border-border max-w-md relative">
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4"
                onClick={onClose}
              >
                <X className="w-4 h-4" />
              </Button>

              <CardContent className="p-6 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="w-16 h-16 rounded-full bg-dream-gold/10 flex items-center justify-center mx-auto mb-4"
                >
                  <Crown className="w-8 h-8 text-dream-gold" />
                </motion.div>

                <h3 className="font-serif-display text-xl mb-2">
                  Unlock {feature}
                </h3>
                <p className="text-muted-foreground mb-6">
                  Bergabung sebagai member untuk mengakses fitur ini dan banyak lagi.
                </p>

                <div className="flex flex-col gap-2">
                  <Button className="bg-dream-gold/90 hover:bg-dream-gold text-background" asChild>
                    <a href="/member/register">Daftar Gratis</a>
                  </Button>
                  <Button variant="outline" asChild>
                    <a href="/member/login">Sudah punya akun? Masuk</a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

---

# 8. ANIMASI & STYLING GUIDE <a name="animasi-styling-guide"></a>

## 8.1 Framer Motion Patterns

### Fade In

```tsx
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.5 }}
>
  Content
</motion.div>
```

### Slide Up

```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  Content
</motion.div>
```

### Staggered Children

```tsx
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

<motion.div variants={container} initial="hidden" animate="show">
  {items.map((item) => (
    <motion.div key={item.id} variants={item}>
      {item.content}
    </motion.div>
  ))}
</motion.div>
```

### Hover Scale

```tsx
<motion.div
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
  Content
</motion.div>
```

### Animated Presence

```tsx
<AnimatePresence mode="wait">
  {isVisible && (
    <motion.div
      key="content"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      Content
    </motion.div>
  )}
</AnimatePresence>
```

### Scroll Animation

```tsx
<motion.div
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-100px" }}
  transition={{ duration: 0.6 }}
>
  Content
</motion.div>
```

## 8.2 CSS Custom Properties

```css
/* Dream Color Palette */
:root {
  --dream-gold: #d4a574;
  --dream-gold-light: #e8c9a0;
  --dream-gold-dark: #b8956a;
  
  --dream-green: #4ade80;
  --dream-green-light: #86efac;
  --dream-green-dark: #22c55e;
  
  --dream-blue: #60a5fa;
  --dream-blue-light: #93c5fd;
  --dream-blue-dark: #3b82f6;
  
  --dream-purple: #a78bfa;
  --dream-purple-light: #c4b5fd;
  --dream-purple-dark: #8b5cf6;
}

/* Glass Effect */
.glass {
  background: rgba(10, 10, 15, 0.8);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.05);
}

/* Text Gradient */
.text-gradient {
  background: linear-gradient(135deg, var(--dream-gold), var(--dream-purple));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Divider */
.divider-dream {
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    var(--dream-gold) 20%,
    var(--dream-purple) 80%,
    transparent
  );
}
```

## 8.3 Animation Utilities

```tsx
// src/lib/animations.ts
export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 }
};

export const slideUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

export const slideIn = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 }
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 }
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

export const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export const springTransition = {
  type: "spring",
  stiffness: 300,
  damping: 30
};

export const smoothTransition = {
  duration: 0.5,
  ease: [0.4, 0, 0.2, 1]
};
```

---

# 9. DATABASE SCHEMA GUIDE <a name="database-schema-guide"></a>

## 9.1 Prisma Best Practices

### Relations

```prisma
// One-to-Many
model Member {
  id        String     @id @default(cuid())
  bookmarks Bookmark[]
}

model Bookmark {
  id       String @id @default(cuid())
  memberId String
  member   Member @relation(fields: [memberId], references: [id], onDelete: Cascade)
}

// Many-to-Many (through explicit join table)
model Work {
  id      String       @id @default(cuid())
  authors WorkAuthor[]
}

model Member {
  id         String     @id @default(cuid())
  authorWorks WorkAuthor[]
}

model WorkAuthor {
  workId   String
  work     Work   @relation(fields: [workId], references: [id], onDelete: Cascade)
  memberId String
  member   Member @relation(fields: [memberId], references: [id], onDelete: Cascade)
  
  @@id([workId, memberId])
}
```

### Indexes

```prisma
model Work {
  // ... fields
  
  @@index([type])        // Single column index
  @@index([isPublished, isFeatured])  // Composite index
  @@index([createdAt(sort: Desc)])  // Sorted index
}
```

### Enums

```prisma
enum MemberTier {
  free
  supporter
  patron
  legend
}

enum WorkType {
  puisi
  esai
  cerpen
  artikel
}
```

## 9.2 Migration Commands

```bash
# Push schema changes (development)
bun run db:push

# Create migration (production)
bunx prisma migrate dev --name add_comments_table

# Apply migrations (production)
bunx prisma migrate deploy

# Reset database (development only!)
bunx prisma migrate reset

# Seed data
bun run db:seed

# Open Prisma Studio
bunx prisma studio
```

---

# 10. API ROUTES GUIDE <a name="api-routes-guide"></a>

## 10.1 API Structure

```
/api
├── works/
│   ├── route.ts          # GET (list), POST (create)
│   └── [id]/route.ts     # GET, PUT, DELETE
│
├── dreamlogs/
│   ├── route.ts
│   └── [id]/route.ts
│
├── quotes/
│   └── route.ts
│
├── contact/
│   └── route.ts
│
├── auth/
│   ├── register/route.ts
│   └── login/route.ts
│
├── ai/
│   ├── writing-assistant/route.ts
│   └── dream-interpretation/route.ts
│
└── newsletter/
    └── route.ts
```

## 10.2 Standard Response Format

```tsx
// Success Response
{
  "success": true,
  "data": { ... },
  "message": "Optional message"
}

// Error Response
{
  "success": false,
  "error": "Error message"
}
```

## 10.3 Error Handling

```tsx
import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";

export async function GET(request: NextRequest) {
  try {
    // ... logic

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error("Error:", error);

    // Prisma error
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return NextResponse.json(
          { success: false, error: "Data sudah ada" },
          { status: 400 }
        );
      }
    }

    // Generic error
    return NextResponse.json(
      { success: false, error: "Terjadi kesalahan" },
      { status: 500 }
    );
  }
}
```

---

# 11. DEPLOYMENT & PRODUCTION <a name="deployment-production"></a>

## 11.1 Environment Variables

```env
# .env.production

# Database (Supabase)
DATABASE_URL="postgresql://..."

# NextAuth
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="https://santriangon.com"

# OAuth
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."

# AI Services
Z_AI_API_KEY="..."

# Analytics
NEXT_PUBLIC_GA_ID="G-..."
```

## 11.2 Vercel Deployment

1. Connect GitHub repository
2. Set environment variables
3. Deploy!

```bash
# Or use Vercel CLI
vercel --prod
```

## 11.3 Performance Checklist

- [ ] Enable Edge Functions untuk API routes
- [ ] Setup ISR (Incremental Static Regeneration)
- [ ] Optimize images dengan next/image
- [ ] Enable Gzip compression
- [ ] Setup CDN untuk static assets
- [ ] Monitor dengan Vercel Analytics
- [ ] Test dengan Lighthouse (target: 95+)

---

# 📎 APPENDIX

## A. Useful Commands

```bash
# Development
bun run dev          # Start dev server
bun run lint         # Check code quality
bun run build        # Build for production

# Database
bun run db:push      # Push schema changes
bun run db:seed      # Seed sample data
bunx prisma studio   # Open database GUI

# Generate
bunx prisma generate # Generate Prisma Client
```

## B. File Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `HeroSection.tsx` |
| Pages | lowercase | `page.tsx` |
| API Routes | lowercase | `route.ts` |
| Utilities | camelCase | `utils.ts` |
| Constants | SCREAMING_SNAKE | `API_ENDPOINTS.ts` |

## C. Git Commit Messages

```
feat: add new feature
fix: bug fix
docs: documentation changes
style: formatting, no code change
refactor: code refactoring
test: adding tests
chore: maintenance tasks
```

---

# 🌟 PENUTUP

Dokumentasi ini adalah **Wikipedia Portal Kesadaran** yang akan terus berkembang seiring dengan pengembangan proyek. Setiap fitur baru harus didokumentasikan dengan mengikuti format yang ada.

**"Prak burukeun, ulah edan, kudu eling"**
*Segerakan kesadaran, jangan gila, tetap waspada*

---

*Last Updated: 2024*
*Author: Z.ai Code - Navigasi Peradaban Baru*
