import { getServerSession } from "next-auth/next";
import { redirect } from 'next/navigation'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession();
  if (!session || !session.user) {
    redirect('api/auth/signin')
  }
  return <section>{children}</section>
}