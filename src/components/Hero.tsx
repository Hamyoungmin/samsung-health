import '@/styles/hero.css';

function AppleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  );
}

function GooglePlayIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M3.18 23.76a2.5 2.5 0 0 1-1.18-2.2V2.44A2.5 2.5 0 0 1 3.18.24l11.68 11.76-11.68 11.76zm13.08-13.08L4.14 2.56l10.1 5.84 2.02-1.72zm1.48 1.32l-2.36 2 2.36 2 2.14-1.24a1.36 1.36 0 0 0 0-2.36l-2.14-1.4zm-1.48 3.08l-2.02-1.72-10.1 5.84 12.12-4.12z" />
    </svg>
  );
}

/* 앱 화면 내부 UI */
function AppScreen() {
  return (
    <div className="phone-screen">
      {/* 상태바 */}
      <div className="app-statusbar">
        <span className="app-statusbar-time">9:41</span>
        <div className="app-statusbar-icons">
          <span /><span /><span />
        </div>
      </div>

      {/* 헤더 */}
      <div className="app-header">
        <div className="app-header-row">
          <div>
            <div className="app-greeting">안녕하세요 👋</div>
            <div className="app-username">홍길동님</div>
          </div>
          <div className="app-avatar">홍</div>
        </div>
      </div>

      {/* 메인 카드 */}
      <div className="app-card">
        <div className="app-card-label">이번 달 달성률</div>
        <div className="app-card-value">72%</div>
        <div className="app-card-bar-wrap">
          <div className="app-card-bar" />
        </div>
      </div>

      {/* 빠른 메뉴 */}
      <div className="app-quick">
        {['홈', '분석', '설정', '더보기'].map((label, i) => (
          <div key={label} className="app-quick-item">
            <div className="app-quick-icon">
              <div className="app-quick-dot" style={{ opacity: 0.5 + i * 0.15 }} />
            </div>
            <span className="app-quick-label">{label}</span>
          </div>
        ))}
      </div>

      {/* 목록 */}
      <div className="app-list-title">최근 활동</div>
      <div className="app-list">
        {[
          { cls: 'app-list-icon-a', name: '프로젝트 A', sub: '방금 전', val: '+12%' },
          { cls: 'app-list-icon-b', name: '프로젝트 B', sub: '1시간 전', val: '+8%' },
          { cls: 'app-list-icon-c', name: '프로젝트 C', sub: '3시간 전', val: '+5%' },
        ].map((item) => (
          <div key={item.name} className="app-list-item">
            <div className={`app-list-icon ${item.cls}`} />
            <div className="app-list-info">
              <div className="app-list-name">{item.name}</div>
              <div className="app-list-sub">{item.sub}</div>
            </div>
            <div className="app-list-val">{item.val}</div>
          </div>
        ))}
      </div>

      {/* 홈 인디케이터 */}
      <div className="phone-home-bar"><span /></div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="hero">
      {/* 배경 */}
      <div className="hero-bg">
        <div className="hero-grid" />
        <div className="hero-orb hero-orb-1" />
        <div className="hero-orb hero-orb-2" />
        <div className="hero-orb hero-orb-3" />
      </div>

      <div className="hero-inner">
        {/* ── 텍스트 ── */}
        <div className="hero-text">
          <div className="hero-badge animate-fade-up">
            <span className="hero-badge-dot" />
            앱 출시 기념 — 지금 무료 다운로드
          </div>

          <h1 className="hero-title animate-fade-up delay-100">
            손 안에서 만나는<br />
            <em>스마트한 경험</em>
          </h1>

          <p className="hero-description animate-fade-up delay-200">
            MEP 앱 하나로 모든 것을 관리하세요.
            빠르고 직관적인 UI로 언제 어디서든
            여러분의 목표를 추적하고 달성하세요.
          </p>

          {/* 앱스토어 버튼 */}
          <div className="hero-store-btns animate-fade-up delay-300">
            <a href="#" className="btn-store btn-store-dark" aria-label="App Store에서 다운로드">
              <AppleIcon />
              <div className="btn-store-label">
                <span className="btn-store-sub">Download on the</span>
                <span className="btn-store-name">App Store</span>
              </div>
            </a>
            <a href="#" className="btn-store btn-store-outline" aria-label="Google Play에서 다운로드">
              <GooglePlayIcon />
              <div className="btn-store-label">
                <span className="btn-store-sub">Get it on</span>
                <span className="btn-store-name">Google Play</span>
              </div>
            </a>
          </div>

          {/* 통계 */}
          <div className="hero-stats animate-fade-up delay-400">
            <div className="hero-stat">
              <div className="hero-stat-value">10K+</div>
              <div className="hero-stat-label">다운로드</div>
            </div>
            <div className="hero-divider" />
            <div className="hero-stat">
              <div className="hero-stat-value">4.9★</div>
              <div className="hero-stat-label">앱 평점</div>
            </div>
            <div className="hero-divider" />
            <div className="hero-stat">
              <div className="hero-stat-value">99.9%</div>
              <div className="hero-stat-label">가동률</div>
            </div>
          </div>
        </div>

        {/* ── 폰 목업 ── */}
        <div className="hero-mockup animate-fade-in delay-200">
          <div className="phone-frame-shadow" />
          <div className="phone-frame">
            <div className="phone-notch">
              <div className="phone-notch-cam" />
            </div>
            <AppScreen />
          </div>
        </div>
      </div>
    </section>
  );
}
