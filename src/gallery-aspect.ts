/** Theo cấu trúc thư mục `public/assets/gallary/{vertical,horizontal}/` — không phụ thuộc decode ảnh. */
function orientationFromGalleryHref(href: string): 'portrait' | 'landscape' | null {
  if (href.includes('/gallary/horizontal/')) return 'landscape';
  if (href.includes('/gallary/vertical/')) return 'portrait';
  return null;
}

/**
 * Lưới đuôi: ô dọc (2/3) vs ô ngang (4/3) — ưu tiên đường dẫn file (horizontal/vertical),
 * vì ảnh lazy có thể chưa load nên `naturalWidth` = 0 và ô mặc định 1:1 làm ảnh ngang trông “dọc”.
 */
function applyTailSlotFromHref(anchor: HTMLAnchorElement): void {
  const href = anchor.getAttribute('href') ?? '';
  const o = orientationFromGalleryHref(href);
  anchor.classList.remove('ratio-tall', 'ratio-wide');
  if (o === 'landscape') {
    anchor.classList.add('ratio-wide');
    return;
  }
  if (o === 'portrait') {
    anchor.classList.add('ratio-tall');
    return;
  }
  anchor.classList.add('ratio-wide');
}

function syncTailAspectFromImage(anchor: HTMLAnchorElement, img: HTMLImageElement): void {
  const { naturalWidth: w, naturalHeight: h } = img;
  if (!w || !h) return;
  anchor.classList.remove('ratio-tall', 'ratio-wide');
  anchor.classList.add(h >= w ? 'ratio-tall' : 'ratio-wide');
}

/** Mosaic: slot HTML cố định (tall/wide); nếu file không khớp thì `contain` thay vì crop sai. */
function applyMosaicSlotFromHref(anchor: HTMLAnchorElement): void {
  const href = anchor.getAttribute('href') ?? '';
  const o = orientationFromGalleryHref(href);
  if (!o) {
    anchor.classList.remove('gallery-mosaic-cell--fit-contain');
    return;
  }
  const tallSlot = anchor.classList.contains('gallery-mosaic-cell--tall');
  const wideSlot = anchor.classList.contains('gallery-mosaic-cell--wide');
  const mismatch =
    (tallSlot && o === 'landscape') || (wideSlot && o === 'portrait');
  anchor.classList.toggle('gallery-mosaic-cell--fit-contain', mismatch);
}

export function initGalleryAspectRatios(): void {
  document.querySelectorAll<HTMLAnchorElement>('#gallery .gallery-mosaic a.js-lightbox').forEach((a) => {
    applyMosaicSlotFromHref(a);
  });

  /* Chỉ ô đuôi trực tiếp; 3 ảnh trong `.gallery-tail-trio` dùng layout + tỉ lệ riêng */
  document.querySelectorAll<HTMLAnchorElement>('#gallery .gallery-grid--tail > a.js-lightbox').forEach((a) => {
    const img = a.querySelector('img');
    applyTailSlotFromHref(a);

    if (!img) return;

    const runFromPixels = (): void => {
      if (orientationFromGalleryHref(a.getAttribute('href') ?? '') !== null) return;
      syncTailAspectFromImage(a, img);
    };

    if (img.complete && img.naturalWidth > 0) {
      runFromPixels();
      return;
    }

    img.addEventListener('load', runFromPixels, { once: true });
    img.addEventListener(
      'error',
      () => {
        a.classList.remove('ratio-tall', 'ratio-wide');
        a.classList.add('ratio-wide');
      },
      { once: true },
    );
  });
}
