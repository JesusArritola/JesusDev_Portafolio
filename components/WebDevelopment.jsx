'use client';

import Image from 'next/image';

const webProjects = [
  {
    image: '/ScreenShoots/LeadAIMind_LandingPage.png',
    title: 'LeadAIMind',
    description: 'Landing page para plataforma de generación de leads con IA',
    link: 'https://leadaimind-jesus-arritola-portafoli.vercel.app',
    comingSoon: false,
  },
  {
    image: '/ScreenShoots/Img_Portafolio_Profesional.png',
    title: 'Portafolio Profesional',
    description: 'Este portafolio - próximamente en producción',
    link: '#',
    comingSoon: true,
  },
];

export default function WebDevelopment() {
  return (
    <section id="web-development" className="min-h-screen bg-[#080808] px-9 py-20 scroll-mt-20">
      <h2 className="text-4xl font-bold text-center mt-20">
        Desarrollo <span className="text-[#00f7ff]">Web</span>
      </h2>
      <div className="text-center mt-4">
        <p className="text-2xl text-[#00f7ff] font-bold">Proyectos de Desarrollo Web Personalizados</p>
        <p className="text-lg text-white/60 mt-3 flex flex-wrap justify-center gap-4 items-center">
          <span className="text-white/60">Algunas Tecnologías usadas:</span>
          <span className="flex items-center gap-1">
            <span className="text-[#00f7ff]">React</span>
            <Image src="/icon-react.ico" alt="React" width={20} height={20} title="React" />
          </span>
          <span className="flex items-center gap-1">
            <span className="text-[#00f7ff]">HTML</span>
            <Image src="/icon-html.png" alt="HTML" width={20} height={20} title="HTML" />
          </span>
          <span className="flex items-center gap-1">
            <span className="text-[#00f7ff]">Next.js</span>
            <Image src="/icon-nextjs.ico" alt="Next.js" width={20} height={20} title="Next.js" />
          </span>
          <span className="flex items-center gap-1">
            <span className="text-[#00f7ff]">CSS</span>
            <Image src="/icon-css.png" alt="CSS" width={20} height={20} title="CSS" />
          </span>
          <span className="flex items-center gap-1">
            <span className="text-[#00f7ff]">JavaScript</span>
            <Image src="/icon-js.png" alt="JavaScript" width={20} height={20} title="JavaScript" />
          </span>
          <span className="flex items-center gap-1">
            <span className="text-[#00f7ff]">TypeScript</span>
            <Image src="/icon-ts.png" alt="TypeScript" width={20} height={20} title="TypeScript" />
          </span>
          <span className="flex items-center gap-1">
            <span className="text-[#00f7ff]">Tailwind</span>
            <Image src="/icon-tailwind.png" alt="Tailwind" width={20} height={20} title="Tailwind" />
          </span>
          <span className="flex items-center gap-1">
            <span className="text-[#00f7ff]">Node.js</span>
            <Image src="/icon-node.ico" alt="Node.js" width={20} height={20} title="Node.js" />
          </span>
          <span className="flex items-center gap-1">
            <span className="text-[#00f7ff]">Vercel</span>
            <Image src="/icon-vercel.png" alt="Vercel" width={20} height={20} title="Vercel" />
          </span>
        </p>
      </div>

      <div className="max-w-6xl mx-auto mt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {webProjects.map((project, index) => (
            <div key={index} className="space-y-4">
              {project.link && project.link !== '#' ? (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-card group block relative overflow-hidden rounded-2xl bg-[#101010] cursor-pointer h-64"
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col justify-end items-center p-4 opacity-0 group-hover:opacity-100 transition">
                    <h4 className="text-xl font-bold text-white mb-2">{project.title}</h4>
                    <p className="text-[#00f7ff] font-semibold text-sm">Visitar sitio web →</p>
                  </div>
                </a>
              ) : (
                <div className="project-card group relative overflow-hidden rounded-2xl bg-[#101010] cursor-pointer h-64">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col justify-end items-center p-4 opacity-0 group-hover:opacity-100 transition">
                    <h4 className="text-xl font-bold text-white mb-2">{project.title}</h4>
                    <p className="text-white/70 text-sm">Próximamente</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}