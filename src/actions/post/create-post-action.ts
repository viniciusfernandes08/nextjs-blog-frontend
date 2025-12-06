'use server'

import { getLoginSessionForApi } from "@/lib/login/manage-login";
import { CreatePostForApiSchema, PublicPostForApiDto, PublicPostForApiSchema } from "@/lib/posts/schemas";
import { authenticatedApiRequest } from "@/utils/authenticated-api-request";
import { handleZodErrors } from "@/utils/handle-zod-errors";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

type CreatePostActionState = {
  formState: PublicPostForApiDto;
  errors: string[];
  success?: string;
}

export async function createPostAction(
    prevState: CreatePostActionState,
    formData: FormData,
): Promise<CreatePostActionState> {
    const isAuthenticated = await getLoginSessionForApi()

    if(!(formData instanceof FormData)) {
        return {
            formState: prevState.formState,
            errors: ['Dados inválidos']
        }
    }

    const formDataToObj = Object.fromEntries(formData.entries())
    const zodParsedObj = CreatePostForApiSchema.safeParse(formDataToObj)

    if(!isAuthenticated) {
      return {
        formState: PublicPostForApiSchema.parse(formDataToObj),
        errors: ['Faça login novamente antes de salvar'],
      }
    }
    
    if (!zodParsedObj.success) {
        const errors = handleZodErrors(zodParsedObj.error.format())
        return {
            errors,
            formState: PublicPostForApiSchema.parse(formDataToObj)
        }
    }

    const newPost = zodParsedObj.data;

    const response = await authenticatedApiRequest<PublicPostForApiDto>(
      `/post/me`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPost),
      },
    );

    if (!response.success) {
        return {
            formState: PublicPostForApiSchema.parse(formDataToObj),
            errors: response.errors,
        }
    }

    const createdPost = response.data;

    revalidateTag('posts')
    redirect(`/admin/post/${createdPost.id}?created=1`)
}