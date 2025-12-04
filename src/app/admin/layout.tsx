import { MenuAdmin } from "@/components/admin/MenuAdmin"
import { requireLoginSessionForApiOrRedirect } from "@/lib/login/manage-login"

type Props = {
    children: React.ReactNode
}

export default async function AdminPostLayout({children}: Readonly<Props>) {
    await requireLoginSessionForApiOrRedirect()
    
    return (
        <>
          <MenuAdmin />
          {children}
        </>
    )
}