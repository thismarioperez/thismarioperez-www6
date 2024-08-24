"use client";

import { useCallback, useEffect } from "react";

import { useRouter } from "next/router";
import useSearchParams from "./useSearchParams";

type TReturn = [boolean, (arg: boolean) => void];

export default function useDebug(): TReturn {
    const searchParams = useSearchParams();
    const router = useRouter();
    const debug: boolean = Boolean(searchParams["debug"]);

    const createQueryString = useCallback(
        (name: string, value: boolean) => {
            const params = new URLSearchParams(searchParams);
            if (value) {
                params.set(name, `${value}`);
            } else {
                params.delete(name);
            }
            return params.toString();
        },
        [searchParams]
    );

    const setDebug = useCallback(
        (value: boolean) => {
            const queryString = createQueryString("debug", value);
            router.push(`?${queryString}`);
        },
        [router, createQueryString]
    );

    useEffect(() => {
        console.log(`Debug mode: ${debug ? "on" : "off"}`);
    }, [debug]);

    return [debug, setDebug];
}
