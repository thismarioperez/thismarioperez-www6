import { defineConfig, defineCollection, s } from "velite";
import validator from "validator";

// Scene names for each page
const sceneSchema = s.union([
    s.literal("logo-scene"),
    s.literal("fbi-safe-online-surfing-scene"),
    s.literal("robin-knows-scene"),
    s.literal("rodda-construction-scene"),
    s.literal("triptych-scene"),
    s.literal("lava-lamp-scene"),
    s.literal("cube-scene"),
    s.literal("lloyd-goldstein-scene"),
    s.literal("meta-your-personal-main-street-scene"),
    s.literal("qgiv-scene"),
    s.literal("wind-river-scene"),
]);

const basePageSchema = s.object({
    title: s.string().max(99),
    body: s.mdx(),
    scene: sceneSchema.optional().default("lava-lamp-scene"),
    published: s.boolean().optional().default(true),
});

const pageSchema = s
    .object({
        slug: s.slug(),
    })
    .and(basePageSchema);

const computedPageFields = <T extends { slug: string }>(data: T) => {
    return {
        ...data,
        pathname: `/${data.slug}`,
    };
};

const pages = defineCollection({
    name: "Page",
    pattern: "pages/**/*.{md,mdx}",
    schema: pageSchema.transform(computedPageFields),
});

const projectSchema = s
    .object({
        slug: s.slug("project"),
    })
    .and(basePageSchema);

const computedProjectFields = <T extends { slug: string }>(data: T) => {
    return {
        ...data,
        pathname: `/projects/${data.slug}`,
    };
};

const projects = defineCollection({
    name: "Project",
    pattern: "projects/**/*.{md,mdx}",
    schema: projectSchema.transform(computedProjectFields),
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

const footerLinkSchema = s.object({
    name: s.string(),
    href: s.string(),
    icon: s.union([
        s.literal("github"),
        s.literal("email"),
        s.literal("linkedin"),
        s.literal("phone"),
    ]),
    external: s.boolean().optional().default(true),
});

const siteSchema = s.object({
    title: s.string().max(99),
    description: s.string().max(99),
    author: s.object({
        name: s.string(),
        email: s.string().email().optional().default("lOyIz@example.com"),
        phone: s
            .string()
            .refine(validator.isMobilePhone)
            .optional()
            .default("+1 (555) 555-5555"),
    }),
    navigation: s.array(navigationItemSchema).optional().default([]),
    footerLinks: s.array(footerLinkSchema).optional().default([]),
});

const site = defineCollection({
    name: "Site",
    pattern: "site/index.yml",
    schema: siteSchema,
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
        site,
    },
    mdx: {
        rehypePlugins: [],
        remarkPlugins: [],
    },
});
