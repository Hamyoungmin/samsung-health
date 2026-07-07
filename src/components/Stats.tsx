import '@/styles/sections.css';

const stats = [
  { value: '10K+', label: '활성 사용자' },
  { value: '99.9%', label: '서비스 가동률' },
  { value: '150+', label: '연동 서비스' },
  { value: '4.9★', label: '평균 앱 평점' },
];

export default function Stats() {
  return (
    <section className="section section-alt" id="stats">
      <div className="container">
        <div className="section-header">
          <span className="section-label">숫자로 보는 MEP</span>
          <h2 className="section-title">
            신뢰할 수 있는 <em>성과</em>
          </h2>
          <p className="section-desc">
            수많은 팀과 개인 개발자들이 MEP를 선택하고
            함께 성장하고 있습니다.
          </p>
        </div>

        <div className="stats-grid">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="stat-item animate-fade-up"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
