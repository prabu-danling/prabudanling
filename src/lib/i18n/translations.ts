// Portal Kesadaran - 50 Language Translations
// "Prak burukeun, ulah edan, kudu eling"

export const languages = [
  // Southeast Asia
  { code: "id", name: "Bahasa Indonesia", flag: "🇮🇩", native: "Indonesia" },
  { code: "su", name: "Basa Sunda", flag: "☀️", native: "Sunda" },
  { code: "jv", name: "Basa Jawa", flag: "🏛️", native: "Jawa" },
  { code: "ms", name: "Bahasa Melayu", flag: "🇲🇾", native: "Melayu" },
  { code: "th", name: "ภาษาไทย", flag: "🇹🇭", native: "Thai" },
  { code: "vi", name: "Tiếng Việt", flag: "🇻🇳", native: "Việt" },
  { code: "tl", name: "Filipino", flag: "🇵🇭", native: "Filipino" },
  { code: "my", name: "မြန်မာ", flag: "🇲🇲", native: "Myanmar" },
  { code: "km", name: "ភាសាខ្មែរ", flag: "🇰🇭", native: "Khmer" },
  { code: "lo", name: "ລາວ", flag: "🇱🇦", native: "Lao" },

  // East Asia
  { code: "zh", name: "中文", flag: "🇨🇳", native: "Chinese" },
  { code: "zh-tw", name: "繁體中文", flag: "🇹🇼", native: "Traditional Chinese" },
  { code: "ja", name: "日本語", flag: "🇯🇵", native: "Japanese" },
  { code: "ko", name: "한국어", flag: "🇰🇷", native: "Korean" },
  { code: "mn", name: "Монгол", flag: "🇲🇳", native: "Mongolian" },

  // South Asia
  { code: "hi", name: "हिन्दी", flag: "🇮🇳", native: "Hindi" },
  { code: "bn", name: "বাংলা", flag: "🇧🇩", native: "Bengali" },
  { code: "ta", name: "தமிழ்", flag: "🇱🇰", native: "Tamil" },
  { code: "te", name: "తెలుగు", flag: "🇮🇳", native: "Telugu" },
  { code: "ur", name: "اردو", flag: "🇵🇰", native: "Urdu" },

  // Middle East
  { code: "ar", name: "العربية", flag: "🇸🇦", native: "Arabic" },
  { code: "fa", name: "فارسی", flag: "🇮🇷", native: "Persian" },
  { code: "tr", name: "Türkçe", flag: "🇹🇷", native: "Turkish" },
  { code: "he", name: "עברית", flag: "🇮🇱", native: "Hebrew" },

  // Europe
  { code: "en", name: "English", flag: "🇬🇧", native: "English" },
  { code: "de", name: "Deutsch", flag: "🇩🇪", native: "German" },
  { code: "fr", name: "Français", flag: "🇫🇷", native: "French" },
  { code: "es", name: "Español", flag: "🇪🇸", native: "Spanish" },
  { code: "it", name: "Italiano", flag: "🇮🇹", native: "Italian" },
  { code: "pt", name: "Português", flag: "🇵🇹", native: "Portuguese" },
  { code: "ru", name: "Русский", flag: "🇷🇺", native: "Russian" },
  { code: "nl", name: "Nederlands", flag: "🇳🇱", native: "Dutch" },
  { code: "pl", name: "Polski", flag: "🇵🇱", native: "Polish" },
  { code: "uk", name: "Українська", flag: "🇺🇦", native: "Ukrainian" },
  { code: "cs", name: "Čeština", flag: "🇨🇿", native: "Czech" },
  { code: "sv", name: "Svenska", flag: "🇸🇪", native: "Swedish" },
  { code: "no", name: "Norsk", flag: "🇳🇴", native: "Norwegian" },
  { code: "da", name: "Dansk", flag: "🇩🇰", native: "Danish" },
  { code: "fi", name: "Suomi", flag: "🇫🇮", native: "Finnish" },
  { code: "el", name: "Ελληνικά", flag: "🇬🇷", native: "Greek" },
  { code: "hu", name: "Magyar", flag: "🇭🇺", native: "Hungarian" },
  { code: "ro", name: "Română", flag: "🇷🇴", native: "Romanian" },

  // Africa
  { code: "sw", name: "Kiswahili", flag: "🇰🇪", native: "Swahili" },
  { code: "af", name: "Afrikaans", flag: "🇿🇦", native: "Afrikaans" },
  { code: "ar-eg", name: "مصرية", flag: "🇪🇬", native: "Egyptian Arabic" },

  // Americas
  { code: "es-mx", name: "Español Latino", flag: "🇲🇽", native: "Latin Spanish" },
  { code: "pt-br", name: "Português Brasileiro", flag: "🇧🇷", native: "Brazilian Portuguese" },

  // Oceania
  { code: "mi", name: "Te Reo Māori", flag: "🇳🇿", native: "Māori" },
] as const;

export type LanguageCode = typeof languages[number]["code"];

// Translation structure
export interface Translation {
  nav: {
    home: string;
    about: string;
    works: string;
    dreamlog: string;
    archive: string;
    contact: string;
    hikayat: string;
    polyglot: string;
  };
  hero: {
    title: string;
    subtitle: string;
    cta: string;
  };
  about: {
    title: string;
    subtitle: string;
    identity1: string;
    identity2: string;
    identity3: string;
    identity4: string;
  };
  works: {
    title: string;
    readMore: string;
    readingTime: string;
    filterAll: string;
    filterPuisi: string;
    filterEsai: string;
    filterCerpen: string;
  };
  dreamlog: {
    title: string;
    lucidity: string;
    mood: string;
  };
  contact: {
    title: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    send: string;
  };
  hikayat: {
    title: string;
    subtitle: string;
    sabda: string;
  };
  common: {
    loading: string;
    error: string;
    success: string;
    save: string;
    cancel: string;
    delete: string;
    edit: string;
  };
}

// Indonesian (Base)
const id: Translation = {
  nav: {
    home: "Beranda",
    about: "Tentang",
    works: "Karya",
    dreamlog: "Dream Log",
    archive: "Arsip",
    contact: "Kontak",
    hikayat: "Hikayat",
    polyglot: "Polyglot",
  },
  hero: {
    title: "Portal Kesadaran",
    subtitle: "Membangkitkan kesadaran diri, mencerdaskan kehidupan bangsa, dan ikut melaksanakan ketertiban dunia",
    cta: "Mulai Perjalanan",
  },
  about: {
    title: "Empat Identitas",
    subtitle: "Satu jiwa, empat wajah kesadaran",
    identity1: "Santri Angon",
    identity2: "Prabu Danling",
    identity3: "Gugun Gunara",
    identity4: "Muhammad Lutfi Azmi",
  },
  works: {
    title: "Karya Tulis",
    readMore: "Baca Selengkapnya",
    readingTime: "menit baca",
    filterAll: "Semua",
    filterPuisi: "Puisi",
    filterEsai: "Esai",
    filterCerpen: "Cerpen",
  },
  dreamlog: {
    title: "Dream Log",
    lucidity: "Lucidity",
    mood: "Mood",
  },
  contact: {
    title: "Hubungi Saya",
    name: "Nama",
    email: "Email",
    subject: "Subjek",
    message: "Pesan",
    send: "Kirim Pesan",
  },
  hikayat: {
    title: "Hikayat Santri Angon & Prabu Danling",
    subtitle: "Sabda Leluhur dari Padjajaran yang Terlupakan",
    sabda: "Prak Burukeun, Ulah Edan, Kudu Eling",
  },
  common: {
    loading: "Memuat...",
    error: "Terjadi kesalahan",
    success: "Berhasil",
    save: "Simpan",
    cancel: "Batal",
    delete: "Hapus",
    edit: "Edit",
  },
};

// English
const en: Translation = {
  nav: {
    home: "Home",
    about: "About",
    works: "Works",
    dreamlog: "Dream Log",
    archive: "Archive",
    contact: "Contact",
    hikayat: "Chronicle",
    polyglot: "Polyglot",
  },
  hero: {
    title: "Portal of Consciousness",
    subtitle: "Awakening self-awareness, enlightening the nation's life, and participating in world order",
    cta: "Begin the Journey",
  },
  about: {
    title: "Four Identities",
    subtitle: "One soul, four faces of consciousness",
    identity1: "Santri Angon",
    identity2: "Prabu Danling",
    identity3: "Gugun Gunara",
    identity4: "Muhammad Lutfi Azmi",
  },
  works: {
    title: "Written Works",
    readMore: "Read More",
    readingTime: "min read",
    filterAll: "All",
    filterPuisi: "Poetry",
    filterEsai: "Essay",
    filterCerpen: "Short Story",
  },
  dreamlog: {
    title: "Dream Log",
    lucidity: "Lucidity",
    mood: "Mood",
  },
  contact: {
    title: "Contact Me",
    name: "Name",
    email: "Email",
    subject: "Subject",
    message: "Message",
    send: "Send Message",
  },
  hikayat: {
    title: "The Chronicle of Santri Angon & Prabu Danling",
    subtitle: "Ancestral Words from the Forgotten Padjajaran",
    sabda: "Act swiftly, do not be deluded, remain conscious",
  },
  common: {
    loading: "Loading...",
    error: "An error occurred",
    success: "Success",
    save: "Save",
    cancel: "Cancel",
    delete: "Delete",
    edit: "Edit",
  },
};

// Sunda (Sundanese)
const su: Translation = {
  nav: {
    home: "Imah",
    about: "Ngeunaan",
    works: "Karya",
    dreamlog: "Catetan Mimpi",
    archive: "Arsip",
    contact: "Panggih",
    hikayat: "Hikayat",
    polyglot: "Polyglot",
  },
  hero: {
    title: "Panto Kasadaran",
    subtitle: "Nyuksakeun kasadaran diri, merdikikeun hirup bangsa, tur milu ngararancang katertiban dunya",
    cta: "Mimiti Lalampahan",
  },
  about: {
    title: "Opat Identitas",
    subtitle: "Hiji jiwa, opat rupa kasadaran",
    identity1: "Santri Angon",
    identity2: "Prabu Danling",
    identity3: "Gugun Gunara",
    identity4: "Muhammad Lutfi Azmi",
  },
  works: {
    title: "Karya Tulis",
    readMore: "Baca deui",
    readingTime: "menit baca",
    filterAll: "Kabeh",
    filterPuisi: "Puisi",
    filterEsai: "Esai",
    filterCerpen: "Carpon",
  },
  dreamlog: {
    title: "Catetan Mimpi",
    lucidity: "Kajelasan",
    mood: "Kaayaan",
  },
  contact: {
    title: "Panggih Awak",
    name: "Ngaran",
    email: "Email",
    subject: "Jejer",
    message: "Pesen",
    send: "Kirim Pesen",
  },
  hikayat: {
    title: "Hikayat Santri Angon & Prabu Danling",
    subtitle: "Sabda Leluhur ti Padjajaran Nu Poho",
    sabda: "Prak Burukeun, Ulah Edan, Kudu Eling",
  },
  common: {
    loading: "Ngamuat...",
    error: "Aya kasalahan",
    success: "Berhasil",
    save: "Teundeun",
    cancel: "Batal",
    delete: "Hapus",
    edit: "Edit",
  },
};

// All translations
export const translations: Record<string, Translation> = {
  id,
  en,
  su,
};

// Get translation with fallback
export function getTranslation(lang: string): Translation {
  return translations[lang] || translations["id"]!;
}

// Get language info
export function getLanguageInfo(code: string) {
  return languages.find(l => l.code === code) || languages[0];
}
