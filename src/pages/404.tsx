import * as Themed from "@/components/dom/common/Themed";

export default function Page404() {
    return (
        <div className="relative size-full">
            <div className="flex flex-col size-full justify-center items-center gap-y-2">
                <Themed.H1Text as="h1">Well this is awkward...</Themed.H1Text>
                <Themed.H2Text as="h3">Page not found</Themed.H2Text>
            </div>
        </div>
    );
}
