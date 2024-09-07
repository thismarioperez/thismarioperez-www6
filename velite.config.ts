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
    filepath: s.path(),
    title: s.string().max(99),
    description: s.string().max(999).optional(),
    published: s.boolean().optional().default(true),
    body: s.mdx(),
    scene: sceneSchema.optional(),
});

const computedFields = <T extends { filepath: string }>(
    data: T,
    basePath: string = "/"
) => {
    const slug = data.filepath.split("/").slice(1).join("/");
    return {
        ...data,
        slug,
        url: `${basePath}${slug}`,
    };
};

const pages = defineCollection({
    name: "Page",
    pattern: "pages/**/*.{md,mdx}",
    schema: basePageSchema.transform((data) => computedFields(data, "/")),
});

const projects = defineCollection({
    name: "Project",
    pattern: "projects/**/*.{md,mdx}",
    schema: basePageSchema.transform((data) =>
        computedFields(data, "/projects/")
    ),
});

const navigationLinkSchema = s.object({
    name: s.string(),
    type: s.literal("link"),
    href: s.string(),
    external: s.boolean().optional().default(false),
});

const navigationFolderSchema = s.object({
    name: s.string(),
    type: s.literal("folder"),
    children: s.array(navigationLinkSchema),
});

const navigationItemSchema = s.discriminatedUnion("type", [
    navigationLinkSchema,
    navigationFolderSchema,
]);

const navigation = defineCollection({
    name: "Navigation",
    pattern: "navigation/index.yml",
    schema: s.object({
        items: s.array(navigationItemSchema),
    }),
    single: true,
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
        navigation,
    },
    mdx: {
        rehypePlugins: [],
        remarkPlugins: [],
    },
});
