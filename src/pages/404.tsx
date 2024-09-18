import Container from "@/components/dom/common/Container";
import Link from "@/components/dom/common/Link";
import * as Themed from "@/components/dom/common/Themed";

export default function Page404() {
    return (
        <div className="relative size-full">
            <div className="flex flex-col w-full min-h-[calc(100vh-var(--header-height))] justify-center">
                <Container>
                    <h1>Well this is awkward...</h1>
                    <h2>{"Looks like this page doesn't exist"}</h2>
                    <Link href="/">{"Go drunk, you're home!"}</Link>
                </Container>
            </div>
        </div>
    );
}
