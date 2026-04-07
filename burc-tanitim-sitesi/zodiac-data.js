const zodiacSigns = [
  {
    slug: "koc",
    name: "Koç",
    symbol: "♈",
    dates: "21 Mar - 19 Nis",
    element: "Ateş",
    ruler: "Mars",
    summary: "Cesur, hızlı karar alan ve başlangıç enerjisi yüksek bir burçtur.",
    strengths: ["Liderlik", "Cesaret", "Girişimcilik"],
    focus: "Yeni başlangıçlar, cesur kararlar ve kişisel motivasyon",
    motto: "Başlamak için en doğru zaman şimdi."
  },
  {
    slug: "boga",
    name: "Boğa",
    symbol: "♉",
    dates: "20 Nis - 20 May",
    element: "Toprak",
    ruler: "Venüs",
    summary: "Güven, konfor ve istikrar arayan sabırlı bir enerji taşır.",
    strengths: ["Kararlılık", "Sadakat", "Pratiklik"],
    focus: "Finansal düzen, huzur, güven ve sağlam adımlar",
    motto: "Kalıcı olanı özenle inşa ederim."
  },
  {
    slug: "ikizler",
    name: "İkizler",
    symbol: "♊",
    dates: "21 May - 20 Haz",
    element: "Hava",
    ruler: "Merkür",
    summary: "Meraklı, konuşkan ve değişime kolay uyum sağlayan bir burçtur.",
    strengths: ["İletişim", "Merak", "Uyum"],
    focus: "İletişim, öğrenme, kısa planlar ve sosyal bağlantılar",
    motto: "Her fikir yeni bir kapı açar."
  },
  {
    slug: "yengec",
    name: "Yengeç",
    symbol: "♋",
    dates: "21 Haz - 22 Tem",
    element: "Su",
    ruler: "Ay",
    summary: "Duygusal bağlara, aileye ve güvenli alanlara önem verir.",
    strengths: ["Şefkat", "Sezgi", "Koruyuculuk"],
    focus: "Duygusal denge, aile, ev ve iç huzur",
    motto: "Kalbimin ritmi bana yolu gösterir."
  },
  {
    slug: "aslan",
    name: "Aslan",
    symbol: "♌",
    dates: "23 Tem - 22 Ağu",
    element: "Ateş",
    ruler: "Güneş",
    summary: "Yaratıcı, sahne ışığını seven ve özgüveni yüksek bir burçtur.",
    strengths: ["Yaratıcılık", "Cömertlik", "Özgüven"],
    focus: "Yaratıcılık, görünürlük, özgüven ve sahne enerjisi",
    motto: "Işığımı paylaşarak büyürüm."
  },
  {
    slug: "basak",
    name: "Başak",
    symbol: "♍",
    dates: "23 Ağu - 22 Eyl",
    element: "Toprak",
    ruler: "Merkür",
    summary: "Detaylara odaklanan, düzen seven ve çözüm üretmeyi bilen bir enerjidir.",
    strengths: ["Analiz", "Düzen", "Sorumluluk"],
    focus: "Planlama, düzen, sağlık ve verimli rutinler",
    motto: "Küçük detaylar büyük fark yaratır."
  },
  {
    slug: "terazi",
    name: "Terazi",
    symbol: "♎",
    dates: "23 Eyl - 22 Eki",
    element: "Hava",
    ruler: "Venüs",
    summary: "Denge, zarafet ve ilişkiler üzerinden kendini ifade eder.",
    strengths: ["Diplomasi", "Estetik", "Adalet"],
    focus: "İlişkiler, uyum, estetik kararlar ve adil seçimler",
    motto: "Uyumun olduğu yerde güzellik vardır."
  },
  {
    slug: "akrep",
    name: "Akrep",
    symbol: "♏",
    dates: "23 Eki - 21 Kas",
    element: "Su",
    ruler: "Plüton ve Mars",
    summary: "Derinlik, dönüşüm ve güçlü sezgilerle tanınır.",
    strengths: ["Tutku", "Sezgi", "Direnç"],
    focus: "Dönüşüm, sezgi, strateji ve içsel güç",
    motto: "Dönüşüm benim gücümdür."
  },
  {
    slug: "yay",
    name: "Yay",
    symbol: "♐",
    dates: "22 Kas - 21 Ara",
    element: "Ateş",
    ruler: "Jüpiter",
    summary: "Özgürlüğü, keşfi ve büyük resmi görmeyi sever.",
    strengths: ["İyimserlik", "Macera", "Bilgelik"],
    focus: "Keşif, eğitim, yolculuklar ve büyük hedefler",
    motto: "Ufkum genişledikçe yolum açılır."
  },
  {
    slug: "oglak",
    name: "Oğlak",
    symbol: "♑",
    dates: "22 Ara - 19 Oca",
    element: "Toprak",
    ruler: "Satürn",
    summary: "Hedef odaklı, disiplinli ve uzun vadeli başarıya yatkındır.",
    strengths: ["Disiplin", "Sabır", "Strateji"],
    focus: "Kariyer, sorumluluk, hedefler ve uzun vadeli planlar",
    motto: "Zirveye adım adım çıkarım."
  },
  {
    slug: "kova",
    name: "Kova",
    symbol: "♒",
    dates: "20 Oca - 18 Şub",
    element: "Hava",
    ruler: "Uranüs ve Satürn",
    summary: "Özgün fikirler, toplumsal bakış ve yenilikçi düşünceyle öne çıkar.",
    strengths: ["Yenilik", "Bağımsızlık", "Vizyon"],
    focus: "Yenilik, topluluklar, teknoloji ve özgür düşünce",
    motto: "Farklı düşünmek geleceği kurar."
  },
  {
    slug: "balik",
    name: "Balık",
    symbol: "♓",
    dates: "19 Şub - 20 Mar",
    element: "Su",
    ruler: "Neptün ve Jüpiter",
    summary: "Hayal gücü, empati ve sezgisel anlayışla hareket eder.",
    strengths: ["Empati", "Hayal gücü", "Şefkat"],
    focus: "Sezgi, yaratıcılık, duygusal akış ve şifa",
    motto: "Sezgilerimle akışta kalırım."
  }
];

function createZodiacImage(sign) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 220" role="img" aria-label="${sign.name} burcu">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop stop-color="#ffb86b"/>
          <stop offset="1" stop-color="#a78bfa"/>
        </linearGradient>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="7" result="blur"/>
          <feMerge>
            <feMergeNode in="blur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      <rect width="320" height="220" rx="34" fill="#241128"/>
      <circle cx="70" cy="48" r="58" fill="#ffb86b" opacity=".20"/>
      <circle cx="260" cy="170" r="84" fill="#a78bfa" opacity=".20"/>
      <path d="M52 168 C104 118 142 196 197 124 S258 60 286 90" fill="none" stroke="url(#bg)" stroke-width="3" opacity=".55"/>
      <text x="160" y="112" text-anchor="middle" dominant-baseline="middle" font-size="92" font-family="Arial, sans-serif" fill="url(#bg)" filter="url(#glow)">${sign.symbol}</text>
      <text x="160" y="178" text-anchor="middle" font-size="25" font-weight="700" font-family="Arial, sans-serif" fill="#fff8f1">${sign.name}</text>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function getTodayLabel() {
  return new Intl.DateTimeFormat("tr-TR", {
    timeZone: "Europe/Istanbul",
    dateStyle: "full"
  }).format(new Date());
}

function getDailyReading(sign) {
  const today = new Date();
  const dateParts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Istanbul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).formatToParts(today).reduce((parts, item) => {
    parts[item.type] = item.value;
    return parts;
  }, {});
  const daySeed = Number(`${dateParts.year}${dateParts.month}${dateParts.day}`);
  const signSeed = sign.slug.split("").reduce((total, char) => total + char.charCodeAt(0), 0);
  const seed = daySeed + signSeed;

  const themes = [
    "Bugün kararlarını sadeleştirip tek bir hedefe odaklanman sana hız kazandırabilir.",
    "Günün enerjisi iletişimde netlik ve küçük planları tamamlama konusunda destekleyici.",
    "Bugün sezgilerini dinleyip acele etmeden ilerlemek daha dengeli sonuçlar getirebilir.",
    "Yeni bir fikir, görüşme veya kısa bir plan günün akışını olumlu yönde değiştirebilir.",
    "Bugün düzen kurmak, ertelediğin bir konuyu kapatmak ve enerjini toparlamak için uygun."
  ];
  const love = [
    "İlişkilerde açık konuşmak yanlış anlaşılmaları azaltır.",
    "Duygularını sakin ve net ifade etmek bağları güçlendirebilir.",
    "Küçük bir jest veya içten bir mesaj günün havasını yumuşatabilir.",
    "Beklentilerini sadeleştirmek ilişkilerde denge sağlayabilir.",
    "Dinlemek ve karşı tarafa alan açmak bugün daha etkili olabilir."
  ];
  const career = [
    "İş ve okul tarafında öncelik listesi hazırlamak verimini artırır.",
    "Yarım kalan bir işi bitirmek için uygun bir gün.",
    "Yeni bir fikir not almak veya kısa bir görüşme yapmak ilerleme sağlayabilir.",
    "Detayları kontrol etmek olası hataları erkenden fark ettirebilir.",
    "Planlı hareket edersen gün sonunda somut bir sonuç alabilirsin."
  ];
  const money = [
    "Harcamalarda küçük kontrol listesi yapmak iyi gelebilir.",
    "Bugün ani masraflar yerine planlı alışveriş daha güvenli.",
    "Bütçeni gözden geçirmek ve gereksiz kalemleri ayırmak için uygun.",
    "Uzun vadeli düşünmek kısa vadeli isteklerden daha faydalı olabilir.",
    "Maddi konularda acele karar yerine ikinci kez kontrol iyi olur."
  ];
  const health = [
    "Kısa yürüyüş, su tüketimi ve düzenli mola enerjini toparlayabilir.",
    "Zihnini yoran konulardan kısa süre uzaklaşmak iyi gelebilir.",
    "Uyku ve beslenme düzenine dikkat etmek bugün daha önemli.",
    "Bedeni yormadan hareket etmek denge sağlayabilir.",
    "Nefes egzersizi veya sakin bir rutin gününü destekleyebilir."
  ];
  const colors = ["Altın", "Mor", "Turuncu", "Lacivert", "Yeşil", "Gümüş", "Kırmızı"];

  return {
    date: getTodayLabel(),
    theme: themes[seed % themes.length],
    love: love[(seed + 1) % love.length],
    career: career[(seed + 2) % career.length],
    money: money[(seed + 3) % money.length],
    health: health[(seed + 4) % health.length],
    luckyColor: colors[seed % colors.length],
    luckyNumber: (seed % 9) + 1
  };
}
