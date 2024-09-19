import { type Page } from "@site/content";
import { getPublishedPages, getPageBySlug } from "@/lib/content";
import { MDXContent } from "@/lib/content/mdx-components";
import MetaPageTitle from "@/components/dom/common/MetaPageTitle";

// Create static paths for each page
export async function getStaticPaths() {
    // Get the paths we want to pre-render based on content files
    const slugs = getPublishedPages().map((page) => page.slug);

    const paths = slugs.map((slug) => ({
        params: { slug },
    }));

    // We'll pre-render only these paths at build time.
    // { fallback: false } means other routes should 404.
    return { paths, fallback: false };
}

export async function getStaticProps({
    params: { slug },
}: {
    params: { slug: string };
}) {
    const page = getPageBySlug(slug);

    // Pass page data to the page via props
    return { props: { page } };
}

export type TPageProps = {
    page: Page;
};

export default function Page({ page }: TPageProps) {
    return (
        <>
            <MetaPageTitle title={page.title} />
            <div className="size-full relative">
                <MDXContent code={page.body} />
            </div>
        </>
    );
}
