'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Header({ activeSection, mobileMenuOpen, onToggleMenu, onNavigate, navigation }) {
  const [internalMenuOpen, setInternalMenuOpen] = useState(false);
  const isMenuOpen = typeof onToggleMenu === 'function' && typeof mobileMenuOpen === 'boolean'
    ? mobileMenuOpen
    : internalMenuOpen;

  const handleMenuToggle = () => {
    if (typeof onToggleMenu === 'function') {
      onToggleMenu();
      return;
    }
    setInternalMenuOpen((open) => !open);
  };

  return (
    <header className="fixed top-0 left-0 w-full px-4 md:px-9 py-3 md:py-4 bg-[#080808]/95 backdrop-blur-sm flex justify-between items-center z-50">
      <Link href="#" className="text-xl md:text-2xl font-bold text-white">
        <span className="text-[#00f7ff]">Jesús</span>
        <span className="text-[#00f7ff] animate-pulse">_</span>
        <span className="text-[#00f7ff]">Dev</span>{' '}
        <span className="text-white hidden md:inline">Portfolio</span>
        <span className="text-[#00f7ff] animate-pulse">.</span>
      </Link>

      <button
        type="button"
        onClick={handleMenuToggle}
        aria-expanded={isMenuOpen}
        aria-controls="mobile-navigation"
        aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
        className="relative z-10 md:hidden text-white p-2 min-w-[48px] min-h-[48px] flex items-center justify-center"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {isMenuOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      <nav className="hidden md:flex gap-6 lg:gap-10">
        {navigation.map((item) => (
          <Link
            key={item.id}
            href={`#${item.id}`}
            onClick={(e) => {
              e.preventDefault();
              onNavigate(item.id);
            }}
            className={`nav-link text-sm lg:text-base transition ${
              activeSection === item.id ? 'active text-[#00f7ff]' : 'text-white hover:text-[#00f7ff]'
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      {isMenuOpen && (
        <>
          <button
            type="button"
            aria-label="Cerrar menú"
            onClick={handleMenuToggle}
            className="absolute inset-x-0 top-full h-screen bg-black/50 md:hidden"
          />
          <div
            id="mobile-navigation"
            role="dialog"
            aria-label="Navegación principal"
            className="absolute top-full left-0 w-full border-b border-[#00f7ff]/20 bg-[#080808] shadow-lg md:hidden"
          >
            <nav className="flex flex-col gap-2 p-4" aria-label="Navegación móvil">
              {navigation.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(event) => {
                    event.preventDefault();
                    onNavigate(item.id);
                  }}
                  className={`rounded-lg px-4 py-3 ${
                    activeSection === item.id ? 'bg-[#00f7ff]/20 text-[#00f7ff]' : 'text-white hover:bg-white/10'
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </>
      )}
    </header>
  );
}
