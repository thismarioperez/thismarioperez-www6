import { MDXContent } from "@/lib/content/mdx-components";
import { getProjectBySlug } from "@/lib/content";

const page = getProjectBySlug("triptych");

export default function ProjectPage() {
    return (
        <div className="size-full relative">
            <MDXContent code={page!.body} />
        </div>
    );
}
