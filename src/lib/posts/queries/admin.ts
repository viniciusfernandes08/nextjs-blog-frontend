import { PostModelFromApi } from "@/models/post/post-model";
import { postRepository } from "@/repositories/post";
import { authenticatedApiRequest } from "@/utils/authenticated-api-request";
import { cache } from "react";

export const findByIdAdmin = cache(
  async(id: string) => {
    return await postRepository.findById(id)
  }
)

export const findPostByIdFromApiAdmin = cache(async (id: string) => {
  const response = await authenticatedApiRequest<PostModelFromApi>(
    `/post/me/${id}`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    },
  );

  return response;
})

export const findAllPostAdmin = cache(
  async() => {
    return await postRepository.findAll()
  }
)

export const findAllPostFromApiAdmin = cache(async () => {
  const response = await authenticatedApiRequest<PostModelFromApi[]>(
    `/post/me/`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    },
  );

  return response;
});