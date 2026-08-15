import { redirect } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { getAdminUser } from "@/lib/admin/auth";
import { AdminNav } from "@/components/admin/AdminNav";

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const admin = await getAdminUser();
  if (!admin) redirect("/admin/login");

  return (
    <div className="admin">
      <AdminNav email={admin.email} />
      <div className="admin__wrap">{children}</div>
    </div>
  );
}
