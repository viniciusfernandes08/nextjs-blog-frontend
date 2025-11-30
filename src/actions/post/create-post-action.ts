'use server'

import { makePartialPublicPost, PublicPostModel } from "@/dto/post/dto"
import { verifyLoginSession } from "@/lib/login/manage-login";
import { PostCreateSchema } from "@/lib/posts/validations";
import { PostModel } from "@/models/post/post-model";
import { postRepository } from "@/repositories/post";
import { generateSlug } from "@/utils/generate-slug";
import { handleZodErrors } from "@/utils/handle-zod-errors";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { v4 as uuidv4 } from 'uuid';

type CreatePostActionState = {
  formState: PublicPostModel;
  errors: string[];
  success?: string;
}

export async function createPostAction(
    prevState: CreatePostActionState,
    formData: FormData,
): Promise<CreatePostActionState> {
    const isAuthenticated = await verifyLoginSession()

    if(!(formData instanceof FormData)) {
        return {
            formState: prevState.formState,
            errors: ['Dados inválidos']
        }
    }

    const formDataToObj = Object.fromEntries(formData.entries())
    const zodParsedObj = PostCreateSchema.safeParse(formDataToObj)

    if(!isAuthenticated) {
      return {
        formState: makePartialPublicPost(formDataToObj),
        errors: ['Faça login novamente antes de salvar'],
      }
    }
    
    if (!zodParsedObj.success) {
        const errors = handleZodErrors(zodParsedObj.error.format())
        return {
            errors,
            formState: makePartialPublicPost(formDataToObj)
        }
    }

    const validPostData = zodParsedObj.data
    const newPost: PostModel = {
        ...validPostData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        id: uuidv4(),
        slug: generateSlug(validPostData.title),
    }

    try {
        await postRepository.create(newPost)
    } catch (error: unknown) {
        if (error instanceof Error) {
            return {
                formState: newPost,
                errors: [error.message]
            }
        }

        return {
            formState: newPost,
            errors: ['Erro desconhecido']
        }
    }

    revalidateTag('posts')
    redirect(`/admin/post/${newPost.id}?created=1`)
}