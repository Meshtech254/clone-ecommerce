import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function GalleriesPage() {
  const supabase = await createSupabaseServerClient();
  const { data: items } = await supabase
    .from("gallery_items")
    .select("id,type,url,caption")
    .eq("is_published", true)
    .order("created_at", { ascending: false });

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <h1 className="text-2xl font-semibold">Galleries</h1>
      <div className="mt-6 grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {items?.map((item: any) => (
          <figure key={item.id} className="rounded-lg overflow-hidden border">
            {item.type === "video" ? (
              <video controls className="w-full aspect-video">
                <source src={item.url} />
              </video>
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={item.url} alt={item.caption ?? ""} className="w-full h-full object-cover" />
            )}
            {item.caption && <figcaption className="p-2 text-xs text-center">{item.caption}</figcaption>}
          </figure>
        ))}
      </div>
    </div>
  );
}

