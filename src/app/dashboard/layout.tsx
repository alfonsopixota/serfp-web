import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import DashboardSidebar from "@/components/DashboardSidebar";

export const metadata = {
  title: "Dashboard — SerFP",
  robots: { index: false, follow: false },
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authed = await isAuthenticated();
  if (!authed) redirect("/login");

  return (
    <div className="min-h-screen flex bg-slate-50">
      <DashboardSidebar />
      <main className="flex-1 p-6 lg:p-8 overflow-auto">
        {children}
      </main>
    </div>
  );
}
