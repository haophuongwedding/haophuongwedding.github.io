/**
 * Single place for media paths. `index.html` uses `data-asset="section.key"` only.
 *
 * `MY_WEDDING_DAY` lists vertical WebPs under `my_wedding/wedding/vertical/` (reference / pick paths).
 *
 * **Wedding Moments** (`weddingAssets.gallery`) uses JPGs in `public/assets/gallary/vertical` and
 * `.../gallary/horizontal` — edit `WEDDING_MOMENTS_GALLERY` (25 slots, order = mosaic + tail in `index.html`).
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

/** Ảnh cột phải form RSVP — đổi đường dẫn tại đây. */
const RSVP_SIDE_PHOTO = `${WV}/3-copy.webp`;

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

/** Wedding Moments only — `public/assets/gallary/{vertical,horizontal}/` (see folder names). */
const GALL = '/assets/gallary';
const GV = `${GALL}/vertical`;
const GH = `${GALL}/horizontal`;

/**
 * Wedding Moments: mosaic (12 ô: 4 dọc + 8 ngang theo `index.html`) + lưới đuôi (13 ô) = 25 ảnh.
 * Thứ tự xen kẽ chủ đề (Huế / studio / vest / solo) để hai ảnh liền nhau ít trùng “vibe”.
 */
const WEDDING_MOMENTS_GALLERY: string[] = [
  `${GV}/couple_studio_save_the_date_banner.jpg`,
  `${GH}/couple_hue_aodai_walk_1.jpg`,
  `${GH}/husband_studio_blackvest_sit_1.jpg`,
  `${GH}/couple_hue_aodai_sit_1.jpg`,
  `${GH}/couple_hue_aodai_stand_1.jpg`,
  `${GV}/wife_studio_whitedress_stand_1.jpg`,
  `${GV}/couple_studio_grayvest_standkiss.jpg`,
  `${GH}/couple_hue_aodai_stand_6.jpg`,
  `${GH}/couple_hue_aodai_stand_2.jpg`,
  `${GH}/couple_hue_aodai_stand_4.jpg`,
  `${GH}/couple_hue_aodai_stand_3.jpg`,
  `${GV}/couple_studio_blackvest_standkiss.jpg`,
  `${GV}/couple_studio_whitedress_blackvest_sit_1.jpg`,
  `${GV}/couple_studio_whitedress_grayvest_stand_1.jpg`,
  `${GV}/husband_studio_grayvest_stand_1.jpg`,
  `${GV}/couple_studio_whitedress_blackvest_stand_1.jpg`,
  `${GV}/wife_studio_whitedress_sit_1.jpg`,
  `${GV}/couple_studio_whitedress_grayvest_stand_2.jpg`,
  `${GV}/couple_studio_whitedress_blackvest_sit_2.jpg`,
  `${GV}/husband_studio_grayvest_stand_2.jpg`,
  `${GV}/couple_studio_whitedress_grayvest_stand_3.jpg`,
  `${GV}/couple_studio_whitedress_blackvest_stand_2.jpg`,
  `${GV}/wife_studio_whitedress_stand_2.jpg`,
  `${GV}/couple_studio_whitedress_blackvest_stand_3.jpg`,
  `${GH}/couple_hue_aodai_stand_5.jpg`,
];

if (import.meta.env?.DEV && WEDDING_MOMENTS_GALLERY.length !== 25) {
  throw new Error(`Wedding Moments gallery must have 25 images, got ${WEDDING_MOMENTS_GALLERY.length}`);
}

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
    sidePhoto: RSVP_SIDE_PHOTO,
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
