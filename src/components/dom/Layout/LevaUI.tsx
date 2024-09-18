import { Leva } from "leva";
import useDebug from "@/hooks/useDebug";

export default function LevaUI() {
    const [debug] = useDebug();
    return <Leva hidden={!debug} />;
}
