'use server'

import { getLoginSessionForApi } from "@/lib/login/manage-login"
import { PublicPostForApiDto } from "@/lib/posts/schemas"
import { authenticatedApiRequest } from "@/utils/authenticated-api-request"
import { revalidateTag } from "next/cache"

export async function deletePostAction(id:string) {
    const isAuthenticated = await getLoginSessionForApi()

    if(!isAuthenticated) {
        return {
            error: 'Por favor, faça login novamente'
        }
    }
    
    if(!id || typeof id !== 'string') {
        return {
            error: 'Dados inválidos!'
        }
    }

    const postResponse = await authenticatedApiRequest<PublicPostForApiDto>(
      `/post/me/${id}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    if (!postResponse.success) {
        return {
            error: 'Erro ao encontrar post',
        }
    }

    const response = await authenticatedApiRequest<PublicPostForApiDto>(
      `/post/me/${id}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    if (!response.success) {
       return {
         error: 'Erro ao apagar post',
       };
    } 

    revalidateTag('posts')
    revalidateTag(`post-${response.data.slug}`)

    return {
        error: ''
    };
}