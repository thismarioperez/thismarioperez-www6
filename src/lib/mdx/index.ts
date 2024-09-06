import { pages, projects } from "@site/content";
import { filterByPublished } from "./util";

export const getPageBySlug = (slug: string) =>
    pages.find((page) => page.slugAsParams === slug);

export const getPageSlugs = () => pages.map((page) => page.slug);
export const getPageSlugsAsParams = () =>
    pages.map((page) => page.slugAsParams);

export const getPagesForNav = () =>
    pages
        .filter(
            (page) =>
                page.slugAsParams !== "404" && page.slugAsParams !== "home"
        )
        .filter(filterByPublished);

export const getProjectBySlug = (slug: string) =>
    projects.find((project) => project.slugAsParams === slug);

export const getProjectSlugs = () => projects.map((project) => project.slug);
export const getProjectSlugsAsParams = () =>
    projects.map((project) => project.slugAsParams);

export const getProjectsForNav = () => projects.filter(filterByPublished);
