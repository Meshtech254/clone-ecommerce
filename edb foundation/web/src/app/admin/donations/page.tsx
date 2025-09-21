import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function AdminDonations() {
  const supabase = await createSupabaseServerClient();
  const { data: donations } = await supabase
    .from("donations")
    .select("id,amount,currency,status,provider,provider_session_id,created_at")
    .order("created_at", { ascending: false });

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <h1 className="text-2xl font-semibold">Donations</h1>
      <div className="mt-6 overflow-auto rounded-lg border">
        <table className="w-full text-sm">
          <thead className="bg-black/5 dark:bg-white/5">
            <tr>
              <th className="text-left p-3">Date</th>
              <th className="text-left p-3">Amount</th>
              <th className="text-left p-3">Status</th>
              <th className="text-left p-3">Provider</th>
              <th className="text-left p-3">Session</th>
            </tr>
          </thead>
          <tbody>
            {donations?.map((d: any) => (
              <tr key={d.id} className="border-t">
                <td className="p-3">{new Date(d.created_at).toLocaleString()}</td>
                <td className="p-3">{d.currency.toUpperCase()} {Number(d.amount).toFixed(2)}</td>
                <td className="p-3">{d.status}</td>
                <td className="p-3">{d.provider}</td>
                <td className="p-3 text-xs">{d.provider_session_id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

