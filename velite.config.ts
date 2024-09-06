import { defineConfig, defineCollection, s } from "velite";

const baseSceneSchema = s.object({
    name: s.slug(),
});

const logoSceneSchema = s.object({
    type: s.literal("logo"),
});

const mediaSceneSchema = s.object({
    type: s.literal("media"),
    src: s.file({ allowNonRelativePath: true }).default("/images/image-1.jpg"),
});

const sceneSchema = s
    .discriminatedUnion("type", [logoSceneSchema, mediaSceneSchema])
    .and(baseSceneSchema);

const basePageSchema = s.object({
    slug: s.path(),
    title: s.string().max(99),
    description: s.string().max(999).optional(),
    published: s.boolean().optional().default(true),
    body: s.mdx(),
    scene: sceneSchema.optional(),
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
