const zodiacSigns = [
  {
    name: "Koç",
    symbol: "♈",
    dates: "21 Mar - 19 Nis",
    element: "Ateş",
    summary: "Cesur, hızlı karar alan ve başlangıç enerjisi yüksek bir burçtur.",
    strengths: ["Liderlik", "Cesaret", "Girişimcilik"],
    motto: "Başlamak için en doğru zaman şimdi."
  },
  {
    name: "Boğa",
    symbol: "♉",
    dates: "20 Nis - 20 May",
    element: "Toprak",
    summary: "Güven, konfor ve istikrar arayan sabırlı bir enerji taşır.",
    strengths: ["Kararlılık", "Sadakat", "Pratiklik"],
    motto: "Kalıcı olanı özenle inşa ederim."
  },
  {
    name: "İkizler",
    symbol: "♊",
    dates: "21 May - 20 Haz",
    element: "Hava",
    summary: "Meraklı, konuşkan ve değişime kolay uyum sağlayan bir burçtur.",
    strengths: ["İletişim", "Merak", "Uyum"],
    motto: "Her fikir yeni bir kapı açar."
  },
  {
    name: "Yengeç",
    symbol: "♋",
    dates: "21 Haz - 22 Tem",
    element: "Su",
    summary: "Duygusal bağlara, aileye ve güvenli alanlara önem verir.",
    strengths: ["Şefkat", "Sezgi", "Koruyuculuk"],
    motto: "Kalbimin ritmi bana yolu gösterir."
  },
  {
    name: "Aslan",
    symbol: "♌",
    dates: "23 Tem - 22 Ağu",
    element: "Ateş",
    summary: "Yaratıcı, sahne ışığını seven ve özgüveni yüksek bir burçtur.",
    strengths: ["Yaratıcılık", "Cömertlik", "Özgüven"],
    motto: "Işığımı paylaşarak büyürüm."
  },
  {
    name: "Başak",
    symbol: "♍",
    dates: "23 Ağu - 22 Eyl",
    element: "Toprak",
    summary: "Detaylara odaklanan, düzen seven ve çözüm üretmeyi bilen bir enerjidir.",
    strengths: ["Analiz", "Düzen", "Sorumluluk"],
    motto: "Küçük detaylar büyük fark yaratır."
  },
  {
    name: "Terazi",
    symbol: "♎",
    dates: "23 Eyl - 22 Eki",
    element: "Hava",
    summary: "Denge, zarafet ve ilişkiler üzerinden kendini ifade eder.",
    strengths: ["Diplomasi", "Estetik", "Adalet"],
    motto: "Uyumun olduğu yerde güzellik vardır."
  },
  {
    name: "Akrep",
    symbol: "♏",
    dates: "23 Eki - 21 Kas",
    element: "Su",
    summary: "Derinlik, dönüşüm ve güçlü sezgilerle tanınır.",
    strengths: ["Tutku", "Sezgi", "Direnç"],
    motto: "Dönüşüm benim gücümdür."
  },
  {
    name: "Yay",
    symbol: "♐",
    dates: "22 Kas - 21 Ara",
    element: "Ateş",
    summary: "Özgürlüğü, keşfi ve büyük resmi görmeyi sever.",
    strengths: ["İyimserlik", "Macera", "Bilgelik"],
    motto: "Ufkum genişledikçe yolum açılır."
  },
  {
    name: "Oğlak",
    symbol: "♑",
    dates: "22 Ara - 19 Oca",
    element: "Toprak",
    summary: "Hedef odaklı, disiplinli ve uzun vadeli başarıya yatkındır.",
    strengths: ["Disiplin", "Sabır", "Strateji"],
    motto: "Zirveye adım adım çıkarım."
  },
  {
    name: "Kova",
    symbol: "♒",
    dates: "20 Oca - 18 Şub",
    element: "Hava",
    summary: "Özgün fikirler, toplumsal bakış ve yenilikçi düşünceyle öne çıkar.",
    strengths: ["Yenilik", "Bağımsızlık", "Vizyon"],
    motto: "Farklı düşünmek geleceği kurar."
  },
  {
    name: "Balık",
    symbol: "♓",
    dates: "19 Şub - 20 Mar",
    element: "Su",
    summary: "Hayal gücü, empati ve sezgisel anlayışla hareket eder.",
    strengths: ["Empati", "Hayal gücü", "Şefkat"],
    motto: "Sezgilerimle akışta kalırım."
  }
];

const grid = document.querySelector("#zodiacGrid");
const filters = document.querySelectorAll(".filter");
const detailTitle = document.querySelector("#detailTitle");
const detailDescription = document.querySelector("#detailDescription");
const detailList = document.querySelector("#detailList");

function renderCards(filter = "all") {
  const visibleSigns = filter === "all"
    ? zodiacSigns
    : zodiacSigns.filter((sign) => sign.element === filter);

  grid.innerHTML = visibleSigns.map((sign) => `
    <button class="zodiac-card" type="button" data-name="${sign.name}">
      <span class="zodiac-symbol">${sign.symbol}</span>
      <div class="zodiac-meta">
        <span>${sign.dates}</span>
        <span>${sign.element}</span>
      </div>
      <h3>${sign.name}</h3>
      <p>${sign.summary}</p>
    </button>
  `).join("");
}

function showDetails(signName) {
  const sign = zodiacSigns.find((item) => item.name === signName);

  if (!sign) {
    return;
  }

  detailTitle.textContent = `${sign.symbol} ${sign.name}`;
  detailDescription.textContent = `${sign.summary} Motto: "${sign.motto}"`;
  detailList.innerHTML = sign.strengths
    .map((strength) => `<li>${strength}</li>`)
    .join("");
}

filters.forEach((button) => {
  button.addEventListener("click", () => {
    filters.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    renderCards(button.dataset.filter);
  });
});

grid.addEventListener("click", (event) => {
  const card = event.target.closest(".zodiac-card");

  if (card) {
    showDetails(card.dataset.name);
  }
});

renderCards();
showDetails("Koç");
