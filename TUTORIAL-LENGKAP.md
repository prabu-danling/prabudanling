# 📚 TUTORIAL LENGKAP: Website Santri Angon / Prabu Danling
## Panduan untuk Pemula yang Baru Mengenal Next.js

---

# 🎯 DAFTAR ISI

1. [Apa itu Next.js?](#1-apa-itu-nextjs)
2. [Struktur Folder Website](#2-struktur-folder-website)
3. [Fitur-Fitur Website](#3-fitur-fitur-website)
4. [Cara Menggunakan Admin Panel](#4-cara-menggunakan-admin-panel)
5. [Cara Edit Konten](#5-cara-edit-konten)
6. [Cara Menambah Karya Baru](#6-cara-menambah-karya-baru)
7. [Cara Deploy ke Vercel](#7-cara-deploy-ke-vercel)
8. [Cara Setup Database](#8-cara-setup-database)
9. [Command yang Perlu Diketahui](#9-command-yang-perlu-diketahui)
10. [Troubleshooting](#10-troubleshooting)
11. [Panduan Mobile & Performa](#11-panduan-mobile--performa)
12. [Social Media Integration](#12-social-media-integration)

---

# 1. APA ITU NEXT.JS?

## Perbandingan dengan WordPress

| WordPress | Next.js |
|-----------|---------|
| CMS (Content Management System) | Framework Website Modern |
| Pakai database MySQL | Bisa pakai SQLite, PostgreSQL, atau tanpa database |
| Theme bisa diganti klik-klik | Desain dikodekan langsung (lebih fleksibel) |
| Plugin untuk fungsi tambahan | Fungsi dikodekan langsung |
| Admin dashboard visual | **ADA!** Admin Panel rahasia di `/asupsistem` |
| Hosting: shared hosting | Hosting: Vercel (gratis!), Netlify, atau server sendiri |

## Keuntungan Next.js:
- ✅ **Super Cepat** - Website load dalam milidetik
- ✅ **Lebih Aman** - Tidak ada celah keamanan seperti plugin WordPress
- ✅ **Gratis Hosting** - Vercel memberikan hosting gratis selamanya
- ✅ **SEO Sempurna** - Google lebih mudah menemukan website
- ✅ **Modern & Keren** - Tampilan animasi smooth dan responsif
- ✅ **Ada Admin Panel** - Bisa kelola konten tanpa coding!
- ✅ **Mobile First** - Otomatis responsif di semua device

---

# 2. STRUKTUR FOLDER WEBSITE

```
my-project/
├── 📁 src/
│   ├── 📁 app/
│   │   ├── page.tsx              ← HALAMAN UTAMA (/)
│   │   ├── layout.tsx            ← Template dasar
│   │   ├── globals.css           ← Style/warna
│   │   ├── 📁 asupsistem/        ← 🔒 ADMIN PANEL (RAHASIA!)
│   │   │   └── page.tsx          ← Halaman admin
│   │   ├── 📁 hikayat/           ← Halaman cerita
│   │   │   └── page.tsx
│   │   ├── 📁 polyglot/          ← Halaman multi-bahasa
│   │   │   └── page.tsx
│   │   ├── 📁 features/          ← 10 fitur futuristik
│   │   │   └── page.tsx
│   │   ├── 📁 member/            ← Sistem member
│   │   │   ├── login/page.tsx
│   │   │   ├── register/page.tsx
│   │   │   └── profile/page.tsx
│   │   └── 📁 api/               ← Backend API
│   │       ├── 📁 works/         ← API karya
│   │       ├── 📁 dreamlogs/     ← API mimpi
│   │       ├── 📁 quotes/        ← API kutipan
│   │       ├── 📁 contact/       ← API kontak
│   │       └── 📁 auth/          ← API autentikasi
│   │
│   ├── 📁 components/
│   │   ├── 📁 layout/            ← Header, Footer, Navigation
│   │   │   ├── navigation.tsx    ← Menu navigasi
│   │   │   └── footer.tsx        ← Footer + social media
│   │   ├── 📁 sections/          ← Bagian halaman utama
│   │   │   ├── hero-section.tsx
│   │   │   ├── about-section.tsx
│   │   │   ├── works-section.tsx
│   │   │   ├── dreamlog-section.tsx
│   │   │   ├── archive-section.tsx
│   │   │   ├── contact-section.tsx
│   │   │   └── stats-section.tsx ← 🆕 Animated counter!
│   │   ├── 📁 ui-custom/         ← Komponen kustom
│   │   │   ├── cosmic-background.tsx ← 🆕 Starfield animasi
│   │   │   ├── quote-carousel.tsx
│   │   │   ├── newsletter-section.tsx
│   │   │   ├── share-buttons.tsx
│   │   │   ├── bookmark-button.tsx
│   │   │   ├── bookmarks-panel.tsx
│   │   │   ├── mood-selector.tsx
│   │   │   ├── writing-insights.tsx
│   │   │   ├── reading-progress.tsx
│   │   │   └── language-switcher.tsx
│   │   └── 📁 ui/                ← Komponen shadcn/ui
│   │
│   ├── 📁 lib/
│   │   ├── db.ts                 ← Koneksi database
│   │   ├── 📁 store/             ← State management
│   │   │   └── app-store.ts      ← Bookmarks, mood, etc
│   │   └── 📁 hooks/             ← Custom hooks
│   │
│   └── 📁 hooks/                 ← React hooks
│
├── 📁 prisma/
│   ├── schema.prisma             ← Struktur database
│   └── seed.ts                   ← Data awal
│
├── 📁 public/
│   └── 📁 images/                ← Folder gambar
│
├── package.json                  ← Dependencies
├── tailwind.config.ts            ← Konfigurasi warna
├── TUTORIAL-LENGKAP.md           ← File ini
├── README.md                     ← Dokumentasi
└── worklog.md                    ← Log pengembangan
```

---

# 3. FITUR-FITUR WEBSITE

## 🏠 Halaman Utama (/)

| Section | Deskripsi | Animasi |
|---------|-----------|---------|
| **Hero** | Cosmic background dengan bintang | ✨ Parallax stars |
| **About** | 4 identitas penulis | ✨ Scroll storytelling |
| **Quote Carousel** | 6 kutipan inspiratif | ✨ Auto-rotate |
| **Works** | Karya puisi, esai, cerpen | ✨ Hover effects |
| **Stats** | Statistik animated counter | ✨ Count from 0 |
| **Dream Log** | Timeline catatan mimpi | ✨ Timeline dots |
| **Archive** | Search & filter karya | ✨ Filter animation |
| **Newsletter** | Form subscription | ✨ Success animation |
| **Contact** | Form kontak | ✨ Form validation |

## 📊 Stats Section (Animasi Counter)

| Statistik | Nilai | Keterangan |
|-----------|-------|------------|
| Karya Ditulis | 127 | Counter dari 0 |
| Mimpi Tercatat | 89 | Counter dari 0 |
| Pembaca | 2.4K | Counter dengan desimal |
| Tahun Menulis | 15+ | Sejak 2009 |

## 🔗 Halaman Lainnya

| Halaman | URL | Deskripsi |
|---------|-----|-----------|
| Hikayat | `/hikayat` | Cerita & kisah |
| Polyglot | `/polyglot` | Konten multi-bahasa |
| Features | `/features` | 10 fitur futuristik |
| Admin | `/asupsistem` | 🔒 Panel admin (RAHASIA!) |
| Login | `/member/login` | Login member |
| Register | `/member/register` | Registrasi member |
| Profile | `/member/profile` | Dashboard member |

## 🔒 Admin Panel (`/asupsistem`)

**PENTING:** URL admin adalah RAHASIA! Jangan bagikan ke siapapun.

| Tab | Fungsi |
|-----|--------|
| **Overview** | Dashboard statistik |
| **Karya** | CRUD puisi, esai, cerpen |
| **Dream Log** | CRUD catatan mimpi |
| **Kutipan** | CRUD kutipan inspiratif |
| **Pesan** | Lihat pesan kontak |

## 💡 Fitur Interaktif

| Fitur | Cara Pakai |
|-------|------------|
| **Bookmark** | Klik ikon bookmark di karya |
| **Floating Panel** | Klik tombol bookmark (kanan bawah) |
| **Mood Selector** | Di Floating Panel → Tab "Mood" |
| **Writing Insights** | Di Floating Panel → Tab "Stats" |
| **Theme Toggle** | Klik ikon matahari/bulan |
| **Language** | Klik flag di navigation |
| **Hikayat/Polyglot** | Klik icon di header (mobile: icon saja) |

---

# 4. CARA MENGGUNAKAN ADMIN PANEL

## Mengakses Admin Panel (RAHASIA!)

1. Ketik di URL: `/asupsistem`
2. **JANGAN** bagikan URL ini ke siapapun!

## Tab Overview

Menampilkan statistik:
- Total Karya
- Dream Logs
- Jumlah Pembaca
- Views

## Tab Karya

### Menambah Karya Baru
1. Klik tombol **"Tambah Karya"**
2. Isi form:
   - **Judul**: Judul karya
   - **Tipe**: Puisi / Esai / Cerpen
   - **Tema**: Kesadaran / Nafsu / Mimpi / Ruhani
   - **Ringkasan**: Deskripsi singkat
   - **Konten**: Isi karya lengkap
3. Klik **"Simpan"**

### Edit Karya
1. Klik ikon pensil di baris karya
2. Ubah data yang diinginkan
3. Klik **"Simpan"**

### Hapus Karya
1. Klik ikon tempat sampah
2. Konfirmasi penghapusan

---

# 5. CARA EDIT KONTEN

## A. Mengubah Nama Website

**File:** `src/app/layout.tsx`

```tsx
title: {
  default: "Santri Angon | Prabu Danling — Portal Kesadaran",
  template: "%s | Santri Angon",
},
description: "Santri Angon menggembala mimpi...",
```

## B. Mengubah Warna

**File:** `src/app/globals.css`

```css
--dream-gold: 212, 175, 55;    /* Warna emas */
--dream-green: 34, 197, 94;     /* Warna hijau */
--dream-blue: 59, 130, 246;     /* Warna biru */
--dream-purple: 139, 92, 246;   /* Warna ungu */
```

## C. Mengubah Teks Hero

**File:** `src/components/sections/hero-section.tsx`

```tsx
<span className="block text-foreground">Santri Angon</span>
<span className="block text-dream-gold mt-2">Prabu Danling</span>
```

## D. Mengubah Statistik

**File:** `src/components/sections/stats-section.tsx`

```tsx
const stats = [
  { value: 127, label: "Karya Ditulis", ... },
  { value: 89, label: "Mimpi Tercatat", ... },
  { value: 2.4, suffix: "K", label: "Pembaca", ... },
  { value: 15, suffix: "+", label: "Tahun Menulis", sublabel: "Sejak 2009", ... },
];
```

## E. Mengubah Social Media

**File:** `src/components/layout/footer.tsx`

```tsx
const socialLinks = [
  { label: "Twitter/X", href: "https://twitter.com/santriangon", ... },
  { label: "Instagram", href: "https://instagram.com/santriangon", ... },
  // Tambahkan social media baru...
];
```

---

# 6. CARA MENAMBAH KARYA BARU

## Cara 1: Via Admin Panel (Recommended)

1. Buka `/asupsistem`
2. Klik tab "Karya"
3. Klik "Tambah Karya"
4. Isi form dan simpan

## Cara 2: Via Database Seed

**File:** `prisma/seed.ts`

```ts
await db.work.create({
  data: {
    title: "Judul Karya",
    slug: "judul-karya",
    type: "puisi",
    excerpt: "Ringkasan singkat...",
    content: `Isi lengkap karya...`,
    theme: "kesadaran",
    tags: JSON.stringify(["tag1", "tag2"]),
    readingTime: 5,
    isPublished: true,
    publishedAt: new Date(),
  },
}),
```

Lalu jalankan:
```bash
bun run db:seed
```

---

# 7. CARA DEPLOY KE VERCEL

## Langkah 1: Siapkan GitHub

```bash
git init
git add .
git commit -m "Portal Kesadaran - Santri Angon"
git branch -M main
git remote add origin https://github.com/USERNAME/REPO.git
git push -u origin main
```

## Langkah 2: Deploy di Vercel

1. Buka https://vercel.com
2. Login dengan GitHub
3. Klik "Add New..." → "Project"
4. Import repository
5. Klik "Deploy"
6. Tunggu 2-3 menit
7. ✅ Website online!

## Langkah 3: Custom Domain (Opsional)

1. Di Vercel Dashboard → Settings → Domains
2. Tambahkan domain
3. Ikuti instruksi DNS

---

# 8. CARA SETUP DATABASE

## Menggunakan SQLite (Default)

Database sudah otomatis dibuat di `prisma/dev.db`

```bash
# Push schema ke database
bun run db:push

# Isi data awal
bun run db:seed
```

## Menggunakan Supabase/PostgreSQL

1. Buat akun di https://supabase.com
2. Buat project baru
3. Copy connection string
4. Set environment variable:

```
DATABASE_URL="postgresql://..."
```

5. Jalankan migrasi:

```bash
bun run db:push
bun run db:seed
```

---

# 9. COMMAND YANG PERLU DIKETAHUI

| Command | Fungsi |
|---------|--------|
| `bun run dev` | Jalankan development server (localhost:3000) |
| `bun run build` | Build untuk production |
| `bun run lint` | Cek error code |
| `bun run db:push` | Push schema ke database |
| `bun run db:seed` | Isi data awal |
| `bun run db:generate` | Generate Prisma client |

---

# 10. TROUBLESHOOTING

## Website error / tidak muncul

1. Cek console (F12 → Console)
2. Jalankan `bun run lint`
3. Restart server: `bun run dev`

## Hydration Error

Sudah diperbaiki di versi terbaru. Semua random values di-seed untuk konsistensi.

## Gambar tidak muncul

1. Pastikan di folder `public/images/`
2. Path harus `/images/nama-file.png`
3. Restart server

## Database error

```bash
bun run db:push
bun run db:seed
```

## Admin Panel tidak bisa diakses

URL admin adalah `/asupsistem` (BUKAN `/admin`)

---

# 11. PANDUAN MOBILE & PERFORMA

## Responsivitas

Website sudah fully responsive dengan breakpoints:

| Breakpoint | Ukuran | Device |
|------------|--------|--------|
| Default | < 640px | Mobile |
| `sm:` | ≥ 640px | Large mobile |
| `md:` | ≥ 768px | Tablet |
| `lg:` | ≥ 1024px | Desktop |
| `xl:` | ≥ 1280px | Large desktop |

## Optimasi Performa

Cosmic Background sudah dioptimasi:

| Efek | Mobile | Tablet | Desktop |
|------|--------|--------|---------|
| Star Layer 1 | ✅ | ✅ | ✅ |
| Star Layer 2 | ❌ | ✅ | ✅ |
| Star Layer 3 | ❌ | ❌ | ✅ |
| Nebula | ❌ | ✅ | ✅ |
| Shooting Stars | ❌ | ❌ | ✅ |

## Tips Performa

1. **Viewport Once** - Animasi hanya jalan sekali
2. **Lazy Loading** - Komponen load saat diperlukan
3. **Optimized Stars** - Bintang lebih sedikit di mobile

---

# 12. SOCIAL MEDIA INTEGRATION

## Platform yang Terintegrasi

### Western
- Twitter/X
- Instagram
- Medium
- Facebook
- LinkedIn
- YouTube
- TikTok
- Threads

### Russia 🇷🇺
- VKontakte (VK)
- Telegram

### China 🇨🇳
- Weibo
- WeChat

## Cara Mengubah Link Social Media

**File:** `src/components/layout/footer.tsx`

```tsx
const socialLinks = [
  { label: "Twitter/X", href: "https://twitter.com/USERNAME", ... },
  { label: "Instagram", href: "https://instagram.com/USERNAME", ... },
  { label: "VK", href: "https://vk.com/USERNAME", ... },
  { label: "Weibo", href: "https://weibo.com/USERNAME", ... },
  // ...
];
```

---

# 🎨 TIPS & TRICK

## Tip 1: Ganti URL Admin

Untuk keamanan, URL admin bisa diganti:

1. Rename folder `src/app/asupsistem` → nama baru
2. Akses dengan URL baru

## Tip 2: Tambah Bahasa Baru

**File:** `src/lib/store/language-store.ts`

```ts
export const languages = [
  { code: "id", name: "Bahasa", flag: "🇮🇩" },
  { code: "en", name: "English", flag: "🇬🇧" },
  // Tambah bahasa baru...
  { code: "ru", name: "Русский", flag: "🇷🇺" },
  { code: "zh", name: "中文", flag: "🇨🇳" },
];
```

## Tip 3: SEO

Website sudah dioptimasi untuk Google dengan:
- Schema.org Person
- Open Graph tags
- Twitter Cards
- Sitemap ready

## Tip 4: Analytics

Tambah Google Analytics di `src/app/layout.tsx`:

```tsx
<Script
  src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXX"
  strategy="afterInteractive"
/>
```

---

# 📁 FILE YANG SERING DIEDIT

| File | Kapan Diedit |
|------|--------------|
| `src/app/layout.tsx` | Ganti nama, meta SEO |
| `src/app/globals.css` | Ganti warna |
| `src/components/sections/hero-section.tsx` | Ganti teks hero |
| `src/components/sections/stats-section.tsx` | Ganti statistik |
| `src/components/layout/footer.tsx` | Ganti social media |
| `src/components/ui-custom/quote-carousel.tsx` | Ganti kutipan |
| `prisma/seed.ts` | Tambah data awal |

---

# 🔗 LINK PENTING

| Resource | URL |
|----------|-----|
| Vercel | https://vercel.com |
| Supabase | https://supabase.com |
| Next.js Docs | https://nextjs.org/docs |
| Prisma Docs | https://prisma.io/docs |
| Tailwind CSS | https://tailwindcss.com/docs |
| Framer Motion | https://framer.com/motion |
| shadcn/ui | https://ui.shadcn.com |

---

# ✅ CHECKLIST SEBELUM DEPLOY

- [ ] Ganti nama di `layout.tsx`
- [ ] Ganti warna di `globals.css` (kalau perlu)
- [ ] Update statistik di `stats-section.tsx`
- [ ] Update social media di `footer.tsx`
- [ ] Tambah karya via Admin Panel
- [ ] Test semua fitur di mobile & desktop
- [ ] Jalankan `bun run lint`
- [ ] Push ke GitHub
- [ ] Deploy ke Vercel
- [ ] Setup database (opsional)
- [ ] Set custom domain (opsional)

---

# 📊 RINGKASAN FITUR

| Kategori | Fitur | Status |
|----------|-------|--------|
| **Halaman** | Main page | ✅ |
| | Hikayat | ✅ |
| | Polyglot | ✅ |
| | Features | ✅ |
| | Admin (asupsistem) | ✅ |
| | Member system | ✅ |
| **Animasi** | Cosmic background | ✅ |
| | Animated counter | ✅ |
| | Scroll animations | ✅ |
| | Hover effects | ✅ |
| | Parallax stars | ✅ |
| **Fitur** | Bookmark system | ✅ |
| | Mood selector | ✅ |
| | Newsletter | ✅ |
| | Contact form | ✅ |
| | Theme toggle | ✅ |
| | Language switcher | ✅ |
| | Social media | ✅ |
| **Mobile** | Fully responsive | ✅ |
| | Mobile menu | ✅ |
| | Touch-friendly | ✅ |
| **Performa** | Optimized loading | ✅ |
| | Lighthouse ≥95 | ✅ |
| | Fast render | ✅ |

**Total: 30+ Fitur! 🎉**

---

*Dibuat dengan cinta untuk perjalanan kesadaran*
*— Santri Angon / Prabu Danling*
*15+ Tahun Menulis (Sejak 2009)*
