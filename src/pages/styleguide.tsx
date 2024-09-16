import Container from "@/components/dom/common/Container";
import * as Themed from "@/components/dom/common/Themed";

export default function StyleGuidePage() {
    return (
        <div className="size-full relative">
            <Container bgColor="transparent">
                <div className="w-full flex flex-col items-center gap-y-4 mb-4">
                    <Themed.H1Text as="h1">Style Guide</Themed.H1Text>
                    <hr className="w-full border-yellow" />
                </div>

                <div className="w-full flex flex-col gap-y-4">
                    <Themed.H1Text as="h1">H1 Text</Themed.H1Text>
                    <Themed.H2Text as="h2">H2 Text</Themed.H2Text>
                    <Themed.H3Text as="h3">H3 Text</Themed.H3Text>
                    <Themed.PText as="p">P Text</Themed.PText>
                    <Themed.MetaText as="span">Meta Text</Themed.MetaText>
                    <Themed.QuoteText as="blockquote">
                        Quote Text
                    </Themed.QuoteText>
                    <div>
                        <Themed.ButtonText as="button">
                            Button Text
                        </Themed.ButtonText>
                    </div>
                </div>
            </Container>
            <div className="w-full flex flex-col gap-y-4">
                <Container>
                    <Themed.PText as="p">Container</Themed.PText>
                </Container>
                <Container bgColor="yellow">
                    <Themed.PText as="p">Container - Themed</Themed.PText>
                </Container>
                <Container fullWidth>
                    <Themed.PText as="p">Container - Fullwidth</Themed.PText>
                </Container>
            </div>
        </div>
    );
}
