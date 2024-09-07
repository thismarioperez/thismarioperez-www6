import { pages, projects } from "@site/content";

export const getPageBySlug = (slug: string) =>
    pages.find((page) => page.slug === slug);

export const getProjectBySlug = (slug: string) =>
    projects.find((project) => project.slug === slug);

export const getPublishedProjects = () =>
    projects.filter((project) => project.published);

export const getSceneNames = () => {
    return Array.from(
        new Set([...pages, ...projects].map((page) => page.scene))
    );
};

export const getSceneByPathname = (pathname: string) => {
    // account for home page
    let _pathname = pathname === "/" ? "/home" : pathname;

    const scene = [...pages, ...projects].find((page) => {
        return page.pathname === _pathname;
    })?.scene;

    if (!scene) {
        return null;
    }

    return scene;
};
