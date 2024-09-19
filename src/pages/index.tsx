import { Page } from "@site/content";
import Head from "next/head";

import { MDXContent } from "@/lib/content/mdx-components";
import { getPageBySlug } from "@/lib/content";
import * as constants from "@/core/constants";

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
        <>
            <Head>
                <title>{`${constants.SITE_NAME} | Create Developer`}</title>
            </Head>
            <div className="size-full relative">
                <MDXContent code={page.body} />
            </div>
        </>
    );
}
