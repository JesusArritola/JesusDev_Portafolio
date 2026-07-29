'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function About() {
  const [activeModal, setActiveModal] = useState(null);

  const closeModal = () => setActiveModal(null);
  const openCV = () => setActiveModal('cv');
  const openLetter = () => setActiveModal('letter');
  const stopPropagation = (e) => e.stopPropagation();

  const downloadFile = (url, filename) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
    <section id="about" className="min-h-screen bg-[#080808] px-9 py-20 flex items-center scroll-mt-20">
      <div className="max-w-6xl mx-auto w-full">
        <h2 className="text-4xl font-bold text-center mb-12">
          Acerca de <span className="text-[#00f7ff]">Mí</span>
        </h2>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col items-center justify-center">
            <div className="relative w-[300px] h-[300px] rounded-full overflow-hidden border-4 border-[#00f7ff] shadow-[0_0_40px_#00f7ff]">
              <Image
                src="/Landing_image.png"
                alt="Jesús Arritola"
                width={300}
                height={300}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="mt-6 flex flex-col sm:flex-row gap-4">
              <button
                onClick={openCV}
                className="inline-block px-6 py-3 bg-[#00f7ff] text-black font-bold rounded-lg hover:brightness-110 hover:scale-105 transition-all duration-300"
              >
                Ver CV
              </button>
              <button
                onClick={openLetter}
                className="inline-block px-6 py-3 bg-transparent border-2 border-[#00f7ff] text-[#00f7ff] font-bold rounded-lg hover:bg-[#00f7ff] hover:text-black transition-all duration-300"
              >
                Ver Carta de Recomendación
              </button>
            </div>
          </div>
          <div className="space-y-8">
            <div />
            <div className="space-y-4 text-white/80 text-lg leading-relaxed">
              <p>
                Soy <span className="text-[#00f7ff] font-semibold">Jesús Miguel Arritola Alonso</span>, Ingeniero en Ciberseguridad graduado en la Universidad de las Ciencias
                Informáticas (UCI), Cuba.
              </p>
              <p>
                <span className="text-[#00f7ff] font-semibold">Diseño</span> soluciones digitales que unen automatización, inteligencia artificial y desarrollo de software para mejorar la efectividad y escalabilidad de procesos.
              </p>
              <p>
                Me especializo en la intersección entre
                <span className="text-[#00f7ff] font-semibold"> automatización inteligente</span> y
                <span className="text-[#00f7ff] font-semibold"> desarrollo de software moderno</span>. Durante
                los últimos años, he canalizado mi formación académica en
                <span className="text-[#00f7ff] font-semibold"> ciberseguridad</span> hacia la creación de
                soluciones prácticas: he desarrollado más de
                <span className="text-[#00f7ff] font-semibold"> 30 plantillas de flujos de trabajo automatizados </span>
                con <span className="text-[#00f7ff] font-semibold">n8n</span>, integrando
                <span className="text-[#00f7ff] font-semibold"> APIs</span> y servicios para optimizar procesos
                reales. Paralelamente, construyo interfaces web con
                <span className="text-[#00f7ff] font-semibold"> React, HTML y CSS</span>, combinando funcionalidad
                robusta con experiencias de usuario limpias.
              </p>
              <p>
                Mi enfoque no se limita a escribir código. Priorizo la
                <span className="text-[#00f7ff] font-semibold"> resolución estructurada de problemas</span>, el
                <span className="text-[#00f7ff] font-semibold"> trabajo colaborativo</span> y el
                <span className="text-[#00f7ff] font-semibold"> aprendizaje contínuo</span> como pilares
                fundamentales. Domino el <span className="text-[#00f7ff] font-semibold">español</span> nativo y
                poseo certificación de <span className="text-[#00f7ff] font-semibold">inglés B1</span>, lo que
                me permite colaborar en entornos multiculturales y acceder a documentación técnica global.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6 text-center">
              <div className="p-4 bg-[#101010] rounded-xl">
                <p className="text-3xl font-bold text-[#00f7ff]">50+</p>
                <p className="text-white/60 text-sm">Proyectos</p>
              </div>
              <div className="p-4 bg-[#101010] rounded-xl">
                <p className="text-3xl font-bold text-[#00f7ff]">Decisión</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6 text-center mt-4">
              <div className="p-4 bg-[#101010] rounded-xl">
                <p className="text-3xl font-bold text-[#00f7ff]">Trabajo Duro</p>
              </div>
              <div className="p-4 bg-[#101010] rounded-xl">
                <p className="text-3xl font-bold text-[#00f7ff]">Perseverancia</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {activeModal === 'cv' && (
      <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-2 sm:p-4" onClick={closeModal}>
        <div className="bg-[#080808] rounded-2xl p-4 sm:p-6 w-full max-w-6xl border border-[#00f7ff]/20" onClick={stopPropagation}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-white">Curriculum Vitae</h2>
            <div className="flex gap-3 items-center">
              <button
                onClick={() => downloadFile('/CV_Jesus_Miguel_Arritola.pdf', 'CV_Jesus_Miguel_Arritola.pdf')}
                className="px-4 py-2 bg-[#00f7ff] text-black font-semibold rounded-lg hover:brightness-110 hover:scale-105 transition-all duration-300"
              >
                Descargar
              </button>
              <button onClick={closeModal} aria-label="Cerrar" className="text-white/60 hover:text-white text-2xl leading-none">×</button>
            </div>
          </div>
          <div className="w-full h-[85vh] rounded-xl overflow-hidden border border-[#00f7ff]/20">
            <iframe src="/CV_Jesus_Miguel_Arritola.pdf" className="w-full h-full" title="CV Preview" />
          </div>
        </div>
      </div>
    )}

    {activeModal === 'letter' && (
      <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-2 sm:p-4" onClick={closeModal}>
        <div className="bg-[#080808] rounded-2xl p-4 sm:p-6 w-full max-w-6xl border border-[#00f7ff]/20" onClick={stopPropagation}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-white">Carta de Recomendación</h2>
            <div className="flex gap-3 items-center">
              <button
                onClick={() => downloadFile('/Carta_Recomendacion_Jesus_Miguel_Arritola.pdf', 'Carta_Recomendacion_Jesus_Miguel_Arritola.pdf')}
                className="px-4 py-2 bg-[#00f7ff] text-black font-semibold rounded-lg hover:brightness-110 hover:scale-105 transition-all duration-300"
              >
                Descargar
              </button>
              <button onClick={closeModal} aria-label="Cerrar" className="text-white/60 hover:text-white text-2xl leading-none">×</button>
            </div>
          </div>
          <div className="w-full h-[85vh] rounded-xl overflow-hidden border border-[#00f7ff]/20">
            <iframe src="/Carta_Recomendacion_Jesus_Miguel_Arritola.pdf" className="w-full h-full" title="Carta de Recomendación" />
          </div>
        </div>
      </div>
    )}
    </>
  );
}
