'use client';

import { useState } from 'react';
import '@/styles/app-view.css';

/* ── 아이콘 ── */
function HomeIcon({ active }: { active?: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function ChartIcon({ active }: { active?: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity={active ? 1 : 0.6}>
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity={0.6}>
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  );
}

function UserIcon({ active }: { active?: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity={active ? 1 : 0.6}>
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

/* 퀵 메뉴 아이콘 */
function QuickIcons() {
  const items = [
    {
      cls: 'aui-qi-a',
      label: '대시보드',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2.2" strokeLinecap="round">
          <rect x="3" y="3" width="7" height="7" rx="1.5" />
          <rect x="14" y="3" width="7" height="7" rx="1.5" />
          <rect x="3" y="14" width="7" height="7" rx="1.5" />
          <rect x="14" y="14" width="7" height="7" rx="1.5" />
        </svg>
      ),
    },
    {
      cls: 'aui-qi-b',
      label: '분석',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#06b6d4" strokeWidth="2.2" strokeLinecap="round">
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
        </svg>
      ),
    },
    {
      cls: 'aui-qi-c',
      label: '알림',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="2.2" strokeLinecap="round">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
      ),
    },
    {
      cls: 'aui-qi-d',
      label: '설정',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.2" strokeLinecap="round">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="aui-quick">
      {items.map((item) => (
        <div key={item.label} className="aui-quick-item">
          <div className={`aui-quick-icon ${item.cls}`}>{item.icon}</div>
          <span className="aui-quick-label">{item.label}</span>
        </div>
      ))}
    </div>
  );
}

/* 메인 앱 내용 */
function AppContent() {
  return (
    <>
      {/* 상태바 */}
      <div className="aui-statusbar">
        <span className="aui-statusbar-time">9:41</span>
        <div className="aui-statusbar-right">
          <div className="aui-sb-wifi">
            <span /><span /><span />
          </div>
          <div className="aui-sb-battery">
            <div className="aui-sb-battery-fill" />
          </div>
        </div>
      </div>

      {/* 헤더 */}
      <div className="aui-header">
        <div className="aui-header-left">
          <div className="aui-greeting">안녕하세요 👋</div>
          <div className="aui-username">홍길동님</div>
        </div>
        <div className="aui-avatar">홍</div>
      </div>

      {/* 배너 카드 */}
      <div className="aui-banner">
        <div className="aui-banner-label">이번 달 달성률</div>
        <div className="aui-banner-value">72%</div>
        <div className="aui-banner-bar-bg">
          <div className="aui-banner-bar" />
        </div>
      </div>

      {/* 퀵 메뉴 */}
      <QuickIcons />

      {/* 최근 활동 */}
      <div className="aui-section-title">최근 활동</div>
      <div className="aui-list">
        {[
          { cls: 'aui-li-a', emoji: '🚀', name: '프로젝트 A', sub: '방금 전', badge: '+12%' },
          { cls: 'aui-li-b', emoji: '📊', name: '프로젝트 B', sub: '1시간 전', badge: '+8%' },
          { cls: 'aui-li-c', emoji: '✅', name: '프로젝트 C', sub: '3시간 전', badge: '+5%' },
          { cls: 'aui-li-d', emoji: '💡', name: '프로젝트 D', sub: '어제', badge: '+3%' },
        ].map((item) => (
          <div key={item.name} className="aui-list-item">
            <div className={`aui-list-icon ${item.cls}`}>
              <span style={{ fontSize: '1rem' }}>{item.emoji}</span>
            </div>
            <div className="aui-list-info">
              <div className="aui-list-name">{item.name}</div>
              <div className="aui-list-sub">{item.sub}</div>
            </div>
            <span className="aui-list-badge">{item.badge}</span>
          </div>
        ))}
      </div>

      {/* 탭바 */}
      <div className="aui-tabbar">
        <div className="aui-tab active">
          <div className="aui-tab-icon"><HomeIcon active /></div>
          <div className="aui-tab-dot" />
        </div>
        <div className="aui-tab">
          <div className="aui-tab-icon"><ChartIcon /></div>
          <div className="aui-tab-dot" />
        </div>
        <div className="aui-tab">
          <div className="aui-tab-icon"><BellIcon /></div>
          <div className="aui-tab-dot" />
        </div>
        <div className="aui-tab">
          <div className="aui-tab-icon"><UserIcon /></div>
          <div className="aui-tab-dot" />
        </div>
      </div>

      {/* 홈 인디케이터 */}
      <div className="aui-home-bar"><span /></div>
    </>
  );
}

export default function AppView() {
  return (
    <div className="app-shell">
      {/* 배경 orb */}
      <div className="app-shell-orb app-shell-orb-1" />
      <div className="app-shell-orb app-shell-orb-2" />
      <div className="app-shell-orb app-shell-orb-3" />

      {/* 폰 래퍼 (데스크톱 = 프레임 있음, 모바일 = 프레임 없음) */}
      <div className="desktop-phone-wrap">
        <div className="desktop-phone-glow" />
        <div className="d-phone">
          <div className="d-phone-island">
            <div className="d-phone-island-cam" />
          </div>
          <div className="d-phone-screen">
            <AppContent />
          </div>
        </div>
      </div>
    </div>
  );
}
