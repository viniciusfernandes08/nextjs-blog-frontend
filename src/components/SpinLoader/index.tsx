interface SpinLoaderProps {
    className?: string
}

export function SpinLoader({className}: SpinLoaderProps) {
    return (
        <div className={`${className} flex items-center justify-center`}>
            <div className="w-10 h-10 border-5 border-t-transparent 
              border-slate-900 rounded-full animate-spin">
            </div>
        </div>
    )
}