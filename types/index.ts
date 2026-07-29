export interface Project {
  image: string;
  title: string;
  description: string;
  problem?: string;
  stack: string;
}

export interface ProjectCategory {
  category: string;
  projects: Project[];
}

export interface SiteConfig {
  name: string;
  title: string;
  description: string;
  url: string;
  ogImage: string;
  author: string;
  social: {
    whatsapp: string;
    telegram: string;
    email: string;
  };
  navigation: NavItem[];
}

export interface NavItem {
  id: string;
  label: string;
}

export interface SkillCategory {
  category: string;
  skills: Skill[];
}

export interface Skill {
  name: string;
  icon: string;
  color: string;
  bgGradient: string;
  borderColor: string;
}

export interface SoftSkill {
  name: string;
}

export interface WebDevProject {
  image: string;
  title: string;
  description: string;
  link?: string;
  comingSoon?: boolean;
}

export interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  twitterCard?: 'summary' | 'summary_large_image';
  noIndex?: boolean;
  noFollow?: boolean;
}

export interface JSONProjectData {
  name: string;
  trigger: string;
  description: string;
  howItWorks: string;
  impacto: string;
  nodos: string;
}