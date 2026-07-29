import fs from 'fs';
import path from 'path';

// Load projects data from content/projects.json at build time
let projectsCache = null;

function loadProjectsData() {
  if (projectsCache) return projectsCache;
  
  try {
    const dataPath = path.join(process.cwd(), 'content', 'projects.json');
    const fileContent = fs.readFileSync(dataPath, 'utf8');
    projectsCache = JSON.parse(fileContent);
    return projectsCache;
  } catch (error) {
    console.error('Error loading projects data:', error);
    return { categories: [], metadata: {} };
  }
}

// Helper to normalize string for matching
function normalize(str) {
  return str
    .toLowerCase()
    .replace(/ñ/g, 'n')
    .replace(/á/g, 'a')
    .replace(/é/g, 'e')
    .replace(/í/g, 'i')
    .replace(/ó/g, 'o')
    .replace(/ú/g, 'u')
    .replace(/[^a-z0-9]/g, '');
}

// Helper to translate node names
function translateNode(name) {
  if (!name) return 'Nodo';
  const translations = {
    'formTrigger': 'Formulario',
    'telegramTrigger': 'Telegram',
    'googleSheets': 'Google Sheets',
    'scheduleTrigger': 'Programado',
    'chatTrigger': 'Chat',
    'telegram': 'Telegram',
    'gmail': 'Email',
    'gmailTool': 'Email',
    'googleSheetsTool': 'Google Sheets',
    'googleDrive': 'Drive',
    'httpRequest': 'HTTP',
    'code': 'Código',
    'set': 'Editar',
    'filter': 'Filtrar',
    'merge': 'Combinar',
    'splitInBatches': 'Bucle',
    'wait': 'Esperar',
    'agent': 'Agente IA',
    'lmChatGoogleGemini': 'Gemini',
    'lmChatOpenAi': 'OpenAI',
    'googleGemini': 'Gemini',
    'If': 'Si',
    'switch': 'Condición',
    'Append row': 'Guardar',
    'Edit Fields': 'Editar',
    'Send': 'Enviar',
    'Analyze': 'Analizar',
    'Generate': 'Generar',
  };
  
  let result = name;
  for (const [eng, esp] of Object.entries(translations)) {
    if (name.toLowerCase().includes(eng.toLowerCase())) {
      result = name.replace(new RegExp(eng, 'gi'), esp);
    }
  }
  return result;
}

export default function handler(req, res) {
  const { slug } = req.query;
  
  if (!slug) {
    return res.status(400).json({ error: 'Slug is required' });
  }

  const cleanName = slug.replace(/^#\d+_/, '').replace(/_/g, ' ').replace(/%20/g, ' ').trim();
  const { categories } = loadProjectsData();
  const searchName = normalize(cleanName);

  // Search across all categories for matching project
  let foundProject = null;
  let foundCategory = null;

  for (const category of categories) {
    for (const project of category.projects) {
      const projectNormalized = normalize(project.title);
      if (projectNormalized === searchName || 
          projectNormalized.includes(searchName) || 
          searchName.includes(projectNormalized)) {
        foundProject = project;
        foundCategory = category.category;
        break;
      }
    }
    if (foundProject) break;
  }

  // If not found, try fuzzy matching
  if (!foundProject) {
    for (const category of categories) {
      for (const project of category.projects) {
        const projectLower = project.title.toLowerCase();
        const searchLower = cleanName.toLowerCase();
        if (projectLower.includes(searchLower) || searchLower.includes(projectLower)) {
          foundProject = project;
          foundCategory = category.category;
          break;
        }
      }
      if (foundProject) break;
    }
  }

  if (!foundProject) {
    // Return default data if project not found
    return res.status(200).json({
      name: cleanName,
      trigger: 'Formulario',
      description: `Sistema automatizado de ${cleanName} que captura datos y los procesa automáticamente`,
      howItWorks: 'Formulario → Procesa datos → Envía resultado',
      impacto: '• Automatización de procesos\n• Ahorro de tiempo\n• Reducción de errores',
      nodos: 'Formulario, Procesar, Enviar',
    });
  }

  // Build detailed response from project data
  const lowerTitle = foundProject.title.toLowerCase();
  
  // Determine trigger type from category or project
  let trigger = 'Formulario';
  if (foundCategory === 'Agentes IA') {
    trigger = lowerTitle.includes('telegram') || lowerTitle.includes('voz') ? 'Telegram' : 'Formulario';
  } else if (foundCategory === 'Lead Generation') {
    trigger = 'Webhook / API';
  } else if (foundCategory === 'Marketing Digital') {
    trigger = 'Programado / Webhook';
  } else if (foundCategory === 'Restaurantes y Retail') {
    trigger = 'Telegram / Webhook';
  }

  // Use the detailed description from the project data
  const description = foundProject.description || `Automatización inteligente para ${foundProject.title}`;
  const problem = foundProject.problem || `Optimización de procesos en ${foundProject.title}`;
  const stack = foundProject.stack || 'n8n, IA, APIs';

  // Build how it works flow
  let howItWorks = '';
  if (foundCategory === 'Agentes IA') {
    howItWorks = 'Trigger → Agente IA → Procesa → Responde / Actúa';
  } else if (foundCategory === 'Lead Generation') {
    howItWorks = 'Fuente → Scraping → Enriquecimiento → CRM / Sheets';
  } else if (foundCategory === 'Automatización de Procesos') {
    howItWorks = 'Trigger → Procesa datos → Acción / Integración';
  } else if (foundCategory === 'Marketing Digital') {
    howItWorks = 'Trigger → IA genera contenido → Envía / Publica';
  } else if (foundCategory === 'Restaurantes y Retail') {
    howItWorks = 'Cliente → Pedido/Reserva → POS/Cocina → Confirmación';
  } else {
    howItWorks = `${trigger} → Procesa → Responde`;
  }

  // Build impact based on category
  let impacto = '';
  if (foundCategory === 'Agentes IA') {
    impacto = '• Atención 24/7 sin operadores humanos\n• Respuestas instantáneas y consistentes\n• Captura automática de leads y datos';
  } else if (foundCategory === 'Lead Generation') {
    impacto = '• Captura automática de leads sin esfuerzo manual\n• Procesamiento inmediato de nuevos prospectos\n• Organización automática en CRM/Sheets';
  } else if (foundCategory === 'Automatización de Procesos') {
    impacto = '• Ahorro de tiempo en tareas repetitivas\n• Reducción de errores humanos\n• Escalabilidad sin aumentar personal';
  } else if (foundCategory === 'Marketing Digital') {
    impacto = '• Creación de contenido a escala\n• Ahorro de tiempo en producción\n• Publicación automática en plataformas';
  } else if (foundCategory === 'Restaurantes y Retail') {
    impacto = '• Pedidos sin errores y trazabilidad completa\n• Reducción de no-shows con recordatorios\n• Gestión automática de disponibilidad';
  } else {
    impacto = '• Automatización de procesos\n• Ahorro de tiempo\n• Mejora de resultados';
  }

  res.status(200).json({
    name: foundProject.title,
    trigger: trigger,
    description: description,
    howItWorks: howItWorks,
    impacto: impacto,
    nodos: stack,
    problem: problem,
    category: foundCategory,
  });
}