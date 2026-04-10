import { weddingAssets } from './assets.config';

/** Above-the-fold <img> keys: keep eager so text/invite paints after hero preload. */
const EAGER_DATA_ASSETS = new Set(['invite.monogram', 'invite.coverPhoto']);

function lookupAssetPath(dotPath: string): string | undefined {
  const parts = dotPath.split('.');
  let cur: unknown = weddingAssets;

  for (const p of parts) {
    if (cur === undefined || cur === null) return undefined;
    if (Array.isArray(cur) && /^\d+$/.test(p)) {
      cur = cur[Number(p)] as unknown;
    } else if (typeof cur === 'object' && p in (cur as object)) {
      cur = (cur as Record<string, unknown>)[p];
    } else {
      return undefined;
    }
  }

  return typeof cur === 'string' ? cur : undefined;
}

function injectHeroPreloads(): void {
  const desk = weddingAssets.hero.desktopBg;
  const mob = weddingAssets.hero.mobileBg;

  if (desk === mob) {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = desk;
    link.setAttribute('fetchpriority', 'high');
    document.head.appendChild(link);
    return;
  }

  const linkDesk = document.createElement('link');
  linkDesk.rel = 'preload';
  linkDesk.as = 'image';
  linkDesk.href = desk;
  linkDesk.media = '(min-width: 550px)';
  linkDesk.setAttribute('fetchpriority', 'high');
  document.head.appendChild(linkDesk);

  const linkMob = document.createElement('link');
  linkMob.rel = 'preload';
  linkMob.as = 'image';
  linkMob.href = mob;
  linkMob.media = '(max-width: 549px)';
  linkMob.setAttribute('fetchpriority', 'high');
  document.head.appendChild(linkMob);
}

function setImgLoadingHints(img: HTMLImageElement, dataAssetKey: string | null, gallery: boolean): void {
  img.decoding = 'async';
  if (gallery) {
    img.loading = 'lazy';
    img.removeAttribute('fetchpriority');
    return;
  }
  if (dataAssetKey && EAGER_DATA_ASSETS.has(dataAssetKey)) {
    img.loading = 'eager';
    img.fetchPriority = 'high';
    return;
  }
  img.loading = 'lazy';
  img.removeAttribute('fetchpriority');
}

function applyHrefAndThumb(anchor: HTMLAnchorElement, url: string): void {
  anchor.href = url;
  anchor.querySelectorAll('img').forEach((im) => {
    im.setAttribute('src', url);
    setImgLoadingHints(im, null, true);
  });
}

export function applyAssets(): void {
  injectHeroPreloads();

  const root = document.documentElement;

  root.style.setProperty('--wedding-hero-desktop', `url('${weddingAssets.hero.desktopBg}')`);
  root.style.setProperty('--wedding-hero-mobile', `url('${weddingAssets.hero.mobileBg}')`);
  root.style.setProperty('--wedding-couple-section-bg', `url('${weddingAssets.couple.sectionBg}')`);

  document.querySelectorAll<HTMLElement>('[data-asset]').forEach((el) => {
    const path = el.getAttribute('data-asset');
    if (!path) return;
    const url = lookupAssetPath(path);
    if (!url) return;

    if (el instanceof HTMLImageElement) {
      el.src = url;
      setImgLoadingHints(el, path, false);
    } else if (el instanceof HTMLAnchorElement) {
      applyHrefAndThumb(el, url);
    }
  });

  document.querySelectorAll<HTMLAnchorElement>('[data-gallery-index]').forEach((el) => {
    const raw = el.getAttribute('data-gallery-index');
    if (raw === null) return;
    const index = Number(raw);
    const url = weddingAssets.gallery[index];
    if (!url) return;
    applyHrefAndThumb(el, url);
  });
}
