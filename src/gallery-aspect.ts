/**
 * Gán ratio-tall (dọc) / ratio-wide (ngang) theo kích thước thật của từng ảnh
 * — tránh cắt ảnh sai khi slot HTML cố định không khớp với file.
 */
function syncCellAspect(anchor: HTMLAnchorElement, img: HTMLImageElement): void {
  const { naturalWidth: w, naturalHeight: h } = img;
  if (!w || !h) return;
  anchor.classList.remove('ratio-tall', 'ratio-wide');
  anchor.classList.add(h >= w ? 'ratio-tall' : 'ratio-wide');
}

export function initGalleryAspectRatios(): void {
  document.querySelectorAll<HTMLAnchorElement>('#gallery .gallery-grid--tail a.js-lightbox').forEach((a) => {
    const img = a.querySelector('img');
    if (!img) return;

    const run = (): void => syncCellAspect(a, img);

    if (img.complete && img.naturalWidth > 0) {
      run();
      return;
    }

    img.addEventListener('load', run, { once: true });
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
