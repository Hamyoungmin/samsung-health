import '@/styles/sections.css';

const testimonials = [
  {
    text: 'MEP 덕분에 개발 속도가 3배 빨라졌습니다. Firebase 연동이 정말 간편하고, 반응형 UI도 완벽하게 지원돼서 모바일 앱처럼 느껴져요.',
    name: '김민준',
    role: 'CTO, 스타트업 A',
    initial: '김',
  },
  {
    text: '기존 솔루션 대비 비용이 절반으로 줄었어요. 성능도 눈에 띄게 좋아졌고, 팀 협업 기능이 특히 마음에 듭니다.',
    name: '이서연',
    role: '프로덕트 매니저, B사',
    initial: '이',
  },
  {
    text: '처음에는 반신반의했는데 써보니 정말 다르더라고요. 분석 대시보드가 직관적이어서 의사결정이 훨씬 빠르게 됐어요.',
    name: '박지호',
    role: '풀스택 개발자, C팀',
    initial: '박',
  },
];

function StarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M8 1l1.96 4.06L14.5 5.63l-3.25 3.17.77 4.47L8 11.04l-4.02 2.23.77-4.47L1.5 5.63l4.54-.57L8 1z" />
    </svg>
  );
}

export default function Testimonials() {
  return (
    <section className="section" id="testimonials">
      <div className="container">
        <div className="section-header">
          <span className="section-label">사용자 후기</span>
          <h2 className="section-title">
            고객들이 <em>직접 말해요</em>
          </h2>
          <p className="section-desc">
            MEP를 실제로 사용하는 분들의 생생한 이야기를 들어보세요.
          </p>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className="testimonial-card animate-fade-up"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="testimonial-stars">
                {Array.from({ length: 5 }).map((_, j) => (
                  <StarIcon key={j} />
                ))}
              </div>
              <p className="testimonial-text">"{t.text}"</p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">{t.initial}</div>
                <div>
                  <p className="testimonial-name">{t.name}</p>
                  <p className="testimonial-role">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
