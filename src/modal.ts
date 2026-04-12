export function initGiftModal(): void {
  const openBtn = document.getElementById('btn-gift-open');
  const modal = document.getElementById('modal-gift');
  const closeEls = modal?.querySelectorAll('[data-close-modal]');

  if (!openBtn || !modal) return;

  let lastFocus: HTMLElement | null = null;

  const open = (): void => {
    lastFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    const closeBtn = modal.querySelector<HTMLButtonElement>('[data-close-modal]');
    closeBtn?.focus();
  };
  const close = (): void => {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    lastFocus?.focus();
    lastFocus = null;
  };

  openBtn.addEventListener('click', open);
  closeEls?.forEach((el) => el.addEventListener('click', close));
  modal.addEventListener('click', (e) => {
    if (e.target === modal) close();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) close();
  });
}
