const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function normalizeTypingText(node) {
  return (node.dataset.typingText || node.textContent || "")
    .replace(/\s+/g, " ")
    .trim();
}

function wait(ms) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

async function runTypingSequence() {
  const nodes = Array.from(document.querySelectorAll("[data-typing]"))
    .sort((first, second) => Number(first.dataset.typingOrder || 0) - Number(second.dataset.typingOrder || 0));

  if (!nodes.length) {
    return;
  }

  if (prefersReducedMotion) {
    nodes.forEach((node) => {
      node.textContent = normalizeTypingText(node);
      node.classList.remove("is-typing");
    });
    return;
  }

  for (const node of nodes) {
    const fullText = normalizeTypingText(node);
    const speed = Number(node.dataset.typingSpeed || 18);
    const pause = Number(node.dataset.typingPause || 90);

    node.textContent = "";
    node.classList.add("is-typing");

    for (const character of fullText) {
      node.textContent += character;
      await wait(character === " " ? Math.max(8, speed * 0.45) : speed);
    }

    node.classList.remove("is-typing");
    await wait(pause);
  }
}

runTypingSequence();
