import Redirect from "@/components/dom/common/Redirect";
import { getProjectBySlug, getProjectSlugsAsParams } from "@/lib/mdx";
import { MDXContent } from "@/lib/mdx/mdx-components";
import { Page } from "@site/content";

// Create static paths for each project
export async function getStaticPaths() {
    // Get the paths we want to pre-render based on posts
    const slugs = getProjectSlugsAsParams();

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
    const page = getProjectBySlug(slug);

    // Pass post data to the page via props
    return { props: { page } };
}

export type TPageProps = {
    page: Page;
};

export default function ProjectPage({ page }: TPageProps) {
    return (
        <div>
            <h1>Project page</h1>
            <MDXContent code={page.body} />
            <div className="h-[100vh]"></div>
            <div className="w-full h-[50vh] bg-yellow"></div>
            <div className="w-full h-[50vh]"></div>
            <div className="w-full h-[50vh] bg-black"></div>
            <div className="w-full h-[50vh]"></div>
            <div className="w-full h-[50vh] bg-white"></div>
            <div className="w-full h-[50vh]"></div>
            <div className="w-full h-[50vh] bg-black"></div>
        </div>
    );
}
