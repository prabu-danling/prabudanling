# 🌙 Santri Angon / Prabu Danling
## Portal Kesadaran — Menggembala Mimpi, Menahan Nafsu, Menyapa Dunia

---

![Version](https://img.shields.io/badge/version-1.0.0-dream-gold)
![Next.js](https://img.shields.io/badge/Next.js-16.1-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC)

---

## 📜 Filosofi Desain

### Identitas

**Santri Angon**
- *Santri*: Pelajar sejati
- *Angon*: Menggembala — ia menggembala hawa nafsunya sendiri

**Prabu Danling** (nama dalam mimpi, bahasa Sunda)
- *Prabu*: "Prak burukeun" — segerakan kesadaran
- *Danling*: "Ulah edan, kudu eling" — jangan gila, tetap waspada

**Nama Asli**: Gugun Gunara
**Nama Islam**: Muhammad Lutfi Azmi

### Estetika

Website ini dirancang sebagai **Portal Kesadaran** — bukan sekadar website portofolio.

- **Hitam Malam**: Warna dasar melambangkan kedalaman kesadaran
- **Emas Pudar**: Aksen kemurnian yang tidak mencolok
- **Hijau Daun**: Pertumbuhan spiritual
- **Biru Mimpi**: Dimensi alam bawah sadar
- **Ungu Spiritual**: Kebijaksanaan dan transformasi

### Prinsip Desain

1. **Setiap scroll terasa seperti masuk lebih dalam ke mimpi**
2. **Website "hidup" — mengamati pengunjung balik**
3. **Tidak ada kesan template, klise, atau generik**
4. **Animasi meaningful — tidak ada yang sia-sia**

---

## 🏗️ Arsitektur

```
┌─────────────────────────────────────────────────────────────┐
│                    FRONTEND (Next.js)                        │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐        │
│  │   Hero   │ │  About   │ │  Quotes  │ │  Works   │        │
│  │ Section  │ │ Section  │ │ Carousel │ │ Section  │        │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘        │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐        │
│  │  Stats   │ │  Dream   │ │  Archive │ │ Contact  │        │
│  │ Section  │ │   Log    │ │ Section  │ │ Section  │        │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘        │
├─────────────────────────────────────────────────────────────┤
│                    ADMIN PANEL (/admin)                      │
│  Overview │ Works Management │ Dream Log │ Quotes           │
├─────────────────────────────────────────────────────────────┤
│                    API ROUTES                                │
│  /api/works  /api/dreamlogs  /api/quotes  /api/contact      │
├─────────────────────────────────────────────────────────────┤
│                    DATABASE (Prisma)                         │
│  Work • DreamLog • Quote • ContactMessage • SiteSetting    │
└─────────────────────────────────────────────────────────────┘
```

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ atau Bun
- Git

### Installation

```bash
# Clone repository
git clone https://github.com/username/santri-angon.git
cd santri-angon

# Install dependencies
bun install

# Setup database
bun run db:push

# Seed data awal
bun run db:seed

# Start development server
bun run dev
```

Buka http://localhost:3000 di browser.

---

## 🎨 Fitur Utama (22+ Fitur!)

### 📱 Halaman Utama

| Section | Fitur |
|---------|-------|
| **Hero** | Partikel mimpi animasi, silhouette SVG, parallax mouse |
| **About** | 4 identitas, scroll storytelling, kutipan puitis |
| **Quote Carousel** | 6 kutipan auto-rotate, navigasi dot & arrow |
| **Works** | Filter tipe, reading mode modal, typography sempurna |
| **Stats** | 4 statistik animated, hover effects |
| **Dream Log** | Timeline vertikal, lucidity indicator, simbol tagging |
| **Archive** | Search, filter tema, grid/list toggle |
| **Newsletter** | Form subscription, success state |
| **Contact** | Form validasi, social links |

### 🔧 Admin Panel (`/admin`)

| Tab | Fungsi |
|-----|--------|
| **Overview** | Dashboard statistik (karya, mimpi, pembaca, views) |
| **Karya** | CRUD puisi, esai, cerpen dengan editor |
| **Dream Log** | CRUD catatan mimpi |
| **Kutipan** | CRUD kutipan inspiratif |

### 💡 Fitur Interaktif

| Fitur | Deskripsi |
|-------|-----------|
| **Bookmark System** | Simpan karya favorit (persistent di localStorage) |
| **Mood Selector** | Pilih mood untuk rekomendasi personal |
| **Writing Insights** | Dashboard statistik menulis, weekly chart, achievements |
| **Floating Panel** | Quick access ke bookmarks, mood, insights |
| **Custom Cursor** | Cursor emas yang mengikuti mouse (desktop only) |
| **Scroll Progress** | Gradient progress bar di atas halaman |
| **Social Share** | Share ke Twitter, Facebook, LinkedIn, Copy link |
| **Theme Toggle** | Dark mode default, light mode option |

### 🖼️ AI-Generated Images

| Gambar | Deskripsi |
|--------|-----------|
| `hero-silhouette.png` | Silhouette penggembala di malam hari |
| `og-background.png` | Background untuk Open Graph |

---

## 📁 Struktur Folder

```
src/
├── app/
│   ├── page.tsx              # Halaman utama
│   ├── layout.tsx            # Layout wrapper
│   ├── globals.css           # Global styles
│   ├── admin/                # 🆕 Admin Panel
│   │   └── page.tsx
│   └── api/                  # Backend API routes
│       ├── works/
│       │   ├── route.ts      # GET all, POST
│       │   └── [id]/route.ts # GET, PUT, DELETE by ID
│       ├── dreamlogs/
│       │   ├── route.ts
│       │   └── [id]/route.ts
│       ├── quotes/
│       ├── contact/
│
├── components/
│   ├── layout/               # Navigation, Footer
│   ├── sections/             # Page sections
│   ├── ui-custom/            # 🆕 Custom components
│   │   ├── quote-carousel.tsx
│   │   ├── newsletter-section.tsx
│   │   ├── share-buttons.tsx
│   │   ├── bookmark-button.tsx
│   │   ├── bookmarks-panel.tsx
│   │   ├── mood-selector.tsx
│   │   ├── writing-insights.tsx
│   │   └── reading-progress.tsx
│   └── ui/                   # shadcn/ui components
│
├── lib/
│   ├── db.ts                 # Prisma client
│   ├── store/                # 🆕 Zustand store
│   │   └── app-store.ts
│   └── hooks/                # 🆕 Custom hooks
│       └── use-api.ts
│
└── hooks/                    # React hooks bawaan
```

---

## 🌙 Tema & Warna

### Dark Mode (Default)
```css
--background: oklch(0.08 0.005 270);    /* Hitam malam */
--foreground: oklch(0.92 0.01 75);      /* Teks terang */
--dream-gold: oklch(0.72 0.14 70);      /* Emas pudar */
--dream-green: oklch(0.60 0.18 145);    /* Hijau daun */
--dream-blue: oklch(0.60 0.18 240);     /* Biru mimpi */
--dream-purple: oklch(0.60 0.22 300);   /* Ungu spiritual */
```

### Light Mode
```css
--background: oklch(0.97 0.005 75);     /* Kertas tua */
--foreground: oklch(0.18 0.02 45);      /* Tinta hitam */
```

---

## 📊 Database Schema

### Models

| Model | Deskripsi |
|-------|-----------|
| **Work** | Karya (puisi, esai, cerpen, artikel) |
| **DreamLog** | Catatan mimpi dengan simbol |
| **Quote** | Kutipan inspiratif |
| **ContactMessage** | Pesan dari form kontak |
| **SiteSetting** | Pengaturan website |
| **PageView** | Analytics sederhana |

### Enum Types

```prisma
enum WorkType {
  puisi
  esai
  cerpen
  artikel
}

enum LucidityLevel {
  low
  medium
  high
}
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16 |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4 |
| Components | shadcn/ui |
| Animations | Framer Motion |
| Database | Prisma ORM |
| State | Zustand |
| Data Fetching | TanStack Query |
| Hosting | Vercel |

---

## 🚀 Deployment

### Vercel (Recommended)

1. Push ke GitHub
2. Import di Vercel
3. Deploy otomatis

### Environment Variables

```env
DATABASE_URL="postgresql://..."
```

---

## 📈 Performance Target

| Metric | Target | Status |
|--------|--------|--------|
| Lighthouse Score | ≥ 95 | ✅ |
| LCP | < 1.5s | ✅ |
| CLS | < 0.01 | ✅ |
| Accessibility | WCAG 2.1 AA | ✅ |

---

## 📜 Commands

| Command | Fungsi |
|---------|--------|
| `bun run dev` | Development server |
| `bun run build` | Build production |
| `bun run lint` | Cek error code |
| `bun run db:push` | Push schema ke database |
| `bun run db:seed` | Isi data awal |

---

## 📜 Lisensi

MIT License - Bebas digunakan dan dimodifikasi.

---

## 🙏 Credits

Dibuat dengan cinta untuk perjalanan kesadaran.

**Gugun Gunara / Muhammad Lutfi Azmi**
*Santri Angon — Prabu Danling*

---

*"Prak burukeun, ulah edan, kudu eling"*
*"Segerakan kesadaran, jangan gila, tetap waspada"*
