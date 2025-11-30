import clsx from "clsx";
import { useId } from "react";

type Props = {
    labelText?: string;
    type?: 'checkbox';
} & React.ComponentProps<'input'>

export function InputCheckbox({
  labelText = '',
  type = 'checkbox',
  ...props
}: Props) {
  const id = useId()

  return (
    <div className="flex items-center gap-2">
        <input 
          {...props}
          className={clsx(
            'w-4 h-4 outline-none', 
            props.className
          )}
          id={id}
          type={type}
        />

        {labelText && (
          <label className="text-sm md:text-base">
              {labelText}
          </label>
        )}
    </div>
  )
}