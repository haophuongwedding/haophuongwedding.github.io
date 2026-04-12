import './styles.css';
import { applyAssets } from './apply-assets';
import { applyWeddingContent } from './apply-wedding-content';
import { ASSETS } from './constants';
import { initCountdown } from './countdown';
import { initRsvpForm } from './form';
import { initGalleryLightbox } from './lightbox';
import { initRadioIconGroups } from './radio-icons';
import { initScrollAnimations } from './scroll-animate';
import { initGalleryAspectRatios } from './gallery-aspect';
import { initWishesCarousel } from './wishes';
import { initGiftModal } from './modal';

applyAssets();
applyWeddingContent();
initGalleryAspectRatios();

function initBackgroundMusic() {
  const audio = document.getElementById('bg-music');
  const toggle = document.getElementById('bg-music-toggle');
  if (!(audio instanceof HTMLAudioElement) || !(toggle instanceof HTMLButtonElement)) return;

  let enabled = false;

  const syncUi = () => {
    toggle.setAttribute('aria-pressed', String(enabled));
    toggle.textContent = enabled ? 'Nhạc: Bật' : 'Nhạc: Tắt';
    toggle.classList.toggle('is-on', enabled);
  };

  const play = async () => {
    try {
      await audio.play();
      enabled = true;
      syncUi();
    } catch {
      // Autoplay is usually blocked until a user gesture.
    }
  };

  const pause = () => {
    audio.pause();
    enabled = false;
    syncUi();
  };

  toggle.addEventListener('click', () => {
    if (enabled) pause();
    else void play();
  });

  // Try once on load (works on some browsers), then on first interaction.
  void play();
  const unlock = () => void play();
  window.addEventListener('pointerdown', unlock, { once: true, passive: true });
  window.addEventListener('keydown', unlock, { once: true });

  syncUi();
}

// Expose for debugging
declare global {
  interface Window {
    __THIEP_ASSETS__: typeof ASSETS;
  }
}
window.__THIEP_ASSETS__ = ASSETS;

document.addEventListener('DOMContentLoaded', () => {
  const timer = document.getElementById('ux-timer');
  if (timer) initCountdown(timer);

  initBackgroundMusic();
  initScrollAnimations();
  initRadioIconGroups();
  initGalleryLightbox();
  initWishesCarousel();

  const form = document.getElementById('rsvp-form');
  if (form instanceof HTMLFormElement) initRsvpForm(form);

  initGiftModal();
});
