'use client'

import dynamic from "next/dynamic"
import { Dispatch, SetStateAction, useId } from "react";
import rehypeSanitize from "rehype-sanitize";
import remarkGfm from "remark-gfm";

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), {
  ssr: false,
})

type Props = {
    labelText?: string;
    value: string;
    setValue: Dispatch<SetStateAction<string>>;
    textAreaName: string;
    disabled?: boolean
}

export function MarkdownEditor({
  value,
  textAreaName,
  labelText,
  disabled,
  setValue,
}: Props) {
    const id = useId()

    return (
        <div className="flex flex-col gap-2">
            {labelText && (
                <label className="text-sm md:text-base" htmlFor={id}>
                    {labelText}
                </label>
            )}

            <MDEditor
              className="whitespace-pre-wrap"
              value={value}
              onChange={(value) => {
                if(value === undefined) return
                setValue(value)
              }}
              height={400}
              extraCommands={[]}
              preview="edit"
              hideToolbar={disabled}
              textareaProps={{
                id,
                name: textAreaName,
                disabled: disabled,
              }} 
              data-color-mode="light"
              previewOptions={{
                rehypePlugins: [[rehypeSanitize]],
                remarkPlugins: [[remarkGfm]],
              }}
            />

        </div>
    )
}