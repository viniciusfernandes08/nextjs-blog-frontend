import Image from "next/image"
import { PostHeading } from "../PostHeading"
import { PostDate } from "../PostDate"
import { SafeMarkdown } from "../SafeMarkdown"
import { findPublicPostBySlugFromApiCached } from "@/lib/posts/queries/public"
import { notFound } from "next/navigation"

interface SinglePostProps {
    slug: string
}

export async function SinglePost({slug}: SinglePostProps) {
    const res = await findPublicPostBySlugFromApiCached(slug);

    if (!res.success) {
        notFound();
    }

    const post = res.data;

    return (
        <article>
            <header className="flex flex-col gap-4 mb-4">
                <Image
                  src={post.coverImageUrl}
                  width={1200}
                  height={720}
                  alt={post.title}
                />

                <PostHeading url={`/post/${post.slug}`}>{post.title}</PostHeading>

                <p>{post.author.name} | <PostDate datetime={post.createdAt} /></p>
            </header>

            <p className="text-xl mb-4">{post.excerpt}</p>

            <SafeMarkdown markdown={post.content} />
        </article>
    )
}