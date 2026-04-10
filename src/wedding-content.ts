/**
 * Toàn bộ chữ trên thiệp — chỉnh tại đây (metadata động / ảnh thiệp sau này có thể bổ sung).
 * Giờ đếm ngược: thời điểm tiệc (có thể đổi sang giờ lễ tư gia).
 */
export const weddingContent = {
  meta: {
    title: 'Thiệp mời cưới Hoàng Văn Hào & Nguyễn Thảo Phương',
    description:
      'Trân trọng kính mời — Lễ thành hôn & tiệc cưới 15/04/2026 tại Quảng Trị. Hoàng Văn Hào & Nguyễn Thảo Phương.',
  },

  /** ISO +07 — đếm ngược tới thời điểm này */
  countdownTargetIso: '2026-04-15T11:00:00+07:00',

  invite: {
    guestSalutationHtml: '<em><strong>Quý khách</strong></em>',
    partyInviteHtml:
      '<strong>ĐẾN DỰ BUỔI TIỆC CHUNG VUI<br />CÙNG GIA ĐÌNH CHÚNG TÔI</strong>',
    venueTitleHtml:
      '<strong><span style="font-size: 80%">TẠI</span><br /><span class="hotel-name">TRUNG TÂM HỘI NGHỊ TIỆC CƯỚI ROYAL KING</span><br /></strong>',
    venueAddress: '53 Nguyễn Hữu Cảnh, Phường Đồng Hới, Tỉnh Quảng Trị',
    lunarNote:
      '<span style="font-size: 80%">(Nhằm ngày 28 tháng 02 năm Bính Ngọ)</span>',
    mapUrl:
      'https://www.google.com/maps/search/?api=1&query=53+Nguy%E1%BB%85n+H%E1%BB%AFu+C%E1%BA%A3nh+%C4%90%E1%BB%93ng+H%E1%BB%9Bi+Qu%E1%BA%A3ng+B%C3%ACnh',
    mapButtonLabel: 'Chỉ đường',
    timelineHtml: 'ĐÓN KHÁCH: 10H30<br />KHAI TIỆC: 11H00',
    /** Thứ tư 15/04/2026 — hiển thị kèm dòng giờ nếu cần */
    weekdayNoteHtml: '<span style="font-size: 80%">THỨ TƯ, NGÀY 15 THÁNG 04 NĂM 2026</span>',
  },

  couple: {
    groomParentsHtml:
      '<em><strong>Ông: HOÀNG VĂN HÙNG</strong></em><br /><em><strong>Bà: HOÀNG THỊ THƯ</strong></em>',
    groomAddress: 'Thôn Văn La, Xã Quảng Ninh, Tỉnh Quảng Trị',
    brideParentsHtml:
      '<em><strong>Ông: NGUYỄN THANH BÌNH</strong></em><br /><em><strong>Bà: LÊ THỊ THU HƯƠNG</strong></em>',
    brideAddress: 'TDP 5, Phường Đồng Thuận, Tỉnh Quảng Trị',
    groomQuote:
      'Đối với chúng mình hôn nhân không phải là đích đến cuối của tình yêu mà là khởi đầu của hạnh phúc.',
    brideQuote:
      'Ở thời điểm phù hợp nhất, khoác lên mình bộ váy cưới đẹp nhất, gả cho người đáng tin cậy nhất, là anh.',
  },

  loveStory: {
    bigDayLineHtml: '<em><strong>Ngày trọng đại của Hoàng Văn Hào &amp; Nguyễn Thảo Phương</strong></em>',
  },

  rsvp: {
    parties: [
      {
        value: 'LỄ THÀNH HÔN - TƯ GIA (15/04/2026, 8H)',
        label: 'LỄ THÀNH HÔN - TƯ GIA (15/04/2026, 8H)',
      },
      {
        value: 'TIỆC CƯỚI - ROYAL KING (15/04/2026, 11H)',
        label: 'TIỆC CƯỚI - ROYAL KING (15/04/2026, 11H)',
      },
    ] as const,
  },
} as const;

export type WeddingContent = typeof weddingContent;
