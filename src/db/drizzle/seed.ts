import { JsonPostRepository } from "@/repositories/post/json-post-repository"
import { drizzleDb } from "."
import { postsTable } from "./schema"

(async () => {
    const jsonPostRepository = new JsonPostRepository()
    const posts = await jsonPostRepository.findEverything()

    try {
        await drizzleDb.insert(postsTable).values(posts)

        console.log(`${posts.length} posts salvos`)
    } catch (error) {
        console.error(error)
    }
})() 