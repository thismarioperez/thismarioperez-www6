import Link from "@/components/dom/common/Link";

import { ReactComponent as LogoWithText } from "@/svg/logo.svg";
import { ReactComponent as LogoMark } from "@/svg/logo-mark.svg";

export default function Logo() {
    return (
        <Link href="/" aria-label="Home">
            <div className="w-72">
                <LogoWithText className="fill-white" />
            </div>
            <div className="w-8">
                <LogoMark className="fill-white" />
            </div>
        </Link>
    );
}
