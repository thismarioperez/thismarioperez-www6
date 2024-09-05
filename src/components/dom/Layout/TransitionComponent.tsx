import { useEffect, useMemo, useRef } from "react";
import { SwitchTransition, Transition } from "react-transition-group";
import { useRouter } from "next/router";
import { gsap } from "@/lib/gsap";

import useParsedPathname from "@/hooks/useParsedPathname";
import useSliderState from "@/hooks/useSliderState";
import useTransitionState from "@/hooks/useTransitionState";

export type TTransitionComponentProps = {} & React.PropsWithChildren;
const TransitionComponent = ({ children }: TTransitionComponentProps) => {
    const { setSlideByName } = useSliderState();
    const router = useRouter();
    const parsedPathname = useParsedPathname();
    const { setTransitionCompleted } = useTransitionState();
    const node = useRef(null);

    useEffect(() => {
        switch (parsedPathname) {
            case "/":
                setSlideByName("logo-scene");
                break;
            case "/about":
                setSlideByName("media-scene-1");
                break;
            case "/projects/robin-knows":
                setSlideByName("media-scene-2");
                break;
            case "/projects/fbi-safe-online-surfing":
                setSlideByName("media-scene-3");
                break;
            case "/projects/triptych":
                setSlideByName("media-scene-4");
                break;
            case "/projects/rodda-construction":
                setSlideByName("media-scene-5");
                break;
            default:
                setSlideByName("cube-scene");
                break;
        }

        console.log(`Page: ${parsedPathname}`);
    }, [parsedPathname]);

    return (
        <SwitchTransition>
            <Transition
                key={router.pathname}
                timeout={{
                    enter: 1000,
                    exit: 200,
                }}
                nodeRef={node}
                mountOnEnter
                unmountOnExit
                onEnter={() => {
                    setTransitionCompleted(false);
                    gsap.set(node.current, {
                        autoAlpha: 0,
                    });
                    gsap.timeline({
                        paused: true,
                        onComplete: () => {
                            setTransitionCompleted(true);
                        },
                    })
                        .to(node.current, {
                            autoAlpha: 1,
                            duration: 0.25,
                            delay: 0.75,
                        })
                        .play();
                }}
                onExit={() => {
                    gsap.timeline({ paused: true })
                        .to(node.current, {
                            autoAlpha: 0,
                            duration: 0.2,
                        })
                        .play();
                }}
            >
                <main className="js-content-wrapper pt-8" ref={node}>
                    {children}
                </main>
            </Transition>
        </SwitchTransition>
    );
};

export default TransitionComponent;
