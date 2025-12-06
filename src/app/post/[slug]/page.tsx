import { SinglePost } from "@/components/SinglePost";
import { SpinLoader } from "@/components/SpinLoader";
import { findPublicPostBySlugFromApiCached } from "@/lib/posts/queries/public";
import { Metadata } from "next";
import { Suspense } from "react";

interface PostSlugPageProps {
  params: Promise<{ slug: string}>
}

export async function generateMetadata({params}: PostSlugPageProps): Promise<Metadata> {
  const {slug} = await params

  const res = await findPublicPostBySlugFromApiCached(slug)

  if (!res.success) {
    return {}
  }

  const post = res.data;

  return {
    title: post.title,
    description: post.excerpt
  }
}

export default async function PostSlugPage({params}: PostSlugPageProps) {
    const { slug } = await params

    return (
      <Suspense fallback={<SpinLoader className="min-h-20 mb-16" />}>
        <SinglePost slug={slug} />
      </Suspense>
    )
}