'use server'

import { getLoginSessionForApi } from "@/lib/login/manage-login";
import { PublicPostForApiDto, PublicPostForApiSchema, UpdatePostForApiSchema } from "@/lib/posts/schemas";
import { authenticatedApiRequest } from "@/utils/authenticated-api-request";
import { generateRandomString } from "@/utils/generate-random-string";
import { handleZodErrors } from "@/utils/handle-zod-errors";
import { revalidateTag } from "next/cache";

type UpdatePostActionState = {
  formState: PublicPostForApiDto;
  errors: string[];
  success?: string;
}

export async function updatePostAction(
    prevState: UpdatePostActionState,
    formData: FormData,
): Promise<UpdatePostActionState> {
    const isAuthenticated = await getLoginSessionForApi()

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
    const zodParsedObj = UpdatePostForApiSchema.safeParse(formDataToObj)

    if(!isAuthenticated) {
      return {
        formState: PublicPostForApiSchema.parse(formDataToObj),
        errors: ['Faça login novamente antes de salvar'],
      }
    }

    const partialPublicPost = PublicPostForApiSchema.parse(formDataToObj)

    if (!zodParsedObj.success) {
        const errors = handleZodErrors(zodParsedObj.error.format())
        return {
            errors,
            formState: partialPublicPost
        }
    }

    const newPost = zodParsedObj.data;

    const response = await authenticatedApiRequest<PublicPostForApiDto>(
      `/post/me/${id}`,
      {
        method: 'PATCH',
        body: JSON.stringify(newPost),
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    if (!response.success) {
        return {
          formState: PublicPostForApiSchema.parse(formDataToObj),
          errors: response.errors,
        }
    }

    const post = response.data;

    revalidateTag('posts')
    revalidateTag(`post-${post.slug}`)

    return {
        formState: PublicPostForApiSchema.parse(post),
        errors: [],
        success: generateRandomString()
    }
}