// ============================================================
// 📁 File: app/sitemap.ts  (atau src/app/sitemap.ts)
// 🌐 Domain: https://www.prabudanling.web.id
// 📋 Next.js App Router — MetadataRoute.Sitemap
// ============================================================

import type { MetadataRoute } from "next";

const BASE_URL = "https://www.prabudanling.web.id";

// ──────────────────────────────────────────────────────────────
// 🔧 HELPER: Buat entry sitemap dengan type-safe
// ──────────────────────────────────────────────────────────────
type ChangeFreq =
  | "always"
  | "hourly"
  | "daily"
  | "weekly"
  | "monthly"
  | "yearly"
  | "never";

interface SitemapEntry {
  path: string;
  changeFrequency: ChangeFreq;
  priority: number;
  lastModified?: Date | string;
  images?: string[];
}

function buildEntry(entry: SitemapEntry): MetadataRoute.Sitemap[number] {
  return {
    url: `${BASE_URL}${entry.path}`,
    lastModified: entry.lastModified ?? new Date(),
    changeFrequency: entry.changeFrequency,
    priority: entry.priority,
    ...(entry.images && entry.images.length > 0 ? { images: entry.images } : {}),
    // ── Localized alternates (aktifkan jika sudah support multi-bahasa) ──
    // alternates: {
    //   languages: {
    //     id: `${BASE_URL}${entry.path}`,
    //     en: `${BASE_URL}/en${entry.path}`,
    //     ar: `${BASE_URL}/ar${entry.path}`,
    //   },
    // },
  };
}

// ──────────────────────────────────────────────────────────────
// 📄 HALAMAN STATIS — Halaman Utama
// ──────────────────────────────────────────────────────────────
const mainPages: SitemapEntry[] = [
  {
    path: "",               // Homepage
    changeFrequency: "weekly",
    priority: 1.0,
    images: [`${BASE_URL}/og-image.jpg`],
  },
  {
    path: "/hikayat",       // Sabda Leluhur dari Padjajaran
    changeFrequency: "monthly",
    priority: 0.9,
  },
  {
    path: "/polyglot",      // Perjalanan Sepuluh Bahasa
    changeFrequency: "monthly",
    priority: 0.8,
  },
];

// ──────────────────────────────────────────────────────────────
// 📄 HALAMAN STATIS — Anchor Sections (opsional, untuk deep-index)
// Google biasanya mengenali fragment, tapi beberapa SEO expert
// merekomendasikan menyertakannya untuk konten one-page yang kaya.
// Uncomment jika ingin menyertakan.
// ──────────────────────────────────────────────────────────────
// const anchorSections: SitemapEntry[] = [
//   { path: "/#tentang",   changeFrequency: "monthly",  priority: 0.7 },
//   { path: "/#karya",     changeFrequency: "weekly",   priority: 0.7 },
//   { path: "/#dreamlog",  changeFrequency: "weekly",   priority: 0.6 },
//   { path: "/#arsip",     changeFrequency: "monthly",  priority: 0.5 },
//   { path: "/#kontak",    changeFrequency: "yearly",   priority: 0.4 },
// ];

// ──────────────────────────────────────────────────────────────
// 📄 HALAMAN LEGAL (tambahkan saat sudah dibuat)
// ──────────────────────────────────────────────────────────────
const legalPages: SitemapEntry[] = [
  // Uncomment saat halaman sudah live:
  // { path: "/kebijakan-privasi",   changeFrequency: "yearly", priority: 0.3 },
  // { path: "/syarat-ketentuan",    changeFrequency: "yearly", priority: 0.3 },
  // { path: "/disclaimer",          changeFrequency: "yearly", priority: 0.3 },
];

// ──────────────────────────────────────────────────────────────
// 🔄 HALAMAN DINAMIS — Blog (uncomment & hubungkan ke data source)
// ──────────────────────────────────────────────────────────────

// Contoh: ambil data dari CMS, database, atau file MDX
//
// import { getAllPosts } from "@/lib/posts";
//
// async function getBlogEntries(): Promise<SitemapEntry[]> {
//   const posts = await getAllPosts();
//   return posts.map((post) => ({
//     path: `/blog/${post.slug}`,
//     changeFrequency: "weekly" as ChangeFreq,
//     priority: 0.7,
//     lastModified: new Date(post.updatedAt ?? post.publishedAt),
//     images: post.coverImage ? [`${BASE_URL}${post.coverImage}`] : [],
//   }));
// }

// ──────────────────────────────────────────────────────────────
// 🔄 HALAMAN DINAMIS — Layanan (uncomment & hubungkan ke data source)
// ──────────────────────────────────────────────────────────────

// import { getAllServices } from "@/lib/services";
//
// async function getServiceEntries(): Promise<SitemapEntry[]> {
//   const services = await getAllServices();
//   return services.map((service) => ({
//     path: `/layanan/${service.slug}`,
//     changeFrequency: "monthly" as ChangeFreq,
//     priority: 0.6,
//     lastModified: new Date(service.updatedAt),
//   }));
// }

// ──────────────────────────────────────────────────────────────
// 🔄 HALAMAN DINAMIS — Karya Tulis Individual (puisi, esai, cerpen)
// ──────────────────────────────────────────────────────────────

// import { getAllKarya } from "@/lib/karya";
//
// async function getKaryaEntries(): Promise<SitemapEntry[]> {
//   const karyaList = await getAllKarya();
//   return karyaList.map((karya) => ({
//     path: `/karya/${karya.slug}`,
//     changeFrequency: "monthly" as ChangeFreq,
//     priority: 0.6,
//     lastModified: new Date(karya.publishedAt),
//   }));
// }

// ──────────────────────────────────────────────────────────────
// 🔄 HALAMAN DINAMIS — Dream Log Individual
// ──────────────────────────────────────────────────────────────

// import { getAllDreamLogs } from "@/lib/dreamlog";
//
// async function getDreamLogEntries(): Promise<SitemapEntry[]> {
//   const dreams = await getAllDreamLogs();
//   return dreams.map((dream) => ({
//     path: `/dream-log/${dream.slug}`,
//     changeFrequency: "monthly" as ChangeFreq,
//     priority: 0.5,
//     lastModified: new Date(dream.date),
//   }));
// }

// ──────────────────────────────────────────────────────────────
// 🚀 EXPORT: Fungsi utama sitemap
// ──────────────────────────────────────────────────────────────

// Revalidate setiap 1 jam (3600 detik) — untuk ISR
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // ── Kumpulkan halaman dinamis (uncomment saat siap) ──
  // const blogEntries = await getBlogEntries();
  // const serviceEntries = await getServiceEntries();
  // const karyaEntries = await getKaryaEntries();
  // const dreamLogEntries = await getDreamLogEntries();

  // ── Gabungkan semua halaman ──
  const allPages: SitemapEntry[] = [
    ...mainPages,
    ...legalPages,
    // ...anchorSections,     // uncomment jika ingin index anchor
    // ...blogEntries,        // uncomment saat blog aktif
    // ...serviceEntries,     // uncomment saat layanan aktif
    // ...karyaEntries,       // uncomment saat karya individual aktif
    // ...dreamLogEntries,    // uncomment saat dream log individual aktif
  ];

  return allPages.map(buildEntry);
}
