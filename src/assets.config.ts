/**
 * Single place for media paths. `index.html` uses `data-asset="section.key"` only.
 *
 * Reserved paths are excluded from auto grid `G`. `0X5A9145.JPG` is omitted from
 * `MY_WEDDING_DAY` (not used on site). Gallery order is seeded-shuffle — change
 * `GALLERY_SHUFFLE_SEED` to reshuffle.
 *
 * `MY_WEDDING_DAY` is alphabetical — edit when you add/remove wedding JPGs.
 */
const giftsDateIllustration = '/assets/gifts/date-illustration.png';

const W = '/assets/my_wedding/wedding';

/** Top banner + nền section cặp đôi (ảnh ngang). */
const HERO_IMAGE = `${W}/0X5A9121.JPG`;

/** Ảnh đơn nhà trai / nhà gái (section tối giữa). */
const PHOTO_GROOM_SOLO = `${W}/0X5A9140.JPG`;
const PHOTO_BRIDE_SOLO = `${W}/0X5A9133.JPG`;

/** Cặp Love story (2 ảnh bên trái / giữa, phía trên countdown). */
const LOVE_PAIR_LEFT = `${W}/0X5A8923.JPG`;
const LOVE_PAIR_RIGHT = `${W}/0X5A9023.JPG`;

/** Cặp cột countdown (bên phải, cạnh đồng hồ). */
const COUNTDOWN_PAIR_LEFT = PHOTO_GROOM_SOLO;
const COUNTDOWN_PAIR_RIGHT = PHOTO_BRIDE_SOLO;

/** Ảnh lớn cột trái thiệp mời (dưới monogram). */
const INVITE_COVER_PHOTO = `${W}/0X5A9034.JPG`;

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

/** Alphabetically sorted filenames under `public/assets/my_wedding/wedding/`. */
export const MY_WEDDING_DAY = [
  `${W}/0X5A8921.JPG`,
  `${W}/0X5A8923.JPG`,
  `${W}/0X5A8945s.jpg`,
  `${W}/0X5A8978.JPG`,
  `${W}/0X5A8988.JPG`,
  `${W}/0X5A8990.JPG`,
  `${W}/0X5A8999.JPG`,
  `${W}/0X5A9023.JPG`,
  `${W}/0X5A9024.JPG`,
  `${W}/0X5A9034.JPG`,
  `${W}/0X5A9057.JPG`,
  `${W}/0X5A9101.JPG`,
  `${W}/0X5A9103.JPG`,
  `${W}/0X5A9106.JPG`,
  `${W}/0X5A9111.JPG`,
  `${W}/0X5A9113.JPG`,
  `${W}/0X5A9121.JPG`,
  `${W}/0X5A9133.JPG`,
  `${W}/0X5A9140.JPG`,
  `${W}/3-copy.jpg`,
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
    sectionBg: HERO_IMAGE,
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
  },
  loveStory: {
    storyLeft: LOVE_PAIR_LEFT,
    storyCenter: LOVE_PAIR_RIGHT,
    countdownLeft: COUNTDOWN_PAIR_LEFT,
    countdownRight: COUNTDOWN_PAIR_RIGHT,
  },
  gallery: [
    G_ORDERED[0]!,
    G_ORDERED[1]!,
    G_ORDERED[2]!,
    G_ORDERED[3]!,
    G_ORDERED[4]!,
    G_ORDERED[5]!,
    G_ORDERED[6]!,
    G_ORDERED[7]!,
    G_ORDERED[8]!,
    G_ORDERED[9]!,
    G_ORDERED[10]!,
    G_ORDERED[11]!,
    G_ORDERED[12]!,
  ] as const,
  shared: {
    ribbonHeading: '/assets/shared/ribbon-heading.png',
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
    stkPrimary: '/assets/gifts/stk-primary.png',
    stkSecondary: '/assets/gifts/stk-secondary.png',
    dateIllustration: giftsDateIllustration,
  },
  thanks: {
    bankNote: '/assets/thanks/bank-note.png',
    dateAccent: giftsDateIllustration,
  },
} as const;

export type WeddingAssets = typeof weddingAssets;
