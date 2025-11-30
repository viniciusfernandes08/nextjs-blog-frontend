'use client'

import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { InputCheckbox } from "@/components/InputCheckbox";
import { MarkdownEditor } from "@/components/MarkdownEditor";
import { useActionState, useEffect, useState } from "react";
import { ImageUploader } from "../ImageUploader";
import { makePartialPublicPost, PublicPostModel } from "@/dto/post/dto";
import { createPostAction } from "@/actions/post/create-post-action";
import { toast } from "react-toastify";
import { updatePostAction } from "@/actions/post/update-post-action";
import { useRouter, useSearchParams } from "next/navigation";

type UpdateProps = {
  mode: 'update'
  publicPost: PublicPostModel
}

type CreateProps = {
  mode: 'create'
}

type Props = UpdateProps | CreateProps

export function ManagePostForm(props: Props) {
  const { mode } = props
  const searchParams = useSearchParams()
  const created = searchParams.get('ceated')
  const router = useRouter()

  let publicPost
  if (mode === 'update') {
    publicPost = props.publicPost
  }
  
  const actions = {
    update: updatePostAction,
    create: createPostAction
  }

  const initialState = {
    formState: makePartialPublicPost(publicPost),
    errors: [],
  }
  const [state, action, isPending] = useActionState(
    actions[mode], 
    initialState
  )
  const { formState } = state
  const [contentValue, setContentValue] = useState(publicPost?.content || '')

  useEffect(() => {
    if(state.errors.length > 0) {
      toast.dismiss()
      state.errors.forEach(error => toast.error(error))
    }
  }, [state.errors])

  useEffect(() => {
    if(state.success) {
      toast.dismiss()
      toast.success('Post atualizado com sucesso')
    }
  }, [state.success])

  useEffect(() => {
    if(created === '1') {
      toast.dismiss()
      toast.success('Post criado com sucesso')
      const url = new URL(window.location.href)
      url.searchParams.delete('created')
      router.replace(url.toString())
    }
  }, [created, router])

    return (
        <form action={action} className="mb-16">
            <div className="flex flex-col gap-5">
              <Input
                labelText="ID"
                name="id"
                placeholder="ID gerado automaticamente"
                type="text"
                defaultValue={formState.id}
                readOnly 
                disabled={isPending}
              />

              <Input
                labelText="Slug"
                name="slug"
                placeholder="Slug gerada automaticamente"
                type="text"
                defaultValue={formState.slug}
                readOnly 
                disabled={isPending}
              />

              <Input
                labelText="Autor"
                name="author"
                placeholder="Digite o nome do autor"
                type="text"
                defaultValue={formState.author}
                disabled={isPending}
              />

              <Input
                labelText="Título"
                name="title"
                placeholder="Digite o título"
                type="text"
                defaultValue={formState.title}
                disabled={isPending}
              />

              <Input
                labelText="Excerto"
                name="excerpt"
                placeholder="Digite o resumo"
                type="text"
                defaultValue={formState.excerpt}
                disabled={isPending}
              />

              <MarkdownEditor
                labelText="Conteúdo"
                value={contentValue}
                setValue={setContentValue}
                textAreaName="content"
                disabled={isPending} 
              />

              <ImageUploader disabled={isPending} />

              <Input
                labelText="Url da imagem de capa"
                name="coverImageUrl"
                placeholder="Digite a URL da imagem"
                type="text"
                defaultValue={formState.coverImageUrl}
                disabled={isPending}
              />

              <InputCheckbox
                labelText="Publicar?"
                name="published"
                type="checkbox" 
                defaultChecked={formState.published}
                disabled={isPending}
              />
        
              <div className="mt-4">
                <Button type="submit" variant="default" disabled={isPending}>
                  Enviar
                </Button>
              </div>
            </div>
        </form>
    )
}