const chartForm = document.querySelector("#chartForm");
const loadingCard = document.querySelector("#loadingCard");
const chartResults = document.querySelector("#chartResults");
const resultTitle = document.querySelector("#resultTitle");
const accuracyBadge = document.querySelector("#accuracyBadge");
const chartWheel = document.querySelector("#chartWheel");
const summaryGrid = document.querySelector("#summaryGrid");
const summaryText = document.querySelector("#summaryText");
const analysisGrid = document.querySelector("#analysisGrid");
const flyingBatman = document.querySelector("#flyingBatman");
const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

const elementOrder = ["Ateş", "Toprak", "Hava", "Su"];
const planetGlyphs = {
  sun: "☉",
  moon: "☽",
  rising: "ASC",
  venus: "♀",
  mars: "♂",
  mc: "MC",
  saturn: "♄"
};

const elementTone = {
  "Ateş": "hareket, cesaret ve görünür olma isteği yüksek",
  "Toprak": "istikrar, pratiklik ve güven ihtiyacı belirgin",
  "Hava": "iletişim, öğrenme ve sosyal akış güçlü",
  "Su": "sezgi, duygu ve içsel bağlar derin"
};

let flyingBatmanAnimation;
let flyingBatmanTimer;

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

function getFlyingBatmanRoute() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const heroWidth = flyingBatman.offsetWidth || 132;
  const fromLeft = Math.random() > 0.5;
  const direction = fromLeft ? 1 : -1;
  const safeTop = Math.max(64, height * 0.1);
  const safeBottom = Math.max(safeTop + 160, height * 0.74);

  return {
    startX: fromLeft ? -heroWidth * 1.8 : width + heroWidth * 1.8,
    endX: fromLeft ? width + heroWidth * 1.8 : -heroWidth * 1.8,
    startY: randomBetween(safeTop, safeBottom),
    midX: randomBetween(width * 0.18, width * 0.82),
    midY: randomBetween(safeTop * 0.7, Math.max(safeTop + 80, height * 0.52)),
    endY: randomBetween(safeTop, safeBottom),
    direction,
    scale: randomBetween(0.72, 1.18),
    duration: randomBetween(9500, 16500),
    delay: randomBetween(250, 900)
  };
}

function formatBatmanTransform(x, y, rotate, direction, scale) {
  return `translate3d(${x}px, ${y}px, 0) rotate(${rotate}deg) scale(${direction * scale}, ${scale})`;
}

function scheduleFlyingBatman(delay = 900) {
  window.clearTimeout(flyingBatmanTimer);

  if (!flyingBatman || reducedMotionQuery.matches) {
    return;
  }

  flyingBatmanTimer = window.setTimeout(animateFlyingBatman, delay);
}

function animateFlyingBatman() {
  if (!flyingBatman || reducedMotionQuery.matches) {
    return;
  }

  if (flyingBatmanAnimation) {
    flyingBatmanAnimation.cancel();
  }

  const route = getFlyingBatmanRoute();

  flyingBatmanAnimation = flyingBatman.animate([
    {
      transform: formatBatmanTransform(route.startX, route.startY, route.direction * -6, route.direction, route.scale),
      opacity: 0,
      offset: 0
    },
    {
      transform: formatBatmanTransform(route.startX + route.direction * 120, route.startY - 18, route.direction * 4, route.direction, route.scale),
      opacity: 0.76,
      offset: 0.14
    },
    {
      transform: formatBatmanTransform(route.midX, route.midY, route.direction * -8, route.direction, route.scale * 1.08),
      opacity: 0.9,
      offset: 0.55
    },
    {
      transform: formatBatmanTransform(route.endX - route.direction * 120, route.endY + 12, route.direction * 5, route.direction, route.scale),
      opacity: 0.72,
      offset: 0.86
    },
    {
      transform: formatBatmanTransform(route.endX, route.endY, route.direction * -6, route.direction, route.scale * 0.94),
      opacity: 0,
      offset: 1
    }
  ], {
    duration: route.duration,
    easing: "cubic-bezier(0.42, 0, 0.18, 1)",
    fill: "both"
  });

  flyingBatmanAnimation.onfinish = () => scheduleFlyingBatman(route.delay);
}

function setupFlyingBatman() {
  if (!flyingBatman || reducedMotionQuery.matches) {
    return;
  }

  scheduleFlyingBatman(randomBetween(700, 1800));
}

function handleMotionPreferenceChange(event) {
  if (event.matches) {
    window.clearTimeout(flyingBatmanTimer);
    flyingBatmanAnimation?.cancel();
    return;
  }

  setupFlyingBatman();
}

if (reducedMotionQuery.addEventListener) {
  reducedMotionQuery.addEventListener("change", handleMotionPreferenceChange);
} else if (reducedMotionQuery.addListener) {
  reducedMotionQuery.addListener(handleMotionPreferenceChange);
}

window.addEventListener("load", setupFlyingBatman);

function findSign(slug) {
  return zodiacSigns.find((sign) => sign.slug === slug) || zodiacSigns[0];
}

function getSunSign(dateValue) {
  const [, month, day] = dateValue.split("-").map(Number);
  const code = month * 100 + day;

  if (code >= 321 && code <= 419) return findSign("koc");
  if (code >= 420 && code <= 520) return findSign("boga");
  if (code >= 521 && code <= 620) return findSign("ikizler");
  if (code >= 621 && code <= 722) return findSign("yengec");
  if (code >= 723 && code <= 822) return findSign("aslan");
  if (code >= 823 && code <= 922) return findSign("basak");
  if (code >= 923 && code <= 1022) return findSign("terazi");
  if (code >= 1023 && code <= 1121) return findSign("akrep");
  if (code >= 1122 && code <= 1221) return findSign("yay");
  if (code >= 1222 || code <= 119) return findSign("oglak");
  if (code >= 120 && code <= 218) return findSign("kova");
  return findSign("balik");
}

function createSeed(value) {
  return Array.from(value).reduce((total, char, index) => {
    return total + char.charCodeAt(0) * (index + 3);
  }, 0);
}

function getSignByIndex(index) {
  const safeIndex = ((index % zodiacSigns.length) + zodiacSigns.length) % zodiacSigns.length;
  return zodiacSigns[safeIndex];
}

function getPlacement(baseIndex, seed, offset) {
  const sign = getSignByIndex(baseIndex + seed + offset);
  const degree = (seed * (offset + 11) + offset * 17) % 30;

  return { sign, degree };
}

function getDominantElement(elements) {
  return Object.entries(elements).sort((a, b) => b[1] - a[1])[0][0];
}

function buildChartData({ date, time, place }) {
  const safeTime = time || "12:00";
  const [year, month, day] = date.split("-").map(Number);
  const [hour, minute] = safeTime.split(":").map(Number);
  const seed = createSeed(`${date}|${safeTime}|${place}`);
  const sun = getSunSign(date);
  const sunIndex = zodiacSigns.findIndex((sign) => sign.slug === sun.slug);
  const timeShift = Math.round((hour + minute / 60) / 2);
  const placeShift = place.trim().length % 12;
  const moon = getSignByIndex(sunIndex + Math.floor(seed / 17) + Math.floor(day / 3));
  const rising = getSignByIndex(sunIndex + timeShift + placeShift);
  const venus = getPlacement(sunIndex, seed % 12, 2).sign;
  const mars = getPlacement(sunIndex, Math.floor(seed / 5) % 12, 5).sign;
  const mc = getSignByIndex(sunIndex + timeShift + 9);
  const saturn = getPlacement(sunIndex, Math.floor(seed / 11) % 12, 8).sign;
  const elements = elementOrder.reduce((totals, element) => ({ ...totals, [element]: 0 }), {});
  const weightedPlacements = [
    [sun, 3],
    [moon, 2],
    [rising, 2],
    [venus, 1],
    [mars, 1],
    [mc, 1],
    [saturn, 1]
  ];

  weightedPlacements.forEach(([sign, weight]) => {
    elements[sign.element] += weight;
  });

  return {
    date,
    time,
    safeTime,
    place,
    year,
    month,
    day,
    seed,
    sun: { sign: sun, degree: (seed + day) % 30 },
    moon: { sign: moon, degree: (seed + month * 3) % 30 },
    rising: { sign: rising, degree: (hour * 2 + minute + placeShift) % 30 },
    venus: { sign: venus, degree: (seed + 7) % 30 },
    mars: { sign: mars, degree: (seed + 16) % 30 },
    mc: { sign: mc, degree: (seed + 24) % 30 },
    saturn: { sign: saturn, degree: (seed + 3) % 30 },
    elements,
    dominantElement: getDominantElement(elements),
    missingTime: !time
  };
}

function polarPoint(radius, angle) {
  const radians = (angle - 90) * Math.PI / 180;

  return {
    x: 210 + radius * Math.cos(radians),
    y: 210 + radius * Math.sin(radians)
  };
}

function createWheelSvg(data) {
  const placements = [
    ["sun", "Güneş", data.sun],
    ["moon", "Ay", data.moon],
    ["rising", "Yükselen", data.rising],
    ["venus", "Venüs", data.venus],
    ["mars", "Mars", data.mars],
    ["mc", "MC", data.mc],
    ["saturn", "Satürn", data.saturn]
  ];
  const signLabels = zodiacSigns.map((sign, index) => {
    const point = polarPoint(176, index * 30 + 15);
    return `<text x="${point.x.toFixed(1)}" y="${point.y.toFixed(1)}" text-anchor="middle" dominant-baseline="middle">${sign.symbol}</text>`;
  }).join("");
  const houseLines = zodiacSigns.map((_, index) => {
    const outer = polarPoint(190, index * 30);
    const inner = polarPoint(74, index * 30);
    return `<line x1="${inner.x.toFixed(1)}" y1="${inner.y.toFixed(1)}" x2="${outer.x.toFixed(1)}" y2="${outer.y.toFixed(1)}"/>`;
  }).join("");
  const planetDots = placements.map(([key, label, placement], index) => {
    const signIndex = zodiacSigns.findIndex((sign) => sign.slug === placement.sign.slug);
    const angle = signIndex * 30 + placement.degree;
    const point = polarPoint(112 + (index % 3) * 13, angle);
    return `
      <g class="planet-dot" transform="translate(${point.x.toFixed(1)} ${point.y.toFixed(1)})">
        <title>${label}: ${placement.sign.name} ${placement.degree}°</title>
        <circle r="15"></circle>
        <text text-anchor="middle" dominant-baseline="middle">${planetGlyphs[key]}</text>
      </g>
    `;
  }).join("");

  return `
    <svg viewBox="0 0 420 420" role="img" aria-label="Yıldız haritası ön analiz çarkı">
      <defs>
        <radialGradient id="chartGlow" cx="50%" cy="50%" r="55%">
          <stop stop-color="#ffb86b" stop-opacity="0.26"/>
          <stop offset="0.48" stop-color="#a78bfa" stop-opacity="0.12"/>
          <stop offset="1" stop-color="#070713" stop-opacity="0"/>
        </radialGradient>
        <filter id="planetGlow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="3.6" result="blur"/>
          <feMerge>
            <feMergeNode in="blur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      <circle cx="210" cy="210" r="198" fill="url(#chartGlow)"/>
      <circle cx="210" cy="210" r="190" fill="rgba(7, 7, 19, 0.72)" stroke="rgba(255, 248, 241, 0.25)" stroke-width="1.4"/>
      <circle cx="210" cy="210" r="150" fill="none" stroke="rgba(255, 184, 107, 0.34)" stroke-width="1.1"/>
      <circle cx="210" cy="210" r="74" fill="rgba(255, 255, 255, 0.05)" stroke="rgba(255, 248, 241, 0.2)" stroke-width="1"/>
      <g class="house-lines">${houseLines}</g>
      <g class="sign-labels">${signLabels}</g>
      <g filter="url(#planetGlow)">${planetDots}</g>
      <text x="210" y="204" text-anchor="middle" class="wheel-title">Natal</text>
      <text x="210" y="230" text-anchor="middle" class="wheel-subtitle">Ön Analiz</text>
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

function renderResults(data) {
  const placeText = data.place.trim();
  const timeText = data.time ? data.time : "Saat bilinmiyor";
  const dominantTone = elementTone[data.dominantElement];

  resultTitle.textContent = `${placeText} için haritan hazır`;
  accuracyBadge.textContent = data.missingTime ? "Saat yaklaşık" : "Ön analiz";
  chartWheel.innerHTML = createWheelSvg(data);
  summaryGrid.innerHTML = [
    ["Güneş Burcu", `${data.sun.sign.symbol} ${data.sun.sign.name}`],
    ["Yükselen", `${data.rising.sign.symbol} ${data.rising.sign.name}`],
    ["Ay Burcu", `${data.moon.sign.symbol} ${data.moon.sign.name}`]
  ].map(([label, value]) => `
    <article>
      <span>${label}</span>
      <strong>${value}</strong>
    </article>
  `).join("");
  summaryText.textContent = `${data.sun.sign.name} Güneş enerjisi, ${data.rising.sign.name} yükselen etkisi ve ${data.moon.sign.name} Ay duygusuyla; ${dominantTone} bir profil oluşturuyor. Doğum bilgileri: ${data.date}, ${timeText}, ${placeText}.`;

  analysisGrid.innerHTML = [
    {
      title: "Kişilik Analizi",
      text: `${data.sun.sign.summary} Element dengesinde ${data.dominantElement} vurgusu öne çıktığı için karar alma biçiminde ${dominantTone} bir ton hissedilir.`,
      extra: createElementBars(data.elements)
    },
    {
      title: "Duygusal Yapı",
      text: `Ay burcun ${data.moon.sign.name}; içsel tepkilerde ${data.moon.sign.focus.toLowerCase()} temaları belirginleşebilir. Bu yerleşim duygusal güven ihtiyacını anlamak için güçlü bir göstergedir.`
    },
    {
      title: "İlişkiler",
      text: `Venüs ${data.venus.sign.name}, Mars ${data.mars.sign.name} etkisi ilişkilerde hem sevgi dilini hem de motivasyon tarzını anlatır. ${data.venus.sign.ruler} ve ${data.mars.sign.ruler} temaları burada birlikte okunabilir.`
    },
    {
      title: "Kariyer ve Potansiyel",
      text: `MC noktası ${data.mc.sign.name} vurgusunda görünüyor. Kariyer tarafında ${data.mc.sign.focus.toLowerCase()} alanları daha görünür olabilir. Satürn ${data.saturn.sign.name} etkisi uzun vadeli disiplin başlığını güçlendirir.`
    }
  ].map((item) => `
    <article class="analysis-card">
      <h3>${item.title}</h3>
      <p>${item.text}</p>
      ${item.extra || ""}
    </article>
  `).join("");
}

function isFutureDate(dateValue) {
  const selectedDate = new Date(`${dateValue}T00:00:00`);
  const today = new Date();
  today.setHours(23, 59, 59, 999);

  return selectedDate > today;
}

chartForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const date = document.querySelector("#birthDate").value;
  const time = document.querySelector("#birthTime").value;
  const place = document.querySelector("#birthPlace").value.trim();

  if (!date || !place) {
    return;
  }

  if (isFutureDate(date)) {
    document.querySelector("#birthDate").setCustomValidity("Doğum tarihi gelecekte olamaz.");
    chartForm.reportValidity();
    document.querySelector("#birthDate").setCustomValidity("");
    return;
  }

  loadingCard.hidden = false;
  chartResults.hidden = true;

  window.setTimeout(() => {
    const data = buildChartData({ date, time, place });
    renderResults(data);
    loadingCard.hidden = true;
    chartResults.hidden = false;
    chartResults.scrollIntoView({ behavior: "smooth", block: "start" });
  }, 850);
});
