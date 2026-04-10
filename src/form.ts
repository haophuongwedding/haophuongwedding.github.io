import { syncRadioIconGroups } from './radio-icons';

export interface RsvpPayload {
  guestName: string;
  attendance: string;
  guestCount: string;
  guestOf: string;
  message: string;
}

export function initRsvpForm(form: HTMLFormElement): void {
  const output = document.getElementById('rsvp-output');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const fd = new FormData(form);

    const guestName = String(fd.get('your-name') ?? '').trim();
    if (!guestName) {
      alert('Vui lòng điền tên khách mời.');
      return;
    }

    const attendance = String(fd.get('radio-coming') ?? '');
    const guestCount = String(fd.get('menu-coming') ?? '');
    const guestOf = String(fd.get('radio-holder') ?? '');
    const message = String(fd.get('your-message') ?? '').trim();

    if (!guestCount || guestCount === 'Số người dự tiệc') {
      alert('Vui lòng chọn số người tham dự.');
      return;
    }

    const payload: RsvpPayload = {
      guestName,
      attendance,
      guestCount,
      guestOf,
      message,
    };

    // Replace with fetch('/api/rsvp', { method: 'POST', body: JSON.stringify(payload) })
    console.log('[RSVP]', payload);

    if (output) {
      output.textContent = 'Cảm ơn bạn! Phúc đáp đã được ghi nhận (demo — kết nối backend để lưu thật).';
      output.classList.add('visible');
    }
    form.reset();
    document.querySelectorAll<HTMLInputElement>('input[name="radio-coming"][value="CÓ THỂ"]').forEach((r) => {
      r.checked = true;
    });
    document.querySelectorAll<HTMLInputElement>('input[name="radio-holder"][value="KHÁCH NHÀ TRAI"]').forEach((r) => {
      r.checked = true;
    });
    syncRadioIconGroups();
  });
}
