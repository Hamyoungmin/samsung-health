'use client';

import { useState } from 'react';

const discoverMenuItems = [
  { label: '서비스 관리' },
  { label: '프로모션', hasBadge: true },
  { label: '공지사항', hasBadge: true },
  { label: '개인정보 처리방침' },
  { label: '설정' },
];

export default function DiscoverContent() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <div className="sh-statusbar sh-statusbar-discover">
        <span className="sh-statusbar-time">6:48</span>
        <div className="sh-statusbar-right">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2a2a3a" strokeWidth="2"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><circle cx="12" cy="20" r="1" fill="#2a2a3a"/></svg>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2a2a3a" strokeWidth="2"><rect x="1" y="6" width="18" height="12" rx="2"/><path d="M23 13v-2" strokeLinecap="round"/></svg>
        </div>
      </div>

      <div className="disc-header">
        <h1 className="disc-title">발견</h1>
        <button
          className="disc-menu-btn"
          aria-label="더보기"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="disc-menu-dot" />
          <span className="disc-notify-dot" />
        </button>
      </div>

      <div className={`sh-home-menu-layer${menuOpen ? ' open' : ''}`}>
        <button
          className="sh-home-menu-backdrop"
          aria-label="메뉴 닫기"
          tabIndex={menuOpen ? 0 : -1}
          onClick={() => setMenuOpen(false)}
        />
        <div className="sh-home-menu-panel" role="menu" aria-label="발견 더보기 메뉴" aria-hidden={!menuOpen}>
          {discoverMenuItems.map((item, i) => (
            <button
              key={item.label}
              className={`sh-home-menu-item${i === 0 ? ' sh-home-menu-primary' : ''}`}
              role="menuitem"
              tabIndex={menuOpen ? 0 : -1}
              onClick={() => setMenuOpen(false)}
            >
              <span>{item.label}</span>
              {item.hasBadge && <span className="sh-home-menu-badge" aria-label="새 소식" />}
            </button>
          ))}
        </div>
      </div>

      <div className="sh-scroll disc-scroll">
        <h2 className="disc-section-title">일상을 더 건강하게</h2>

        {/* GenTok 카드 — 퍼스널 건강 솔루션 */}
        <div className="disc-gentok-card disc-img-card">
          <img
            src="/discover-gentok.png"
            alt="퍼스널 건강 솔루션"
            className="disc-card-img"
          />
        </div>

        {/* Calm 카드 — 균형 잡힌 일상 */}
        <div className="disc-calm-card disc-img-card">
          <img
            src="/discover-calm.png"
            alt="균형 잡힌 일상"
            className="disc-card-img"
          />
        </div>

        {/* 프로모션 */}
        <div className="disc-promo-header">
          <span className="disc-promo-title">프로모션</span>
          <span className="disc-promo-dot" />
          <span className="disc-promo-arrow">›</span>
        </div>

        <div className="disc-promo-scroll">
          <img
            src="/discover-promo1.png"
            alt="여름 휴가 전 체중관리"
            className="disc-promo-img"
          />
          <img
            src="/discover-promo2.png"
            alt="삼성 헬스 815런 걷기 챌린지"
            className="disc-promo-img"
          />
        </div>

        <div style={{ height: 76 }} />
      </div>
    </>
  );
}
