/**
 * Replicates jQuery behavior from original page: .active toggles tdk-no/tdk-yes visibility.
 */
function updateGroup(containerId: string, value: string, map: Record<string, number>): void {
  const container = document.getElementById(containerId);
  if (!container) return;
  const idx = map[value];
  const items = container.querySelectorAll<HTMLElement>(':scope > .wpcf7-list-item .wpcf7-list-item-label');
  items.forEach((el, i) => {
    el.classList.toggle('active', i + 1 === idx);
  });
}

const holderMap: Record<string, number> = {
  'KHÁCH NHÀ TRAI': 1,
  'KHÁCH NHÀ GÁI': 2,
};
const comingMap: Record<string, number> = {
  'THAM DỰ': 1,
  'CÓ THỂ': 2,
  'RẤT TIẾC': 3,
};

export function syncRadioIconGroups(): void {
  const h = document.querySelector<HTMLInputElement>('input[name="radio-holder"]:checked');
  if (h) updateGroup('tdk-holder', h.value, holderMap);
  const c = document.querySelector<HTMLInputElement>('input[name="radio-coming"]:checked');
  if (c) updateGroup('tdk-coming', c.value, comingMap);
}

export function initRadioIconGroups(): void {
  const syncHolder = (): void => {
    const checked = document.querySelector<HTMLInputElement>('input[name="radio-holder"]:checked');
    if (checked) updateGroup('tdk-holder', checked.value, holderMap);
  };
  const syncComing = (): void => {
    const checked = document.querySelector<HTMLInputElement>('input[name="radio-coming"]:checked');
    if (checked) updateGroup('tdk-coming', checked.value, comingMap);
  };

  document.querySelectorAll('input[name="radio-holder"]').forEach((el) => {
    el.addEventListener('change', syncHolder);
  });
  document.querySelectorAll('input[name="radio-coming"]').forEach((el) => {
    el.addEventListener('change', syncComing);
  });

  syncRadioIconGroups();
}
