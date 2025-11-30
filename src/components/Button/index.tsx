import clsx from 'clsx';

type ButtonVariants = 'default' | 'ghost' | 'danger' | 'null'
type ButtonSizes = 'sm' | 'md' | 'lg'

type Props = {
  children: React.ReactNode
  variant: ButtonVariants
  size?: ButtonSizes
} & React.ComponentProps<'button'>

export function Button({
  children, 
  variant='default', 
  size='md', 
  ...props
}: Props) {
  const buttonVariants: Record<ButtonVariants, string> = {
    default: clsx('bg-blue-600 text-white hover:bg-blue-700'),
    ghost: clsx('bg-slate-200 text-slate-900 hover:bg-gray-300'),
    danger: clsx('bg-red-600 text-white hover:bg-red-700'),
    null: clsx(''),
  }

  const buttonSizes: Record<ButtonSizes, string> = {
    sm: clsx(
      'text-xs/tight',
      'py-1 px-2',
      'rounded-sm',
      '[&_svg]:w-3 [&_svg]:h-3 gap-1',
    ),
    md: clsx(
      'text-base/tight',
      'py-2 px-4',
      'rounded-md',
      '[&_svg]:w-4 [&_svg]:h-4 gap-2',
    ),
    lg: clsx(
      'text-lg/tight',
      'py-3 px-6',
      'rounded-lg',
      '[&_svg]:w-5 [&_svg]:h-5 gap-2.5',
    ),
  }

  const buttonClasses = clsx(
    buttonVariants[variant], 
    buttonSizes[size],
    'flex items-center justify-center cursor-pointer',
    'transition ease-in-out',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    props.className,
  )

  return (
    <button 
      {...props}
      className={buttonClasses} 
    >
      {children}
    </button>
  )
}