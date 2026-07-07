'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import '@/styles/navbar.css';

const navLinks = [
  { href: '#features', label: '기능' },
  { href: '#stats', label: '성과' },
  { href: '#testimonials', label: '후기' },
  { href: '#contact', label: '문의' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = () => setMenuOpen(false);

  return (
    <>
      <header className={`navbar${scrolled ? ' scrolled' : ''}`}>
        <div className="navbar-inner">
          <Link href="/" className="navbar-logo">
            <div className="navbar-logo-icon">M</div>
            <span>MEP</span>
          </Link>

          <nav aria-label="메인 네비게이션">
            <ul className="navbar-links">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="navbar-actions">
            <a href="#" className="btn-ghost">로그인</a>
            <a href="#contact" className="btn-primary">시작하기</a>
          </div>

          <button
            className={`hamburger${menuOpen ? ' open' : ''}`}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="메뉴 열기"
            aria-expanded={menuOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      <nav className={`mobile-menu${menuOpen ? ' open' : ''}`} aria-label="모바일 네비게이션">
        {navLinks.map((link) => (
          <a key={link.href} href={link.href} onClick={handleNavClick}>
            {link.label}
          </a>
        ))}
        <div className="divider" />
        <a href="#" onClick={handleNavClick}>로그인</a>
        <a href="#contact" className="btn-primary" style={{ textAlign: 'center' }} onClick={handleNavClick}>
          시작하기
        </a>
      </nav>
    </>
  );
}
