import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function AdminFeedback() {
  const supabase = await createSupabaseServerClient();
  const { data: rows } = await supabase
    .from("feedback")
    .select("id,name,email,message,created_at")
    .order("created_at", { ascending: false });

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <h1 className="text-2xl font-semibold">Feedback</h1>
      <div className="mt-6 grid gap-4">
        {rows?.map((f: any) => (
          <div key={f.id} className="rounded-lg border p-4">
            <div className="text-sm text-[color:var(--foreground)]/80">{f.name} • {f.email}</div>
            <div className="mt-2 text-sm">{f.message}</div>
            <div className="mt-1 text-xs text-[color:var(--foreground)]/60">{new Date(f.created_at).toLocaleString()}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

