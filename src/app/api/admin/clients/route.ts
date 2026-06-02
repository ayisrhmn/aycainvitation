import { NextRequest, NextResponse } from "next/server";
import { ensureSupabaseAdmin } from "@/lib/supabase";

/**
 * GET /api/admin/clients
 * Protected by middleware authentication
 * Returns list of all clients with their status
 */
export async function GET(request: NextRequest) {
  try {
    // ========================================
    // 1. Fetch All Clients from Supabase
    // ========================================
    const supabaseAdmin = ensureSupabaseAdmin();
    const { data: clients, error } = await supabaseAdmin
      .from("clients")
      .select("slug, email, phone, theme, status, created_at")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching clients:", error);
      throw new Error("Gagal mengambil data klien");
    }

    // ========================================
    // 2. Return Clients
    // ========================================
    return NextResponse.json({
      status: "success",
      clients: clients || [],
      total: (clients || []).length,
    });
  } catch (error) {
    console.error("Error in GET /api/admin/clients:", error);
    const message =
      error instanceof Error ? error.message : "Gagal mengambil data klien";
    return NextResponse.json({ status: "error", message }, { status: 500 });
  }
}
