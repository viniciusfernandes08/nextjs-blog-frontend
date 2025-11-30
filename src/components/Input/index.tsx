import clsx from "clsx"
import { useId } from "react"

type Props = {
    labelText?: string
} & React.ComponentProps<'input'>

export function Input({ labelText = '', ...props }: Props) {
    const id = useId() //gera um id para cada vez que chamo o Input

    return (
        <div className="flex flex-col gap-">
          {labelText && (
            <label 
              htmlFor={id} 
              className="text-sm md:text-base"
            >
              {labelText}
            </label>
          )}
          <input 
            {...props}
            className={clsx(
                'bg-white outline-none text-base/tight border-2 border-[#ccc]',
                'rounded p-2',
                'transition ease-in-out',
                'placeholder-slate-400 disabled:bg-slate-300',
                'disabled:placeholder-slate-400',
                'disabled:text-slate-400',
                'read-only:bg-slate-300',
                props.className,
            )}
            id={id} 
          />
        </div>
    )
}