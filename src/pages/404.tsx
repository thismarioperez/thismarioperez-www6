import { Page } from "@site/content";

import { MDXContent } from "@/lib/content/mdx-components";
import { getPageBySlug } from "@/lib/content";

export async function getStaticProps() {
    return {
        props: {
            page: getPageBySlug("404"),
        },
    };
}

type TPageProps = {
    page: Page;
};

export default function Page404({ page }: TPageProps) {
    return <MDXContent code={page.body} />;
}
