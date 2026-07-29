import Image from 'next/image';

const technicalSkills = [
  {
    category: 'Automatización & IA',
    skills: [
      { name: 'n8n', icon: '/icon-n8n.png', color: 'from-[#8B5548] to-[#6B4538]', border: 'border-[#9B6558]' },
      { name: 'LangChain', icon: '/icon-langchain.png', color: 'from-[#283838] to-[#182828]', border: 'border-[#384848]' },
      { name: 'OpenAI', icon: '/icon-openai.png', color: 'from-[#3A2858] to-[#2A1848]', border: 'border-[#4A3858]' },
      { name: 'APIs', icon: '/icon-apis.png', color: 'from-[#286868] to-[#184858]', border: 'border-[#387878]' },
      { name: 'Webhooks', icon: '/icon-webhook.png', color: 'from-[#804838] to-[#603828]', border: 'border-[#905848]' },
      { name: 'HTTP Request', icon: '/icon-http.ico', color: 'from-[#283848] to-[#182838]', border: 'border-[#384858]' },
    ],
  },
  {
    category: 'Lenguajes de Programación',
    skills: [
      { name: 'HTML5', icon: '/icon-html.png', color: 'from-[#804038] to-[#603028]', border: 'border-[#905048]' },
      { name: 'CSS3', icon: '/icon-css.png', color: 'from-[#284860] to-[#183850]', border: 'border-[#385870]' },
      { name: 'JavaScript', icon: '/icon-js.png', color: 'from-[#908040] to-[#706030]', border: 'border-[#A09050]', textColor: 'text-black' },
      { name: 'TypeScript', icon: '/icon-ts.png', color: 'from-[#384870] to-[#283860]', border: 'border-[#485880]' },
      { name: 'Python', icon: '/icon-python.ico', color: 'from-[#384860] to-[#283850]', border: 'border-[#485870]' },
      { name: 'Fundamentos de C++', icon: '/icon-cpp.ico', color: 'from-[#283848] to-[#182838]', border: 'border-[#384858]' },
    ],
  },
  {
    category: 'Frameworks y Librerías',
    skills: [
      { name: 'React', icon: '/icon-react.ico', color: 'from-[#587888] to-[#486878]', border: 'border-[#688898]', textColor: 'text-black' },
      { name: 'Next.js', icon: '/icon-nextjs.ico', color: 'from-[#181818] to-[#080808]', border: 'border-[#282828]' },
      { name: 'Tailwind CSS', icon: '/icon-tailwind.png', color: 'from-[#386878] to-[#285868]', border: 'border-[#487888]', textColor: 'text-black' },
      { name: 'Node.js', icon: '/icon-node.ico', color: 'from-[#385038] to-[#284028]', border: 'border-[#486048]' },
    ],
  },
];

const softSkills = [
  'Solución de problemas',
  'Comunicación efectiva',
  'Adaptabilidad',
  'Trabajo en equipo',
  'Gestión de proyectos',
  'Atención al detalle',
  'Innovación',
  'Aprendizaje continuo',
];

export default function Skills() {
  return (
    <section id="skills" className="min-h-screen bg-[#080808] px-4 md:px-9 py-20 scroll-mt-20">
      <h2 className="text-4xl font-bold text-center mt-20">Habilidades</h2>

      <div className="max-w-4xl mx-auto mt-12 space-y-8">
        <div>
          <h3 className="text-xl font-bold text-white mb-6 border-l-4 border-[#00f7ff] pl-4">Habilidades Técnicas</h3>

          <div className="space-y-6">
            {technicalSkills.map(({ category, skills }, catIndex) => (
              <div key={catIndex}>
                <h4 className="text-lg font-bold text-white mb-3">{category}</h4>
                <div className="flex flex-wrap gap-3">
                  {skills.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className={`flex items-center gap-2 px-4 py-3 rounded-lg text-white font-bold text-base hover:brightness-110 hover:scale-105 transition-all duration-300 cursor-default border-b-2 ${skill.color} ${skill.border} ${skill.textColor || ''}`}
                    >
                      <Image src={skill.icon} alt={skill.name} width={24} height={24} className="w-6 h-6" />
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold text-white mb-6 border-l-4 border-[#00f7ff] pl-4">Habilidades Blandas</h3>
          <div className="flex flex-wrap gap-3">
            {softSkills.map((skill, index) => (
              <span
                key={index}
                className="flex items-center gap-2 px-4 py-3 rounded-lg text-white font-bold text-base bg-[#323330] border-b-2 border-[#00f7ff] hover:bg-[#404040] hover:scale-105 transition-all duration-300 cursor-default"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}