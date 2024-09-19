import MetaPageTitle from "@/components/dom/common/MetaPageTitle";
import { getPageBySlug } from "@/lib/content";
import { MDXContent } from "@/lib/content/mdx-components";

const page = getPageBySlug("extras");

export default function Page() {
    return (
        <>
            <MetaPageTitle title={page!.title} />
            <div className="size-full relative">
                <MDXContent code={page!.body} />
            </div>
        </>
    );
}
