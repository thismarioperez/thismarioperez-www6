import { pages, projects } from "@site/content";

export const getPageBySlug = (slug: string) =>
    pages.find((page) => page.slugAsParams === slug);

export const getProjectBySlug = (slug: string) =>
    projects.find((project) => project.slugAsParams === slug);
