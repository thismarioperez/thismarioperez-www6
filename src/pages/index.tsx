import { MDXContent } from "@/lib/content/mdx-components";
import MetaPageTitle from "@/components/dom/common/MetaPageTitle";
import { getPageBySlug } from "@/lib/content";

const page = getPageBySlug("home");
export default function HomePage() {
    return (
        <>
            <MetaPageTitle title={page!.title} />
            <div className="size-full relative">
                <MDXContent code={page!.body} />
            </div>
        </>
    );
}
