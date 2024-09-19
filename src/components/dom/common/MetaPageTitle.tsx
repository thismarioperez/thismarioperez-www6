import Head from "next/head";

import * as constants from "@/core/constants";

export default function MetaPageTitle({ title }: { title: string }) {
    return (
        <Head>
            <title key="page-title">{`${constants.SITE_NAME} | Creative Developer - 🤘 | ${title}`}</title>
            <meta
                property="og:title"
                content={`${constants.SITE_NAME} | ${title}`}
            />
        </Head>
    );
}
