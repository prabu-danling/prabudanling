import { NextRequest, NextResponse } from "next/server";

// POST /api/ai/writing-assistant - AI Writing Assistant
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { prompt, type, style } = body;

    if (!prompt) {
      return NextResponse.json(
        { success: false, error: "Prompt diperlukan" },
        { status: 400 }
      );
    }

    // Simulate AI response (in production, use z-ai-web-dev-sdk)
    const suggestions = generateWritingSuggestions(prompt, type, style);

    return NextResponse.json({
      success: true,
      data: {
        suggestions,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error("Error in AI writing assistant:", error);
    return NextResponse.json(
      { success: false, error: "Gagal memproses permintaan AI" },
      { status: 500 }
    );
  }
}

function generateWritingSuggestions(
  prompt: string, 
  type: string = "puisi", 
  style: string = "spiritual"
): string[] {
  const templates: Record<string, string[]> = {
    puisi: [
      `Di ${getRandomTime()} yang sunyi,\n${prompt}\n\nSeperti ${getRandomMetaphor()} yang ${getRandomAction()},\njiwa ini berbisik lembut.`,
      `${prompt}\n\n— ditulis dalam ${getRandomMood()},\ndi antara warna ${getRandomColor()} dan ${getRandomColor()}.`,
      `Ketika ${getRandomNature()} berbisik,\n"${prompt}"\n\nMaka aku memahami,\nbahwa ${getRandomWisdom()}.`,
    ],
    esai: [
      `Dalam merenungkan "${prompt}", kita diajak memasuki lorong kesadaran yang dalam. Bukan sekadar pemikiran, melainkan pengalaman jiwa yang berusaha memahami...`,
      `"${prompt}" — sebuah pertanyaan yang menggantung di udara malam. Mari kita telusuri bersama, langkah demi langkah, seperti seorang pengembara yang mencari makna...`,
    ],
    cerpen: [
      `Malam itu, ketika bulan memancarkan cahaya perak, ia duduk sendirian. "${prompt}" — pikirannya melayang ke masa lalu, ke kenangan yang hampir terlupakan...`,
    ],
  };

  return templates[type] || templates.puisi;
}

function getRandomTime(): string {
  const times = ["malam", "senja", "fajar", "siang", "tengah malam"];
  return times[Math.floor(Math.random() * times.length)];
}

function getRandomMetaphor(): string {
  const metaphors = ["ombak", "angin", "bintang", "embun", "bayangan", "cahaya"];
  return metaphors[Math.floor(Math.random() * metaphors.length)];
}

function getRandomAction(): string {
  const actions = ["menari", "berbisik", "menyapa", "berkibar"];
  return actions[Math.floor(Math.random() * actions.length)];
}

function getRandomMood(): string {
  const moods = ["kesunyian", "kerinduan", "ketenangan", "kehangatan"];
  return moods[Math.floor(Math.random() * moods.length)];
}

function getRandomColor(): string {
  const colors = ["hitam", "emas", "biru", "hijau", "ungu", "putih"];
  return colors[Math.floor(Math.random() * colors.length)];
}

function getRandomNature(): string {
  const natures = ["angin", "hujan", "bulan", "bintang", "laut", "gunung"];
  return natures[Math.floor(Math.random() * natures.length)];
}

function getRandomWisdom(): string {
  const wisdoms = [
    "kesunyian adalah guru terbaik",
    "setiap langkah adalah doa",
    "dalam diam, jiwa berbicara",
    "cinta adalah jalan pulang",
    "setiap napas adalah anugerah"
  ];
  return wisdoms[Math.floor(Math.random() * wisdoms.length)];
}
