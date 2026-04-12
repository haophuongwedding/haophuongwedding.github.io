import { weddingContent } from './wedding-content';

function getByPath(obj: unknown, path: string): unknown {
  return path.split('.').reduce<unknown>((cur, key) => {
    if (cur === null || cur === undefined) return undefined;
    if (typeof cur === 'object' && key in (cur as object)) {
      return (cur as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj);
}

export function applyWeddingContent(): void {
  const { meta, invite } = weddingContent;

  document.title = meta.title;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute('content', meta.description);

  document.querySelectorAll<HTMLElement>('[data-content]').forEach((el) => {
    const path = el.getAttribute('data-content');
    if (!path) return;
    const val = getByPath(weddingContent, path);
    if (val === undefined || val === null) return;
    if (typeof val === 'string') {
      el.innerHTML = val;
    }
  });

  const mapBtn = document.querySelector<HTMLAnchorElement>('a.btn-map');
  const mapLabel = mapBtn?.querySelector<HTMLSpanElement>('.btn-map__text');
  if (mapBtn) mapBtn.href = invite.mapUrl;
  if (mapLabel) mapLabel.textContent = invite.mapButtonLabel;
}
