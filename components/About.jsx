'use client';

import Image from 'next/image';

export default function About() {
  return (
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
                fill
                sizes="300px"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="mt-6">
              <a
                href="/CV_Jesus_Miguel_Arritola.pdf"
                download
                className="inline-block px-6 py-3 bg-[#00f7ff] text-black font-bold rounded-lg hover:brightness-110 hover:scale-105 transition-all duration-300"
              >
                Descargar CV
              </a>
            </div>
          </div>
          <div className="space-y-8">
            <div />
            <div className="space-y-4 text-white/80 text-lg leading-relaxed">
              <p>
                Soy <span className="text-[#00f7ff] font-semibold">Jesús Miguel Arritola Alonso</span>, estudiante
                de Ingeniería en Ciberseguridad en la Universidad de las Ciencias
                Informáticas (UCI), Cuba.
              </p>
              <p>
                <span className="text-[#00f7ff] font-semibold">Diseño</span> soluciones digitales que unen
                <span className="text-[#00f7ff] font-semibold">automatización</span>,
                <span className="text-[#00f7ff] font-semibold">inteligencia artificial</span> y
                <span className="text-[#00f7ff] font-semibold">desarrollo de software</span> para mejorar la
                <span className="text-[#00f7ff] font-semibold">efectividad</span> y
                <span className="text-[#00f7ff] font-semibold">escalabilidad</span> de procesos.
              </p>
              <p>
                Me especializo en la intersección entre
                <span className="text-[#00f7ff] font-semibold">automatización inteligente</span> y
                <span className="text-[#00f7ff] font-semibold">desarrollo de software moderno</span>. Durante
                los últimos años, he canalizado mi formación académica en
                <span className="text-[#00f7ff] font-semibold">ciberseguridad</span> hacia la creación de
                soluciones prácticas: he desarrollado más de
                <span className="text-[#00f7ff] font-semibold">30 plantillas de flujos de trabajo automatizados</span>
                con <span className="text-[#00f7ff] font-semibold">n8n</span>, integrando
                <span className="text-[#00f7ff] font-semibold">APIs</span> y servicios para optimizar procesos
                reales. Paralelamente, construyo interfaces web con
                <span className="text-[#00f7ff] font-semibold">React, HTML y CSS</span>, combinando funcionalidad
                robusta con experiencias de usuario limpias.
              </p>
              <p>
                Mi enfoque no se limita a escribir código. Priorizo la
                <span className="text-[#00f7ff] font-semibold">resolución estructurada de problemas</span>, el
                <span className="text-[#00f7ff] font-semibold">trabajo colaborativo</span> y el
                <span className="text-[#00f7ff] font-semibold">aprendizaje continuo</span> como pilares
                fundamentales. Domino el <span className="text-[#00f7ff] font-semibold">español</span> nativo y
                poseo certificación de <span className="text-[#00f7ff] font-semibold">inglés B1</span>, lo que me
                permite colaborar en entornos multiculturales y acceder a documentación técnica global.
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
  );
}