import { useContext, useEffect, useRef } from "react";
import { SwitchTransition, Transition } from "react-transition-group";
import { useRouter } from "next/router";
import { gsap } from "@/lib/gsap";

import TransitionContext from "@/context/TransitionContext";
import useParsedPathname from "@/hooks/useParsedPathname";
import useSliderState from "@/hooks/useSliderState";

export type TTransitionComponentProps = {} & React.PropsWithChildren;
const TransitionComponent = ({ children }: TTransitionComponentProps) => {
    const { setSlideByName } = useSliderState();
    const router = useRouter();
    const parsedPathname = useParsedPathname();
    const { toggleCompleted } = useContext(TransitionContext);
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
            default:
                setSlideByName("cube-scene");
                break;
        }
    }, [parsedPathname]);

    return (
        <SwitchTransition>
            <Transition
                key={router.pathname}
                timeout={500}
                nodeRef={node}
                onEnter={() => {
                    toggleCompleted(false);
                    gsap.set(node.current, {
                        autoAlpha: 0,
                    });
                    gsap.timeline({
                        paused: true,
                        onComplete: () => toggleCompleted(true),
                    })
                        .to(node.current, {
                            autoAlpha: 1,
                        })
                        .to(node.current, { duration: 0.25 })
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
                <main className="js-content-wrapper" ref={node}>
                    {children}
                </main>
            </Transition>
        </SwitchTransition>
    );
};

export default TransitionComponent;
