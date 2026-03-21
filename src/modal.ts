export function initGiftModal(): void {
  const openBtn = document.getElementById('btn-gift-open');
  const modal = document.getElementById('modal-gift');
  const closeEls = modal?.querySelectorAll('[data-close-modal]');

  if (!openBtn || !modal) return;

  const open = (): void => {
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };
  const close = (): void => {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  openBtn.addEventListener('click', open);
  closeEls?.forEach((el) => el.addEventListener('click', close));
  modal.addEventListener('click', (e) => {
    if (e.target === modal) close();
  });
}
