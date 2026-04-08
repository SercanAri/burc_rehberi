const zodiacSigns = [
  {
    slug: "koc",
    name: "Koç",
    symbol: "♈",
    dates: "21 Mar - 19 Nis",
    element: "Ateş",
    ruler: "Mars",
    summary: "Cesur, hızlı karar alan ve başlangıç enerjisi yüksek bir burçtur.",
    cardDetail: "Koç enerjisi öne çıkmayı, yeni alanlara ilk adımı atmayı ve beklemeden harekete geçmeyi sever. Rekabet, tempo ve inisiyatif gerektiren ortamlarda parlar; sabırsızlaştığında ise aynı hız onu daha aceleci gösterebilir.",
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
    cardDetail: "Boğa güven veren, ritmi sağlam ve konfor duygusu güçlü bir burçtur. Estetik, lezzet ve maddi güven onun için önemlidir; karar verdiğinde kolay kolay yön değiştirmemesi en belirgin özelliklerinden biridir.",
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
    cardDetail: "İkizler zihinsel hareketliliği yüksek, çevresinden sürekli bilgi toplayan ve aynı anda birkaç konuya ilgi duyan bir profildir. Konuşma, bağlantı kurma ve fikirler arasında geçiş yapma becerisi güçlüdür; dağınık göründüğü anlarda bile zihni yeni olasılıkları tarıyordur.",
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
    cardDetail: "Yengeç sezgileriyle yön bulan, bağ kurduğu insanları korumaya çalışan ve duygusal güvene büyük değer veren bir burçtur. Dışarıdan temkinli görünse de güven hissettiğinde son derece şefkatli, sahiplenici ve destekleyici bir tavır sergiler.",
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
    cardDetail: "Aslan görünür olmayı, üretimini paylaşmayı ve bulunduğu ortama sıcaklık katmayı sever. Doğal özgüveni ve yaratıcı tavrı sayesinde dikkat çeker; takdir edildiğinde ise cömert ve motive edici bir enerji yayar.",
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
    cardDetail: "Başak düzen kurmayı, sorunları ayıklamayı ve işleri daha iyi hale getirmeyi seven analitik bir zihin taşır. İnce ayrıntıları fark etmesi ve pratik çözümler üretmesi güçlü yanıdır; bazen yüksek standartları onu fazla eleştirel gösterebilir.",
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
    cardDetail: "Terazi ilişkilerde denge, adalet ve karşılıklılık arayan bir burçtur. Estetik bakışı güçlüdür; bir ortamın hem duygusal hem de görsel olarak uyumlu olmasını ister, bu yüzden karar verirken her yönü tartma eğilimindedir.",
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
    cardDetail: "Akrep derinlikten beslenir; insanların söylemediklerini, alt akıntıları ve güç dinamiklerini kolayca sezer. Güçlü sezgisi, sadakati ve kriz anındaki dayanıklılığıyla öne çıkar; dönüşüm onun karakterinin merkezindedir.",
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
    cardDetail: "Yay büyük resmi görmeyi, sınırlarını genişletmeyi ve yeni deneyimlerle beslenmeyi seven özgür ruhlu bir burçtur. Yolculuk, öğrenme ve keşif duygusu arttıkça enerjisi yükselir; açık sözlülüğü bazen fazla keskin gelebilir.",
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
    cardDetail: "Oğlak hedefe giden yolu planlayan, sabırlı ilerleyen ve başarıyı zamana yayılan emekle kuran bir burçtur. Sorumluluk almaktan kaçmaz; sağlam temeller atmayı ve sonuç veren yapılar kurmayı sever.",
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
    cardDetail: "Kova yenilik, bağımsız düşünce ve toplumsal fayda fikriyle hareket eden bir burçtur. Kendi çizgisini korumayı önemser; sıradışı fikirleri ve geleceğe dönük bakışıyla fark yaratırken duygularını her zaman hemen göstermeyebilir.",
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
    cardDetail: "Balık empati gücü yüksek, hayal dünyası zengin ve sezgisel algısı kuvvetli bir burçtur. Duyguları derinden hisseder; sanat, şifa, yaratıcılık ve iç dünyayla temas ettiği alanlarda çok daha parlak görünür.",
    strengths: ["Empati", "Hayal gücü", "Şefkat"],
    focus: "Sezgi, yaratıcılık, duygusal akış ve şifa",
    motto: "Sezgilerimle akışta kalırım."
  }
];

const zodiacVisuals = {
  koc: { colors: ["#ff5c5c", "#ffb86b", "#43112f"], points: [[58, 142], [92, 82], [137, 116], [184, 70], [248, 104]] },
  boga: { colors: ["#2dd4bf", "#f5d06f", "#173829"], points: [[66, 96], [113, 70], [159, 98], [203, 76], [250, 126]] },
  ikizler: { colors: ["#60a5fa", "#c4b5fd", "#182553"], points: [[70, 70], [70, 144], [126, 92], [126, 166], [210, 78], [210, 152], [254, 112]] },
  yengec: { colors: ["#38bdf8", "#f0f9ff", "#12314d"], points: [[58, 132], [104, 104], [150, 132], [198, 88], [252, 122]] },
  aslan: { colors: ["#f97316", "#fde68a", "#4a1805"], points: [[70, 132], [110, 82], [160, 64], [212, 96], [244, 150], [180, 168]] },
  basak: { colors: ["#84cc16", "#f7d794", "#1d3520"], points: [[72, 78], [112, 118], [154, 92], [188, 138], [236, 96]] },
  terazi: { colors: ["#f0abfc", "#93c5fd", "#2a1648"], points: [[58, 136], [104, 100], [160, 82], [216, 100], [262, 136]] },
  akrep: { colors: ["#a855f7", "#fb7185", "#210f38"], points: [[66, 72], [106, 118], [154, 84], [190, 128], [248, 162]] },
  yay: { colors: ["#f59e0b", "#fef3c7", "#3b2305"], points: [[62, 158], [118, 124], [166, 90], [212, 62], [256, 92]] },
  oglak: { colors: ["#94a3b8", "#facc15", "#20273d"], points: [[60, 92], [110, 116], [154, 82], [200, 126], [250, 102]] },
  kova: { colors: ["#22d3ee", "#a78bfa", "#13214f"], points: [[54, 102], [96, 84], [138, 104], [180, 84], [222, 104], [266, 88]] },
  balik: { colors: ["#818cf8", "#67e8f9", "#141b4b"], points: [[78, 76], [122, 122], [78, 168], [198, 76], [242, 122], [198, 168]] }
};

function getVisualSeed(sign) {
  return sign.slug.split("").reduce((total, char) => total + char.charCodeAt(0), 0);
}

function renderStarField(sign) {
  const seed = getVisualSeed(sign);

  return Array.from({ length: 26 }, (_, index) => {
    const x = 18 + ((seed * (index + 7) * 17) % 284);
    const y = 18 + ((seed * (index + 11) * 23) % 172);
    const radius = 0.7 + ((seed + index) % 4) * 0.35;
    const opacity = 0.28 + ((seed + index * 5) % 7) * 0.08;

    return `<circle cx="${x}" cy="${y}" r="${radius.toFixed(2)}" fill="#fff8f1" opacity="${opacity.toFixed(2)}"/>`;
  }).join("");
}

function renderConstellation(points) {
  const lines = points.slice(1).map((point, index) => {
    const previous = points[index];
    return `<line x1="${previous[0]}" y1="${previous[1]}" x2="${point[0]}" y2="${point[1]}"/>`;
  }).join("");
  const nodes = points.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="4.8"/>`).join("");

  return `${lines}${nodes}`;
}

function createZodiacImage(sign) {
  const visual = zodiacVisuals[sign.slug] || zodiacVisuals.koc;
  const [primary, secondary, deep] = visual.colors;
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 220" role="img" aria-label="${sign.name} burcu profesyonel görseli">
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="1" y2="1">
          <stop stop-color="${deep}"/>
          <stop offset=".52" stop-color="#12091f"/>
          <stop offset="1" stop-color="${primary}"/>
        </linearGradient>
        <radialGradient id="nebulaA" cx="28%" cy="18%" r="70%">
          <stop stop-color="${secondary}" stop-opacity=".72"/>
          <stop offset=".42" stop-color="${primary}" stop-opacity=".23"/>
          <stop offset="1" stop-color="${deep}" stop-opacity="0"/>
        </radialGradient>
        <radialGradient id="nebulaB" cx="78%" cy="72%" r="62%">
          <stop stop-color="${primary}" stop-opacity=".58"/>
          <stop offset=".48" stop-color="${secondary}" stop-opacity=".18"/>
          <stop offset="1" stop-color="#12091f" stop-opacity="0"/>
        </radialGradient>
        <linearGradient id="symbolGradient" x1="0" y1="0" x2="1" y2="1">
          <stop stop-color="${secondary}"/>
          <stop offset="1" stop-color="${primary}"/>
        </linearGradient>
        <filter id="softGlow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="7" result="blur"/>
          <feMerge>
            <feMergeNode in="blur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        <filter id="constellationGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.5" result="blur"/>
          <feMerge>
            <feMergeNode in="blur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      <rect width="320" height="220" rx="34" fill="url(#sky)"/>
      <rect width="320" height="220" rx="34" fill="url(#nebulaA)"/>
      <rect width="320" height="220" rx="34" fill="url(#nebulaB)"/>
      <path d="M-10 165 C54 98 108 212 184 116 S286 24 340 92" fill="none" stroke="${secondary}" stroke-width="1.2" opacity=".24"/>
      <g>${renderStarField(sign)}</g>
      <g class="constellation" stroke="${secondary}" stroke-width="2.3" stroke-linecap="round" fill="${secondary}" opacity=".92" filter="url(#constellationGlow)">
        ${renderConstellation(visual.points)}
      </g>
      <circle cx="244" cy="64" r="44" fill="${primary}" opacity=".18" filter="url(#softGlow)"/>
      <circle cx="86" cy="158" r="54" fill="${secondary}" opacity=".12" filter="url(#softGlow)"/>
      <g transform="translate(160 116)">
        <circle r="55" fill="#070712" opacity=".46"/>
        <circle r="52" fill="none" stroke="#fff8f1" stroke-opacity=".20" stroke-width="1"/>
        <text text-anchor="middle" dominant-baseline="middle" font-size="82" font-family="Arial, sans-serif" fill="url(#symbolGradient)" filter="url(#softGlow)">${sign.symbol}</text>
      </g>
      <text x="28" y="40" font-size="14" font-weight="700" letter-spacing="3" font-family="Arial, sans-serif" fill="#fff8f1" opacity=".78">${sign.element.toUpperCase()}</text>
      <text x="292" y="192" text-anchor="end" font-size="23" font-weight="700" font-family="Arial, sans-serif" fill="#fff8f1">${sign.name}</text>
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
