interface ErrorMessageProps {
  pageTitle?: string
  contentTitle: string
  content: React.ReactNode
}

export function ErrorMessage({pageTitle = '', contentTitle, content}: ErrorMessageProps) {
    return (
        <>
          {pageTitle && <title>{pageTitle}</title>}
          <div className="flex justify-center items-center min-h-[320px] bg-slate-900 
          text-slate-100 mb-16 p-8 rounded-xl text-center">
              <div>
                  <h1 className="text-4xl/tight mg-16 font-extrabold md:text-7xl">{contentTitle}</h1>
                  <p>
                      {content}
                  </p>
              </div>
          </div>
        </>
    )
}