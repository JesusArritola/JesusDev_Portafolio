import { z } from 'zod';

export const ProjectSchema = z.object({
  image: z.string(),
  title: z.string(),
  description: z.string().optional(),
  problem: z.string().optional(),
  stack: z.string().optional(),
});

export const CategorySchema = z.object({
  category: z.string(),
  projects: z.array(ProjectSchema),
});

export const ProjectDataSchema = z.object({
  name: z.string(),
  trigger: z.string(),
  description: z.string(),
  howItWorks: z.string(),
  impacto: z.string(),
  nodos: z.string(),
  stack: z.string().optional(),
});

export type Project = z.infer<typeof ProjectSchema>;
export type Category = z.infer<typeof CategorySchema>;
export type ProjectData = z.infer<typeof ProjectDataSchema>;

export const SKILL_CATEGORIES = [
  'Automatización & IA',
  'Lenguajes de Programación',
  'Frameworks y Librerías',
] as const;

export const SOFT_SKILLS = [
  'Solución de problemas',
  'Comunicación efectiva',
  'Adaptabilidad',
  'Trabajo en equipo',
  'Gestión de proyectos',
  'Atención al detalle',
  'Innovación',
  'Aprendizaje continuo',
] as const;

export interface SkillItem {
  label: string;
  icon: string;
  color: string;
  category: typeof SKILL_CATEGORIES[number];
}

export interface SoftSkillItem {
  label: string;
}