import { pages, projects } from "@site/content";

export const getPageBySlug = (slug: string) =>
    pages.find((page) => page.slug === slug);

export const getProjectBySlug = (slug: string) =>
    projects.find((project) => project.slug === slug);

export const getPublishedProjects = () =>
    projects.filter((project) => project.published);
