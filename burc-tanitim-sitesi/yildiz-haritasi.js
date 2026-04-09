const chartForm = document.querySelector("#chartForm");
const loadingCard = document.querySelector("#loadingCard");
const loadingMessage = document.querySelector("#loadingMessage");
const chartResults = document.querySelector("#chartResults");
const resultTitle = document.querySelector("#resultTitle");
const resultSubtitle = document.querySelector("#resultSubtitle");
const accuracyBadge = document.querySelector("#accuracyBadge");
const sourceBadge = document.querySelector("#sourceBadge");
const chartWheel = document.querySelector("#chartWheel");
const summaryGrid = document.querySelector("#summaryGrid");
const summaryText = document.querySelector("#summaryText");
const analysisGrid = document.querySelector("#analysisGrid");
const resultHighlights = document.querySelector("#resultHighlights");
const elementBarsCard = document.querySelector("#elementBarsCard");
const placementsTableBody = document.querySelector("#placementsTableBody");
const aspectList = document.querySelector("#aspectList");
const birthDateInput = document.querySelector("#birthDate");
const birthTimeInput = document.querySelector("#birthTime");
const birthPlaceInput = document.querySelector("#birthPlace");
const cityPreviewCard = document.querySelector("#cityPreviewCard");
const cityPreviewName = document.querySelector("#cityPreviewName");
const cityPreviewMeta = document.querySelector("#cityPreviewMeta");
const formNote = document.querySelector("#formNote");

const astro = window.Astronomy;
const TURKEY_UTC_OFFSET = 3;
const elementOrder = ["Ateş", "Toprak", "Hava", "Su"];
const loadingSteps = [
  "UTC zamanı hazırlanıyor...",
  "Gezegen konumları hesaplanıyor...",
  "Yükselen ve MC bulunuyor...",
  "Açılar yorumlanıyor..."
];
const planetGlyphs = {
  sun: "☉",
  moon: "☽",
  mercury: "☿",
  venus: "♀",
  mars: "♂",
  jupiter: "♃",
  saturn: "♄",
  uranus: "♅",
  neptune: "♆",
  pluto: "♇",
  asc: "ASC",
  mc: "MC"
};
const cityDisplayMap = {
  Adiyaman: "Adıyaman",
  Agri: "Ağrı",
  Aydin: "Aydın",
  Balikesir: "Balıkesir",
  Bingol: "Bingöl",
  Canakkale: "Çanakkale",
  Cankiri: "Çankırı",
  Corum: "Çorum",
  Diyarbakir: "Diyarbakır",
  Elazig: "Elazığ",
  Eskisehir: "Eskişehir",
  Gumushane: "Gümüşhane",
  Istanbul: "İstanbul",
  Izmir: "İzmir",
  Kirklareli: "Kırklareli",
  Kirsehir: "Kırşehir",
  Kutahya: "Kütahya",
  Kahramanmaras: "Kahramanmaraş",
  Mugla: "Muğla",
  Mus: "Muş",
  Nevsehir: "Nevşehir",
  Nigde: "Niğde",
  Sanliurfa: "Şanlıurfa",
  Usak: "Uşak",
  Tekirdag: "Tekirdağ",
  Sirnak: "Şırnak",
  Bartin: "Bartın",
  Igdir: "Iğdır",
  Karabuk: "Karabük",
  Duzce: "Düzce"
};
const planetDefinitions = [
  { key: "sun", label: "Güneş", body: () => astro.Body.Sun, aspect: true },
  { key: "moon", label: "Ay", body: null, aspect: true },
  { key: "mercury", label: "Merkür", body: () => astro.Body.Mercury, aspect: true },
  { key: "venus", label: "Venüs", body: () => astro.Body.Venus, aspect: true },
  { key: "mars", label: "Mars", body: () => astro.Body.Mars, aspect: true },
  { key: "jupiter", label: "Jüpiter", body: () => astro.Body.Jupiter, aspect: true },
  { key: "saturn", label: "Satürn", body: () => astro.Body.Saturn, aspect: true },
  { key: "uranus", label: "Uranus", body: () => astro.Body.Uranus, aspect: false },
  { key: "neptune", label: "Neptün", body: () => astro.Body.Neptune, aspect: false },
  { key: "pluto", label: "Plüton", body: () => astro.Body.Pluto, aspect: false }
];
const aspectDefinitions = [
  { angle: 0, label: "Kavuşum", orb: 8, tone: "temayı çok güçlü ve doğrudan çalıştırır" },
  { angle: 60, label: "Sekstil", orb: 4, tone: "daha akıcı ve destekleyici çalışır" },
  { angle: 90, label: "Kare", orb: 6, tone: "gerilim ve gelişim ihtiyacı üretir" },
  { angle: 120, label: "Üçgen", orb: 6, tone: "doğal akışta çalışan bir yetenek verir" },
  { angle: 180, label: "Karşıt", orb: 8, tone: "denge kurmayı ve farkındalık geliştirmeyi ister" }
];

let loadingIntervalId;

function normalizeCityKey(value) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/,?\s*turkiye$/i, "")
    .replace(/[ç]/g, "c")
    .replace(/[ğ]/g, "g")
    .replace(/[ıi]/g, "i")
    .replace(/[ö]/g, "o")
    .replace(/[ş]/g, "s")
    .replace(/[ü]/g, "u")
    .replace(/[^a-z0-9]/g, "");
}

function toDisplayCityName(value) {
  const prettified = cityDisplayMap[value] || value;

  return prettified;
}

const cityIndex = new Map(
  turkeyCities.map((city) => [
    normalizeCityKey(city.name),
    { ...city, displayName: toDisplayCityName(city.name) }
  ])
);

function populateCityList() {
  birthPlaceInput.innerHTML = [
    `<option value="">İl seç</option>`,
    ...turkeyCities.map((city) => {
    const displayName = toDisplayCityName(city.name);
      return `<option value="${displayName}">${displayName}</option>`;
    })
  ].join("");
}

function findCity(value) {
  return cityIndex.get(normalizeCityKey(value)) || null;
}

function updateCityPreview() {
  const city = findCity(birthPlaceInput.value);

  if (!city) {
    cityPreviewCard.hidden = true;
    return;
  }

  cityPreviewName.textContent = city.displayName;
  cityPreviewMeta.textContent = `${city.latitude.toFixed(4)} / ${city.longitude.toFixed(4)} • UTC+03:00`;
  cityPreviewCard.hidden = false;
}

function setMaxBirthDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  birthDateInput.max = `${year}-${month}-${day}`;
}

function startLoading() {
  let stepIndex = 0;
  loadingMessage.textContent = loadingSteps[0];
  loadingCard.hidden = false;
  chartResults.hidden = true;

  window.clearInterval(loadingIntervalId);
  loadingIntervalId = window.setInterval(() => {
    stepIndex = (stepIndex + 1) % loadingSteps.length;
    loadingMessage.textContent = loadingSteps[stepIndex];
  }, 680);
}

function stopLoading() {
  window.clearInterval(loadingIntervalId);
  loadingCard.hidden = true;
}

function normalizeAngle(angle) {
  return ((angle % 360) + 360) % 360;
}

function degreesToRadians(degrees) {
  return degrees * Math.PI / 180;
}

function radiansToDegrees(radians) {
  return radians * 180 / Math.PI;
}

function getSignByLongitude(longitude) {
  return zodiacSigns[Math.floor(normalizeAngle(longitude) / 30) % 12];
}

function getDegreeInSign(longitude) {
  return normalizeAngle(longitude) % 30;
}

function formatDegree(longitude) {
  const degreeInSign = getDegreeInSign(longitude);
  let degrees = Math.floor(degreeInSign);
  let minutes = Math.round((degreeInSign - degrees) * 60);

  if (minutes === 60) {
    degrees += 1;
    minutes = 0;
  }

  return `${degrees}° ${String(minutes).padStart(2, "0")}'`;
}

function formatSignedDegree(value) {
  return `${value >= 0 ? "+" : ""}${value.toFixed(2)}°`;
}

function toUtcDate(dateValue, timeValue) {
  const [year, month, day] = dateValue.split("-").map(Number);
  const [hour, minute] = (timeValue || "12:00").split(":").map(Number);

  return new Date(Date.UTC(year, month - 1, day, hour - TURKEY_UTC_OFFSET, minute));
}

function createEclipticVector(longitude, time) {
  const radians = degreesToRadians(longitude);
  return new astro.Vector(Math.cos(radians), Math.sin(radians), 0, astro.MakeTime(time));
}

function chooseEclipticIntersection(candidates, time, observer, chooser) {
  const rotation = astro.Rotation_ECL_HOR(time, observer);

  return candidates
    .map((longitude) => {
      const eclipticVector = createEclipticVector(longitude, time);
      const horizontalVector = astro.RotateVector(rotation, eclipticVector);
      const horizontal = astro.HorizonFromVector(horizontalVector, null);
      return {
        longitude: normalizeAngle(longitude),
        altitude: horizontal.lat,
        azimuth: horizontal.lon
      };
    })
    .sort(chooser)[0];
}

function calculateAscendantAndMc(time, city) {
  const observer = new astro.Observer(city.latitude, city.longitude, 0);
  const rotation = astro.Rotation_ECL_HOR(time, observer);
  const ascRow = rotation.rot[2];
  const mcRow = rotation.rot[1];
  const baseAsc = normalizeAngle(radiansToDegrees(Math.atan2(-ascRow[0], ascRow[1])));
  const baseMc = normalizeAngle(radiansToDegrees(Math.atan2(-mcRow[0], mcRow[1])));
  const asc = chooseEclipticIntersection(
    [baseAsc, baseAsc + 180],
    time,
    observer,
    (a, b) => Math.abs(a.azimuth - 90) - Math.abs(b.azimuth - 90)
  );
  const mc = chooseEclipticIntersection(
    [baseMc, baseMc + 180],
    time,
    observer,
    (a, b) => b.altitude - a.altitude
  );

  return {
    ascendantLongitude: asc.longitude,
    mcLongitude: mc.longitude,
    observer
  };
}

function getPlanetLongitude(definition, time) {
  if (definition.key === "moon") {
    return normalizeAngle(astro.Ecliptic(astro.GeoMoon(time)).elon);
  }

  return normalizeAngle(astro.Ecliptic(astro.GeoVector(definition.body(), time, true)).elon);
}

function getHouseNumber(longitude, ascendantLongitude) {
  const ascSignIndex = Math.floor(normalizeAngle(ascendantLongitude) / 30);
  const placementSignIndex = Math.floor(normalizeAngle(longitude) / 30);

  return ((placementSignIndex - ascSignIndex + 12) % 12) + 1;
}

function getElementCounts(placements) {
  const totals = { "Ateş": 0, Toprak: 0, Hava: 0, Su: 0 };
  const weights = {
    sun: 3,
    moon: 2,
    mercury: 1,
    venus: 1,
    mars: 1,
    jupiter: 1,
    saturn: 1,
    asc: 2,
    mc: 1
  };

  placements.forEach((placement) => {
    const sign = getSignByLongitude(placement.longitude);
    totals[sign.element] += weights[placement.key] || 1;
  });

  return totals;
}

function getDominantElement(elements) {
  return Object.entries(elements).sort((a, b) => b[1] - a[1])[0][0];
}

function getAspectSummary(aspects) {
  if (!aspects.length) {
    return "Belirgin ana açı görünümü az; bu haritada temalar daha çok gezegen burç yerleşimleri üzerinden okunuyor.";
  }

  const topAspect = aspects[0];
  return `${topAspect.first.label} ile ${topAspect.second.label} arasındaki ${topAspect.aspect.label.toLowerCase()} etkisi haritanın dikkat çeken ana bağlantılarından biri ve ${topAspect.aspect.tone}.`;
}

function calculateAspects(placements) {
  const eligible = placements.filter((placement) => placement.aspect);
  const aspects = [];

  for (let i = 0; i < eligible.length; i += 1) {
    for (let j = i + 1; j < eligible.length; j += 1) {
      const first = eligible[i];
      const second = eligible[j];
      const rawDifference = Math.abs(first.longitude - second.longitude);
      const difference = rawDifference > 180 ? 360 - rawDifference : rawDifference;
      const matchedAspect = aspectDefinitions
        .map((aspect) => ({ aspect, orb: Math.abs(difference - aspect.angle) }))
        .filter((entry) => entry.orb <= entry.aspect.orb)
        .sort((a, b) => a.orb - b.orb)[0];

      if (matchedAspect) {
        aspects.push({
          first,
          second,
          aspect: matchedAspect.aspect,
          orb: matchedAspect.orb
        });
      }
    }
  }

  return aspects.sort((a, b) => a.orb - b.orb).slice(0, 6);
}

function buildPlacements(time, ascendantLongitude, mcLongitude) {
  const planetPlacements = planetDefinitions.map((definition) => {
    const longitude = getPlanetLongitude(definition, time);
    const sign = getSignByLongitude(longitude);

    return {
      key: definition.key,
      label: definition.label,
      glyph: planetGlyphs[definition.key],
      longitude,
      sign,
      house: getHouseNumber(longitude, ascendantLongitude),
      degreeLabel: formatDegree(longitude),
      aspect: definition.aspect
    };
  });
  const ascSign = getSignByLongitude(ascendantLongitude);
  const mcSign = getSignByLongitude(mcLongitude);

  planetPlacements.push({
    key: "asc",
    label: "Yükselen",
    glyph: planetGlyphs.asc,
    longitude: ascendantLongitude,
    sign: ascSign,
    house: 1,
    degreeLabel: formatDegree(ascendantLongitude),
    aspect: false
  });
  planetPlacements.push({
    key: "mc",
    label: "MC",
    glyph: planetGlyphs.mc,
    longitude: mcLongitude,
    sign: mcSign,
    house: 10,
    degreeLabel: formatDegree(mcLongitude),
    aspect: false
  });

  return planetPlacements;
}

function getSiderealString(time, city) {
  const siderealHours = normalizeAngle((astro.SiderealTime(time) * 15) + city.longitude) / 15;
  const hours = Math.floor(siderealHours);
  const minutes = Math.floor((siderealHours - hours) * 60);

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}

function buildChartData({ date, time, city }) {
  const utcDate = toUtcDate(date, time);
  const { ascendantLongitude, mcLongitude } = calculateAscendantAndMc(utcDate, city);
  const placements = buildPlacements(utcDate, ascendantLongitude, mcLongitude);
  const elements = getElementCounts(placements);
  const dominantElement = getDominantElement(elements);
  const aspects = calculateAspects(placements);
  const byKey = Object.fromEntries(placements.map((placement) => [placement.key, placement]));

  return {
    date,
    time,
    utcDate,
    city,
    placements,
    aspects,
    elements,
    dominantElement,
    siderealTime: getSiderealString(utcDate, city),
    accuracy: time ? "Yüksek güven" : "Saat eksik",
    source: "Astronomy Engine + il merkezi koordinatı",
    byKey,
    missingTime: !time
  };
}

function polarPoint(radius, angle) {
  const radians = degreesToRadians(angle - 90);

  return {
    x: 210 + radius * Math.cos(radians),
    y: 210 + radius * Math.sin(radians)
  };
}

function createWheelSvg(data) {
  const ascSignStart = Math.floor(data.byKey.asc.longitude / 30) * 30;
  const signLabels = zodiacSigns.map((sign, index) => {
    const point = polarPoint(176, index * 30 + 15);
    return `<text class="wheel-sign-label" x="${point.x.toFixed(1)}" y="${point.y.toFixed(1)}" text-anchor="middle" dominant-baseline="middle">${sign.symbol}</text>`;
  }).join("");
  const signDividers = zodiacSigns.map((_, index) => {
    const outer = polarPoint(190, index * 30);
    const inner = polarPoint(86, index * 30);
    return `<line class="wheel-sign-divider" x1="${inner.x.toFixed(1)}" y1="${inner.y.toFixed(1)}" x2="${outer.x.toFixed(1)}" y2="${outer.y.toFixed(1)}"></line>`;
  }).join("");
  const houseLines = Array.from({ length: 12 }, (_, index) => {
    const angle = ascSignStart + index * 30;
    const outer = polarPoint(150, angle);
    const inner = polarPoint(46, angle);
    return `<line class="wheel-house-line" x1="${inner.x.toFixed(1)}" y1="${inner.y.toFixed(1)}" x2="${outer.x.toFixed(1)}" y2="${outer.y.toFixed(1)}"></line>`;
  }).join("");
  const houseLabels = Array.from({ length: 12 }, (_, index) => {
    const point = polarPoint(104, ascSignStart + index * 30 + 15);
    return `<text class="wheel-house-label" x="${point.x.toFixed(1)}" y="${point.y.toFixed(1)}" text-anchor="middle" dominant-baseline="middle">${index + 1}</text>`;
  }).join("");
  const chartPlacements = data.placements.map((placement, index) => {
    const point = polarPoint(124 + (index % 3) * 12, placement.longitude);
    return `
      <g class="planet-dot" transform="translate(${point.x.toFixed(1)} ${point.y.toFixed(1)})">
        <title>${placement.label}: ${placement.sign.name} ${placement.degreeLabel}</title>
        <circle r="15"></circle>
        <text text-anchor="middle" dominant-baseline="middle">${placement.glyph}</text>
      </g>
    `;
  }).join("");
  const ascOuter = polarPoint(194, data.byKey.asc.longitude);
  const ascInner = polarPoint(148, data.byKey.asc.longitude);
  const ascLabel = polarPoint(206, data.byKey.asc.longitude);
  const mcOuter = polarPoint(194, data.byKey.mc.longitude);
  const mcInner = polarPoint(148, data.byKey.mc.longitude);
  const mcLabel = polarPoint(206, data.byKey.mc.longitude);

  return `
    <svg viewBox="0 0 420 420" role="img" aria-label="Yıldız haritası çarkı">
      <defs>
        <radialGradient id="chartGlow" cx="50%" cy="50%" r="55%">
          <stop stop-color="#ffb86b" stop-opacity="0.26"></stop>
          <stop offset="0.48" stop-color="#a78bfa" stop-opacity="0.12"></stop>
          <stop offset="1" stop-color="#070713" stop-opacity="0"></stop>
        </radialGradient>
        <filter id="planetGlow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="3.6" result="blur"></feGaussianBlur>
          <feMerge>
            <feMergeNode in="blur"></feMergeNode>
            <feMergeNode in="SourceGraphic"></feMergeNode>
          </feMerge>
        </filter>
      </defs>
      <circle cx="210" cy="210" r="198" fill="url(#chartGlow)"></circle>
      <circle class="wheel-zodiac-ring" cx="210" cy="210" r="190"></circle>
      <circle cx="210" cy="210" r="150" fill="none" stroke="rgba(255, 184, 107, 0.34)" stroke-width="1.1"></circle>
      <circle cx="210" cy="210" r="86" fill="none" stroke="rgba(255, 248, 241, 0.16)" stroke-width="1"></circle>
      <circle cx="210" cy="210" r="46" fill="rgba(255, 255, 255, 0.05)" stroke="rgba(255, 248, 241, 0.2)" stroke-width="1"></circle>
      <g>${signDividers}</g>
      <g>${houseLines}</g>
      <g>${houseLabels}</g>
      <g>${signLabels}</g>
      <line class="marker-line asc" x1="${ascInner.x.toFixed(1)}" y1="${ascInner.y.toFixed(1)}" x2="${ascOuter.x.toFixed(1)}" y2="${ascOuter.y.toFixed(1)}"></line>
      <text class="marker-label" x="${ascLabel.x.toFixed(1)}" y="${ascLabel.y.toFixed(1)}" text-anchor="middle" dominant-baseline="middle">ASC</text>
      <line class="marker-line mc" x1="${mcInner.x.toFixed(1)}" y1="${mcInner.y.toFixed(1)}" x2="${mcOuter.x.toFixed(1)}" y2="${mcOuter.y.toFixed(1)}"></line>
      <text class="marker-label" x="${mcLabel.x.toFixed(1)}" y="${mcLabel.y.toFixed(1)}" text-anchor="middle" dominant-baseline="middle">MC</text>
      <g filter="url(#planetGlow)">${chartPlacements}</g>
      <text x="210" y="204" text-anchor="middle" class="wheel-title">Natal</text>
      <text x="210" y="228" text-anchor="middle" class="wheel-subtitle">Astronomik Harita</text>
    </svg>
  `;
}

function createElementBars(elements) {
  const max = Math.max(...Object.values(elements), 1);

  return `
    <div class="element-bars">
      ${elementOrder.map((element) => `
        <div class="element-row">
          <span>${element}</span>
          <span class="element-track"><span class="element-fill" style="width: ${(elements[element] / max * 100).toFixed(0)}%"></span></span>
          <strong>${elements[element]}</strong>
        </div>
      `).join("")}
    </div>
  `;
}

function renderHighlights(data) {
  const cards = [
    {
      label: "Güneş Burcu",
      value: `${data.byKey.sun.sign.symbol} ${data.byKey.sun.sign.name}`,
      note: data.byKey.sun.degreeLabel
    },
    {
      label: "Ay Burcu",
      value: `${data.byKey.moon.sign.symbol} ${data.byKey.moon.sign.name}`,
      note: data.byKey.moon.degreeLabel
    },
    {
      label: "Yükselen",
      value: `${data.byKey.asc.sign.symbol} ${data.byKey.asc.sign.name}`,
      note: data.missingTime ? "Saat eksik olduğu için tahmini" : data.byKey.asc.degreeLabel
    },
    {
      label: "MC",
      value: `${data.byKey.mc.sign.symbol} ${data.byKey.mc.sign.name}`,
      note: data.byKey.mc.degreeLabel
    }
  ];

  resultHighlights.innerHTML = cards.map((card) => `
    <article class="highlight-card">
      <span>${card.label}</span>
      <strong>${card.value}</strong>
      <p>${card.note}</p>
    </article>
  `).join("");
}

function renderSummary(data) {
  summaryGrid.innerHTML = [
    ["Konum", `${data.city.displayName}`],
    ["Saat Dilimi", "UTC+03:00"],
    ["Yerel Yıldız Zamanı", data.siderealTime],
    ["Ev Sistemi", "Whole Sign"]
  ].map(([label, value]) => `
    <article>
      <span>${label}</span>
      <strong>${value}</strong>
    </article>
  `).join("");

  summaryText.textContent = `${data.city.displayName} koordinatlarıyla hesaplanan bu haritada ${data.byKey.sun.sign.name} Güneş, ${data.byKey.moon.sign.name} Ay ve ${data.byKey.asc.sign.name} yükselen kombinasyonu öne çıkıyor. ${getAspectSummary(data.aspects)} Doğum bilgisi: ${data.date}${data.time ? ` ${data.time}` : " (saat eksik)"}.`;
  elementBarsCard.innerHTML = createElementBars(data.elements);
}

function renderAnalysis(data) {
  const dominantSign = getSignByLongitude(data.byKey.asc.longitude);
  const dominantElement = data.dominantElement;
  const cards = [
    {
      title: "Kimlik ve Dışarı Yansıma",
      text: `${data.byKey.sun.sign.summary} Yükselen ${dominantSign.name} olduğu için insanlar seni ilk anda daha çok ${dominantSign.focus.toLowerCase()} alanlarında okur. Element dengesinde ${dominantElement.toLowerCase()} vurgusu belirgin.`
    },
    {
      title: "Duygusal Yapı",
      text: `Ay ${data.byKey.moon.sign.name} yerleşimi, duygusal reflekslerde ${data.byKey.moon.sign.focus.toLowerCase()} temasını güçlendirir. ${data.byKey.moon.sign.cardDetail}`
    },
    {
      title: "İletişim, Aşk ve Motivasyon",
      text: `Merkür ${data.byKey.mercury.sign.name}, Venüs ${data.byKey.venus.sign.name} ve Mars ${data.byKey.mars.sign.name} üçlüsü zihinsel tarzını, sevgi dilini ve harekete geçiş biçimini anlatır. Bu kombinasyonda ${data.byKey.venus.sign.motto.toLowerCase()} çizgisi ilişkilere de yansıyabilir.`
    },
    {
      title: "Kariyer ve Yapılanma",
      text: `MC ${data.byKey.mc.sign.name} olduğu için görünür alanda ${data.byKey.mc.sign.focus.toLowerCase()} başlığı ağır basar. Satürn ${data.byKey.saturn.sign.name} yerleşimi ise bu alanlarda sabır, zamanlama ve yapısal disiplin getirir.`
    }
  ];

  analysisGrid.innerHTML = cards.map((card) => `
    <article class="analysis-card">
      <h3>${card.title}</h3>
      <p>${card.text}</p>
    </article>
  `).join("");
}

function renderPlacementsTable(data) {
  placementsTableBody.innerHTML = data.placements.map((placement) => `
    <tr>
      <td>${placement.label}</td>
      <td>${placement.sign.symbol} ${placement.sign.name} • ${placement.degreeLabel}</td>
      <td>${placement.house}. Ev</td>
    </tr>
  `).join("");
}

function renderAspects(data) {
  if (!data.aspects.length) {
    aspectList.innerHTML = `
      <article class="aspect-item">
        <strong>Öne çıkan ana açı bulunamadı</strong>
        <span>Bu haritada yorum ağırlığı daha çok burç yerleşimlerine ve açısal dağılıma yaslanıyor.</span>
      </article>
    `;
    return;
  }

  aspectList.innerHTML = data.aspects.map((entry) => `
    <article class="aspect-item">
      <strong>${entry.first.label} ${entry.aspect.label} ${entry.second.label}</strong>
      <span>Orb: ${entry.orb.toFixed(2)}° • ${entry.aspect.tone}</span>
    </article>
  `).join("");
}

function renderResults(data) {
  const timeText = data.time ? `${data.time} • saat doğrulandı` : "Saat belirtilmedi • yükselen tahmini";
  const coordinates = `${data.city.latitude.toFixed(4)}, ${data.city.longitude.toFixed(4)}`;

  resultTitle.textContent = `${data.city.displayName} için yıldız haritan hazır`;
  resultSubtitle.textContent = `${coordinates} • ${timeText} • ${data.source}`;
  accuracyBadge.textContent = data.accuracy;
  sourceBadge.textContent = data.missingTime ? "Whole Sign / tahmini açılar" : "Astronomy Engine / Whole Sign";
  chartWheel.innerHTML = createWheelSvg(data);
  renderHighlights(data);
  renderSummary(data);
  renderAnalysis(data);
  renderPlacementsTable(data);
  renderAspects(data);
}

function setFieldError(input, message) {
  input.setCustomValidity(message);
  input.reportValidity();
  input.setCustomValidity("");
}

function validateInputs(dateValue, city) {
  if (!dateValue) {
    setFieldError(birthDateInput, "Doğum tarihi gerekli.");
    return false;
  }

  if (!city) {
    setFieldError(birthPlaceInput, "Listeden geçerli bir il seç.");
    return false;
  }

  const selectedDate = new Date(`${dateValue}T00:00:00`);
  const today = new Date();
  today.setHours(23, 59, 59, 999);

  if (selectedDate > today) {
    setFieldError(birthDateInput, "Doğum tarihi gelecekte olamaz.");
    return false;
  }

  return true;
}

function handleSubmit(event) {
  event.preventDefault();

  if (!astro) {
    formNote.textContent = "Astronomi motoru yüklenemedi. Sayfayı yenileyip tekrar dene.";
    return;
  }

  const date = birthDateInput.value;
  const time = birthTimeInput.value;
  const city = findCity(birthPlaceInput.value.trim());

  if (!validateInputs(date, city)) {
    return;
  }

  startLoading();

  window.setTimeout(() => {
    const chartData = buildChartData({ date, time, city });
    renderResults(chartData);
    stopLoading();
    chartResults.hidden = false;
    chartResults.scrollIntoView({ behavior: "smooth", block: "start" });
  }, 900);
}

populateCityList();
setMaxBirthDate();
updateCityPreview();

birthPlaceInput.addEventListener("input", updateCityPreview);
birthPlaceInput.addEventListener("change", updateCityPreview);
chartForm.addEventListener("submit", handleSubmit);
