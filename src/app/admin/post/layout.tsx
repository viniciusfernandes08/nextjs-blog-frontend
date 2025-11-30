import { MenuAdmin } from "@/components/admin/MenuAdmin"
import { requireLoginSessionOrRedirect } from "@/lib/login/manage-login"

type Props = {
    children: React.ReactNode
}

export default async function AdminPostLayout({children}: Props) {
    await requireLoginSessionOrRedirect()
    
    return (
        <>
          <MenuAdmin />
          {children}
        </>
    )
}