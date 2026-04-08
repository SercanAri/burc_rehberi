const params = new URLSearchParams(window.location.search);
const selectedSlug = params.get("burc") || "koc";
const sign = zodiacSigns.find((item) => item.slug === selectedSlug) || zodiacSigns[0];
const reading = getDailyReading(sign);

document.title = `${sign.name} Burcu Güncel Yorumu | Astro`;
document.querySelector("#detailImage").src = createZodiacImage(sign);
document.querySelector("#detailImage").alt = `${sign.name} burcu görseli`;
document.querySelector("#updatedDate").textContent = `Güncellendi: ${reading.date}`;
document.querySelector("#detailTitle").textContent = `${sign.symbol} ${sign.name} Burcu`;
document.querySelector("#detailDate").textContent = `${sign.name} burcu tarihleri: ${sign.dates}`;
document.querySelector("#detailDescription").textContent = `${sign.summary} ${sign.cardDetail} Yönetici gezegen: ${sign.ruler}. Motto: "${sign.motto}"`;
document.querySelector("#detailList").innerHTML = [
  `Element: ${sign.element}`,
  `Odak alanı: ${sign.focus}`,
  `Güçlü yönler: ${sign.strengths.join(", ")}`
].map((item) => `<li>${item}</li>`).join("");
document.querySelector("#dailyHeading").textContent = `${sign.name} burcu için ${reading.date}`;

const dailyCards = [
  ["Genel enerji", reading.theme],
  ["Aşk", reading.love],
  ["Kariyer", reading.career],
  ["Para", reading.money],
  ["Sağlık", reading.health],
  ["Şanslı bilgiler", `Bugünün rengi ${reading.luckyColor}, şanslı sayısı ${reading.luckyNumber}.`]
];

document.querySelector("#dailyGrid").innerHTML = dailyCards.map(([title, text]) => `
  <article class="daily-card">
    <h3>${title}</h3>
    <p>${text}</p>
  </article>
`).join("");
