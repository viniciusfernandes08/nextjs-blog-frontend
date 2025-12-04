'use server'

import { LoginSchema } from "@/lib/login/schemas";
import { apiRequest } from "@/utils/api-request";
import { asyncDelay } from "@/utils/async-delay";
import { handleZodErrors } from "@/utils/handle-zod-errors";

type LoginActionState = {
  email: string;
  errors: string[];
}

export async function loginAction(state: LoginActionState, formData: FormData) {
    const allowLogin = Boolean(Number(process.env.ALLOW_LOGIN))

    if(!allowLogin) {
        return {
            email: '',
            errors: ['Login not allowed']
        }
    }

    await asyncDelay(5000)

    if(!(formData instanceof FormData)) {
        return {
            email: '',
            errors: ['Dados inválidos']
        }
    }

    const formObj = Object.fromEntries(formData.entries())
    const formEmail = formObj.email?.toString() || ''
    const parsedFormData = LoginSchema.safeParse(formObj)

    if(!parsedFormData.success) {
        return {
            email: formEmail, 
            errors: handleZodErrors(parsedFormData.error.format())
        }
    }

    const response = await apiRequest<{ accessToken: string}>(
        '/auth/login', 
        {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(parsedFormData.data),
        }
    )
    
    if (!response.success) {
        return {
            email: formEmail,
            errors: response.errors
        }
    }

    // await createLoginSession(username)
    // redirect('/admin/post')

    return {
        email: formEmail,
        errors: ['Success']
    }
}