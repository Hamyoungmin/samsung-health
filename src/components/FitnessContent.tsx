'use client';

import { useState } from 'react';

/* 사용자 제공 이미지 */
const LOCAL = {
  newGolf: '/fitness/new-content-golf.png',
  newLunge: '/fitness/new-content-lunge.png',
  storeVote: '/fitness/store-vote.png',
  storeGift: '/fitness/store-gift.png',
  running1: '/fitness/running-1.png',
  running2: '/fitness/running-2.png',
  summer1: '/fitness/summer-1.png',
  summer2: '/fitness/summer-2.png',
  sports1: '/fitness/sports-1.png',
  sports2: '/fitness/sports-2.png',
  home1: '/fitness/home-1.png',
  home2: '/fitness/home-2.png',
  zumba1: '/fitness/zumba-1.png',
  zumba2: '/fitness/zumba-2.png',
  routine1: '/fitness/routine-1.png',
  routine2: '/fitness/routine-2.png',
  habit1: '/fitness/habit-1.png',
  habit2: '/fitness/habit-2.png',
  partner1: '/fitness/partner-1.png',
  partner2: '/fitness/partner-2.png',
  partner3: '/fitness/partner-3.png',
  provZumba: '/fitness/provider-zumba.png',
  provPocket: '/fitness/provider-pocket.png',
  provLillius: '/fitness/provider-lillius.png',
};

/* Unsplash · Pexels 무료 이미지 (상업적 사용 가능) */
const u = (id: string, w = 400, h = 260) =>
  `https://images.unsplash.com/${id}?w=${w}&h=${h}&fit=crop&q=80`;
const p = (id: number, w = 400, h = 260) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}&h=${h}&fit=crop`;

const POOL = {
  golf: u('photo-1535131749006-b7f58c99034b'),
  gym1: p(841130),
  gym2: p(1552242),
  run1: p(3076509),
  run2: p(2261482),
  stretch1: p(3822867),
  stretch2: u('photo-1544367567-0f2fcb009e0b'),
  yoga1: p(416778),
  yoga2: p(6455653),
  dance: p(6637439),
  home1: p(4498361),
  home2: p(4056535),
  squat: u('photo-1517963879433-0ad325429e36'),
  weights: p(247119),
  crossfit: u('photo-1517836357463-d25dfeac3438'),
  boxing: p(863988),
  cycle: p(3621183),
  swim: u('photo-1530549387789-4c1017266635'),
  tennis: p(17840),
  pilates: p(2827392),
  outdoor: p(436148),
  womanGym: p(3253491),
  manGym: u('photo-1571019614242-c5c5dee9f50b'),
  groupFit: u('photo-1518611012118-696072aa579a'),
  partner1: p(3253501, 360, 480),
  partner2: p(1229356, 360, 480),
  partner3: p(1954524, 360, 480),
  store1: p(841131, 200, 200),
  store2: p(1288993, 200, 200),
  store3: u('photo-1542291026-7eec264c27ff', 200, 200),
  indexBg: p(1954524, 120, 120),
  prov1: p(841130, 112, 112),
  prov2: p(6637439, 112, 112),
  prov3: p(4498361, 112, 112),
  prov4: u('photo-1594383453236-52c3edfd0ad5', 112, 112),
};

type VideoItem = {
  img: string;
  title: string;
  duration: string;
  source: string;
  badge?: string;
  nativeThumb?: boolean;
};

function YouTubeBadge() {
  return (
    <span className="fit-yt-badge" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.75 15.02V8.98L15.5 12l-5.75 3.02z"/></svg>
    </span>
  );
}

function VideoCard({ img, title, duration, source, badge, nativeThumb }: VideoItem) {
  return (
    <div className="fit-video-card">
      {nativeThumb ? (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img src={img} alt="" className="fit-video-img-native" loading="lazy" />
      ) : (
        <div className="fit-video-thumb">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={img} alt="" loading="lazy" />
          <YouTubeBadge />
          {badge && <span className="fit-video-badge">{badge}</span>}
        </div>
      )}
      <div className="fit-video-title">{title}</div>
      <div className="fit-video-meta">{duration} · {source}</div>
    </div>
  );
}

function SectionHeader({ title, link }: { title: string; link?: boolean }) {
  return (
    <div className="fit-section-header">
      <h2 className="fit-section-title">{title}</h2>
      {link && <span className="fit-section-arrow">›</span>}
    </div>
  );
}

function RadarChart() {
  return (
    <svg className="fit-radar" viewBox="0 0 100 100" aria-hidden="true">
      <polygon points="50,8 88,32 76,78 24,78 12,32" fill="none" stroke="#ddd" strokeWidth="0.8" />
      <polygon points="50,20 74,36 66,68 34,68 26,36" fill="none" stroke="#e8e8e8" strokeWidth="0.6" />
      <polygon points="50,32 62,40 58,58 42,58 38,40" fill="none" stroke="#eee" strokeWidth="0.5" />
      <line x1="50" y1="50" x2="50" y2="8" stroke="#e0e0e0" strokeWidth="0.5" />
      <line x1="50" y1="50" x2="88" y2="32" stroke="#e0e0e0" strokeWidth="0.5" />
      <line x1="50" y1="50" x2="76" y2="78" stroke="#e0e0e0" strokeWidth="0.5" />
      <line x1="50" y1="50" x2="24" y2="78" stroke="#e0e0e0" strokeWidth="0.5" />
      <line x1="50" y1="50" x2="12" y2="32" stroke="#e0e0e0" strokeWidth="0.5" />
      <polygon points="50,18 78,34 68,72 32,70 22,38" fill="rgba(90,184,120,0.35)" stroke="#5ab878" strokeWidth="1.2" />
    </svg>
  );
}

const newContent: VideoItem[] = [
  { img: LOCAL.newGolf, title: '부드러운 스윙으로 비거리 폭발! 골프...', duration: '11:09', source: 'LILLIUS', nativeThumb: true },
  { img: LOCAL.newLunge, title: '하체 가동 범위 넓히는 발목 가동...', duration: '11:16', source: 'Samsung Health', nativeThumb: true },
];

const runningVideos: VideoItem[] = [
  { img: LOCAL.running1, title: '달리기 전 스트레칭', duration: '09:16', source: 'Samsung Health', nativeThumb: true },
  { img: LOCAL.running2, title: '달리기 후 스트레칭', duration: '09:16', source: 'Samsung Health', nativeThumb: true },
];

const summerVideos: VideoItem[] = [
  { img: LOCAL.summer1, title: '10 MIN, WOMAN BURNING FAT', duration: '10:24', source: 'Samsung Health', nativeThumb: true },
  { img: LOCAL.summer2, title: '10 MIN BASELINE FITNESS', duration: '10:00', source: 'LILLIUS', nativeThumb: true },
];

const sportsVideos: VideoItem[] = [
  { img: LOCAL.sports1, title: '부드러운 스윙으로 비거리 폭발!...', duration: '11:09', source: 'LILLIUS', nativeThumb: true },
  { img: LOCAL.sports2, title: 'EXPLORE YOUR DRIVING DISTANCE', duration: '10:00', source: 'LILLIUS', nativeThumb: true },
];

const homeVideos: VideoItem[] = [
  { img: LOCAL.home1, title: '혈당 다이어트 - 식후 혈당 낮추는 루틴', duration: '08:44', source: 'QUAT', nativeThumb: true },
  { img: LOCAL.home2, title: 'Knee Therapy Pilates', duration: '15:20', source: 'Samsung Health', nativeThumb: true },
];

const zumbaVideos: VideoItem[] = [
  { img: LOCAL.zumba1, title: '하루의 피로를 떨쳐내는 미니강좌', duration: '31:49', source: 'Zumba', nativeThumb: true },
  { img: LOCAL.zumba2, title: '즐겁게 춤추며 하는 전신 운동', duration: '28:00', source: 'Zumba', nativeThumb: true },
];

const routineVideos: VideoItem[] = [
  { img: LOCAL.routine2, title: '200REP SQUATS CHALLENGE', duration: '12:00', source: 'Pocket Gym', nativeThumb: true },
  { img: LOCAL.routine1, title: '나를 바꾸는 시간, 콰트', duration: '10:24', source: 'QUAT', nativeThumb: true },
];

const habitVideos: VideoItem[] = [
  { img: LOCAL.habit2, title: '사이드 런지 스트레칭', duration: '10:30', source: 'BLESSLIFE', nativeThumb: true },
  { img: LOCAL.habit1, title: '200REP ABS CHALLENGE', duration: '11:21', source: 'BLESSLIFE', nativeThumb: true },
];

const storeCards = [
  { img: LOCAL.storeVote, label: '헬스퀴즈 풀고\n득템하기' },
  { img: LOCAL.storeGift, label: '땀흘린 당신을\n위한 특별한 선물' },
];

const partners = [
  { img: LOCAL.partner1, title: '포켓짐', native: true },
  { img: LOCAL.partner2, title: '콰트', native: true },
  { img: LOCAL.partner3, title: 'LILLIUS', native: true },
];

const providers = [
  { name: 'Zumba', img: LOCAL.provZumba },
  { name: 'Pocket Gym', img: LOCAL.provPocket },
  { name: 'LILLIUS', img: LOCAL.provLillius },
];

const fitnessMenuItems = [
  { label: '프로모션', hasBadge: true },
  { label: '공지사항', hasBadge: true },
  { label: '개인정보 처리방침' },
  { label: '설정' },
];

export default function FitnessContent() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <div className="sh-statusbar fit-statusbar">
        <span className="sh-statusbar-time">6:48</span>
        <div className="sh-statusbar-right">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2a2a3a" strokeWidth="2"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><circle cx="12" cy="20" r="1" fill="#2a2a3a"/></svg>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2a2a3a" strokeWidth="2"><rect x="1" y="6" width="18" height="12" rx="2"/><path d="M23 13v-2" strokeLinecap="round"/></svg>
        </div>
      </div>

      <div className="fit-header">
        <h1 className="fit-title">피트니스</h1>
        <div className="fit-header-actions">
          <button className="fit-action-btn" aria-label="즐겨찾기">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          </button>
          <button className="fit-action-btn" aria-label="목록">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/></svg>
          </button>
          <button
            className="fit-action-btn fit-action-menu"
            aria-label="더보기"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="disc-menu-dot" />
            <span className="disc-notify-dot" />
          </button>
        </div>
      </div>

      <div className={`sh-home-menu-layer${menuOpen ? ' open' : ''}`}>
        <button
          className="sh-home-menu-backdrop"
          aria-label="메뉴 닫기"
          tabIndex={menuOpen ? 0 : -1}
          onClick={() => setMenuOpen(false)}
        />
        <div className="sh-home-menu-panel compact-more-menu-panel" role="menu" aria-label="피트니스 더보기 메뉴" aria-hidden={!menuOpen}>
          {fitnessMenuItems.map((item) => (
            <button
              key={item.label}
              className="sh-home-menu-item"
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

      <div className="sh-scroll fit-scroll">
        {/* 신체 체력 지수 */}
        <div className="fit-index-card">
          <div className="fit-index-photo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={POOL.indexBg} alt="" loading="lazy" />
          </div>
          <div className="fit-index-text">
            <div className="fit-index-title">신체 체력 지수</div>
            <div className="fit-index-desc">
              운동 관심사를 기반으로 주간 운동 목표와 콘텐츠를 추천받아 보세요.
            </div>
          </div>
          <RadarChart />
        </div>

        <div className="fit-rounded-section">
          <SectionHeader title="새로운 콘텐츠" link />
          <div className="fit-hscroll">
            {newContent.map((v) => <VideoCard key={v.title} {...v} />)}
          </div>
        </div>

        <div className="fit-rounded-section">
          <SectionHeader title="릴리스토어" />
          <div className="fit-hscroll fit-store-scroll">
            {storeCards.map((c) => (
              <div key={c.label} className="fit-store-card fit-store-native">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={c.img} alt="" className="fit-store-img-native" loading="lazy" />
                <div className="fit-store-label fit-store-label-below">
                  {c.label.split('\n').map((l, i, arr) => (
                    <span key={i}>{l}{i < arr.length - 1 && <br />}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="fit-rounded-section">
          <SectionHeader title="건강한 달리기를 위한 필수 트레이닝" link />
          <div className="fit-hscroll">
            {runningVideos.map((v) => <VideoCard key={v.title} {...v} />)}
          </div>
        </div>

        <div className="fit-rounded-section">
          <SectionHeader title="여름 체력을 채우는 하루 10분 운동" link />
          <div className="fit-hscroll">
            {summerVideos.map((v) => <VideoCard key={v.title} {...v} />)}
          </div>
        </div>

        <div className="fit-rounded-section">
          <SectionHeader title="스포츠 스타의 운동 노하우" link />
          <div className="fit-hscroll">
            {sportsVideos.map((v) => <VideoCard key={v.title} {...v} />)}
          </div>
        </div>

        <div className="fit-rounded-section">
          <SectionHeader title="집에서 시작하는 전문 홈트레이닝" link />
          <div className="fit-hscroll">
            {homeVideos.map((v) => <VideoCard key={v.title} {...v} />)}
          </div>
        </div>

        <div className="fit-rounded-section">
          <SectionHeader title="Zumba® - 피트니스를 즐겁게" link />
          <div className="fit-hscroll">
            {zumbaVideos.map((v) => <VideoCard key={v.title} {...v} />)}
          </div>
        </div>

        <div className="fit-rounded-section">
          <SectionHeader title="집에서 할 수 있는 최적의 운동 루틴" link />
          <div className="fit-hscroll">
            {routineVideos.map((v) => <VideoCard key={v.title} {...v} />)}
          </div>
        </div>

        <div className="fit-rounded-section">
          <SectionHeader title="신나고 재미있게! 홈트 습관 만들기" link />
          <div className="fit-hscroll">
            {habitVideos.map((v) => <VideoCard key={v.title} {...v} />)}
          </div>
        </div>

        <div className="fit-rounded-section">
          <SectionHeader title="파트너 서비스" />
          <div className="fit-hscroll fit-partner-scroll">
            {partners.map((p) => (
              <div key={p.title} className="fit-partner-card">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.img} alt="" className="fit-partner-img-native" loading="lazy" />
                <div className="fit-partner-title">{p.title}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="fit-rounded-section">
          <SectionHeader title="프로그램 제공자" />
          <div className="fit-providers">
            {providers.map((p) => (
              <div key={p.name} className="fit-provider">
                <div className="fit-provider-icon">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.img} alt={p.name} loading="lazy" />
                </div>
                <span className="fit-provider-name">{p.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ height: 90 }} />
      </div>

    </>
  );
}
