/**
 * Toàn bộ chữ trên thiệp — chỉnh tại đây (metadata động / ảnh thiệp sau này có thể bổ sung).
 * Giờ đếm ngược: thời điểm tiệc (có thể đổi sang giờ lễ tư gia).
 */
export const weddingContent = {
  meta: {
    title: 'Hào & Phương Wedding',
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
    lunarNote: '(NHẰM NGÀY 28 THÁNG 02 NĂM BÍNH NGỌ)',
    mapUrl:
      'https://www.google.com/maps/search/?api=1&query=53+Nguy%E1%BB%85n+H%E1%BB%AFu+C%E1%BA%A3nh+%C4%90%E1%BB%93ng+H%E1%BB%9Bi+Qu%E1%BA%A3ng+B%C3%ACnh',
    mapButtonLabel: 'CHỈ ĐƯỜNG',
    timelineHtml: 'ĐÓN KHÁCH: 10H30<br />KHAI TIỆC: 11H00',
  },

  couple: {
    groomParentsHtml: 'Ông: Hoàng Văn Hùng<br />Bà: Hoàng Thị Thư',
    brideParentsHtml: 'Ông: Nguyễn Thanh Bình<br />Bà: Lê Thị Thu Hương',
    groomQuote:
      'Đối với chúng mình hôn nhân không phải là đích đến cuối của tình yêu mà là khởi đầu của hạnh phúc.',
    brideQuote:
      'Ở thời điểm phù hợp nhất, khoác lên mình bộ váy cưới đẹp nhất, gả cho người đáng tin cậy nhất, là anh.',
  },

  loveStory: {
    bigDayLineHtml: '<em><strong>Ngày trọng đại của Văn Hào & Thảo Phương</strong></em>',
  },

  /** Hiển thị trong popup “Gửi quà cưới” — STK/NH đồng bộ với nội dung hiển thị */
  giftModal: {
    headline:
      'CẢM ƠN QUÝ KHÁCH VÌ ĐÃ TRỞ THÀNH MỘT PHẦN QUAN TRỌNG TRONG NGÀY ĐẶC BIỆT CỦA CHÚNG TÔI.',
    groomBankHtml:
      '<span class="gift-bank-line"><strong>CTK:</strong> HOANG VAN HAO</span><br />' +
      '<span class="gift-bank-line"><strong>STK:</strong> 0707383758</span><br />' +
      '<span class="gift-bank-line">Ngân hàng: VIETINBANK</span>',
    brideBankHtml:
      '<span class="gift-bank-line"><strong>CTK:</strong> NGUYEN THAO PHUONG</span><br />' +
      '<span class="gift-bank-line"><strong>STK:</strong> 109867549037</span><br />' +
      '<span class="gift-bank-line">Ngân hàng: VIETINBANK</span>',
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
