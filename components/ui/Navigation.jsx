'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function Navigation({ activeSection, onSectionChange, mobileMenuOpen, onMobileMenuToggle }) {
  const navItems = [
    { id: 'home', label: 'Inicio' },
    { id: 'about', label: 'Acerca de Mí' },
    { id: 'projects', label: 'Proyectos' },
    { id: 'web-development', label: 'Desarrollo Web' },
    { id: 'skills', label: 'Habilidades' },
    { id: 'contact', label: 'Contacto' },
  ];

  const handleClick = (id) => {
    onSectionChange(id);
    if (mobileMenuOpen) onMobileMenuToggle();
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full px-4 md:px-9 py-3 md:py-4 bg-[#080808]/95 backdrop-blur-sm flex justify-between items-center z-50">
        <a href="#" className="text-xl md:text-2xl font-bold text-white">
          <span className="text-[#00f7ff]">Jesús</span>
          <span className="text-[#00f7ff] animate-pulse">_</span>
          <span className="text-[#00f7ff]">Dev</span>
          {' '}
          <span className="text-white hidden md:inline">Portfolio</span>
          <span className="text-[#00f7ff] animate-pulse">.</span>
        </a>

        <button
          onClick={onMobileMenuToggle}
          aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
          className="md:hidden text-white p-2 min-w-[48px] min-h-[48px] flex items-center justify-center"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        <nav className="hidden md:flex gap-6 lg:gap-10">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                handleClick(item.id);
              }}
              className={`nav-link text-sm lg:text-base ${activeSection === item.id ? 'active text-[#00f7ff]' : 'text-white hover:text-[#00f7ff]'} transition`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {mobileMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-[#080808]/98 border-b border-[#00f7ff]/20 md:hidden">
            <nav className="flex flex-col p-4 gap-2">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleClick(item.id);
                  }}
                  className={`py-2 px-4 rounded-lg ${activeSection === item.id ? 'bg-[#00f7ff]/20 text-[#00f7ff]' : 'text-white hover:bg-white/10'}`}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        )}
      </header>
    </>
  );
}