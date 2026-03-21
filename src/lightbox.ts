export function initGalleryLightbox(): void {
  const links = document.querySelectorAll<HTMLAnchorElement>('a.js-lightbox');
  if (!links.length) return;

  const overlay = document.createElement('div');
  overlay.className = 'lightbox-overlay';
  overlay.innerHTML = `
    <button type="button" class="lightbox-close" aria-label="Đóng">&times;</button>
    <img class="lightbox-img" alt="" />
  `;
  document.body.appendChild(overlay);

  const img = overlay.querySelector<HTMLImageElement>('.lightbox-img')!;
  const close = (): void => {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  };

  overlay.querySelector('.lightbox-close')!.addEventListener('click', close);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) close();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });

  links.forEach((a) => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      img.src = a.href;
      overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });
}
