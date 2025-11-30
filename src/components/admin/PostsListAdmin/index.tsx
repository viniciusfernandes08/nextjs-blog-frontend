import { findAllPostAdmin } from "@/lib/posts/queries/admin"
import Link from "next/link"
import { DeletePostButton } from "../DeletePostButton"
import { ErrorMessage } from "../../ErrorMessage"

export default async function PostsListAdmin() {
    const posts = await findAllPostAdmin()

    if(posts.length <= 0) {
      return (
        <ErrorMessage
          contentTitle="Ei"
          content="Bora criar um post?" 
        />
      )
    }

    return (
      <div className="py-10 text-6xl">
        {posts.map(post => {
            return (
              <div key={post.id} 
                className={`${!post.published && 'bg-slate-300'} flex gap-2 
                  items-center justify-between py-2 px-2 text-base`}>

                <Link href={`/admin/post/${post.id}`}>{post.title}</Link>

                {!post.published && (
                  <p className="text-xs text-slate-600 italic">(Não publicado)</p>
                )}

                <DeletePostButton id={post.id} title={post.title} />
              </div>
            )
        })}
      </div>
    )
}