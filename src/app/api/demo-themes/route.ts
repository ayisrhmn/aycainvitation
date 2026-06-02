import { NextResponse } from "next/server";
import { ensureSupabaseAdmin } from "@/lib/supabase";

export async function GET() {
  try {
    const supabaseAdmin = ensureSupabaseAdmin();

    const { data, error } = await supabaseAdmin
      .from("demo_themes")
      .select("slug, name, tagline, description, colors, is_coming_soon")
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Error fetching demo themes from Supabase:", error);
      return NextResponse.json(
        { status: "error", message: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      status: "success",
      data: data || [],
    });
  } catch (error) {
    console.error("Error in GET /api/demo-themes:", error);
    const message =
      error instanceof Error ? error.message : "Gagal mengambil data tema demo";
    return NextResponse.json({ status: "error", message }, { status: 500 });
  }
}
