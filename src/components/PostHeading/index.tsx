import Link from "next/link";

interface PostHeadingProps {
    children: React.ReactNode
    url: string
    as?: 'h1' | 'h2'
}

export function PostHeading({children, url, as: Tag = 'h2'}: PostHeadingProps) {
    const headingClasses = {
        h1: 'text-2xl/tight font-extrabold sm:text-4xl',
        h2: 'text-2xl/tight font-bold',
    }

    return (
        <Tag className={headingClasses[Tag]}>
            <Link className="group-hover:text-slate-600 transition" href={url}>{children}</Link>
        </Tag>
    )
}