import Link from "next/link";

export default function Header() {
    return (
        <header className="pointer-events-auto">
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            <Link href="/projects/robin-knows">Projects - Robin Knows</Link>
        </header>
    );
}
