// import 'server-only';  - também dá para usar o server-only no lugar da verificação de window 
import { getLoginSessionForApi } from "@/lib/login/manage-login";
import { apiRequest, ApiRequest } from "./api-request";

export async function authenticatedApiRequest<T>(
    path: string,
    options?: RequestInit, 
): Promise<ApiRequest<T>> {
    if (typeof window !== 'undefined') {
        throw new Error(
            'authenticatedApiRequest only works on server side'
        )
    }

    const jwtToken = await getLoginSessionForApi();

    if (!jwtToken) {
    return {
      success: false,
      errors: ['Usuário não autenticado'],
      status: 401,
    };
  }

  const headers = {
    ...options?.headers,
    Authorization: `Bearer ${jwtToken}`,
  };

  return apiRequest<T>(path, {
    ...options,
    headers,
  });
}