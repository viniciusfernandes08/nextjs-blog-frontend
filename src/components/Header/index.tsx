import Link from 'next/link';

export function Header() {
    return (
        <header>
            <h1 className="text-4xl py-[10%] font-extrabold md:text-6xl lg:text-7xl">
                <Link href="/">The Blog</Link>
            </h1>
        </header>
    )
}