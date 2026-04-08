const grid = document.querySelector("#zodiacGrid");
const filters = document.querySelectorAll(".filter");
const cards = grid ? Array.from(grid.querySelectorAll(".zodiac-card")) : [];

function filterCards(filter = "all") {
  cards.forEach((card) => {
    const isVisible = filter === "all" || card.dataset.element === filter;
    card.hidden = !isVisible;
  });
}

function updateCardMotion(event) {
  const card = event.currentTarget;
  const rect = card.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  const xRatio = Math.min(Math.max(x / rect.width, 0), 1);
  const yRatio = Math.min(Math.max(y / rect.height, 0), 1);

  card.style.setProperty("--spot-x", `${(xRatio * 100).toFixed(2)}%`);
  card.style.setProperty("--spot-y", `${(yRatio * 100).toFixed(2)}%`);
  card.style.setProperty("--tilt-x", `${((0.5 - yRatio) * 8).toFixed(2)}deg`);
  card.style.setProperty("--tilt-y", `${((xRatio - 0.5) * 8).toFixed(2)}deg`);
  card.style.setProperty("--glide-x", `${((xRatio - 0.5) * 8).toFixed(2)}px`);
  card.style.setProperty("--glide-y", `${((yRatio - 0.5) * 6).toFixed(2)}px`);
}

function resetCardMotion(event) {
  const card = event.currentTarget;

  card.style.setProperty("--spot-x", "50%");
  card.style.setProperty("--spot-y", "50%");
  card.style.setProperty("--tilt-x", "0deg");
  card.style.setProperty("--tilt-y", "0deg");
  card.style.setProperty("--glide-x", "0px");
  card.style.setProperty("--glide-y", "0px");
}

function bindCardMotion() {
  cards.forEach((card) => {
    card.addEventListener("pointermove", updateCardMotion);
    card.addEventListener("pointerleave", resetCardMotion);
    card.addEventListener("pointercancel", resetCardMotion);
  });
}

filters.forEach((button) => {
  button.addEventListener("click", () => {
    filters.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    filterCards(button.dataset.filter);
  });
});

bindCardMotion();
filterCards();
