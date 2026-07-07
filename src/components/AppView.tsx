'use client';

import { useState } from 'react';
import '@/styles/app-view.css';

/* ───────── 탭 아이콘 ───────── */
const TabIcons = {
  Home: () => (
    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
  ),
  Together: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/>
    </svg>
  ),
  Discover: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
    </svg>
  ),
  Fitness: () => (
    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
  ),
  Scan: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2"/>
      <line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/>
    </svg>
  ),
};

/* ───────── 카테고리 탭 아이콘 ───────── */
const CatIcons = [
  { key: 'all', icon: () => <svg viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg> },
  { key: 'run', icon: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 4a1 1 0 1 0 2 0 1 1 0 0 0-2 0M6 20l4-8 4 4 2-4 4 4M4 16l4-4"/></svg> },
  { key: 'sleep', icon: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg> },
  { key: 'heart', icon: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg> },
  { key: 'mind', icon: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> },
  { key: 'food', icon: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2M7 2v20M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7"/></svg> },
];

/* ───────── 흰 카드 (숫자형) ───────── */
function WhiteCard({
  label, value, unit, sub, barPct, tall,
}: {
  label: string; value: string; unit?: string; sub?: string; barPct?: number; tall?: boolean;
}) {
  return (
    <div className="sh-white-card" style={{ minHeight: tall ? 100 : undefined }}>
      <div className="sh-wc-label">{label}</div>
      <div className="sh-wc-value">
        {value}
        {unit && <span style={{ fontSize: '0.75rem', fontWeight: 500, color: '#aaa', marginLeft: 3 }}>{unit}</span>}
      </div>
      {sub && <div className="sh-wc-sub">{sub}</div>}
      {barPct !== undefined && (
        <div className="sh-wc-bar-bg">
          <div className="sh-wc-bar" style={{ width: `${barPct}%` }} />
        </div>
      )}
    </div>
  );
}

/* ───────── 컬러 카드 ───────── */
function ColorCard({
  cls, label, value, sub, deco, badge,
}: {
  cls: string; label: string; value?: string; sub?: string; deco?: string; badge?: boolean;
}) {
  return (
    <div className={`sh-color-card ${cls}`}>
      {badge && <div className="sh-lab-badge">🧪</div>}
      <div>
        <div className="sh-color-card-label">{label}</div>
        {value && <div className="sh-color-card-value">{value}</div>}
        {sub && <div className="sh-color-card-sub">{sub}</div>}
      </div>
      {deco && <div className="sh-color-card-deco">{deco}</div>}
    </div>
  );
}

/* ───────── 메인 앱 콘텐츠 ───────── */
function SamsungHealthContent() {
  const [activeTab, setActiveTab] = useState(0);
  const [activeNav, setActiveNav] = useState(0);

  return (
    <>
      {/* 상태바 */}
      <div className="sh-statusbar">
        <span className="sh-statusbar-time">6:48</span>
        <div className="sh-statusbar-right">
          {/* 간단 아이콘들 */}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2a2a3a" strokeWidth="2"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><circle cx="12" cy="20" r="1" fill="#2a2a3a"/></svg>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2a2a3a" strokeWidth="2"><rect x="1" y="6" width="18" height="12" rx="2"/><path d="M23 13v-2" strokeLinecap="round"/></svg>
        </div>
      </div>

      {/* 헤더 */}
      <div className="sh-header">
        <span className="sh-header-title">Samsung Health</span>
        <div className="sh-header-actions">
          <button className="sh-profile-btn" aria-label="프로필">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          </button>
          <button className="sh-more-btn" aria-label="더보기">
            <div className="sh-more-dot" />
          </button>
        </div>
      </div>

      {/* 카테고리 탭 */}
      <div className="sh-tabs" role="tablist">
        {CatIcons.map((cat, i) => (
          <button
            key={cat.key}
            className={`sh-tab${activeTab === i ? ' active' : ''}`}
            onClick={() => setActiveTab(i)}
            role="tab"
            aria-selected={activeTab === i}
          >
            <cat.icon />
          </button>
        ))}
      </div>

      {/* 스크롤 콘텐츠 */}
      <div className="sh-scroll">

        {/* 동기부여 카드 */}
        <div className="sh-motive-card">
          <div className="sh-motive-title">아직 시간이 있어요! 오늘 활동 목표를 달성해 보세요</div>
          <div className="sh-motive-body">
            아직 일일 활동 목표를 달성하지 못했어요. 금요일에는 32%의 사용자가 일일 목표를 달성해요. 남은 시간 조금 더 힘내보세요. 포기는 배추를 셀 때만! 목표가 나를 기다리고 있어요.
          </div>
          <div className="sh-motive-btn">
            <button>기록 보기</button>
          </div>
          <div className="sh-dots">
            <div className="sh-dot active" /><div className="sh-dot" /><div className="sh-dot" /><div className="sh-dot" /><div className="sh-dot" />
          </div>
        </div>

        {/* 동기화 알림 */}
        <div className="sh-sync-card">
          <div className="sh-sync-text">데이터를 자동 동기화하고, 헬스 데이터를 안전하게 보관하세요.</div>
          <div className="sh-sync-actions">
            <button className="sh-sync-btn-later">나중에</button>
            <button className="sh-sync-btn-on">자동 동기화 켜기</button>
          </div>
        </div>

        {/* 에너지 점수 */}
        <ColorCard cls="sh-card-energy" label="에너지 점수" deco="🔥" />

        {/* 일일 활동 + 수면 */}
        <div className="sh-grid-2">
          <div className="sh-white-card" style={{ minHeight: 110 }}>
            <div className="sh-wc-label">일일 활동</div>
            <div className="sh-heart-rings">
              <div className="sh-ring sh-ring-1" />
              <div className="sh-ring sh-ring-2" />
              <div className="sh-ring sh-ring-3" />
            </div>
          </div>
          <ColorCard cls="sh-card-sleep" label="수면" sub="상세한 수면 데이터를 확인해 보세요." deco="🌙" />
        </div>

        {/* 운동 아이콘 + 이번 주 운동 기록 */}
        <div className="sh-grid-2">
          <div className="sh-white-card" style={{ padding: 8 }}>
            <div className="sh-exercise-grid">
              {['🚶', '🏃', '🧗', '☰'].map((em, i) => (
                <div key={i} className="sh-exercise-icon">
                  <span style={{ fontSize: '1rem' }}>{em}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="sh-white-card">
            <div className="sh-wc-label">이번 주 운동 기록</div>
            <div className="sh-wc-value" style={{ fontSize: '1.25rem' }}>25:33</div>
            <div className="sh-wc-sub">2개 세션</div>
            <div className="sh-wc-sub">76 kcal</div>
          </div>
        </div>

        {/* 음식 + 체중 */}
        <div className="sh-grid-2">
          <WhiteCard label="음식" value="0" sub="1,952 kcal" barPct={0} />
          <ColorCard cls="sh-card-weight" label="체중/체성분" deco="💧" />
        </div>

        {/* 걸음 (전체 폭) */}
        <div className="sh-white-card">
          <div className="sh-wc-label">걸음</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
            <div className="sh-wc-value">2,090</div>
          </div>
          <div className="sh-wc-sub">6,000 걸음</div>
          <div className="sh-wc-bar-bg" style={{ marginTop: 8 }}>
            <div className="sh-wc-bar" style={{ width: '35%', background: 'linear-gradient(90deg,#5ab878,#78d090)' }} />
          </div>
        </div>

        {/* 약 + 생리 주기 */}
        <div className="sh-grid-2">
          <ColorCard cls="sh-card-medicine" label="약" sub="약을 추가하고 복용 알림을 받아보세요." deco="💊" />
          <ColorCard cls="sh-card-period" label="생리 주기" sub="생리 주기를 기록해 보세요." deco="🌸" />
        </div>

        {/* 물 + 혈압 */}
        <div className="sh-grid-2">
          <WhiteCard label="물" value="0" unit="" sub="2,000 ml" barPct={0} />
          <ColorCard cls="sh-card-bp" label="혈압" sub="혈압 변화를 확인하려면 계속 기록하세요." deco="🩸" />
        </div>

        {/* 혈당 + 최종당화물 지수 */}
        <div className="sh-grid-2">
          <ColorCard cls="sh-card-sugar" label="혈당" sub="혈당 수치를 기록하여 혈당을 관리하세요." deco="🔴" />
          <ColorCard cls="sh-card-glycemic" label="최종당화물 지수" sub="최종당화물 지수를 활용해 대사 건강 상태를 파악하는 방법을 알아보세요." deco="🍪" />
        </div>

        {/* 심박수 + 스트레스 */}
        <div className="sh-grid-2">
          <ColorCard cls="sh-card-heart" label="심박수" deco="❤️" />
          <ColorCard cls="sh-card-stress" label="스트레스" deco="🎭" />
        </div>

        {/* 혈중 산소 (전체 폭) */}
        <ColorCard cls="sh-card-oxygen" label="혈중 산소" sub="내 몸에 산소가 충분히 공급되고 있는지 확인하세요." deco="🫧" />

        {/* 심장 건강 (전체 폭) */}
        <ColorCard cls="sh-card-cardiac" label="심장 건강" sub="심장 건강 점수와 주요 건강 정보를 한 곳에서 확인해 보세요." deco="💜" />

        {/* 건강 기록 + 생체 징후 */}
        <div className="sh-grid-2">
          <ColorCard cls="sh-card-records" label="건강 기록" sub="약, 검사 결과 등을 기록해 보세요." deco="🔬" />
          <ColorCard cls="sh-card-vitals" label="생체 징후" sub="생체 징후가 측정되는 원리를 알아보세요." deco="🫀" />
        </div>

        {/* 항산화 지수 (전체 폭) */}
        <div style={{ position: 'relative' }}>
          <ColorCard cls="sh-card-anti" label="항산화 지수" sub="이 지수가 과일과 채소를 충분히 섭취하도록 어떻게 도와주는지 알아보세요." deco="🔮" badge />
        </div>

        {/* 혈관 스트레스 (전체 폭) */}
        <div style={{ position: 'relative' }}>
          <ColorCard cls="sh-card-vascular" label="혈관 스트레스" sub="혈관 스트레스 수준을 확인하고 더 나은 생활 습관을 만드는 방법을 알아보세요." deco="🫁" badge />
        </div>

        {/* Knox + 홈화면 편집 */}
        <div className="sh-knox">Secured by Knox</div>
        <button className="sh-edit-home">홈 화면 편집</button>
        {/* 하단 여유 공간 */}
        <div style={{ height: 8 }} />
      </div>

      {/* 하단 탭바 */}
      <div className="sh-tabbar">
        {[
          { label: '홈', Icon: TabIcons.Home },
          { label: '투게더', Icon: TabIcons.Together },
          { label: '발견', Icon: TabIcons.Discover, badge: true },
          { label: '피트니스', Icon: TabIcons.Fitness },
          { label: '', Icon: TabIcons.Scan },
        ].map((tab, i) => (
          <button
            key={i}
            className={`sh-tab-item${activeNav === i ? ' active' : ''}`}
            onClick={() => setActiveNav(i)}
          >
            <div className={`sh-tab-icon-wrap${tab.badge ? ' sh-tab-badge' : ''}`}>
              <tab.Icon />
            </div>
            {tab.label && <span className="sh-tab-label">{tab.label}</span>}
          </button>
        ))}
      </div>

      {/* 홈 인디케이터 */}
      <div className="sh-home-bar"><span /></div>
    </>
  );
}

export default function AppView() {
  return (
    <div className="app-shell">
      <div className="desktop-phone-wrap">
        <div className="desktop-phone-glow" />
        <div className="d-phone">
          <div className="d-phone-island">
            <div className="d-phone-island-cam" />
          </div>
          <div className="d-phone-screen">
            <SamsungHealthContent />
          </div>
        </div>
      </div>
    </div>
  );
}
