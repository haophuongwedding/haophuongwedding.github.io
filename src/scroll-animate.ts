/**
 * Flatsome-style scroll reveals: elements with [data-animate] get class .anim-in + animation name when visible.
 * Gallery animation order matches the Thiệp Cưới Online sample page markup.
 */
/** Seconds added to every scroll-reveal transition-delay (and default when unset). */
const EXTRA_TRANSITION_DELAY_SEC = 0.5;

function transitionDelayWithExtra(raw: string | undefined, extraSec: number): string {
  if (!raw?.trim()) return `${extraSec}s`;
  const t = raw.trim();
  const ms = t.match(/^([\d.]+)\s*ms$/i);
  if (ms) return `${parseFloat(ms[1]!) + extraSec * 1000}ms`;
  const s = t.match(/^([\d.]+)\s*s$/i);
  if (s) return `${parseFloat(s[1]!) + extraSec}s`;
  return t;
}

const GALLERY_SEQUENCE = [
  'fadeInLeft',
  'bounceIn',
  'fadeInRight',
  'bounceIn',
  'bounceIn',
  'bounceIn',
  'bounceInUp',
  'fadeInLeft',
  'fadeInLeft',
  'fadeInLeft',
  'fadeInLeft',
  'bounceInUp',
  'fadeInLeft',
  'fadeInRight',
  'bounceIn',
  'bounceInUp',
  'fadeInLeft',
  'fadeInLeft',
  'bounceIn',
  'fadeInLeft',
  'fadeInUp',
  'fadeInRight',
] as const;

function assignGalleryAnimations(): void {
  const items = document.querySelectorAll<HTMLElement>('#gallery .js-lightbox');
  const n = GALLERY_SEQUENCE.length;
  items.forEach((el, i) => {
    el.dataset.animate = GALLERY_SEQUENCE[i % n]!;
  });
}

export function initScrollAnimations(): void {
  assignGalleryAnimations();

  const prefersReduced =
    typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    document.querySelectorAll<HTMLElement>('[data-animate]').forEach((el) => {
      el.classList.add('anim-in', 'anim-reduced');
    });
    return;
  }

  const isMobile = typeof window.matchMedia === 'function' && window.matchMedia('(max-width: 549px)').matches;

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target as HTMLElement;
        const name = el.dataset.animate;
        if (!name) continue;
        const delay = el.dataset.animDelay;
        // CSS transition-based animations use transitionDelay (not animationDelay)
        el.style.transitionDelay = transitionDelayWithExtra(delay, EXTRA_TRANSITION_DELAY_SEC);
        el.classList.add('anim-in', name);
        observer.unobserve(el);
      }
    },
    {
      // Mobile: shrink effective viewport by 80px at bottom so animation fires
      // when element is solidly in view — mirrors Flatsome Waypoint "offset: 80px".
      // Without this, the long transform transition completes while the element is still
      // at the screen edge and the user never sees the movement (looks "static").
      threshold: isMobile ? 0.10 : 0.08,
      rootMargin: isMobile ? '0px 0px -80px 0px' : '0px 0px -4% 0px',
    }
  );

  document.querySelectorAll<HTMLElement>('[data-animate]').forEach((el) => observer.observe(el));
}
