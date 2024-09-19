import MetaPageTitle from "@/components/dom/common/MetaPageTitle";
import * as Themed from "@/components/dom/common/Themed";

export default function PlaygroundPage() {
    return (
        <>
            <MetaPageTitle title="Playground" />
            <div className="size-full relative px-6 py-12">
                <Themed.H1Text as="h1">Playground</Themed.H1Text>
            </div>
        </>
    );
}
