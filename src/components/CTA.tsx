import '@/styles/sections.css';

export default function CTA() {
  return (
    <section className="section section-alt" id="contact">
      <div className="container">
        <div className="cta-banner">
          <h2 className="cta-title">지금 바로 시작할 준비가 되셨나요?</h2>
          <p className="cta-desc">
            14일 무료 체험으로 MEP의 모든 기능을 직접 경험해 보세요.
            신용카드 없이도 즉시 시작할 수 있습니다.
          </p>
          <div className="cta-actions">
            <a href="#" className="btn-cta-primary">
              무료 체험 시작
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a href="#" className="btn-cta-secondary">
              문의하기
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
