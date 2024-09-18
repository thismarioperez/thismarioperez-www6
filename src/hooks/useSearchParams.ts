import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";

export default function useSearchParams(): ParsedUrlQuery {
    const router = useRouter();
    return router.isReady ? router.query : {};
}
