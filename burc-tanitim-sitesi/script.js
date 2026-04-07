const grid = document.querySelector("#zodiacGrid");
const filters = document.querySelectorAll(".filter");

function renderCards(filter = "all") {
  const visibleSigns = filter === "all"
    ? zodiacSigns
    : zodiacSigns.filter((sign) => sign.element === filter);

  grid.innerHTML = visibleSigns.map((sign) => `
    <a class="zodiac-card" href="burc.html?burc=${sign.slug}" aria-label="${sign.name} burcu detay sayfasına git">
      <span class="zodiac-image-wrap">
        <img src="${createZodiacImage(sign)}" alt="${sign.name} burcu görseli">
      </span>
      <div class="zodiac-meta">
        <span>${sign.dates}</span>
        <span>${sign.element}</span>
      </div>
      <h3>${sign.name}</h3>
      <p>${sign.summary}</p>
      <span class="card-action">Güncel yorumu aç</span>
    </a>
  `).join("");
}

filters.forEach((button) => {
  button.addEventListener("click", () => {
    filters.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    renderCards(button.dataset.filter);
  });
});

renderCards();
