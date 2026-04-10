export interface WeddingWish {
  name: string;
  wish: string;
  initials: string;
  avatarBg: string;
}

const SAMPLE_WISHES: WeddingWish[] = [
  {
    name: 'Minh Anh',
    initials: 'MA',
    avatarBg: 'linear-gradient(135deg, #bfa165 0%, #e6d2a3 100%)',
    wish: 'Chúc mừng hai bạn về chung một nhà. Chúc gia đình nhỏ luôn ngập tràn tiếng cười, yêu thương và bình an.',
  },
  {
    name: 'Tuấn Kiệt',
    initials: 'TK',
    avatarBg: 'linear-gradient(135deg, #8e6b2f 0%, #c8a96a 100%)',
    wish: 'Chúc hai bạn trăm năm hạnh phúc, đồng lòng vượt qua mọi thử thách và cùng nhau xây dựng một mái ấm thật ấm áp.',
  },
  {
    name: 'Thảo Vy',
    initials: 'TV',
    avatarBg: 'linear-gradient(135deg, #a57c3a 0%, #f0dfb6 100%)',
    wish: 'Ngày vui trọn vẹn! Chúc anh chị luôn thương nhau như thuở ban đầu, mỗi ngày đều là một kỷ niệm đẹp.',
  },
  {
    name: 'Gia Hân',
    initials: 'GH',
    avatarBg: 'linear-gradient(135deg, #9b7a45 0%, #d9bf86 100%)',
    wish: 'Chúc mừng hạnh phúc. Mong hai bạn luôn thấu hiểu, nhường nhịn và cùng nhau vun đắp tình yêu bền lâu.',
  },
  {
    name: 'Quốc Bảo',
    initials: 'QB',
    avatarBg: 'linear-gradient(135deg, #7b5a26 0%, #caa65f 100%)',
    wish: 'Chúc đôi uyên ương hạnh phúc viên mãn, tiền tài đủ đầy, sức khỏe dồi dào và sớm có tin vui nhé!',
  },
];

function wishToCard(w: WeddingWish): string {
  const name = escapeHtml(w.name);
  const wish = escapeHtml(w.wish);
  const initials = escapeHtml(w.initials);
  const avatarBg = w.avatarBg.replace(/"/g, "'");

  return `
    <article class="wish-card" role="group" aria-label="Lời chúc">
      <div class="wish-head">
        <div class="wish-avatar" style="background: ${avatarBg}" aria-hidden="true">${initials}</div>
        <div class="wish-meta">
          <div class="wish-name">${name}</div>
          <div class="wish-sub">Gửi tới Hao &amp; Phương</div>
        </div>
      </div>
      <p class="wish-text">“${wish}”</p>
    </article>
  `.trim();
}

function escapeHtml(s: string): string {
  return s
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

export function initWishesCarousel(): void {
  const track = document.getElementById('wishes-track');
  if (!track) return;

  const prevBtn = document.querySelector<HTMLButtonElement>('[data-wishes-prev]');
  const nextBtn = document.querySelector<HTMLButtonElement>('[data-wishes-next]');

  track.innerHTML = SAMPLE_WISHES.map(wishToCard).join('');

  let index = 0;
  const cards = (): HTMLElement[] => Array.from(track.querySelectorAll<HTMLElement>('.wish-card'));

  const setIndex = (next: number): void => {
    const all = cards();
    if (all.length === 0) return;

    index = ((next % all.length) + all.length) % all.length;
    track.style.transform = `translateX(${-index * 100}%)`;

    prevBtn?.toggleAttribute('disabled', all.length <= 1);
    nextBtn?.toggleAttribute('disabled', all.length <= 1);
  };

  prevBtn?.addEventListener('click', () => setIndex(index - 1));
  nextBtn?.addEventListener('click', () => setIndex(index + 1));

  // Keyboard support (when any control focused)
  const root = track.closest('.wishes-carousel');
  root?.addEventListener('keydown', (e) => {
    const ke = e as KeyboardEvent;
    if (ke.key === 'ArrowLeft') setIndex(index - 1);
    if (ke.key === 'ArrowRight') setIndex(index + 1);
  });

  setIndex(0);
}

