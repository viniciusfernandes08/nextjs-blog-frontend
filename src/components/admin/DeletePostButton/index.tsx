'use client'

import { deletePostAction } from "@/actions/post/delete-post-action";
import { Dialog } from "@/components/Dialog";
import { Trash2Icon } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "react-toastify";

type Props = {
    id: string;
    title: string
}

export function DeletePostButton({id, title}: Props) {
    const [isPending, startTransition] = useTransition()
    const [showDialog, setShowDialog] = useState<boolean>(false)

    async function handleClick() {
      setShowDialog(true)
    }

    function handleConfirm() {
      toast.dismiss();

      startTransition(async () => {
        const result = await deletePostAction(id)
        setShowDialog(false)

        if(result.error) {
          toast.error(result.error)
          return
        }

        toast.success('Post deletado com sucesso!')
      })
    }

    return (
        <>
            {/* para pegar o svg dentro do button pode fazer com [&_svg]: */}
            <button 
              className="text-red-500 cursor-pointer [&_svg]:w-4 [&_svg]:h-4
                hover:scale-120 hover:text-red-700 disabled:text-slate-600 disabled:cursor-not-allowed"
              aria-label={`Apagar post: ${title}`}
              title={`Apagar post: ${title}`}
              onClick={handleClick}
              disabled={isPending}
            >
              <Trash2Icon />
            </button>

            {showDialog && (
              <Dialog 
                isVisible={showDialog} 
                title="Apagar post?" 
                content={`Tem certeza que deseja apagar o post ${title}`} 
                onCancel={() => setShowDialog(false)}
                onConfirm={handleConfirm}
                disabled={isPending}
              />
            )}
        </>
    )
}