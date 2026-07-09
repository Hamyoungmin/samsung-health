'use client';

import type { DragEvent, ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';
import DiscoverContent from '@/components/DiscoverContent';
import FitnessContent from '@/components/FitnessContent';
import '@/styles/app-view.css';

type MainScreen = 'home' | 'together' | 'discover' | 'fitness';
type AppScreen = MainScreen | 'quickAdd';
type PhoneSide = 'left' | 'right';
type RightHomeCategoryKey = 'exercise' | 'health' | 'nutrition' | 'life';

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

/* ───────── 하단 탭바 ───────── */
const NAV_TABS = [
  { label: '홈', Icon: TabIcons.Home },
  { label: '투게더', Icon: TabIcons.Together },
  { label: '발견', Icon: TabIcons.Discover, badge: true },
  { label: '피트니스', Icon: TabIcons.Fitness },
];

function BottomTabBar({
  activeNav,
  onNavClick,
  onScanClick,
  variant,
  floatingTheme = 'discover',
}: {
  activeNav: number;
  onNavClick: (i: number) => void;
  onScanClick: () => void;
  variant: 'home' | 'floating';
  floatingTheme?: 'home' | 'together' | 'discover' | 'fitness';
}) {
  if (variant === 'floating') {
    return (
      <div
        className={`disc-tabbar-wrap${floatingTheme === 'fitness' ? ' fit-tabbar-wrap' : ''}${floatingTheme === 'home' ? ' home-tabbar-wrap' : ''}${floatingTheme === 'together' ? ' together-tabbar-wrap' : ''}`}
      >
        <div className="disc-tabbar">
          {NAV_TABS.map((tab, i) => (
            <button
              key={tab.label}
              className={`disc-tab-item${activeNav === i ? ' active' : ''}`}
              onClick={() => onNavClick(i)}
            >
              <div className={`disc-tab-icon${tab.badge && activeNav !== i ? ' disc-tab-badge' : ''}`}>
                <tab.Icon />
              </div>
              <span className="disc-tab-label">{tab.label}</span>
            </button>
          ))}
        </div>
        <button className="disc-scan-btn" aria-label="빠른 추가" onClick={onScanClick}>
          <TabIcons.Scan />
        </button>
        <div className="sh-home-bar disc-home-bar"><span /></div>
      </div>
    );
  }

  return (
    <>
      <div className="sh-tabbar">
        {[
          ...NAV_TABS,
          { label: '', Icon: TabIcons.Scan, isScan: true },
        ].map((tab, i) => (
          <button
            key={i}
            className={`sh-tab-item${activeNav === i ? ' active' : ''}`}
            onClick={() => ('isScan' in tab ? onScanClick() : onNavClick(i))}
          >
            <div className={`sh-tab-icon-wrap${'badge' in tab && tab.badge ? ' sh-tab-badge' : ''}`}>
              <tab.Icon />
            </div>
            {tab.label && <span className="sh-tab-label">{tab.label}</span>}
          </button>
        ))}
      </div>
      <div className="sh-home-bar"><span /></div>
    </>
  );
}

const scanActions = ['약 스캔', '혈압 스캔', '혈당 스캔'];

const manualActions = [
  '운동',
  '수면 시간',
  '기분',
  '생리 기간',
  '음식',
  '물',
  '체중',
  '혈당',
  '약',
  '혈압',
];

const homeMenuItems = [
  { label: '홈 카테고리 순서 변경' },
  { label: '프로모션', hasBadge: true },
  { label: '공지사항', hasBadge: true },
  { label: '개인정보 처리방침' },
  { label: '설정' },
];

const rightHomeCategories: Array<{
  key: RightHomeCategoryKey;
  title: string;
  subtitle: string;
  tone: string;
  highlights: Array<{ label: string; value: string; meta: string }>;
}> = [
  {
    key: 'life',
    title: '생활',
    subtitle: '일일 활동, 걸음, 수면',
    tone: 'purple',
    highlights: [
      { label: '일일 활동', value: '35%', meta: '목표 진행' },
      { label: '걸음', value: '2,090', meta: '6,000 목표' },
      { label: '수면', value: '7시간 20분', meta: '어제' },
    ],
  },
  {
    key: 'exercise',
    title: '운동',
    subtitle: '운동, 운동 기록, 에너지',
    tone: 'green',
    highlights: [
      { label: '운동', value: '시작', meta: '빠른 기록' },
      { label: '운동 기록', value: '25:33', meta: '2개 세션' },
      { label: '에너지 점수', value: '확인', meta: '오늘 컨디션' },
    ],
  },
  {
    key: 'health',
    title: '건강',
    subtitle: '심박수, 혈압, 혈당',
    tone: 'pink',
    highlights: [
      { label: '심박수', value: '72', meta: 'bpm' },
      { label: '혈압', value: '기록 전', meta: '최근 없음' },
      { label: '혈당', value: '기록 전', meta: '최근 없음' },
    ],
  },
  {
    key: 'nutrition',
    title: '식습관',
    subtitle: '음식과 물 기록',
    tone: 'orange',
    highlights: [
      { label: '음식', value: '0', meta: '1,952 kcal 목표' },
      { label: '물', value: '0', meta: '2,000 ml 목표' },
    ],
  },
];

const rightCategoryDetails: Record<RightHomeCategoryKey, Array<{ label: string; value: string; meta: string }>> = {
  exercise: [
    { label: '운동', value: '시작', meta: '운동을 바로 기록해 보세요' },
    { label: '이번 주 운동 기록', value: '25:33', meta: '이번 주 2개 세션' },
    { label: '에너지 점수', value: '확인', meta: '오늘 컨디션과 회복 상태' },
  ],
  health: [
    { label: '심박수', value: '72 bpm', meta: '최근 측정' },
    { label: '혈압', value: '기록 전', meta: '꾸준히 기록해 보세요' },
    { label: '혈당', value: '기록 전', meta: '혈당 변화를 관리' },
    { label: '최종당화물 지수(HbA1c)', value: '알아보기', meta: '장기 혈당 관리 지표' },
    { label: '혈중 산소', value: '측정 전', meta: '내 몸의 산소 상태 확인' },
    { label: '심장 건강', value: '확인', meta: '심장 건강 정보를 모아보기' },
    { label: '스트레스', value: '낮음', meta: '호흡으로 관리해 보세요' },
    { label: '생체 징후', value: '확인', meta: '주요 건강 신호 보기' },
    { label: '혈관 스트레스', value: '측정 전', meta: '혈관 상태 변화를 확인' },
  ],
  nutrition: [
    { label: '음식', value: '0 / 1,952 kcal', meta: '오늘 섭취 기록' },
    { label: '물', value: '0 / 2,000 ml', meta: '수분 섭취 목표' },
  ],
  life: [
    { label: '일일 활동', value: '35%', meta: '오늘 목표 진행률' },
    { label: '걸음', value: '2,090 / 6,000 걸음', meta: '오늘 목표의 35%' },
    { label: '수면', value: '7시간 20분', meta: '어제 수면 기록' },
    { label: '체중/체성분', value: '기록 전', meta: '몸 상태 변화를 확인' },
    { label: '약', value: '추가 전', meta: '복용 알림을 받을 수 있어요' },
    { label: '생리 주기', value: '기록 전', meta: '주기 변화를 확인' },
    { label: '건강 기록', value: '확인', meta: '검사 결과와 기록 관리' },
    { label: '항산화 지수', value: '알아보기', meta: '생활 습관 개선 정보' },
  ],
};

const RIGHT_CATEGORY_ORDER_STORAGE_KEY = 'samsung-health-category-order';
const RIGHT_DETAIL_ORDERS_STORAGE_KEY = 'samsung-health-detail-orders';
const RIGHT_GUIDE_DISMISSED_STORAGE_KEY = 'samsung-health-guide-dismissed';

const defaultRightCategoryOrder = rightHomeCategories.map((category) => category.key);
const defaultRightDetailOrders: Record<RightHomeCategoryKey, string[]> = {
  exercise: rightCategoryDetails.exercise.map((item) => item.label),
  health: rightCategoryDetails.health.map((item) => item.label),
  nutrition: rightCategoryDetails.nutrition.map((item) => item.label),
  life: rightCategoryDetails.life.map((item) => item.label),
};

function isRightHomeCategoryKey(value: unknown): value is RightHomeCategoryKey {
  return defaultRightCategoryOrder.includes(value as RightHomeCategoryKey);
}

function normalizeCategoryOrder(value: unknown) {
  if (!Array.isArray(value)) return defaultRightCategoryOrder;

  const savedOrder = value.filter(isRightHomeCategoryKey);
  const uniqueSavedOrder = savedOrder.filter((key, index) => savedOrder.indexOf(key) === index);
  const missingKeys = defaultRightCategoryOrder.filter((key) => !uniqueSavedOrder.includes(key));

  return [...uniqueSavedOrder, ...missingKeys];
}

function normalizeDetailOrders(value: unknown) {
  if (!value || typeof value !== 'object') return defaultRightDetailOrders;

  const savedOrders = value as Partial<Record<RightHomeCategoryKey, unknown>>;

  return defaultRightCategoryOrder.reduce<Record<RightHomeCategoryKey, string[]>>((orders, categoryKey) => {
    const validLabels = defaultRightDetailOrders[categoryKey];
    const savedLabels = Array.isArray(savedOrders[categoryKey])
      ? savedOrders[categoryKey].filter((label): label is string => typeof label === 'string' && validLabels.includes(label))
      : [];
    const uniqueSavedLabels = savedLabels.filter((label, index) => savedLabels.indexOf(label) === index);
    const missingLabels = validLabels.filter((label) => !uniqueSavedLabels.includes(label));

    orders[categoryKey] = [...uniqueSavedLabels, ...missingLabels];
    return orders;
  }, {} as Record<RightHomeCategoryKey, string[]>);
}

const rightDetailIcons: Record<string, { tone: string; icon: ReactNode }> = {
  운동: {
    tone: 'exercise',
    icon: <><circle cx="16" cy="5" r="2" /><path d="M8 21l3.2-6.5-3-3.2-4.2 4.1" /><path d="M12 9l3.5 3 3.5-1.2" /><path d="M10 7.2l4.5 1.8" /></>,
  },
  '이번 주 운동 기록': {
    tone: 'workout',
    icon: <><circle cx="12" cy="13" r="7" /><path d="M12 13l3-2" /><path d="M9 2h6" /><path d="M12 6v7" /></>,
  },
  '에너지 점수': {
    tone: 'energy',
    icon: <path d="M13 2 5 13h6l-1 9 9-13h-6l1-7z" />,
  },
  심박수: {
    tone: 'heart',
    icon: <><path d="M20.8 5.6a5 5 0 0 0-7.1 0L12 7.3l-1.7-1.7a5 5 0 1 0-7.1 7.1L12 21l8.8-8.3a5 5 0 0 0 0-7.1z" /><path d="M4 12h4l2-4 3 8 2-4h5" /></>,
  },
  혈압: {
    tone: 'pressure',
    icon: <><path d="M5 13a7 7 0 1 1 12.1 4.8" /><path d="M12 13l4-4" /><path d="M8 20h8" /></>,
  },
  혈당: {
    tone: 'sugar',
    icon: <><path d="M12 3s6 6.7 6 11a6 6 0 0 1-12 0c0-4.3 6-11 6-11z" /><circle cx="14.5" cy="15" r="1.8" /></>,
  },
  '최종당화물 지수(HbA1c)': {
    tone: 'glycemic',
    icon: <><path d="M4 19V5" /><path d="M4 19h16" /><path d="M7 16l3-4 3 2 4-7" /><path d="M17 7h3v3" /></>,
  },
  '혈중 산소': {
    tone: 'oxygen',
    icon: <><circle cx="9" cy="15" r="4" /><circle cx="16" cy="9" r="3" /><circle cx="17" cy="17" r="2" /></>,
  },
  '심장 건강': {
    tone: 'cardiac',
    icon: <><path d="M12 3 5 6v5c0 4.6 3 8.3 7 10 4-1.7 7-5.4 7-10V6l-7-3z" /><path d="M8 12h2l1-2 2 5 1-3h2" /></>,
  },
  스트레스: {
    tone: 'stress',
    icon: <><circle cx="12" cy="12" r="7" /><path d="M9 10h.01M15 10h.01" /><path d="M9 15c1.7-1.2 4.3-1.2 6 0" /></>,
  },
  '생체 징후': {
    tone: 'vitals',
    icon: <><path d="M12 3v18" /><path d="M5 8h14" /><path d="M7 16h10" /><path d="M9 6v4M15 14v4" /></>,
  },
  '혈관 스트레스': {
    tone: 'vascular',
    icon: <><path d="M4 13c4-6 7 6 11 0 1.5-2.2 3-2.7 5-1" /><path d="M4 17c4-6 7 6 11 0 1.5-2.2 3-2.7 5-1" /></>,
  },
  음식: {
    tone: 'food',
    icon: <><path d="M7 3v8" /><path d="M4 3v5a3 3 0 0 0 6 0V3" /><path d="M7 11v10" /><path d="M17 3v18" /><path d="M14 8c0-3 1.5-5 3-5" /></>,
  },
  물: {
    tone: 'water',
    icon: <><path d="M7 4h10l-1.2 16H8.2L7 4z" /><path d="M8 9h8" /><path d="M9 14c2 1 4 1 6 0" /></>,
  },
  '일일 활동': {
    tone: 'activity',
    icon: <><path d="M12 5a7 7 0 1 1-6.2 10.2" /><path d="M12 8a4 4 0 1 1-3.5 5.8" /><path d="M12 11a1 1 0 1 1-.9 1.5" /></>,
  },
  걸음: {
    tone: 'steps',
    icon: <><path d="M8 13c-2.4.2-3.8 1.3-3.8 3.1 0 1.3 1 2.1 2.4 2.1 2.1 0 3.4-1.8 3.4-4 0-.8-.7-1.2-2-1.2z" /><path d="M16 5c-2.2.2-3.4 1.2-3.4 2.9 0 1.2.9 2 2.2 2 2 0 3.1-1.7 3.1-3.7 0-.8-.6-1.2-1.9-1.2z" /></>,
  },
  수면: {
    tone: 'sleep',
    icon: <><path d="M20 13.1A7 7 0 1 1 10.9 4a5.5 5.5 0 0 0 9.1 9.1z" /><path d="M5 19h14" /></>,
  },
  '체중/체성분': {
    tone: 'weight',
    icon: <><rect x="5" y="6" width="14" height="13" rx="3" /><path d="M9 10a3 3 0 0 1 6 0" /><path d="M12 10l2-2" /></>,
  },
  약: {
    tone: 'medicine',
    icon: <><rect x="5" y="10" width="14" height="7" rx="3.5" transform="rotate(-45 12 13.5)" /><path d="M10 16 8 14" /></>,
  },
  '생리 주기': {
    tone: 'period',
    icon: <><circle cx="12" cy="12" r="3" /><path d="M12 4v3M12 17v3M4 12h3M17 12h3M6.6 6.6l2.1 2.1M15.3 15.3l2.1 2.1M17.4 6.6l-2.1 2.1M8.7 15.3l-2.1 2.1" /></>,
  },
  '건강 기록': {
    tone: 'records',
    icon: <><path d="M8 4h8l1 2h2v15H5V6h2l1-2z" /><path d="M9 11h6M9 15h4" /></>,
  },
  '항산화 지수': {
    tone: 'anti',
    icon: <><path d="M12 20c4-2 6-5 6-9 0-3-2.2-5-5-5-1.7 0-3.1.8-4 2.1" /><path d="M12 20c-4-2-6-5-6-9 0-2.3 1.2-4 3-4.7" /><path d="M12 7c1-2 2.5-3 5-3" /></>,
  },
};

function RightDetailIcon({ label }: { label: string }) {
  const detailIcon = rightDetailIcons[label] ?? rightDetailIcons['건강 기록'];

  return (
    <span className={`right-detail-icon right-detail-icon-${detailIcon.tone}`} aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        {detailIcon.icon}
      </svg>
    </span>
  );
}

const togetherMenuItems = [
  { label: '프로모션', hasBadge: true },
  { label: '공지사항', hasBadge: true },
  { label: '개인정보 처리방침' },
  { label: '설정' },
];

function QuickAddIcon({ label }: { label: string }) {
  const stroke = label.includes('스캔') ? '#7467dc' : '#6f7178';

  if (label.includes('스캔')) {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 4H5a1 1 0 0 0-1 1v2" />
        <path d="M17 4h2a1 1 0 0 1 1 1v2" />
        <path d="M20 17v2a1 1 0 0 1-1 1h-2" />
        <path d="M7 20H5a1 1 0 0 1-1-1v-2" />
        <circle cx="12" cy="12" r="3.4" />
        <path d="M14.6 14.6 18 18" />
      </svg>
    );
  }

  const paths: Record<string, ReactNode> = {
    운동: <><circle cx="16" cy="5" r="2" /><path d="M9 21l3-6-3-3-4 4" /><path d="M13 9l3 3 3-1" /><path d="M10 7l4 2" /></>,
    '수면 시간': <><path d="M4 12h16v6" /><path d="M4 18V7" /><path d="M7 12V9h5v3" /><path d="M14 12V9h3a3 3 0 0 1 3 3" /></>,
    기분: <><circle cx="12" cy="12" r="7" /><path d="M9 10h.01M15 10h.01" /><path d="M9 14c1.5 1.3 4.5 1.3 6 0" /></>,
    '생리 기간': <><circle cx="12" cy="12" r="3" /><path d="M12 4v3M12 17v3M4 12h3M17 12h3M6.6 6.6l2.1 2.1M15.3 15.3l2.1 2.1M17.4 6.6l-2.1 2.1M8.7 15.3l-2.1 2.1" /></>,
    음식: <><path d="M7 3v9" /><path d="M4 3v4a3 3 0 0 0 6 0V3" /><path d="M7 12v9" /><path d="M17 3v18" /><path d="M14 8c0-3 1.5-5 3-5" /></>,
    물: <><path d="M7 4h10l-1.2 16H8.2L7 4z" /><path d="M8 8h8" /></>,
    체중: <><path d="M5 8h14l-2 10H7L5 8z" /><path d="M9 11a3 3 0 0 1 6 0" /></>,
    혈당: <><path d="M12 3s6 7 6 11a6 6 0 0 1-12 0c0-4 6-11 6-11z" /><circle cx="15" cy="15" r="2" /></>,
    약: <><rect x="5" y="10" width="14" height="7" rx="3.5" transform="rotate(-45 12 13.5)" /><path d="M10 16 8 14" /></>,
    혈압: <><path d="M8 13a4 4 0 1 1 7 2.6" /><path d="M13 15l4 4" /><circle cx="18" cy="20" r="2" /><path d="M7 20a4 4 0 0 1-1-7" /></>,
  };

  return (
    <svg viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {paths[label]}
    </svg>
  );
}

function QuickAddContent({ onBack }: { onBack: () => void }) {
  return (
    <div className="quick-add-screen">
      <div className="quick-add-header">
        <button className="quick-back-btn" aria-label="뒤로가기" onClick={onBack}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18 9 12l6-6" />
          </svg>
        </button>
        <h1>빠른 추가</h1>
      </div>

      <section className="quick-section">
        <h2>카메라로 기록</h2>
        <div className="quick-scan-row">
          {scanActions.map((label) => (
            <button key={label} className="quick-scan-card">
              <span className="quick-scan-icon"><QuickAddIcon label={label} /></span>
              <span>{label}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="quick-section">
        <h2>직접 기록</h2>
        <div className="quick-manual-card">
          {manualActions.map((label) => (
            <button key={label} className="quick-manual-item">
              <span className="quick-manual-icon"><QuickAddIcon label={label} /></span>
              <span>{label}</span>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}

const togetherChallenges = [
  {
    title: '삼성 헬스 X 815런 걷기 챌린지',
    participants: '70,552',
    art: 'flag',
  },
  {
    title: '해변, 7월',
    participants: '699,517',
    art: 'beach',
  },
  {
    title: "삼성 헬스 '첫걸음 런' 걷기 챌린지",
    participants: '89,719',
    art: 'trail',
  },
];

function TogetherArt({ type }: { type: string }) {
  if (type === 'flag') {
    return (
      <img className="tog-art tog-art-flag-img" src="/together-flag.jpg" alt="" aria-hidden="true" />
    );
  }

  if (type === 'beach') {
    return (
      <img className="tog-art tog-art-beach-img" src="/together-beach.jpg" alt="" aria-hidden="true" />
    );
  }

  return (
    <img className="tog-art tog-art-trail-img" src="/together-trail.jpg" alt="" aria-hidden="true" />
  );
}

function TogetherContent() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <div className="sh-statusbar together-statusbar">
        <span className="sh-statusbar-time">6:48</span>
        <div className="sh-statusbar-right">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2a2a3a" strokeWidth="2"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><circle cx="12" cy="20" r="1" fill="#2a2a3a"/></svg>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2a2a3a" strokeWidth="2"><rect x="1" y="6" width="18" height="12" rx="2"/><path d="M23 13v-2" strokeLinecap="round"/></svg>
        </div>
      </div>

      <div className="together-header">
        <h1>투게더</h1>
        <button
          className="together-menu-btn"
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
        <div className="sh-home-menu-panel together-more-menu-panel" role="menu" aria-label="투게더 더보기 메뉴" aria-hidden={!menuOpen}>
          {togetherMenuItems.map((item) => (
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

      <div className="sh-scroll together-scroll">
        <section className="together-profile">
          <div className="together-avatar">
            <svg viewBox="0 0 24 24" fill="white">
              <circle cx="12" cy="8" r="3.2" />
              <path d="M5.5 20a6.5 6.5 0 0 1 13 0" />
            </svg>
            <span className="together-avatar-arrow">➤</span>
          </div>
          <div className="together-stat">
            <span>초보자</span>
            <strong>레벨 1</strong>
          </div>
          <div className="together-divider" />
          <div className="together-stat together-stat-center">
            <span>친구</span>
            <strong>0</strong>
          </div>
        </section>

        <button className="together-create-btn">도전 만들기</button>

        <section className="together-challenges">
          {togetherChallenges.map((challenge) => (
            <article key={challenge.title} className="together-card">
              <div className="together-card-copy">
                <div className="together-card-title">
                  {challenge.title}
                  <span className="together-new-badge">신규</span>
                </div>
                <p>글로벌 도전에 참여하고 함께 건강해져요!</p>
                <div className="together-card-count-label">참여자</div>
                <div className="together-card-count">{challenge.participants}</div>
                <button className="together-join-btn">참여하기</button>
              </div>
              <TogetherArt type={challenge.art} />
            </article>
          ))}
        </section>

        <div style={{ height: 88 }} />
      </div>
    </>
  );
}

/* ───────── 홈 화면 콘텐츠 ───────── */
function HomeContent({
  activeTab,
  setActiveTab,
  phoneSide,
}: {
  activeTab: number;
  setActiveTab: (i: number) => void;
  phoneSide: PhoneSide;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <div className="sh-statusbar">
        <span className="sh-statusbar-time">6:48</span>
        <div className="sh-statusbar-right">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2a2a3a" strokeWidth="2"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><circle cx="12" cy="20" r="1" fill="#2a2a3a"/></svg>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2a2a3a" strokeWidth="2"><rect x="1" y="6" width="18" height="12" rx="2"/><path d="M23 13v-2" strokeLinecap="round"/></svg>
        </div>
      </div>

      <div className="sh-header">
        <span className="sh-header-title">Samsung Health</span>
        <div className="sh-header-actions">
          <button className="sh-profile-btn" aria-label="프로필">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          </button>
          <button
            className="sh-more-btn"
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
        <div className="sh-home-menu-panel" role="menu" aria-label="홈 더보기 메뉴" aria-hidden={!menuOpen}>
          {homeMenuItems.map((item, i) => (
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

      <div className="sh-scroll home-scroll">
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
        {phoneSide === 'left' && (
          <button className="sh-edit-home">홈 화면 편집</button>
        )}
        {phoneSide === 'left' && <div style={{ height: 8 }} />}
      </div>
    </>
  );
}

function RightHomeContent({
  shouldShowGuideModal,
  onGuideShown,
  onGuideDismissPermanently,
}: {
  shouldShowGuideModal: boolean;
  onGuideShown: () => void;
  onGuideDismissPermanently: () => void;
}) {
  const [selectedCategory, setSelectedCategory] = useState<RightHomeCategoryKey | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [showGuideModal, setShowGuideModal] = useState(shouldShowGuideModal);
  const [guideClosing, setGuideClosing] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [draggedCategory, setDraggedCategory] = useState<RightHomeCategoryKey | null>(null);
  const [draggedDetailItem, setDraggedDetailItem] = useState<string | null>(null);
  const autoScrollFrameRef = useRef<number | null>(null);
  const autoScrollVelocityRef = useRef(0);
  const autoScrollContainerRef = useRef<HTMLElement | null>(null);
  const guideCloseTimerRef = useRef<number | null>(null);
  const [categoryOrder, setCategoryOrder] = useState<RightHomeCategoryKey[]>(defaultRightCategoryOrder);
  const [detailOrders, setDetailOrders] = useState<Record<RightHomeCategoryKey, string[]>>(defaultRightDetailOrders);
  const [storedOrderLoaded, setStoredOrderLoaded] = useState(false);
  const selected = selectedCategory
    ? rightHomeCategories.find((category) => category.key === selectedCategory)
    : null;
  const orderedCategories = categoryOrder
    .map((key) => rightHomeCategories.find((category) => category.key === key))
    .filter((category): category is (typeof rightHomeCategories)[number] => Boolean(category));
  const orderedDetailItems = selected
    ? detailOrders[selected.key]
        .map((label) => rightCategoryDetails[selected.key].find((item) => item.label === label))
        .filter((item): item is (typeof rightCategoryDetails)[RightHomeCategoryKey][number] => Boolean(item))
    : [];

  const stopAutoScroll = () => {
    autoScrollVelocityRef.current = 0;
    autoScrollContainerRef.current = null;

    if (autoScrollFrameRef.current !== null) {
      window.cancelAnimationFrame(autoScrollFrameRef.current);
      autoScrollFrameRef.current = null;
    }
  };

  const runAutoScroll = () => {
    const scrollContainer = autoScrollContainerRef.current;
    const velocity = autoScrollVelocityRef.current;

    if (!scrollContainer || velocity === 0) {
      stopAutoScroll();
      return;
    }

    scrollContainer.scrollTop += velocity;
    autoScrollFrameRef.current = window.requestAnimationFrame(runAutoScroll);
  };

  useEffect(() => () => {
    stopAutoScroll();

    if (guideCloseTimerRef.current !== null) {
      window.clearTimeout(guideCloseTimerRef.current);
    }
  }, []);

  useEffect(() => {
    const loadStoredOrderTimer = window.setTimeout(() => {
      try {
        const savedCategoryOrder = window.localStorage.getItem(RIGHT_CATEGORY_ORDER_STORAGE_KEY);
        const savedDetailOrders = window.localStorage.getItem(RIGHT_DETAIL_ORDERS_STORAGE_KEY);

        if (savedCategoryOrder) {
          setCategoryOrder(normalizeCategoryOrder(JSON.parse(savedCategoryOrder)));
        }

        if (savedDetailOrders) {
          setDetailOrders(normalizeDetailOrders(JSON.parse(savedDetailOrders)));
        }
      } catch {
        setCategoryOrder(defaultRightCategoryOrder);
        setDetailOrders(defaultRightDetailOrders);
      } finally {
        setStoredOrderLoaded(true);
      }
    }, 0);

    return () => window.clearTimeout(loadStoredOrderTimer);
  }, []);

  useEffect(() => {
    if (!storedOrderLoaded) return;

    window.localStorage.setItem(RIGHT_CATEGORY_ORDER_STORAGE_KEY, JSON.stringify(categoryOrder));
  }, [categoryOrder, storedOrderLoaded]);

  useEffect(() => {
    if (!storedOrderLoaded) return;

    window.localStorage.setItem(RIGHT_DETAIL_ORDERS_STORAGE_KEY, JSON.stringify(detailOrders));
  }, [detailOrders, storedOrderLoaded]);

  useEffect(() => {
    if (shouldShowGuideModal && !showGuideModal) {
      const showGuideTimer = window.setTimeout(() => setShowGuideModal(true), 0);
      return () => window.clearTimeout(showGuideTimer);
    }
  }, [shouldShowGuideModal, showGuideModal]);

  useEffect(() => {
    if (showGuideModal) {
      onGuideShown();
    }
  }, [showGuideModal, onGuideShown]);

  const moveCategory = (sourceKey: RightHomeCategoryKey, targetKey: RightHomeCategoryKey) => {
    if (sourceKey === targetKey) return;

    setCategoryOrder((currentOrder) => {
      const sourceIndex = currentOrder.indexOf(sourceKey);
      const targetIndex = currentOrder.indexOf(targetKey);
      if (sourceIndex < 0 || targetIndex < 0) return currentOrder;

      const nextOrder = [...currentOrder];
      const [movedKey] = nextOrder.splice(sourceIndex, 1);
      nextOrder.splice(targetIndex, 0, movedKey);
      return nextOrder;
    });
  };

  const moveDetailItem = (categoryKey: RightHomeCategoryKey, sourceLabel: string, targetLabel: string) => {
    if (sourceLabel === targetLabel) return;

    setDetailOrders((currentOrders) => {
      const currentOrder = currentOrders[categoryKey];
      const sourceIndex = currentOrder.indexOf(sourceLabel);
      const targetIndex = currentOrder.indexOf(targetLabel);
      if (sourceIndex < 0 || targetIndex < 0) return currentOrders;

      const nextOrder = [...currentOrder];
      const [movedLabel] = nextOrder.splice(sourceIndex, 1);
      nextOrder.splice(targetIndex, 0, movedLabel);
      return {
        ...currentOrders,
        [categoryKey]: nextOrder,
      };
    });
  };

  const autoScrollDuringDrag = (event: DragEvent<HTMLElement>) => {
    const scrollContainer = event.currentTarget.closest('.sh-scroll') as HTMLElement | null;
    if (!scrollContainer) return;

    const rect = scrollContainer.getBoundingClientRect();
    const topEdgeSize = 44;
    const bottomEdgeSize = 20;
    const maxVelocity = 4.6;
    const distanceFromTop = event.clientY - rect.top;
    const distanceFromBottom = rect.bottom - event.clientY;
    let nextVelocity = 0;

    if (distanceFromTop < topEdgeSize) {
      const intensity = (topEdgeSize - distanceFromTop) / topEdgeSize;
      nextVelocity = -Math.max(0.6, maxVelocity * intensity);
    } else if (distanceFromBottom < bottomEdgeSize) {
      const intensity = (bottomEdgeSize - distanceFromBottom) / bottomEdgeSize;
      nextVelocity = Math.max(0.6, maxVelocity * intensity);
    }

    if (nextVelocity === 0) {
      stopAutoScroll();
      return;
    }

    autoScrollContainerRef.current = scrollContainer;
    autoScrollVelocityRef.current = nextVelocity;

    if (autoScrollFrameRef.current === null) {
      autoScrollFrameRef.current = window.requestAnimationFrame(runAutoScroll);
    }
  };

  const handleDragStart = (event: DragEvent<HTMLButtonElement>, key: RightHomeCategoryKey) => {
    if (!editMode || selected) return;

    setDraggedCategory(key);
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/plain', key);
  };

  const handleDragOver = (event: DragEvent<HTMLButtonElement>) => {
    if (!editMode) return;

    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
    autoScrollDuringDrag(event);
  };

  const handleScrollAreaDragOver = (event: DragEvent<HTMLDivElement>) => {
    if (!editMode) return;

    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
    autoScrollDuringDrag(event);
  };

  const handleDrop = (event: DragEvent<HTMLButtonElement>, targetKey: RightHomeCategoryKey) => {
    if (!editMode) return;

    event.preventDefault();
    const sourceKey = (event.dataTransfer.getData('text/plain') || draggedCategory) as RightHomeCategoryKey | null;
    if (sourceKey) moveCategory(sourceKey, targetKey);
    setDraggedCategory(null);
    stopAutoScroll();
  };

  const handleDetailDragStart = (event: DragEvent<HTMLButtonElement>, label: string) => {
    if (!editMode || !selected) return;

    setDraggedDetailItem(label);
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/plain', label);
  };

  const handleDetailDrop = (event: DragEvent<HTMLButtonElement>, targetLabel: string) => {
    if (!editMode || !selected) return;

    event.preventDefault();
    const sourceLabel = event.dataTransfer.getData('text/plain') || draggedDetailItem;
    if (sourceLabel) moveDetailItem(selected.key, sourceLabel, targetLabel);
    setDraggedDetailItem(null);
    stopAutoScroll();
  };

  const closeGuideModal = (categoryKey: RightHomeCategoryKey | null) => {
    setGuideClosing(true);

    guideCloseTimerRef.current = window.setTimeout(() => {
      setShowGuideModal(false);
      setGuideClosing(false);

      if (categoryKey) {
        setEditMode(false);
        setSelectedCategory(categoryKey);
      }
    }, 520);
  };

  const handleGuideSelect = (categoryKey: RightHomeCategoryKey | null) => {
    if (guideClosing) return;
    closeGuideModal(categoryKey);
  };

  const handleGuideDismissPermanently = () => {
    if (guideClosing) return;
    onGuideDismissPermanently();
    closeGuideModal(null);
  };

  return (
    <>
      <div className="sh-statusbar right-home-statusbar">
        <span className="sh-statusbar-time">6:48</span>
        <div className="sh-statusbar-right">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2a2a3a" strokeWidth="2"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><circle cx="12" cy="20" r="1" fill="#2a2a3a"/></svg>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2a2a3a" strokeWidth="2"><rect x="1" y="6" width="18" height="12" rx="2"/><path d="M23 13v-2" strokeLinecap="round"/></svg>
        </div>
      </div>

      <div className="right-home-header">
        {selected ? (
          <button
            className="right-home-back-btn"
            aria-label="홈으로 돌아가기"
            onClick={() => {
              setEditMode(false);
              setSelectedCategory(null);
            }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18 9 12l6-6" />
            </svg>
          </button>
        ) : null}
        <span className="right-home-title">{selected?.title ?? 'Samsung Health'}</span>
        <div className="right-home-actions">
          <button className="sh-profile-btn" aria-label="프로필">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          </button>
          <button
            className="sh-more-btn right-home-more-btn"
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
        <div className="sh-home-menu-panel" role="menu" aria-label="홈 더보기 메뉴" aria-hidden={!menuOpen}>
          {homeMenuItems.map((item, i) => (
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

      {selected ? (
        <div className="sh-scroll home-scroll right-category-detail-scroll" onDragOver={handleScrollAreaDragOver}>
          <section className={`right-category-hero right-category-hero-${selected.tone}`}>
            <span className="right-category-label">{selected.title}</span>
            <strong>{selected.subtitle}</strong>
            <p>더 많은 정보를 한 곳에서 확인하고 필요한 기록으로 바로 이동하세요.</p>
          </section>

          <section className="right-detail-list" aria-label={`${selected.title} 상세 정보`}>
            {orderedDetailItems.map((item) => (
              <button
                key={item.label}
                className={`right-detail-row${editMode ? ' right-detail-row-editing' : ''}${draggedDetailItem === item.label ? ' dragging' : ''}`}
                draggable={editMode}
                onDragStart={(event) => handleDetailDragStart(event, item.label)}
                onDragOver={handleDragOver}
                onDrop={(event) => handleDetailDrop(event, item.label)}
                onDragEnd={() => {
                  setDraggedDetailItem(null);
                  stopAutoScroll();
                }}
              >
                {editMode ? (
                  <span className="right-edit-select" aria-hidden="true" />
                ) : (
                  <RightDetailIcon label={item.label} />
                )}
                <span className="right-detail-copy">
                  <strong>{item.label}</strong>
                  <small>{item.meta}</small>
                </span>
                <span className="right-detail-value">{item.value}</span>
                {editMode && <span className="right-drag-handle" aria-hidden="true">↕</span>}
              </button>
            ))}
          </section>
        </div>
      ) : (
        <div className="sh-scroll home-scroll right-home-scroll" onDragOver={handleScrollAreaDragOver}>
          <section className="right-category-grid" aria-label="건강 정보 카테고리">
            {orderedCategories.map((category) => (
              <button
                key={category.key}
                className={`right-category-card right-category-card-${category.tone}${editMode ? ' right-category-card-editing' : ''}${draggedCategory === category.key ? ' dragging' : ''}`}
                draggable={editMode}
                onClick={() => {
                  if (editMode) return;
                  setSelectedCategory(category.key);
                }}
                onDragStart={(event) => handleDragStart(event, category.key)}
                onDragOver={handleDragOver}
                onDrop={(event) => handleDrop(event, category.key)}
                onDragEnd={() => {
                  setDraggedCategory(null);
                  stopAutoScroll();
                }}
              >
                <div className="right-category-card-head">
                  {editMode && <span className="right-edit-select" aria-hidden="true" />}
                  <div>
                    <strong>{category.title}</strong>
                    <span>{category.subtitle}</span>
                  </div>
                  <span className={editMode ? 'right-drag-handle' : 'right-category-arrow'} aria-hidden="true">
                    {editMode ? '↕' : '›'}
                  </span>
                </div>
                <div className="right-category-summary">
                  {category.highlights.map((item) => (
                    <span key={item.label}>
                      <small>{item.label}</small>
                      <strong>{item.value}</strong>
                      <em>{item.meta}</em>
                    </span>
                  ))}
                </div>
              </button>
            ))}
          </section>
        </div>
      )}

      <button
        type="button"
        className={`sh-edit-home sh-edit-home-floating${editMode ? ' editing' : ''}`}
        onClick={() => setEditMode((current) => !current)}
      >
        {editMode ? '편집 완료' : '홈 화면 편집'}
      </button>

      {showGuideModal && !selected && !editMode && (
        <div
          className={`right-guide-modal-layer${guideClosing ? ' closing' : ''}`}
          role="dialog"
          aria-modal="true"
          aria-label="삼성 헬스 둘러보기"
        >
          <div className="right-guide-modal">
            <div className="right-guide-modal-icon" aria-hidden="true">🌿</div>
            <h2>삼성 헬스 둘러보기</h2>
            <p>어떤 기능부터 사용해보시겠어요?</p>
            <div className="right-guide-options">
              <button type="button" onClick={() => handleGuideSelect('life')}>
                <span>걸음 수 확인하기</span>
                <strong>생활</strong>
              </button>
              <button type="button" onClick={() => handleGuideSelect('life')}>
                <span>수면 기록 확인하기</span>
                <strong>생활</strong>
              </button>
              <button type="button" onClick={() => handleGuideSelect('exercise')}>
                <span>운동 기록 확인하기</span>
                <strong>운동</strong>
              </button>
            </div>
            <button type="button" className="right-guide-later-btn" onClick={() => handleGuideSelect(null)}>
              나중에 보기
            </button>
            <button type="button" className="right-guide-never-btn" onClick={handleGuideDismissPermanently}>
              다시 보지 않기
            </button>
          </div>
        </div>
      )}
    </>
  );
}

/* ───────── 메인 앱 콘텐츠 ───────── */
const DEFAULT_NAV: Record<MainScreen, number> = { home: 0, together: 1, discover: 2, fitness: 3 };

function SamsungHealthContent({
  defaultScreen = 'home',
  phoneSide,
}: {
  defaultScreen?: MainScreen;
  phoneSide: PhoneSide;
}) {
  const [screen, setScreen] = useState<AppScreen>(defaultScreen);
  const [previousScreen, setPreviousScreen] = useState<MainScreen>(defaultScreen);
  const [activeTab, setActiveTab] = useState(0);
  const [activeNav, setActiveNav] = useState(DEFAULT_NAV[defaultScreen]);
  const [rightGuideShown, setRightGuideShown] = useState(false);
  const [rightGuideDismissed, setRightGuideDismissed] = useState(false);
  const [rightGuidePreferenceLoaded, setRightGuidePreferenceLoaded] = useState(false);

  useEffect(() => {
    const loadGuidePreferenceTimer = window.setTimeout(() => {
      setRightGuideDismissed(window.localStorage.getItem(RIGHT_GUIDE_DISMISSED_STORAGE_KEY) === 'true');
      setRightGuidePreferenceLoaded(true);
    }, 0);

    return () => window.clearTimeout(loadGuidePreferenceTimer);
  }, []);

  const handleNavClick = (i: number) => {
    setActiveNav(i);
    if (i === 0) setScreen('home');
    else if (i === 1) setScreen('together');
    else if (i === 2) setScreen('discover');
    else if (i === 3) setScreen('fitness');
  };

  const handleScanClick = () => {
    if (screen !== 'quickAdd') {
      setPreviousScreen(screen);
    }
    setScreen('quickAdd');
  };

  const handleQuickAddBack = () => {
    setScreen(previousScreen);
    setActiveNav(DEFAULT_NAV[previousScreen]);
  };

  const handleRightGuideDismissPermanently = () => {
    setRightGuideDismissed(true);
    window.localStorage.setItem(RIGHT_GUIDE_DISMISSED_STORAGE_KEY, 'true');
  };

  return (
    <>
      <div className={`sh-screen${screen !== 'home' ? ` sh-screen-${screen}` : ''}`}>
        {phoneSide === 'right' && screen === 'home' && (
          <RightHomeContent
            shouldShowGuideModal={rightGuidePreferenceLoaded && !rightGuideShown && !rightGuideDismissed}
            onGuideShown={() => setRightGuideShown(true)}
            onGuideDismissPermanently={handleRightGuideDismissPermanently}
          />
        )}
        {phoneSide === 'left' && screen === 'home' && (
          <HomeContent activeTab={activeTab} setActiveTab={setActiveTab} phoneSide={phoneSide} />
        )}
        {screen === 'together' && <TogetherContent />}
        {screen === 'discover' && <DiscoverContent />}
        {screen === 'fitness' && <FitnessContent />}
        {screen === 'quickAdd' && <QuickAddContent onBack={handleQuickAddBack} />}
      </div>

      {screen !== 'quickAdd' && (
        <BottomTabBar
          activeNav={activeNav}
          onNavClick={handleNavClick}
          onScanClick={handleScanClick}
          variant="floating"
          floatingTheme={screen === 'fitness' ? 'fitness' : screen === 'home' ? 'home' : screen === 'together' ? 'together' : 'discover'}
        />
      )}
    </>
  );
}

function PhoneMockup({
  defaultScreen = 'home',
  side,
}: {
  defaultScreen?: MainScreen;
  side: PhoneSide;
}) {
  return (
    <div className={`desktop-phone-wrap phone-${side}`}>
      <div className="desktop-phone-glow" />
      <div className="d-phone">
        <div className="d-phone-island">
          <div className="d-phone-island-cam" />
        </div>
        <div className="d-phone-screen">
          <SamsungHealthContent defaultScreen={defaultScreen} phoneSide={side} />
        </div>
      </div>
    </div>
  );
}

function PhoneArrowDivider() {
  return (
    <div className="phones-divider">
      <div className="phones-arrow" aria-hidden="true">
        <span className="phones-arrow-shaft" />
        <span className="phones-arrow-head">&gt;</span>
      </div>
      <span className="phones-arrow-label">After</span>
    </div>
  );
}

export default function AppView() {
  return (
    <div className="app-shell">
      <div className="phones-row">
        <PhoneMockup defaultScreen="home" side="left" />
        <PhoneArrowDivider />
        <PhoneMockup defaultScreen="home" side="right" />
      </div>
    </div>
  );
}
