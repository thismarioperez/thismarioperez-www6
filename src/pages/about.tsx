import { Page } from "@site/content";

import { getPageBySlug } from "@/lib/content";
import { MDXContent } from "@/lib/content/mdx-components";

export async function getStaticProps() {
    return {
        props: {
            page: getPageBySlug("about"),
        },
    };
}

type TPageProps = {
    page: Page;
};

export default function AboutPage({ page }: TPageProps) {
    return (
        <>
            <h1>About page</h1>
            <MDXContent code={page.body} />
            <div className="h-[100vh]"></div>
            <div className="w-full h-[50vh] bg-yellow"></div>
            <div className="w-full h-[50vh]"></div>
            <div className="w-full h-[50vh] bg-black"></div>
            <div className="w-full h-[50vh]"></div>
            <div className="w-full h-[50vh] bg-white"></div>
            <div className="w-full h-[50vh]"></div>
            <div className="w-full h-[50vh] bg-black"></div>
        </>
    );
}
