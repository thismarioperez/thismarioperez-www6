import { useContext, useRef } from "react";
import { SwitchTransition, Transition } from "react-transition-group";
import { useRouter } from "next/router";
import { gsap } from "@/lib/gsap";

import TransitionContext from "@/context/TransitionContext";
import Header from "./Layout/Header";

export type TTransitionComponentProps = {} & React.PropsWithChildren;
const TransitionComponent = ({ children }: TTransitionComponentProps) => {
    const router = useRouter();
    const { toggleCompleted } = useContext(TransitionContext);
    const node = useRef(null);

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
