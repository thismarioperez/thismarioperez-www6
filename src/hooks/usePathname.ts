import { useRouter } from "next/router";

export default function usePathname(): string {
    const router = useRouter();
    return router.pathname;
}
