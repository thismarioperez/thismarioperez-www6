import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";

function getPathname(path: string) {
    return new URL(`http://_${path}`).pathname;
}

export default function useParsedPathname() {
    const { asPath } = useRouter();
    const [parsedPathname, setParsedPathname] = useState(getPathname(asPath));
    const memoizedParsedPathname = useMemo(
        () => parsedPathname,
        [parsedPathname]
    );

    useEffect(() => {
        setParsedPathname(getPathname(asPath));
    }, [asPath]);

    return memoizedParsedPathname;
}
