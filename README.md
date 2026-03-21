# Hao & Phương — Wedding invitation

Wedding site for **Hao & Phương**, built with **Vite + TypeScript**.

Design is based on a recreation of the template at [thiepcuoionline.net/trung-hieu-hong-ngoc/](https://thiepcuoionline.net/trung-hieu-hong-ngoc/) (layout, motion, RSVP patterns). Replace photos, venue, parents’ names, dates, and bank details in `index.html` and `src/constants.ts` for your day.

## Run locally

```bash
cd hao-phuong-wedding
npm install
npm run dev
```

Build:

```bash
npm run build
npm run preview
```

## Customize

- **Couple names & copy:** `index.html`
- **Countdown:** `src/constants.ts` → `COUNTDOWN_ISO`
- **RSVPs:** `src/form.ts` — connect `fetch` to your API or Formspree / Google Sheets
- **Images:** add files under `public/` and point `src` URLs to `/your-file.jpg` (don’t rely on demo hotlinks for production)

## Reference

- **`../thiep-trung-hieu-reference/original-page.html`** — HTML snapshot of the Thiệp Cưới Online sample page (for comparison).

## Attribution

**Thiệp Cưới Online** owns the commercial template this was inspired by. This repo is for **your** wedding — use your own photos and wording.

## GitHub

Suggested repository name: **`hao-phuong-wedding`** (matches `package.json`).
