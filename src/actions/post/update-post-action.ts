'use server'

import { makePartialPublicPost, makePublicPostFromDb, PublicPostModel } from "@/dto/post/dto"
import { verifyLoginSession } from "@/lib/login/manage-login";
import { PostUpdateSchema } from "@/lib/posts/validations";
import { postRepository } from "@/repositories/post";
import { generateRandomString } from "@/utils/generate-random-string";
import { handleZodErrors } from "@/utils/handle-zod-errors";
import { revalidateTag } from "next/cache";

type UpdatePostActionState = {
  formState: PublicPostModel;
  errors: string[];
  success?: string;
}

export async function updatePostAction(
    prevState: UpdatePostActionState,
    formData: FormData,
): Promise<UpdatePostActionState> {
    const isAuthenticated = await verifyLoginSession()

    if(!(formData instanceof FormData)) {
        return {
            formState: prevState.formState,
            errors: ['Dados inválidos']
        }
    }

    const id = formData.get('id') || ''

    if (!id || typeof id !== 'string') {
        return {
            formState: prevState.formState,
            errors: ['ID inválido']
        }
    }

    const formDataToObj = Object.fromEntries(formData.entries())
    const zodParsedObj = PostUpdateSchema.safeParse(formDataToObj)

    if(!isAuthenticated) {
      return {
        formState: makePartialPublicPost(formDataToObj),
        errors: ['Faça login novamente antes de salvar'],
      }
    }

    const partialPublicPost = makePartialPublicPost(formDataToObj)

    if (!zodParsedObj.success) {
        const errors = handleZodErrors(zodParsedObj.error.format())
        return {
            errors,
            formState: partialPublicPost
        }
    }

    const validPostData = zodParsedObj.data
    const newPost = {
        ...validPostData,
    }

    let post;
    try {
        post = await postRepository.update(id, newPost)
    } catch (error: unknown) {
        if (error instanceof Error) {
            return {
                formState: partialPublicPost,
                errors: [error.message]
            }
        }

        return {
            formState: partialPublicPost,
            errors: ['Erro desconhecido']
        }
    }

    revalidateTag('posts')
    revalidateTag(`post-${post.slug}`)

    return {
        formState: makePublicPostFromDb(post),
        errors: [],
        success: generateRandomString()
    }
}