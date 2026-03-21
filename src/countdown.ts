import { COUNTDOWN_ISO } from './constants';

function pad(n: number): string {
  return n < 10 ? `0${n}` : String(n);
}

export function initCountdown(root: HTMLElement): void {
  const target = new Date(COUNTDOWN_ISO).getTime();

  const tick = (): void => {
    const now = Date.now();
    const diff = Math.max(0, target - now);

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((diff % (1000 * 60)) / 1000);

    root.innerHTML = `
      <span class="countdown-inner">
        <strong>${days}</strong> ngày
        <strong>${pad(hours)}</strong> giờ
        <strong>${pad(mins)}</strong> phút
        <strong>${pad(secs)}</strong> giây
      </span>
    `;
  };

  tick();
  window.setInterval(tick, 1000);
}
