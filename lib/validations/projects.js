/**
 * @typedef {Object} Project
 * @property {string} image
 * @property {string} title
 * @property {string} description
 * @property {string} [problem]
 * @property {string} stack
 */

/**
 * @typedef {Object} ProjectCategory
 * @property {string} category
 * @property {Project[]} projects
 */

/**
 * Validates project data structure
 * @param {unknown} data
 * @returns {ProjectCategory[]}
 */
export function validateProjectsData(data) {
  if (!Array.isArray(data)) {
    throw new Error('Projects data must be an array');
  }

  return data.map((category, catIndex) => {
    if (!category || typeof category !== 'object') {
      throw new Error(`Category ${catIndex} must be an object`);
    }
    if (!category.category || typeof category.category !== 'string') {
      throw new Error(`Category ${catIndex} must have a string 'category'`);
    }
    if (!Array.isArray(category.projects) || category.projects.length === 0) {
      throw new Error(`Category ${category.category} must have at least one project`);
    }

    return {
      category: category.category,
      projects: category.projects.map((project, projIndex) => {
        if (!project || typeof project !== 'object') {
          throw new Error(`Project ${projIndex} in ${category.category} must be an object`);
        }
        const required = ['image', 'title', 'description', 'stack'];
        for (const field of required) {
          if (!project[field] || typeof project[field] !== 'string') {
            throw new Error(`Project ${project.title || projIndex} in ${category.category} missing required field: ${field}`);
          }
        }
        return {
          image: project.image,
          title: project.title,
          description: project.description,
          problem: project.problem || '',
          stack: project.stack,
        };
      }),
    };
  });
}

/**
 * Validates single project data from API
 * @param {unknown} data
 * @returns {Object}
 */
export function validateProjectData(data) {
  const defaults = {
    name: '',
    trigger: 'Formulario',
    description: '',
    howItWorks: '',
    impacto: '',
    nodos: '',
    stack: '',
  };

  if (!data || typeof data !== 'object') {
    return defaults;
  }

  return {
    name: typeof data.name === 'string' ? data.name : '',
    trigger: typeof data.trigger === 'string' ? data.trigger : 'Formulario',
    description: typeof data.description === 'string' ? data.description : '',
    howItWorks: typeof data.howItWorks === 'string' ? data.howItWorks : '',
    impacto: typeof data.impacto === 'string' ? data.impacto : '',
    nodos: typeof data.nodos === 'string' ? data.nodos : '',
    stack: typeof data.stack === 'string' ? data.stack : '',
  };
}

/**
 * Validates site configuration
 * @param {unknown} data
 * @returns {Object}
 */
export function validateSiteConfig(data) {
  const defaults = {
    name: 'Jesús Arritola',
    title: 'Portafolio Profesional | Automatización con IA',
    description: 'Especialista en automatización de procesos con IA. Desarrollo flujos de trabajo con n8n, chatbots, lead generation y más.',
    url: 'https://jesus-arritola-portafolio.vercel.app',
    ogImage: '/ScreenShoots/_FOTOS_NANO_BANANA.png',
    author: 'Jesús Arritola',
    social: {
      whatsapp: 'https://wa.me/+5356686432',
      telegram: 'https://t.me/Jesusarritola',
      email: 'mailto:jesusarritola@gmail.com',
    },
    navigation: [
      { id: 'home', label: 'Inicio' },
      { id: 'about', label: 'Acerca de Mí' },
      { id: 'projects', label: 'Proyectos' },
      { id: 'web-development', label: 'Desarrollo Web' },
      { id: 'skills', label: 'Habilidades' },
      { id: 'contact', label: 'Contacto' },
    ],
  };

  if (!data || typeof data !== 'object') {
    return defaults;
  }

  return {
    ...defaults,
    ...data,
    social: { ...defaults.social, ...(data.social || {}) },
    navigation: Array.isArray(data.navigation) ? data.navigation : defaults.navigation,
  };
}