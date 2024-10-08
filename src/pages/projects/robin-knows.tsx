import { MDXContent } from "@/lib/content/mdx-components";
import { getProjectBySlug } from "@/lib/content";
import MetaPageTitle from "@/components/dom/common/MetaPageTitle";

const page = getProjectBySlug("robin-knows");

export default function ProjectPage() {
    return (
        <>
            <MetaPageTitle title={page!.title} />
            <div className="size-full relative">
                <MDXContent code={page!.body} />
            </div>
        </>
    );
}
