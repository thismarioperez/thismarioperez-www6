import { defineConfig, defineCollection, s } from "velite";

const baseHeroSchema = s.object({
    title: s.string().max(99),
    description: s.string().max(999).optional(),
});

const heroHomeSchema = s.object({
    type: s.literal("home"),
});

const heroImageSchema = s.object({
    type: s.literal("image"),
    src: s.file({ allowNonRelativePath: true }).default("/images/image-1.jpg"),
});

const heroSchema = s
    .discriminatedUnion("type", [heroHomeSchema, heroImageSchema])
    .and(baseHeroSchema);

const basePageSchema = s.object({
    slug: s.path(),
    title: s.string().max(99),
    description: s.string().max(999).optional(),
    published: s.boolean().optional().default(true),
    body: s.mdx(),
    hero: heroSchema.optional(),
});

const computedFields = <T extends { slug: string }>(data: T) => ({
    ...data,
    slugAsParams: data.slug.split("/").slice(1).join("/"),
});

const pages = defineCollection({
    name: "Page",
    pattern: "pages/**/*.{md,mdx}",
    schema: basePageSchema.transform(computedFields),
});

const projects = defineCollection({
    name: "Project",
    pattern: "projects/**/*.{md,mdx}",
    schema: basePageSchema.transform(computedFields),
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
