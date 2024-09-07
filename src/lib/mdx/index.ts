import { pages, projects } from "@site/content";
import { filterByPublished } from "./util";

export const getPageBySlug = (slug: string) =>
    pages.find((page) => page.slug === slug);

export const getPagesForNav = () =>
    pages
        .filter((page) => page.slug !== "404" && page.slug !== "home")
        .filter(filterByPublished);

export const getProjectBySlug = (slug: string) =>
    projects.find((project) => project.slug === slug);

export const getProjectSlugs = () => projects.map((project) => project.slug);

export const getProjectsForNav = () => projects.filter(filterByPublished);
