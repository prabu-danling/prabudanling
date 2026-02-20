import { db } from "../src/lib/db";

async function main() {
  console.log("🌱 Seeding database...");

  // Clear existing data
  await db.quote.deleteMany();
  await db.work.deleteMany();
  await db.dreamLog.deleteMany();
  await db.contactMessage.deleteMany();

  // ==================
  // SEED WORKS (Karya)
  // ==================
  const works = await Promise.all([
    db.work.create({
      data: {
        title: "Dialog dengan Kegelapan",
        slug: "dialog-dengan-kegelapan",
        type: "puisi",
        excerpt: "Di malam yang tak berbintang, aku berbicara dengan bayanganku sendiri...",
        content: `Di malam yang tak berbintang,
aku berbicara dengan bayanganku sendiri.

"Siapa engkau?" tanyaku.
"Aku adalah engkau yang tak kunjung mengakui,"
jawabnya dengan suara yang familiar.

Kegelapan bukan musuh,
ia adalah kanvas kosong
tempat jiwa melukis rahasia.

Dalam sunyi, aku menemukan
bahwa cahaya sejati
tidak datang dari luar,
tapi menyala dari dalam.

— Malam ke-27, Bulan Kesunyian`,
        theme: "kesadaran",
        tags: JSON.stringify(["kegelapan", "dialog", "cahaya"]),
        readingTime: 2,
        isPublished: true,
        isFeatured: true,
        publishedAt: new Date("2024-03-15"),
      },
    }),
    db.work.create({
      data: {
        title: "Menggembala Hawa Nafsu: Sebuah Refleksi",
        slug: "menggembala-hawa-nafsu",
        type: "esai",
        excerpt: "Apa artinya menjadi penggembala atas diri sendiri? Bukan menguasai, bukan pula menindas...",
        content: `Apa artinya menjadi penggembala atas diri sendiri?

Bukan menguasai, bukan pula menindas. Menggembala adalah seni menemani — menemani hawa nafsu yang kadang mengamuk seperti badai, kadang mendekap lembut seperti embun pagi.

## I. Mengenali Kawanan

Seorang penggembala mengenal setiap ekor dombanya. Ia tahu mana yang suka melangkah, mana yang sering tersesat, mana yang pemalu, dan mana yang berani. Demikian pula dengan hawa nafsu — ia bukan satu, melainkan kawanan yang terdiri dari berbagai bentuk: hasrat, keinginan, ketakutan, dan harapan.

## II. Padang Rumput Hati

Hati adalah padang rumput. Kadang hijau dan subur, kadang kering dan gersang. Tugas penggembala adalah membawa kawanan ke padang yang tepat, di waktu yang tepat. Terlalu lama di padang subur akan membuat nafsu liar dan rakus. Terlalu lama di padang gersang akan membuatnya lemah dan putus asa.

## III. Tongkat dan Seruling

Dua alat seorang penggembala: tongkat untuk menunjukkan jalan, dan seruling untuk menghibur. Dalam konteks jiwa, tongkat adalah kesadaran — yang menunjukkan arah ketika kabut tebal menyelimuti. Seruling adalah seni — yang mengubah kesunyian menjadi melodi, penderitaan menjadi keindahan.

## IV. Kembali ke Kandang

Setiap senja, penggembala membawa kawanan pulang. Bukan karena malam menakutkan, tapi karena istirahat itu perlu. Jiwa yang terus berlari tanpa henti akan kelelahan. Dalam kandang yang hangat, kawanan beristirahat, memulihkan diri, bersiap untuk esok hari.

Demikianlah seni menggembala hawa nafsu — bukan perang, bukan penaklukan, melainkan tarian harmonis antara kesadaran dan keinginan, antara langkah dan hentian, antara suara dan senyap.`,
        theme: "nafsu",
        tags: JSON.stringify(["nafsu", "penggembala", "kesadaran"]),
        readingTime: 8,
        isPublished: true,
        isFeatured: true,
        publishedAt: new Date("2024-02-28"),
      },
    }),
    db.work.create({
      data: {
        title: "Surat untuk Tuhan yang Mendengar",
        slug: "surat-untuk-tuhan-yang-mendengar",
        type: "puisi",
        excerpt: "Ya Tuhan, aku menulis ini bukan karena Engkau butuh surat dariku...",
        content: `Ya Tuhan,

Aku menulis ini bukan karena Engkau butuh surat dariku. Engkau Maha Mengetahui, Maha Mendengar, Maha Melihat. Tapi aku butuh menulis, karena kadang lidah terlalu kaku untuk berdoa.

Aku tidak meminta kekayaan — ia bisa membuatku lupa.
Aku tidak meminta kemasyhuran — ia bisa membuatku sombong.
Aku tidak meminta keabadian — ia bisa membuatku takabur.

Aku hanya meminta satu hal:
Jangan biarkan aku lupa.

Jangan biarkan aku lupa dari mana aku datang.
Jangan biarkan aku lupa ke mana aku akan kembali.
Jangan biarkan aku lupa bahwa setiap napas adalah pinjaman.

Dan ketika aku mulai lupa — karena aku pasti akan lupa —
kirimkanlah sesuatu yang membuatku teringat.
Bisa jadi melalui sepatah kata,
bisa jadi melalui tatapan mata,
bisa jadi melalui kesunyian yang sangat dalam.

Aku tahu Engkau mendengar.
Bukan karena aku merasa istimewa.
Tapi karena Engkau adalah Dzat yang Mendengar.

Dan itu cukup.
Itu lebih dari cukup.

— Seorang yang terus berusaha mengingat`,
        theme: "ruhani",
        tags: JSON.stringify(["doa", "tuhan", "ingat"]),
        readingTime: 3,
        isPublished: true,
        isFeatured: false,
        publishedAt: new Date("2024-01-10"),
      },
    }),
    db.work.create({
      data: {
        title: "Pertemuan di Perempatan Waktu",
        slug: "pertemuan-di-perempatan-waktu",
        type: "cerpen",
        excerpt: "Ia berdiri di perempatan itu setiap malam, menunggu sesuatu yang ia sendiri tak yakin apa...",
        content: `Ia berdiri di perempatan itu setiap malam, menunggu sesuatu yang ia sendiri tak yakin apa.

Perempatan itu biasa saja — empat jalan yang bertemu di bawah pohon beringin tua. Tapi bagi Prabu, tempat itu istimewa. Di situlah waktu tampaknya melambat, seolah ia berada di antara dua dunia.

Malam itu, bulan purnama menggantung rendah, memancarkan cahaya perak yang menari-nari di dedaunan. Prabu, seperti biasa, menunggu.

"Apa yang kau tunggu?" suara itu datang dari belakangnya.

Prabu menoleh. Seorang tua berjubah putih berdiri di sana, wajahnya samar seperti bayangan di air.

"Aku... tidak tahu," jawab Prabu jujur. "Mungkin aku menunggu diriku sendiri."

Orang tua itu tersenyum. "Menunggu diri sendiri adalah pekerjaan paling sulit. Karena diri itu tidak pernah diam. Ia bergerak, berubah, bersembunyi."

"Lalu bagaimana aku bisa menemukannya?"

"Dengan berhenti mencari," kata orang tua itu, duduk di batu di bawah pohon. "Kau liat jalan-jalan ini? Masing-masing mengarah ke tempat yang berbeda. Tapi semua bermuara pada satu titik — tempat kau berdiri sekarang."

Prabu memandang keempat jalan itu. Satu menuju kota dengan lampu-lampunya yang gemerlap. Satu menuju desa dengan asap dapur yang mengepul. Satu menuju hutan dengan gelap yang menyeramkan. Dan satu menuju pantai dengan suara ombak yang terdengar samar.

"Jadi... aku tidak perlu pergi ke mana-mana?"

"Kau sudah di mana kau seharusnya," orang tua itu bangkit. "Perjalanan sejati bukan tentang memindahkan tubuh dari satu tempat ke tempat lain. Tapi tentang memindahkan kesadaran dari gelap ke terang, dari tidur ke terjaga."

Sebelum Prabu sempat bertanya lebih lanjut, orang tua itu sudah menghilang, meninggalkan hanya embun pagi yang mulai turun.

Dan Prabu, untuk pertama kalinya, pulang tanpa rasa penasaran. Ia tahu sekarang — yang ia tunggu bukanlah sesuatu yang akan datang. Ia menunggu kesadarannya sendiri untuk terjaga.

Dan malam itu, ia akhirnya terjaga.`,
        theme: "mimpi",
        tags: JSON.stringify(["perempatan", "waktu", "kesadaran"]),
        readingTime: 6,
        isPublished: true,
        isFeatured: true,
        publishedAt: new Date("2023-12-20"),
      },
    }),
    db.work.create({
      data: {
        title: "Lautan dalam Secangkir",
        slug: "lautan-dalam-secangkir",
        type: "puisi",
        excerpt: "Ada lautan dalam setiap secangkir kopi pagi...",
        content: `Ada lautan dalam setiap secangkir kopi pagi.

Kegelapan yang berputar
membawa kabar dari tanah jauh:
biji yang dipanggang api,
disimpan dalam kesabaran,
ditunggangi uap yang menari.

Ketika kupertemukan bibir dengan pinggiran cangkir,
kudengar ombak dari Acheh
berbisik di lidah:
"Kami telah menempuh perjalanan jauh
untuk membangunkanmu."

Dan terjagalah aku —
bukan dari tidur malam,
tapi dari kelalaian siang.

Kopi adalah sahabat yang jujur:
ia tak janji surga,
hanya kejelasan untuk sejenak,
sebelum kembali mengambang
dalam lautan hari.

— Catatan Pagi, Jam 5:30`,
        theme: "kesadaran",
        tags: JSON.stringify(["kopi", "pagi", "kejelasan"]),
        readingTime: 2,
        isPublished: true,
        isFeatured: false,
        publishedAt: new Date("2024-01-18"),
      },
    }),
  ]);

  console.log(`✅ Created ${works.length} works`);

  // ======================
  // SEED DREAM LOGS
  // ======================
  const dreamLogs = await Promise.all([
    db.dreamLog.create({
      data: {
        title: "Pertemuan dengan Bayangan",
        slug: "pertemuan-dengan-bayangan",
        content: "Malam ini aku bermimpi bertemu dengan bayanganku sendiri. Ia berdiri di tepi sungai yang airnya hitam seperti tinta. 'Aku adalah kamu yang kauabaikan,' katanya. 'Aku adalah rindu yang kaukubur.' Aku terbangun dengan wajah basah — bukan air mata, tapi embun yang turun dari langit-langit kamar.",
        symbols: JSON.stringify(["sungai", "bayangan", "tinta"]),
        lucidity: "high",
        mood: "melancholic",
        dreamDate: new Date("2024-03-20"),
        isRecurring: false,
        isLucid: true,
        notes: "Mimpi ini muncul ketika sedang banyak menulis tentang identitas.",
      },
    }),
    db.dreamLog.create({
      data: {
        title: "Kota Tanpa Warna",
        slug: "kota-tanpa-warna",
        content: "Aku berjalan di kota yang semua warnanya telah diambil. Bangunan, mobil, pohon, bahkan langit — semuanya abu-abu. Satu-satunya warna adalah kunang-kunang yang melayang di udara, membentuk kalimat: 'Carilah yang hilang.' Aku terbangun dengan pertanyaan: apa yang telah aku hilangkan?",
        symbols: JSON.stringify(["kota", "warna", "kunang-kunang"]),
        lucidity: "medium",
        mood: "contemplative",
        dreamDate: new Date("2024-03-15"),
        isRecurring: false,
        isLucid: false,
      },
    }),
    db.dreamLog.create({
      data: {
        title: "Surat dari Masa Depan",
        slug: "surat-dari-masa-depan",
        content: "Dalam mimpi, aku menerima surat yang ditulis dengan tanganku sendiri, tapi tulisannya lebih tua, lebih goyah. Isinya: 'Jangan takut. Semua yang kaukhawatirkan tidak akan terjadi. Dan yang terjadi, tidak seburuk yang kaukira.' Surat itu berbau kertas tua dan hujan.",
        symbols: JSON.stringify(["surat", "waktu", "tangan"]),
        lucidity: "high",
        mood: "peaceful",
        dreamDate: new Date("2024-03-08"),
        isRecurring: false,
        isLucid: true,
        notes: "Mimpi ini sangat menenangkan. Seperti pesan dari diri yang lebih tua.",
      },
    }),
    db.dreamLog.create({
      data: {
        title: "Perpustakaan Malam",
        slug: "perpustakaan-malam",
        content: "Aku berada di perpustakaan raksasa yang tak berujung. Setiap buku adalah mimpi seseorang. Aku mencari buku dengan namaku, dan menemukannya di rak paling atas. Tapi halamannya kosong — aku belum menulisnya. Atau mungkin, aku sedang menulisnya sekarang.",
        symbols: JSON.stringify(["perpustakaan", "buku", "tangga"]),
        lucidity: "medium",
        mood: "curious",
        dreamDate: new Date("2024-02-28"),
        isRecurring: false,
        isLucid: false,
      },
    }),
    db.dreamLog.create({
      data: {
        title: "Cermin yang Tak Memantulkan",
        slug: "cermin-yang-tak-memantulkan",
        content: "Aku berdiri di depan cermin raksasa, tapi pantulanku tidak ada. Yang ada adalah wajah-wajah orang asing yang bergantian muncul, satu per satu. Setiap wajah menatapku dengan mata penuh makna, lalu menghilang. Wajah terakhir yang muncul adalah wajahku sendiri, tapi tersenyum — senyum yang belum pernah kulihat di kaca biasa.",
        symbols: JSON.stringify(["cermin", "wajah", "identitas"]),
        lucidity: "high",
        mood: "profound",
        dreamDate: new Date("2024-02-01"),
        isRecurring: true,
        isLucid: true,
        notes: "Mimpi berulang ketiga kalinya. Mungkin ada pesan penting tentang identitas.",
      },
    }),
  ]);

  console.log(`✅ Created ${dreamLogs.length} dream logs`);

  // ==================
  // SEED QUOTES
  // ==================
  const quotes = await Promise.all([
    db.quote.create({
      data: {
        text: "Aku menggembala hawa nafsu, bukan ditundukkan olehnya.",
        source: "Catatan Kegelapan",
        author: "Santri Angon",
        isFeatured: true,
      },
    }),
    db.quote.create({
      data: {
        text: "Setiap mimpi adalah surat dari alam bawah sadar yang belum terbaca.",
        source: "Dream Log I",
        author: "Santri Angon",
        isFeatured: true,
      },
    }),
    db.quote.create({
      data: {
        text: "Menulis adalah cara jiwa berbicara ketika mulut terlalu lelah untuk berkata.",
        source: "Refleksi",
        author: "Santri Angon",
        isFeatured: true,
      },
    }),
    db.quote.create({
      data: {
        text: "Kegelapan bukan musuh, ia adalah kanvas kosong tempat jiwa melukis rahasia.",
        source: "Dialog dengan Kegelapan",
        author: "Santri Angon",
        isFeatured: false,
        workId: works[0].id,
      },
    }),
    db.quote.create({
      data: {
        text: "Perjalanan sejati bukan tentang memindahkan tubuh, tapi memindahkan kesadaran.",
        source: "Pertemuan di Perempatan Waktu",
        author: "Santri Angon",
        isFeatured: true,
        workId: works[3].id,
      },
    }),
    db.quote.create({
      data: {
        text: "Prak burukeun — segerakan kesadaran. Ulah edan, kudu eling — jangan gila, tetap waspada.",
        source: "Mimpi Pertama",
        author: "Prabu Danling",
        isFeatured: true,
      },
    }),
    db.quote.create({
      data: {
        text: "Santri: pelajar sejati. Angon: menggembala — ia menggembala hawa nafsunya sendiri.",
        source: "Tentang Nama",
        author: "Santri Angon",
        isFeatured: false,
      },
    }),
    db.quote.create({
      data: {
        text: "Dalam sunyi, aku menemukan bahwa cahaya sejati tidak datang dari luar, tapi menyala dari dalam.",
        source: "Dialog dengan Kegelapan",
        author: "Santri Angon",
        isFeatured: false,
        workId: works[0].id,
      },
    }),
  ]);

  console.log(`✅ Created ${quotes.length} quotes`);

  // ==================
  // SEED SETTINGS
  // ==================
  await db.siteSetting.create({
    data: {
      key: "site_name",
      value: "Santri Angon",
      type: "text",
    },
  });

  await db.siteSetting.create({
    data: {
      key: "site_tagline",
      value: "Menggembala mimpi, menahan nafsu, menyapa dunia",
      type: "text",
    },
  });

  await db.siteSetting.create({
    data: {
      key: "social_links",
      value: JSON.stringify({
        twitter: "https://twitter.com/santriangon",
        instagram: "https://instagram.com/santriangon",
        medium: "https://medium.com/@santriangon",
      }),
      type: "json",
    },
  });

  console.log("✅ Created site settings");

  // ==================
  // STATS
  // ==================
  const stats = {
    works: await db.work.count(),
    dreamLogs: await db.dreamLog.count(),
    quotes: await db.quote.count(),
  };

  console.log("\n📊 Database Stats:");
  console.log(`   Works: ${stats.works}`);
  console.log(`   Dream Logs: ${stats.dreamLogs}`);
  console.log(`   Quotes: ${stats.quotes}`);
  console.log("\n🌱 Seeding completed!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
