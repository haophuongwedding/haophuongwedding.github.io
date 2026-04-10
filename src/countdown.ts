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
      <div class="countdown-grid" role="group" aria-label="Đếm ngược">
        <div class="countdown-box">
          <div class="countdown-num">${days}</div>
          <div class="countdown-label">ngày</div>
        </div>
        <div class="countdown-box">
          <div class="countdown-num">${pad(hours)}</div>
          <div class="countdown-label">giờ</div>
        </div>
        <div class="countdown-box">
          <div class="countdown-num">${pad(mins)}</div>
          <div class="countdown-label">phút</div>
        </div>
        <div class="countdown-box">
          <div class="countdown-num">${pad(secs)}</div>
          <div class="countdown-label">giây</div>
        </div>
      </div>
    `;
  };

  tick();
  window.setInterval(tick, 1000);
}
