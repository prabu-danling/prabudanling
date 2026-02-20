import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Playfair_Display, Poppins, Nunito } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/layout/theme-provider";

// ═══════════════════════════════════════════════════════════════
// TYPOGRAPHY SYSTEM - God-Tier Font Combination
// ═══════════════════════════════════════════════════════════════

// H1: Serif Display - Authoritative & Monumental
const playfair = Playfair_Display({
  variable: "--font-heading-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

// H2-H3: Sans-Serif Modern - Intelligent & Clean
const poppins = Poppins({
  variable: "--font-heading-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

// Body: Humanist Sans - Warm & Readable
const nunito = Nunito({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

// UI/Mono: Technical - For code and data
const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

// Legacy support
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

// ═══════════════════════════════════════════════════════════════
// METADATA - SEO & Social
// ═══════════════════════════════════════════════════════════════

export const metadata: Metadata = {
  metadataBase: new URL("https://santriangon.com"),
  title: {
    default: "Santri Angon | Prabu Danling — Tech Futurist • Master Sage Polymath",
    template: "%s | Santri Angon",
  },
  description: "Tn. H. Gugun Gunara, CMC, MBA, CFA, PMP, Six Sigma Black Belt (Muhammad Lutfi Azmi) — Tech Futurist, Master Sage Polymath, Senior Konsultan Bisnis & IT. Polymath 7 Disiplin. Membangkitkan kesadaran diri, mencerdaskan kehidupan bangsa, dan ikut melaksanakan ketertiban dunia.",
  keywords: [
    "Santri Angon",
    "Prabu Danling", 
    "Gugun Gunara",
    "Muhammad Lutfi Azmi",
    "Polymath Indonesia",
    "Arsitek Peradaban",
    "penulis Indonesia",
    "puisi",
    "esai",
    "sastra",
    "kesadaran",
    "mimpi",
    "spiritualitas",
    "manajemen strategis",
    "ketahanan pangan",
    "supply chain",
    "energi terbarukan",
    "kecerdasan buatan",
    "bioteknologi",
    "publishing",
  ],
  authors: [{ name: "Tn. H. Gugun Gunara, CMC, MBA, CFA, PMP, Six Sigma Black Belt", url: "https://santriangon.com" }],
  creator: "Gugun Gunara / Muhammad Lutfi Azmi / Prabu Danling / Santri Angon",
  publisher: "Portal Kesadaran",
  
  // Open Graph
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://santriangon.com",
    siteName: "Santri Angon — Portal Kesadaran",
    title: "Santri Angon | Prabu Danling — Tech Futurist • Master Sage Polymath",
    description: "Membangkitkan kesadaran diri, mencerdaskan kehidupan bangsa, dan ikut melaksanakan ketertiban dunia.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Santri Angon - Arsitek Peradaban • Polymath 7 Disiplin",
      },
    ],
  },
  
  // Twitter
  twitter: {
    card: "summary_large_image",
    title: "Santri Angon — Tech Futurist • Master Sage Polymath",
    description: "Membangkitkan kesadaran diri, mencerdaskan kehidupan bangsa, dan ikut melaksanakan ketertiban dunia.",
    images: ["/og-image.jpg"],
    creator: "@santriangon",
  },
  
  // Verification
  verification: {
    google: "your-google-verification-code",
  },
  
  // Alternates for international SEO
  alternates: {
    canonical: "https://santriangon.com",
    languages: {
      'id': 'https://santriangon.com',
      'en': 'https://santriangon.com/?lang=en',
      'ar': 'https://santriangon.com/?lang=ar',
      'x-default': 'https://santriangon.com',
    },
  },
  
  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  
  // Icons
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
  },
  
  // Manifest
  manifest: "/manifest.json",
  
  // Category
  category: "literature",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FAF8F5" },
    { media: "(prefers-color-scheme: dark)", color: "#0F0E12" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

// Schema.org JSON-LD - Complete Personal Branding with International SEO
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://santriangon.com/#person",
      name: "Tn. H. Gugun Gunara, CMC, MBA, CFA, PMP, Six Sigma Black Belt",
      alternateName: ["Muhammad Lutfi Azmi", "Santri Angon", "Prabu Danling"],
      url: "https://santriangon.com",
      image: "https://santriangon.com/profile.jpg",
      sameAs: [
        "https://twitter.com/santriangon",
        "https://instagram.com/santriangon",
        "https://medium.com/@santriangon",
        "https://facebook.com/santriangon",
        "https://linkedin.com/in/santriangon",
        "https://youtube.com/@santriangon",
        "https://vk.com/santriangon",
        "https://t.me/santriangon",
        "https://weibo.com/santriangon",
      ],
      jobTitle: "Tech Futurist • Master Sage Polymath • Senior Konsultan Bisnis & IT",
      description: "Polymath 7 disiplin: Manajemen Strategis, Ketahanan Pangan, Logistik & Supply Chain, Energi & Keberlanjutan, Teknologi & AI, Bioteknologi, Publishing. Credentials: CMC, MBA, CFA, PMP, Six Sigma Black Belt. Misi: 1 Miliar Jiwa, 500 Buku, 100 Jurnal.",
      knowsAbout: [
        "Manajemen Strategis & Governance",
        "Ketahanan Pangan & Agribisnis",
        "Logistik & Supply Chain Sovereignty",
        "Energi & Keberlanjutan",
        "Teknologi & Kecerdasan Buatan",
        "Industri Kimia & Bioteknologi",
        "Penulisan & Publishing",
        "Sastra Indonesia",
        "Puisi",
        "Spiritualitas",
        "Kesadaran",
        "Filsafat",
      ],
      alumniOf: {
        "@type": "Organization",
        name: "Universitas Indonesia",
      },
      award: [
        "Penulis 500 Buku (Target)",
        "100 Jurnal Internasional (Target)",
      ],
      inLanguage: ["id", "en", "ar"],
    },
    {
      "@type": "WebSite",
      "@id": "https://santriangon.com/#website",
      url: "https://santriangon.com",
      name: "Santri Angon — Portal Kesadaran",
      description: "Portal Kesadaran — Membangkitkan kesadaran diri, mencerdaskan kehidupan bangsa, dan ikut melaksanakan ketertiban dunia.",
      publisher: {
        "@id": "https://santriangon.com/#person"
      },
      inLanguage: ["id", "en", "ar"],
      potentialAction: {
        "@type": "SearchAction",
        target: "https://santriangon.com/?search={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@type": "WebPage",
      "@id": "https://santriangon.com/#webpage",
      url: "https://santriangon.com",
      name: "Santri Angon | Prabu Danling — Tech Futurist • Master Sage Polymath",
      description: "Tn. H. Gugun Gunara, CMC, MBA, CFA, PMP, Six Sigma Black Belt — Tech Futurist, Master Sage Polymath, Senior Konsultan Bisnis & IT.",
      isPartOf: {
        "@id": "https://santriangon.com/#website"
      },
      about: {
        "@id": "https://santriangon.com/#person"
      },
      inLanguage: ["id", "en", "ar"]
    },
    {
      "@type": "Organization",
      "@id": "https://santriangon.com/#organization",
      name: "Portal Kesadaran",
      url: "https://santriangon.com",
      logo: {
        "@type": "ImageObject",
        url: "https://santriangon.com/logo.svg",
        width: 200,
        height: 200
      },
      sameAs: [
        "https://twitter.com/santriangon",
        "https://instagram.com/santriangon",
        "https://medium.com/@santriangon",
        "https://facebook.com/santriangon",
        "https://linkedin.com/in/santriangon",
        "https://youtube.com/@santriangon"
      ]
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html 
      lang="id" 
      suppressHydrationWarning
      className=""
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`
          ${playfair.variable} 
          ${poppins.variable} 
          ${nunito.variable} 
          ${geistMono.variable}
          ${geistSans.variable}
          antialiased bg-background text-foreground font-body
        `}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange={false}
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
