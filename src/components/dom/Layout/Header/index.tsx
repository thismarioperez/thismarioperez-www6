import Logo from "./Logo";
import MenuButton from "./MenuButton";

export default function Header() {
    return (
        <header className="pointer-events-auto w-full sticky top-0 left-0">
            <ul className="relative w-full flex flex-row justify-between p-6 md:p-8">
                <li>
                    <Logo />
                </li>
                <li>
                    <MenuButton />
                </li>
            </ul>
        </header>
    );
}
