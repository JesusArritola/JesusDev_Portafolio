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
  const [activeSection, setActiveSection] = useState('home');

  const sectionIds = navigation.map((n) => n.id);
  const scrollSpyActive = useScrollSpy(sectionIds);
  const { open: menuOpen, toggleMenu, closeMenu } = useMobileMenu();
  useKeyboardNavigation({ onEscape: closeMenu });

  useEffect(() => {
    setActiveSection(scrollSpyActive);
  }, [scrollSpyActive]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const handleNavigate = (id) => {
    setActiveSection(id);
    closeMenu();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <Head>
        <title>JesusDev | Jesús Arritola — Portafolio de Automatización e IA</title>
        <meta name="description" content="JesusDev es el portafolio de Jesús Arritola: automatización con IA, n8n, agentes inteligentes, desarrollo web y lead generation para negocios." />
        <meta name="keywords" content="JesusDev, Jesús Arritola, Jesús Portafolio, JesusDev Portafolio, jesusdev-portafolio.vercel.app, automatización con IA, agentes IA, n8n, desarrollo web, lead generation" />
        <meta name="author" content="Jesús Miguel Arritola Alonso" />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <meta name="language" content="es" />
        <meta name="googlebot" content="index, follow" />

        <meta property="og:title" content="JesusDev | Jesús Arritola — Portafolio de Automatización e IA" />
        <meta property="og:description" content="Conoce el trabajo de Jesús Arritola en automatización con IA, agentes inteligentes, desarrollo web y lead generation." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://jesusdev-portafolio.vercel.app" />
        <meta property="og:image" content="/ScreenShoots/_FOTOS_NANO_BANANA.png" />
        <meta property="og:site_name" content="Jesús Arritola Portfolio" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Jesús Arritola - Portafolio Profesional" />
        <meta name="twitter:description" content="Automatización con IA y n8n. Transforma tu negocio." />
        <meta name="twitter:image" content="/ScreenShoots/_FOTOS_NANO_BANANA.png" />

        <meta name="theme-color" content="#00f7ff" />
        <meta name="msapplication-TileColor" content="#080808" />

        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="canonical" href="https://jesusdev-portafolio.vercel.app/" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Jesús Miguel Arritola Alonso',
              alternateName: ['JesusDev', 'Jesús Arritola'],
              url: 'https://jesusdev-portafolio.vercel.app/',
              jobTitle: 'Especialista en automatización con IA',
              description: 'Especialista en automatización de procesos con IA, agentes inteligentes, n8n y desarrollo web.',
              knowsAbout: ['Automatización con IA', 'n8n', 'Agentes IA', 'Desarrollo web', 'Lead generation'],
              sameAs: [
                'https://jesusdev-portafolio.vercel.app/'
              ]
            })
          }}
        />
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
