import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useScrollSpy, useMobileMenu, useKeyboardNavigation } from '@/hooks/usePortfolio';

import Header from '@/components/Header';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Projects from '@/components/Projects';
import WebDevelopment from '@/components/WebDevelopment';
import Skills from '@/components/sections/Skills';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/Footer';

const navigation = [
  { id: 'home', label: 'Inicio' },
  { id: 'about', label: 'Acerca de Mí' },
  { id: 'projects', label: 'Proyectos' },
  { id: 'web-development', label: 'Desarrollo Web' },
  { id: 'skills', label: 'Habilidades' },
  { id: 'contact', label: 'Contacto' },
];

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const sectionIds = navigation.map((n) => n.id);
  const scrollSpyActive = useScrollSpy(sectionIds);
  const { open: menuOpen, toggle: toggleMenu, close: closeMenu } = useMobileMenu();
  useKeyboardNavigation({ onEscape: closeMenu });

  useEffect(() => {
    setActiveSection(scrollSpyActive);
  }, [scrollSpyActive]);

  const handleNavigate = (id) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <Head>
        <title>Jesús Arritola - Portafolio Profesional | Automatización con IA</title>
        <meta name="description" content="Especialista en automatización de procesos con IA. Desarrollo flujos de trabajo con n8n, chatbots, lead generation y más. Transforma tu negocio con soluciones 24/7." />
        <meta name="keywords" content="automatización, IA, n8n, chatbot, telegram, WhatsApp, lead generation, workflows, AI, artificial intelligence, automatización de procesos, developer, freelancer" />
        <meta name="author" content="Jesús Arritola" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="Spanish" />

        <meta property="og:title" content="Jesús Arritola - Portafolio Profesional | Automatización con IA" />
        <meta property="og:description" content="Especialista en automatización de procesos con IA. Desarrollo flujos de trabajo con n8n, chatbots, lead generation y más." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://jesus-arritola-portafolio.vercel.app" />
        <meta property="og:image" content="/ScreenShoots/_FOTOS_NANO_BANANA.png" />
        <meta property="og:site_name" content="Jesús Arritola Portfolio" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Jesús Arritola - Portafolio Profesional" />
        <meta name="twitter:description" content="Automatización con IA y n8n. Transforma tu negocio." />
        <meta name="twitter:image" content="/ScreenShoots/_FOTOS_NANO_BANANA.png" />

        <meta name="theme-color" content="#00f7ff" />
        <meta name="msapplication-TileColor" content="#080808" />

        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="canonical" href="https://jesus-arritola-portafolio.vercel.app" />
      </Head>

      <Header
        activeSection={activeSection}
        mobileMenuOpen={menuOpen}
        onToggleMenu={toggleMenu}
        onNavigate={handleNavigate}
        navigation={navigation}
      />

<main className="pt-16">
        <Hero />
        <About />
        <Projects />
        <WebDevelopment />
        <Skills />
        <Contact />
      </main>

      <Footer />
    </>
  );
}