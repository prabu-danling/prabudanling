import { NextRequest, NextResponse } from "next/server";

// POST /api/ai/dream-interpretation - AI Dream Interpretation
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { dreamContent, symbols, mood } = body;

    if (!dreamContent) {
      return NextResponse.json(
        { success: false, error: "Konten mimpi diperlukan" },
        { status: 400 }
      );
    }

    // Generate dream interpretation
    const interpretation = interpretDream(dreamContent, symbols, mood);

    return NextResponse.json({
      success: true,
      data: interpretation,
    });
  } catch (error) {
    console.error("Error in dream interpretation:", error);
    return NextResponse.json(
      { success: false, error: "Gagal menafsirkan mimpi" },
      { status: 500 }
    );
  }
}

interface DreamInterpretation {
  summary: string;
  symbols: { symbol: string; meaning: string }[];
  archetype: string;
  guidance: string;
  questions: string[];
}

function interpretDream(
  content: string, 
  symbols?: string[], 
  mood?: string
): DreamInterpretation {
  // Extract or generate symbols
  const dreamSymbols = symbols || extractSymbols(content);
  
  // Generate interpretation based on content
  const lowerContent = content.toLowerCase();
  
  let archetype = "The Seeker";
  let summary = "Mimpi Anda mencerminkan pencarian makna dan kedalaman spiritual.";
  let guidance = "Perhatikan pesan tersembunyi yang mungkin sedang disampaikan oleh alam bawah sadar Anda.";
  
  // Archetype detection
  if (lowerContent.includes("air") || lowerContent.includes("laut") || lowerContent.includes("sungai")) {
    archetype = "The Explorer";
    summary = "Mimpi Anda menunjukkan perjalanan emosional yang dalam, seperti air yang mengalir mencari laut.";
    guidance = "Biarlah emosi Anda mengalir alami, seperti sungai menuju samudra.";
  } else if (lowerContent.includes("bayangan") || lowerContent.includes("gelap")) {
    archetype = "The Shadow Worker";
    summary = "Mimpi Anda berinteraksi dengan bayangan — bagian diri yang belum terintegrasi.";
    guidance = "Sambut bayangan Anda dengan kasih sayang, ia adalah guru yang menyamar.";
  } else if (lowerContent.includes("terbang") || lowerContent.includes("langit")) {
    archetype = "The Awakened One";
    summary = "Mimpi Anda menunjukkan keinginan untuk transcendsi — melampaui batasan duniawi.";
    guidance = "Arahkan pandangan Anda ke atas, tapi tetap berpijak di bumi.";
  } else if (lowerContent.includes("rumah") || lowerContent.includes("pintu")) {
    archetype = "The Soul Architect";
    summary = "Mimpi Anda tentang rumah jiwa — struktur batin yang sedang dibangun.";
    guidance = "Perhatikan ruang mana dalam jiwa Anda yang perlu direnovasi.";
  }

  const symbolMeanings = dreamSymbols.map(s => ({
    symbol: s,
    meaning: getSymbolMeaning(s),
  }));

  const questions = [
    "Apa perasaan dominan saat terbangun?",
    "Apakah ada bagian mimpi yang ingin Anda jelaskan lebih dalam?",
    "Bagaimana mimpi ini terhubung dengan kehidupan terjaga Anda?",
  ];

  return {
    summary,
    symbols: symbolMeanings,
    archetype,
    guidance,
    questions,
  };
}

function extractSymbols(content: string): string[] {
  const commonSymbols = [
    "air", "api", "angin", "bumi", "bulan", "matahari", "bintang",
    "rumah", "pintu", "jendela", "cermin", "tangga",
    "burung", "ular", "kucing", "anjing", "ikan",
    "pohon", "bunga", "gunung", "laut", "sungai",
    "bayangan", "cahaya", "kegelapan", "hujan",
    "terbang", "jatuh", "berlari", "berenang",
    "surat", "buku", "tangan", "mata",
  ];
  
  const found: string[] = [];
  const lowerContent = content.toLowerCase();
  
  for (const symbol of commonSymbols) {
    if (lowerContent.includes(symbol)) {
      found.push(symbol);
    }
  }
  
  return found.length > 0 ? found.slice(0, 5) : ["mimpi", "alam bawah sadar", "jiwa"];
}

function getSymbolMeaning(symbol: string): string {
  const meanings: Record<string, string> = {
    air: "Emosi, alam bawah sadar, pembersihan",
    api: "Transformasi, passion, energi kreatif",
    angin: "Perubahan, kebebasan, pesan spiritual",
    bulan: "Femininitas, intuisi, siklus kehidupan",
    matahari: "Kesadaran, vitalitas, kekuatan",
    bintang: "Harapan, panduan, koneksi kosmos",
    rumah: "Diri sendiri, jiwa, rasa aman",
    pintu: "Peluang, transisi, misteri",
    cermin: "Refleksi diri, kebenaran, identitas",
    bayangan: "Sisi tersembunyi, ketakutan, potensi",
    terbang: "Kebebasan, ambisi, perspektif baru",
    jatuh: "Kehilangan kontrol, ketakutan, pelepasan",
  };
  
  return meanings[symbol] || "Simbol personal yang membutuhkan refleksi mendalam";
}
