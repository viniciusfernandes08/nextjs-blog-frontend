'use server';

import {
  CreateUserSchema,
  PublicUserDto,
  PublicUserSchema,
} from '@/lib/user/schemas';
import { apiRequest } from '@/utils/api-request';
import { handleZodErrors } from '@/utils/handle-zod-errors';
import { redirect } from 'next/navigation';

type CreateUserActionState = {
  user: PublicUserDto;
  errors: string[];
  success: boolean;
};

export async function createUserAction(
  state: CreateUserActionState,
  formData: FormData,
): Promise<CreateUserActionState> {
  if (!(formData instanceof FormData)) {
    return {
      user: state.user,
      errors: ['Dados inválidos'],
      success: false,
    };
  }

  const formObj = Object.fromEntries(formData.entries());
  const parsedFormData = CreateUserSchema.safeParse(formObj);

  if (!parsedFormData.success) {
    return {
      user: PublicUserSchema.parse(formObj),
      errors: handleZodErrors(parsedFormData.error.format()),
      success: false,
    };
  }

  const response = await apiRequest<PublicUserDto>('/user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(parsedFormData.data),
  })

  if (!response.success) {
    return {
      user: PublicUserSchema.parse(formObj),
      errors: response.errors,
      success: response.success,
    }
  }

  redirect('/login?created=1')
}