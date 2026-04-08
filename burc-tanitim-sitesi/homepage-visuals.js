const zodiacCardVisuals = {
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

function getCardVisualSeed(sign) {
  return sign.slug.split("").reduce((total, char) => total + char.charCodeAt(0), 0);
}

function renderCardStarField(sign) {
  const seed = getCardVisualSeed(sign);

  return Array.from({ length: 30 }, (_, index) => {
    const x = 18 + ((seed * (index + 7) * 17) % 284);
    const y = 18 + ((seed * (index + 11) * 23) % 172);
    const radius = 0.65 + ((seed + index) % 4) * 0.35;
    const opacity = 0.28 + ((seed + index * 5) % 7) * 0.08;

    return `<circle cx="${x}" cy="${y}" r="${radius.toFixed(2)}" fill="#fff8f1" opacity="${opacity.toFixed(2)}"/>`;
  }).join("");
}

function renderCardConstellation(points) {
  const lines = points.slice(1).map((point, index) => {
    const previous = points[index];
    return `<line x1="${previous[0]}" y1="${previous[1]}" x2="${point[0]}" y2="${point[1]}"/>`;
  }).join("");
  const nodes = points.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="4.8"/>`).join("");

  return `${lines}${nodes}`;
}

function buildZodiacVisualSvg(sign) {
  const visual = zodiacCardVisuals[sign.slug] || zodiacCardVisuals.koc;
  const [primary, secondary, deep] = visual.colors;
  const uid = `visual-${sign.slug}`;
  const skyId = `${uid}-sky`;
  const nebulaAId = `${uid}-nebula-a`;
  const nebulaBId = `${uid}-nebula-b`;
  const symbolGradientId = `${uid}-symbol-gradient`;
  const softGlowId = `${uid}-soft-glow`;
  const constellationGlowId = `${uid}-constellation-glow`;

  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 220" role="presentation" aria-hidden="true">
      <defs>
        <linearGradient id="${skyId}" x1="0" y1="0" x2="1" y2="1">
          <stop stop-color="${deep}"/>
          <stop offset=".52" stop-color="#12091f"/>
          <stop offset="1" stop-color="${primary}"/>
        </linearGradient>
        <radialGradient id="${nebulaAId}" cx="28%" cy="18%" r="70%">
          <stop stop-color="${secondary}" stop-opacity=".72"/>
          <stop offset=".42" stop-color="${primary}" stop-opacity=".23"/>
          <stop offset="1" stop-color="${deep}" stop-opacity="0"/>
        </radialGradient>
        <radialGradient id="${nebulaBId}" cx="78%" cy="72%" r="62%">
          <stop stop-color="${primary}" stop-opacity=".58"/>
          <stop offset=".48" stop-color="${secondary}" stop-opacity=".18"/>
          <stop offset="1" stop-color="#12091f" stop-opacity="0"/>
        </radialGradient>
        <linearGradient id="${symbolGradientId}" x1="0" y1="0" x2="1" y2="1">
          <stop stop-color="${secondary}"/>
          <stop offset="1" stop-color="${primary}"/>
        </linearGradient>
        <filter id="${softGlowId}" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="7" result="blur"/>
          <feMerge>
            <feMergeNode in="blur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        <filter id="${constellationGlowId}" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.5" result="blur"/>
          <feMerge>
            <feMergeNode in="blur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      <rect width="320" height="220" rx="34" fill="url(#${skyId})"/>
      <rect width="320" height="220" rx="34" fill="url(#${nebulaAId})"/>
      <rect width="320" height="220" rx="34" fill="url(#${nebulaBId})"/>
      <path d="M-10 165 C54 98 108 212 184 116 S286 24 340 92" fill="none" stroke="${secondary}" stroke-width="1.2" opacity=".24"/>
      <g>${renderCardStarField(sign)}</g>
      <g stroke="${secondary}" stroke-width="2.3" stroke-linecap="round" fill="${secondary}" opacity=".92" filter="url(#${constellationGlowId})">
        ${renderCardConstellation(visual.points)}
      </g>
      <circle cx="244" cy="64" r="44" fill="${primary}" opacity=".18" filter="url(#${softGlowId})"/>
      <circle cx="86" cy="158" r="54" fill="${secondary}" opacity=".12" filter="url(#${softGlowId})"/>
      <g transform="translate(160 116)">
        <circle r="55" fill="#070712" opacity=".46"/>
        <circle r="52" fill="none" stroke="#fff8f1" stroke-opacity=".20" stroke-width="1"/>
        <text text-anchor="middle" dominant-baseline="middle" font-size="82" font-family="Arial, sans-serif" fill="url(#${symbolGradientId})" filter="url(#${softGlowId})">${sign.symbol}</text>
      </g>
      <text x="28" y="40" font-size="14" font-weight="700" letter-spacing="3" font-family="Arial, sans-serif" fill="#fff8f1" opacity=".78">${sign.element.toUpperCase()}</text>
      <text x="292" y="192" text-anchor="end" font-size="23" font-weight="700" font-family="Arial, sans-serif" fill="#fff8f1">${sign.name}</text>
    </svg>
  `;
}

function createZodiacVisualMarkup(sign) {
  return buildZodiacVisualSvg(sign);
}

function createZodiacImage(sign) {
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(buildZodiacVisualSvg(sign))}`;
}
