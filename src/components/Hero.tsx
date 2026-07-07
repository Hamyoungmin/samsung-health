import '@/styles/hero.css';

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-bg">
        <div className="hero-grid" />
        <div className="hero-orb hero-orb-1" />
        <div className="hero-orb hero-orb-2" />
        <div className="hero-orb hero-orb-3" />
      </div>

      <div className="hero-content">
        <div className="hero-badge animate-fade-up">
          <span className="hero-badge-dot" />
          새롭게 출시되었습니다
        </div>

        <h1 className="hero-title animate-fade-up delay-100">
          더 스마트한 방법으로<br />
          <em>목표를 달성하세요</em>
        </h1>

        <p className="hero-description animate-fade-up delay-200">
          MEP는 현대적인 웹&앱 플랫폼으로, 여러분의 아이디어를 빠르고 안정적으로
          현실로 만들어 드립니다. 지금 바로 시작해 보세요.
        </p>

        <div className="hero-cta animate-fade-up delay-300">
          <a href="#contact" className="btn-hero-primary">
            무료로 시작하기
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a href="#features" className="btn-hero-secondary">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.5" />
              <path d="M6.5 5.5L10.5 8l-4 2.5V5.5z" fill="currentColor" />
            </svg>
            기능 살펴보기
          </a>
        </div>

        <div className="hero-stats animate-fade-up delay-400">
          <div className="hero-stat">
            <div className="hero-stat-value">10K+</div>
            <div className="hero-stat-label">활성 사용자</div>
          </div>
          <div className="hero-divider" />
          <div className="hero-stat">
            <div className="hero-stat-value">99.9%</div>
            <div className="hero-stat-label">서비스 가동률</div>
          </div>
          <div className="hero-divider" />
          <div className="hero-stat">
            <div className="hero-stat-value">4.9★</div>
            <div className="hero-stat-label">사용자 평점</div>
          </div>
        </div>
      </div>
    </section>
  );
}
