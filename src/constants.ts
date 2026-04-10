export { weddingAssets as ASSETS } from './assets.config';
export type { WeddingAssets } from './assets.config';
export type { WeddingContent } from './wedding-content';
import { weddingContent } from './wedding-content';

export { weddingContent };

/** Mốc đếm ngược — đồng bộ `src/wedding-content.ts` → `countdownTargetIso` */
export const COUNTDOWN_ISO = weddingContent.countdownTargetIso;
