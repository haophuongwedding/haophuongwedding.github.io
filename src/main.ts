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

applyAssets();
applyWeddingContent();
initGalleryAspectRatios();

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

  initScrollAnimations();
  initRadioIconGroups();
  initGalleryLightbox();
  initWishesCarousel();

  const form = document.getElementById('rsvp-form');
  if (form instanceof HTMLFormElement) initRsvpForm(form);
});
