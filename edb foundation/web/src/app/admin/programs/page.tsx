import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function AdminPrograms() {
  const supabase = await createSupabaseServerClient();
  const { data: programs } = await supabase
    .from("programs")
    .select("id,title,status,created_at")
    .order("created_at", { ascending: false });

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Programs</h1>
        <Link href="/admin/programs/new" className="rounded-md bg-blue-600 text-white px-4 py-2">New Program</Link>
      </div>
      <div className="mt-6 grid gap-4">
        {programs?.map((p: any) => (
          <Link key={p.id} href={`/admin/programs/${p.id}`} className="rounded-lg border p-4 flex items-center justify-between">
            <div>
              <div className="text-sm uppercase text-blue-600">{p.status}</div>
              <div className="font-medium">{p.title}</div>
            </div>
            <div className="text-xs text-[color:var(--foreground)]/60">{new Date(p.created_at).toLocaleString()}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}

