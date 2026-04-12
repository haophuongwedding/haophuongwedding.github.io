/**
 * Single place for media paths. `index.html` uses `data-asset="section.key"` only.
 *
 * Reserved paths are excluded from auto grid `G`. `MY_WEDDING_DAY` lists vertical WebPs under
 * `my_wedding/wedding/vertical/` (hero, invite, RSVP side photo, etc.).
 *
 * **Wedding Moments** (`weddingAssets.gallery`) uses only JPGs in `public/assets/gallary/vertical`
 * and `.../gallary/horizontal` — edit those arrays when you add/remove files there. Vertical slot
 * order is seeded-shuffle; change `GALLERY_SHUFFLE_SEED` to reshuffle.
 */
const giftsDateIllustration = '/assets/gifts/date-illustration.png';

const W = '/assets/my_wedding/wedding';
/** Ảnh dọc (hero, thiệp, cặp đôi, gallery pool) — `public/.../wedding/vertical/` */
const WV = `${W}/vertical`;

/** Top banner (ảnh ngang). */
const HERO_IMAGE = `${WV}/0X5A9121.webp`;

/** Nền section cặp đôi (NHÀ TRAI / NHÀ GÁI) — ảnh nhẫn mờ như mẫu thiệp. */
const COUPLE_SECTION_BG = '/assets/shared/silver_ring_background.jpg';

/** Ảnh đơn nhà trai / nhà gái (section tối giữa). */
const PHOTO_GROOM_SOLO = `${WV}/0X5A9140.webp`;
const PHOTO_BRIDE_SOLO = `${WV}/0X5A8923.webp`;

/** Cặp Love story (2 ảnh bên trái / giữa, phía trên countdown). */
const LOVE_PAIR_LEFT = '/assets/events/love-story-Hao-Phuong-2.png';
const LOVE_PAIR_RIGHT = '/assets/events/love-story-Hao-Phuong-1.png';

/** Cặp cột countdown (bên phải, cạnh đồng hồ). */
const COUNTDOWN_PAIR_LEFT = PHOTO_GROOM_SOLO;
const COUNTDOWN_PAIR_RIGHT = PHOTO_BRIDE_SOLO;

/** Ảnh lớn cột trái thiệp mời (dưới monogram). */
const INVITE_COVER_PHOTO = `${WV}/0X5A8990.webp`;

/** Seed — đổi chuỗi này để xáo thứ tự gallery khác (vẫn ổn định mỗi lần load). */
const GALLERY_SHUFFLE_SEED = 'hao-phuong-gallery-2026';

function seededShuffle<T>(items: readonly T[], seed: string): T[] {
  const a = [...items];
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h = Math.imul(h ^ seed.charCodeAt(i), 16777619);
  }
  let state = h >>> 0;
  const rnd = (): number => {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
    return state / 0xffffffff;
  };
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Alphabetically sorted filenames under `public/assets/my_wedding/wedding/vertical/`. */
export const MY_WEDDING_DAY = [
  `${WV}/0X5A8921.webp`,
  `${WV}/0X5A8923.webp`,
  `${WV}/0X5A8945s.webp`,
  `${WV}/0X5A8978.webp`,
  `${WV}/0X5A8988.webp`,
  `${WV}/0X5A8990.webp`,
  `${WV}/0X5A8999.webp`,
  `${WV}/0X5A9023.webp`,
  `${WV}/0X5A9024.webp`,
  `${WV}/0X5A9034.webp`,
  `${WV}/0X5A9057.webp`,
  `${WV}/0X5A9101.webp`,
  `${WV}/0X5A9103.webp`,
  `${WV}/0X5A9106.webp`,
  `${WV}/0X5A9111.webp`,
  `${WV}/0X5A9113.webp`,
  `${WV}/0X5A9121.webp`,
  `${WV}/0X5A9133.webp`,
  `${WV}/0X5A9140.webp`,
  `${WV}/3-copy.webp`,
] as const;

const RESERVED_PHOTOS = new Set<string>([
  HERO_IMAGE,
  PHOTO_GROOM_SOLO,
  PHOTO_BRIDE_SOLO,
  LOVE_PAIR_LEFT,
  LOVE_PAIR_RIGHT,
  INVITE_COVER_PHOTO,
]);

const G_RAW = MY_WEDDING_DAY.filter((p) => !RESERVED_PHOTOS.has(p));
const G_ORDERED = seededShuffle(G_RAW, GALLERY_SHUFFLE_SEED);

/** Wedding Moments only — `public/assets/gallary/{vertical,horizontal}/` (see folder names). */
const GALL = '/assets/gallary';
const GV = `${GALL}/vertical`;
const GH = `${GALL}/horizontal`;

const GALLARY_VERTICAL = [
  `${GV}/13275572914919946396.jpg`,
  `${GV}/13275572914919946397.jpg`,
  `${GV}/14694617650096014111.jpg`,
  `${GV}/14694617650096014113.jpg`,
  `${GV}/15348085452160349274.jpg`,
  `${GV}/15348085452160349275.jpg`,
  `${GV}/189966359786027819717.jpg`,
  `${GV}/22445109688673196812.jpg`,
  `${GV}/22445109688673196813.jpg`,
  `${GV}/24790753506024261310.jpg`,
  `${GV}/24790753506024261311.jpg`,
  `${GV}/2479075350602426138.jpg`,
  `${GV}/2479075350602426139.jpg`,
  `${GV}/419746622512118428814.jpg`,
  `${GV}/46866694797244361615.jpg`,
  `${GV}/46866694797244361616.jpg`,
].sort((a, b) => a.localeCompare(b));

const GALLARY_HORIZONTAL = [
  `${GH}/116985017215338457918.jpg`,
  `${GH}/116985017215338457919.jpg`,
  `${GH}/120742701212944677925.jpg`,
  `${GH}/14694617650096014112.jpg`,
  `${GH}/151476750526240505620.jpg`,
  `${GH}/220929700713428527423.jpg`,
  `${GH}/325939822288538533224.jpg`,
  `${GH}/80786114520085817122.jpg`,
  `${GH}/93912903375598623821.jpg`,
].sort((a, b) => a.localeCompare(b));

/** Ảnh ngang thứ hai ở cuối lưới (cùng hàng với `h[8]`) — ổn định theo seed, không trùng `exclude`. */
function pickHorizontalExcluding(pool: readonly string[], exclude: string, seed: string): string {
  const candidates = pool.filter((p) => p !== exclude);
  if (candidates.length === 0) return pool[0]!;
  return seededShuffle([...candidates], `${seed}|moments-tail-h2`)[0]!;
}

/**
 * Wedding Moments: 4 hàng xen kẽ (1 dọc + 2 ngang / 2 ngang + 1 dọc), sau đó lưới ảnh dọc.
 * Thứ tự flatten = thứ tự `data-gallery-index` trong HTML.
 */
function buildWeddingMomentsGallery(): string[] {
  const v = seededShuffle([...GALLARY_VERTICAL], GALLERY_SHUFFLE_SEED);
  const h = GALLARY_HORIZONTAL;
  const mosaic: string[] = [
    v[0]!,
    h[0]!,
    h[1]!,
    h[2]!,
    h[3]!,
    v[1]!,
    v[2]!,
    h[4]!,
    h[5]!,
    h[6]!,
    h[7]!,
    v[3]!,
  ];
  const tail: string[] = [];
  for (let i = 4; i < 12; i++) {
    if (v[i]) tail.push(v[i]!);
  }
  if (h[8]) {
    tail.push(h[8]!);
    tail.push(pickHorizontalExcluding(h, h[8]!, GALLERY_SHUFFLE_SEED));
  }
  return [...mosaic, ...tail];
}

const WEDDING_MOMENTS_GALLERY = buildWeddingMomentsGallery();

export const weddingAssets = {
  hero: {
    desktopBg: HERO_IMAGE,
    mobileBg: HERO_IMAGE,
  },
  invite: {
    monogram: '/assets/invite/monogram.png',
    coverPhoto: INVITE_COVER_PHOTO,
    headlineBanner: '/assets/invite/headline-banner.png',
    invitationDivider: '/assets/invite/invitation-divider.png',
    venueIllustration: '/assets/invite/venue-illustration.png',
    receptionTimeline: '/assets/invite/reception-timeline.png',
  },
  couple: {
    sectionBg: COUPLE_SECTION_BG,
    photoLeft: PHOTO_GROOM_SOLO,
    captionLeft: '/assets/couple/caption-left.png',
    familyEmblem: '/assets/couple/family-emblem.png',
    photoRight: PHOTO_BRIDE_SOLO,
    captionRight: '/assets/couple/caption-right.png',
  },
  events: {
    titleBanner: '/assets/events/title-banner.png',
    programDesktop: '/assets/events/program-desktop.png',
    programMobile: '/assets/events/program-mobile.png',
    dressCodeHeading: '/assets/events/dress-code-heading.png',
    dressCode: '/assets/events/dress-code.png',
    dividerBeforeLove: '/assets/events/divider-before-love.png',
    weddingCountdown: '/assets/events/wedding-countdown.png',
  },
  loveStory: {
    storyLeft: LOVE_PAIR_LEFT,
    storyCenter: LOVE_PAIR_RIGHT,
    countdownLeft: COUNTDOWN_PAIR_LEFT,
    countdownRight: COUNTDOWN_PAIR_RIGHT,
  },
  gallery: WEDDING_MOMENTS_GALLERY,
  shared: {
    ribbonHeading: '/assets/shared/ribbon-heading.png',
    weddingAttending: '/assets/shared/wedding-attending.png',
    weddingWishes: '/assets/shared/wedding-wishes.png',
  },
  rsvp: {
    sidePhoto: G_ORDERED[13]!,
    radio: {
      comingNo: '/assets/rsvp/radio/coming-no.png',
      comingYes: '/assets/rsvp/radio/coming-yes.png',
      maybeNo: '/assets/rsvp/radio/maybe-no.png',
      maybeYes: '/assets/rsvp/radio/maybe-yes.png',
      sorryNo: '/assets/rsvp/radio/sorry-no.png',
      sorryYes: '/assets/rsvp/radio/sorry-yes.png',
      groomSideNo: '/assets/rsvp/radio/groom-side-no.png',
      groomSideYes: '/assets/rsvp/radio/groom-side-yes.png',
      brideSideNo: '/assets/rsvp/radio/bride-side-no.png',
      brideSideYes: '/assets/rsvp/radio/bride-side-yes.png',
    },
  },
  giftsModal: {
    stkPrimary: '/assets/gifts/final_qr_husband.png',
    stkSecondary: '/assets/gifts/final_qr_wife.png',
    dateIllustration: giftsDateIllustration,
  },
  thanks: {
    dateAccent: giftsDateIllustration,
  },
} as const;

export type WeddingAssets = typeof weddingAssets;
