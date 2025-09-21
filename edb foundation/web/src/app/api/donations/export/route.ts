import { NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export async function GET() {
  const supabase = createSupabaseAdminClient();
  const { data: donations, error } = await supabase
    .from("donations")
    .select("created_at,amount,currency,status,provider,provider_session_id");
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const header = ["created_at","amount","currency","status","provider","provider_session_id"].join(",");
  const rows = (donations ?? []).map((d: any) => [
    d.created_at,
    d.amount,
    d.currency,
    d.status,
    d.provider,
    d.provider_session_id
  ].join(","));
  const csv = [header, ...rows].join("\n");

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": "attachment; filename=donations.csv",
    },
  });
}

