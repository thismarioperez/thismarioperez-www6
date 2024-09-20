import { useEffect, useMemo, useRef } from "react";
import { SwitchTransition, Transition } from "react-transition-group";
import { useRouter } from "next/router";
import { gsap } from "@/lib/gsap";

import useParsedPathname from "@/hooks/useParsedPathname";
import useSliderState from "@/hooks/useSliderState";
import useTransitionState from "@/hooks/useTransitionState";
import { getSceneByPathname } from "@/lib/content";

export type TTransitionComponentProps = {} & React.PropsWithChildren;
const TransitionComponent = ({ children }: TTransitionComponentProps) => {
    const { setSlideByName } = useSliderState();
    const router = useRouter();
    const parsedPathname = useParsedPathname();
    const { setTransitionCompleted } = useTransitionState();
    const node = useRef(null);

    useEffect(() => {
        if (getSceneByPathname(parsedPathname)) {
            setSlideByName(getSceneByPathname(parsedPathname)!);
        } else {
            setSlideByName("lava-lamp-scene");
        }

        // console.log(`Page: ${parsedPathname}`);
    }, [parsedPathname]);

    return (
        <SwitchTransition>
            <Transition
                key={router.pathname}
                timeout={{
                    enter: 1250,
                    exit: 200,
                }}
                nodeRef={node}
                mountOnEnter
                unmountOnExit
                onEnter={() => {
                    setTransitionCompleted(false);
                    gsap.set(node.current, {
                        autoAlpha: 0,
                        y: 200,
                    });
                    gsap.timeline({
                        paused: true,
                        onComplete: () => {
                            setTransitionCompleted(true);
                        },
                    })
                        .to(node.current, {
                            autoAlpha: 1,
                            y: 0,
                            duration: 0.25,
                            delay: 1,
                        })
                        .play();
                }}
                onExit={() => {
                    gsap.timeline({ paused: true })
                        .to(node.current, {
                            autoAlpha: 0,
                            y: 200,
                            duration: 0.2,
                        })
                        .play();
                }}
            >
                <div
                    className="js-content-wrapper size-full flex-1 h-fit"
                    ref={node}
                >
                    {children}
                </div>
            </Transition>
        </SwitchTransition>
    );
};

export default TransitionComponent;
