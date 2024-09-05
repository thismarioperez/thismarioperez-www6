import { defineConfig, defineCollection, s } from "velite";

const computedFields = <T extends { slug: string }>(data: T) => ({
    ...data,
    slugAsParams: data.slug.split("/").slice(1).join("/"),
});

const pages = defineCollection({
    name: "Page",
    pattern: "pages/**/*.{md,mdx}",
    schema: s
        .object({
            slug: s.path(),
            title: s.string().max(99),
            description: s.string().max(999).optional(),
            published: s.boolean().optional().default(true),
            body: s.mdx(),
        })
        .transform(computedFields),
});

const projects = defineCollection({
    name: "Project",
    pattern: "projects/**/*.{md,mdx}",
    schema: s
        .object({
            slug: s.path(),
            title: s.string().max(99),
            description: s.string().max(999).optional(),
            published: s.boolean().optional().default(true),
            body: s.mdx(),
        })
        .transform(computedFields),
});

export default defineConfig({
    root: "src/content",
    output: {
        data: ".velete",
        assets: "public/static",
        base: "/static/",
        name: "[name]-[hash:6].[ext]",
        clean: true,
    },
    collections: {
        pages,
        projects,
    },
    mdx: {
        rehypePlugins: [],
        remarkPlugins: [],
    },
});
