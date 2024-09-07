import { Page } from "@site/content";

import { MDXContent } from "@/lib/content/mdx-components";
import { getPageBySlug } from "@/lib/content";

export async function getStaticProps() {
    return {
        props: {
            page: getPageBySlug("home"),
        },
    };
}

type TPageProps = {
    page: Page;
};

export default function HomePage({ page }: TPageProps) {
    return (
        <div className="size-full relative">
            <MDXContent code={page.body} />
        </div>
    );
}
