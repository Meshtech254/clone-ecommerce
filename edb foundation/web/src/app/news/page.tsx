import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function NewsPage() {
  const supabase = await createSupabaseServerClient();
  const { data: news } = await supabase
    .from("news")
    .select("id,title,body,created_at")
    .order("created_at", { ascending: false });

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <h1 className="text-2xl font-semibold">News & Announcements</h1>
      <div className="mt-6 grid gap-6">
        {news?.map((n: any) => (
          <article key={n.id} className="rounded-lg border p-4">
            <div className="text-xs text-[color:var(--foreground)]/60">{new Date(n.created_at).toLocaleDateString()}</div>
            <h2 className="text-lg font-semibold mt-1">{n.title}</h2>
            <p className="text-sm text-[color:var(--foreground)]/80 mt-2">{n.body}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

