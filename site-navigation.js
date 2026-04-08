const REPO_NAME = "burc_rehberi";
const LEGACY_DIR = "burc-tanitim-sitesi";
const routeLinks = Array.from(document.querySelectorAll("[data-route]"));

function getRepoBasePath() {
  const marker = `/${REPO_NAME}/`;
  const { pathname } = window.location;
  const markerIndex = pathname.indexOf(marker);

  if (markerIndex === -1) {
    return "";
  }

  return pathname.slice(0, markerIndex + marker.length - 1);
}

function getLegacyRedirectTarget() {
  const marker = `/${LEGACY_DIR}/`;
  const { pathname, search, hash } = window.location;
  const markerIndex = pathname.indexOf(marker);

  if (markerIndex === -1) {
    return "";
  }

  const repoBase = getRepoBasePath();
  const trailingPath = pathname.slice(markerIndex + marker.length) || "index.html";
  const normalizedTarget = `${repoBase}/${trailingPath}${search}${hash}`;
  const currentUrl = `${pathname}${search}${hash}`;

  return normalizedTarget === currentUrl ? "" : normalizedTarget;
}

function buildSiteUrl(page, options = {}) {
  const { hash = "", sign = "" } = options;
  const repoBase = getRepoBasePath();
  const pageName = page || "index.html";
  const prefix = repoBase ? `${repoBase}/` : "";
  const query = sign ? `?burc=${encodeURIComponent(sign)}` : "";
  const hashSuffix = hash ? `#${hash}` : "";

  return `${prefix}${pageName}${query}${hashSuffix}`;
}

function applyRouteLinks() {
  routeLinks.forEach((link) => {
    const page = link.dataset.route;
    const hash = link.dataset.hash;
    const sign = link.dataset.sign;
    link.href = buildSiteUrl(page, { hash, sign });
  });
}

const redirectTarget = getLegacyRedirectTarget();

if (redirectTarget) {
  window.location.replace(redirectTarget);
} else {
  applyRouteLinks();
}
