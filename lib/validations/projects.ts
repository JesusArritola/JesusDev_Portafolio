import { z } from 'zod';
import type { Project, ProjectCategory, Skill, SoftSkill, WebDevProject, SiteConfig } from '@/types';

export const projectSchema = z.object({
  image: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  problem: z.string().optional(),
  stack: z.string().min(1),
});

export const projectCategorySchema = z.object({
  category: z.string().min(1),
  projects: z.array(projectSchema).min(1),
});

export const skillSchema = z.object({
  name: z.string().min(1),
  icon: z.string().min(1),
  color: z.string().min(1),
  bgGradient: z.string().min(1),
  borderColor: z.string().min(1),
});

export const softSkillSchema = z.object({
  name: z.string().min(1),
});

export const webDevProjectSchema = z.object({
  image: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  link: z.string().url().optional(),
  comingSoon: z.boolean().optional(),
});

export const siteConfigSchema = z.object({
  name: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  url: z.string().url(),
  ogImage: z.string().min(1),
  author: z.string().min(1),
  social: z.object({
    whatsapp: z.string().url(),
    telegram: z.string().url(),
    email: z.string().email(),
  }),
  navigation: z.array(z.object({
    id: z.string().min(1),
    label: z.string().min(1),
  })).min(1),
});

export const projectsDataSchema = z.array(projectCategorySchema);

export type ProjectsData = z.infer<typeof projectsDataSchema>;
export type ValidatedProject = z.infer<typeof projectSchema>;
export type ValidatedProjectCategory = z.infer<typeof projectCategorySchema>;

export function validateProjectsData(data: unknown): ProjectsData {
  return projectsDataSchema.parse(data);
}

export function validateProject(data: unknown): ValidatedProject {
  return projectSchema.parse(data);
}

export function validateProjectCategory(data: unknown): ValidatedProjectCategory {
  return projectCategorySchema.parse(data);
}