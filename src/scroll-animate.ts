/**
 * Flatsome-style scroll reveals: elements with [data-animate] get class .anim-in + animation name when visible.
 * Gallery animation order matches the Thiệp Cưới Online sample page markup.
 */
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
] as const;

function assignGalleryAnimations(): void {
  const items = document.querySelectorAll<HTMLElement>('#gallery .js-lightbox');
  items.forEach((el, i) => {
    const name = GALLERY_SEQUENCE[i];
    if (name) el.dataset.animate = name;
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
        if (delay) el.style.transitionDelay = delay;
        el.classList.add('anim-in', name);
        observer.unobserve(el);
      }
    },
    {
      // Trigger as soon as element enters viewport — mirrors Flatsome Waypoint offset:101%
      threshold: isMobile ? 0.04 : 0.08,
      rootMargin: isMobile ? '0px 0px 0px 0px' : '0px 0px -4% 0px',
    }
  );

  document.querySelectorAll<HTMLElement>('[data-animate]').forEach((el) => observer.observe(el));
}
