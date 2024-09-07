import { Page } from "@site/content";

import Container from "@/components/dom/common/Container";
import * as Themed from "@/components/dom/common/Themed";
import { MDXContent } from "@/lib/content/mdx-components";
import { getPageBySlug } from "@/lib/content";

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
        <div className="size-full relative">
            <h1>Home page</h1>
            <MDXContent code={page.body} />
            <div className="h-[100vh]"></div>
            <Container bgColor="black" inset>
                <Themed.H1Text as="h1">Hello world</Themed.H1Text>
            </Container>
            <Container bgColor="white" inset>
                <Themed.H1Text className="text-black" as="h1">
                    Hello world
                </Themed.H1Text>
            </Container>
            <Container bgColor="yellow" inset>
                <Themed.H1Text className="text-black" as="h1">
                    Hello world
                </Themed.H1Text>
            </Container>
            <Container bgColor="black">
                <Themed.H1Text as="h1">Hello world</Themed.H1Text>
            </Container>
            <Container bgColor="white">
                <Themed.H1Text className="text-black" as="h1">
                    Hello world
                </Themed.H1Text>
            </Container>
            <Container bgColor="yellow">
                <Themed.H1Text className="text-black" as="h1">
                    Hello world
                </Themed.H1Text>
            </Container>
            <div className="w-full h-[50vh]"></div>
            <div className="w-full h-[50vh] bg-black"></div>
            <div className="w-full h-[50vh]"></div>
            <div className="w-full h-[50vh] bg-white"></div>
            <div className="w-full h-[50vh]"></div>
            <div className="w-full h-[50vh] bg-black"></div>
        </div>
    );
}
