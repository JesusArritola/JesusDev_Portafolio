'use client';

import Image from 'next/image';
import { useState, useCallback } from 'react';
import { validateProjectsData } from '@/lib/validations/projects';
import projectsData from '@/data/projects.json';

const validatedProjects = validateProjectsData(projectsData);

export default function ProjectsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [expandedCategories, setExpandedCategories] = useState({});
  const [selectedProject, setSelectedProject] = useState(null);

  const goTo = useCallback((index) => {
    const clamped = Math.max(0, Math.min(validatedProjects.length - 1, index));
    setCurrentIndex(clamped);
    setExpandedCategories({});
  }, []);

  const next = useCallback(() => goTo(currentIndex + 1), [currentIndex, goTo]);
  const prev = useCallback(() => goTo(currentIndex - 1), [currentIndex, goTo]);

  const toggleExpand = useCallback((index) => {
    setExpandedCategories((prev) => ({ ...prev, [index]: !prev[index] }));
  }, []);

  const isExpanded = (index) => !!expandedCategories[index];

  const projectCategories = validatedProjects;

  return (
    <section
      id="projects"
      className="min-h-[80vh] bg-[#101010] px-9 py-20 scroll-mt-20"
      style={{ perspective: '2000px' }}
    >
      <h2 className="text-4xl font-bold text-center mt-20">
        Mis <span className="text-[#00f7ff]">Proyectos</span>
      </h2>
      <div className="text-center mt-4">
        <p className="text-2xl text-[#00f7ff] font-bold">
          Trabajos de Automatización de Procesos mediante IA y n8n
        </p>
        <p className="text-lg text-white/60 mt-3 flex flex-wrap justify-center gap-4 items-center">
          <span className="text-white/60">Algunas Tecnologías usadas:</span>
          <span className="flex items-center gap-1">
            <span className="text-[#00f7ff]">n8n</span>
            <Image src="/icon-n8n.png" alt="n8n" width={20} height={20} title="n8n" />
          </span>
          <span className="flex items-center gap-1">
            <span className="text-[#00f7ff]">LangChain</span>
            <Image src="/icon-langchain.png" alt="LangChain" width={20} height={20} title="LangChain" />
          </span>
          <span className="flex items-center gap-1">
            <span className="text-[#00f7ff]">OpenAI</span>
            <Image src="/icon-openai.png" alt="OpenAI" width={20} height={20} title="OpenAI" />
          </span>
          <span className="flex items-center gap-1">
            <span className="text-[#00f7ff]">Google Gemini</span>
            <Image src="/icon-gemini.png" alt="Google Gemini" width={20} height={20} title="Google Gemini" />
          </span>
          <span className="flex items-center gap-1">
            <span className="text-[#00f7ff]">Telegram</span>
            <Image src="/icon-telegram-tech.png" alt="Telegram" width={20} height={20} title="Telegram" />
          </span>
          <span className="flex items-center gap-1">
            <span className="text-[#00f7ff]">Gmail</span>
            <Image src="/icon-gmail.png" alt="Gmail" width={20} height={20} title="Gmail" />
          </span>
          <span className="flex items-center gap-1">
            <span className="text-[#00f7ff]">Google Sheets</span>
            <Image src="/icon-sheets.png" alt="Google Sheets" width={20} height={20} title="Google Sheets" />
          </span>
          <span className="flex items-center gap-1">
            <span className="text-[#00f7ff]">Stripe</span>
            <Image src="/icon-stripe.png" alt="Stripe" width={20} height={20} title="Stripe" />
          </span>
          <span className="flex items-center gap-1">
            <span className="text-[#00f7ff]">Webhooks</span>
            <Image src="/icon-webhook.png" alt="Webhooks" width={20} height={20} title="Webhooks" />
          </span>
          <span className="flex items-center gap-1">
            <span className="text-[#00f7ff]">APIs</span>
            <Image src="/icon-apis.png" alt="APIs" width={20} height={20} title="APIs" />
          </span>
        </p>
      </div>

      <div className="mt-16">
        <div className="relative w-full" style={{ perspective: '2000px' }}>
          <div className="flex items-center justify-center min-h-[400px]">
            {projectCategories.map((cat, catIndex) => {
              const offset = catIndex - currentIndex;
              const isActive = offset === 0;
              const isPrev = offset === -1;
              const isNext = offset === 1;
              const isVisible = Math.abs(offset) <= 1;

              if (!isVisible) return null;

              const displayProjects = isExpanded(catIndex)
                ? cat.projects
                : cat.projects.slice(0, 2);

              return (
                <div
                  key={catIndex}
                  className="absolute transition-all duration-700 ease-out"
                  style={{
                    transform: isActive
                      ? 'translateX(0) scale(1) rotateY(0deg)'
                      : isPrev
                      ? 'translateX(-280px) scale(0.85) rotateY(8deg)'
                      : 'translateX(280px) scale(0.85) rotateY(-8deg)',
                    opacity: 1,
                    width: 'auto',
                    maxWidth: isActive ? '90vw' : '400px',
                    filter: isActive ? 'blur(0)' : 'blur(2px)',
                    boxShadow: !isActive
                      ? `0 0 40px rgba(0, 247, 255, ${isPrev || isNext ? 0.15 : 0})`
                      : '0 0 60px rgba(0, 247, 255, 0.3)',
                    zIndex: isActive ? 20 : isPrev || isNext ? 10 : 0,
                  }}
                >
                  <div
                    className={`bg-[#080808] rounded-2xl p-6 border border-[#00f7ff]/20 transition-all duration-500 ${
                      isExpanded(catIndex) ? 'max-h-[70vh] overflow-y-auto' : ''
                    }`}
                  >
                    <h3 className="text-2xl font-bold text-white border-l-4 border-[#00f7ff] pl-4 mb-6">
                      {cat.category}
                    </h3>
                    <div
                      className={`grid gap-3 ${
                        isExpanded(catIndex)
                          ? 'grid-cols-3 lg:grid-cols-4'
                          : 'grid-cols-2'
                      }`}
                    >
                      {displayProjects.map((project, index) => (
                        <div
                          key={index}
                          className={`project-card group relative overflow-hidden rounded-xl bg-[#101010] cursor-pointer ${
                            isExpanded(catIndex) ? 'h-36' : 'h-48'
                          }`}
                          onClick={() => setSelectedProject(project)}
                        >
                          <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                            className="w-full h-full object-contain group-hover:scale-110 transition-all duration-500"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col justify-end items-center p-2 opacity-0 group-hover:opacity-100 transition">
                            <h4 className="text-sm font-bold text-white text-center leading-tight">
                              {project.title}
                            </h4>
                          </div>
                        </div>
                      ))}
                    </div>
                    {cat.projects.length > 2 && (
                      <div className="flex justify-center mt-6">
                        <button
                          onClick={() => toggleExpand(catIndex)}
                          className="px-6 py-2 bg-[#00f7ff] text-black font-semibold rounded-full hover:scale-105 transition text-sm"
                        >
                          {isExpanded(catIndex)
                            ? 'Ver menos'
                            : `Ver más (${cat.projects.length - 2})`}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <button
            onClick={prev}
            disabled={currentIndex === 0}
            aria-label="Categoría anterior"
            className="absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 bg-[#00f7ff] rounded-full flex items-center justify-center text-black disabled:opacity-30 disabled:cursor-not-allowed hover:scale-110 transition z-20"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={next}
            disabled={currentIndex === projectCategories.length - 1}
            aria-label="Categoría siguiente"
            className="absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 bg-[#00f7ff] rounded-full flex items-center justify-center text-black disabled:opacity-30 disabled:cursor-not-allowed hover:scale-110 transition z-20"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div className="flex justify-center gap-3 mt-8">
            {projectCategories.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Ver categoría ${i + 1}`}
                className={`w-4 h-4 rounded-full transition focus:outline-none focus:ring-2 focus:ring-[#00f7ff] ${
                  i === currentIndex ? 'bg-[#00f7ff]' : 'bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </section>
  );
}

function ProjectModal({ project, onClose }) {
  const [docData, setDocData] = useState({
    description: '',
    howItWorks: '',
    impacto: '',
    stack: '',
    loading: true,
  });

  useEffect(() => {
    const fetchData = async () => {
      setDocData((prev) => ({ ...prev, loading: true }));
      try {
        const slug = project.title.replace(/\s+/g, '_');
        const res = await fetch(`/api/json/${encodeURIComponent(slug)}`);
        if (res.ok) {
          const data = await res.json();
          setDocData({
            description: data.description || '',
            howItWorks: data.howItWorks || '',
            impacto: data.impacto || '',
            stack: data.stack || '',
            loading: false,
          });
        }
      } catch {
        setDocData((prev) => ({ ...prev, loading: false }));
      }
    };
    fetchData();
  }, [project]);

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div
        className="bg-[#080808] rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-[#00f7ff]/20"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-bold text-white">{project.title}</h2>
          <button onClick={onClose} aria-label="Cerrar modal" className="text-white/60 hover:text-white text-2xl">
            ×
          </button>
        </div>
        {project.image && (
          <div className="mb-4 rounded-xl overflow-hidden border border-[#00f7ff]/20">
            <Image
              src={project.image}
              alt={project.title}
              width={800}
              height={400}
              className="w-full h-80 object-contain"
            />
          </div>
        )}
        {docData.loading ? (
          <p className="text-[#00f7ff]">Cargando...</p>
        ) : (
          <div className="space-y-4 text-white/80">
            <div>
              <h4 className="text-[#00f7ff] font-semibold">Descripción</h4>
              <p>{docData.description || project.description}</p>
            </div>
            {docData.howItWorks && (
              <div>
                <h4 className="text-[#00f7ff] font-semibold">Cómo funciona</h4>
                <p className="whitespace-pre-line">{docData.howItWorks}</p>
              </div>
            )}
            {docData.impacto && (
              <div>
                <h4 className="text-[#00f7ff] font-semibold">Impacto</h4>
                <p className="whitespace-pre-line">{docData.impacto}</p>
              </div>
            )}
            {docData.stack && (
              <div>
                <h4 className="text-[#00f7ff] font-semibold">Tecnologías</h4>
                <p>{docData.stack}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}