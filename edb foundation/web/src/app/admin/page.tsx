import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function AdminDashboard() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login?redirect=/admin");

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Link href="/admin/programs" className="block rounded-lg border p-6 hover:border-blue-600">Manage Programs</Link>
        <Link href="/admin/news" className="block rounded-lg border p-6 hover:border-blue-600">Manage News</Link>
        <Link href="/admin/galleries" className="block rounded-lg border p-6 hover:border-blue-600">Manage Galleries</Link>
        <Link href="/admin/donations" className="block rounded-lg border p-6 hover:border-blue-600">View Donations</Link>
        <Link href="/admin/feedback" className="block rounded-lg border p-6 hover:border-blue-600">Review Feedback</Link>
      </div>
    </div>
  );
}

