import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function ProgramsPage() {
  const supabase = await createSupabaseServerClient();
  const { data: programs } = await supabase
    .from("programs")
    .select("id,title,description,images,status")
    .order("created_at", { ascending: false });

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <h1 className="text-2xl font-semibold">Programs</h1>
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {programs?.map((p: any) => (
          <div key={p.id} className="rounded-lg border p-4">
            <div className="text-sm uppercase text-blue-600">{p.status}</div>
            <h2 className="mt-1 text-lg font-semibold">{p.title}</h2>
            <p className="mt-2 text-sm text-[color:var(--foreground)]/80">{p.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

