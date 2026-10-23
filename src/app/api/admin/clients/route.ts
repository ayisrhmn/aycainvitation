import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";

/**
 * GET /api/admin/clients
 * Protected by middleware authentication
 * Returns list of all clients with their status
 */
export async function GET(request: NextRequest) {
  try {
    // ========================================
    // 1. Fetch All Clients from Database
    // ========================================
    const clients = await sql`
      SELECT slug, email, phone, theme, status, created_at
      FROM clients
      ORDER BY created_at DESC
    `.catch((error) => {
      console.error("Error fetching clients:", error);
      throw new Error("Gagal mengambil data klien");
    });

    // ========================================
    // 2. Return Clients
    // ========================================
    return NextResponse.json({
      status: "success",
      clients,
      total: clients.length,
    });
  } catch (error) {
    console.error("Error in GET /api/admin/clients:", error);
    const message =
      error instanceof Error ? error.message : "Gagal mengambil data klien";
    return NextResponse.json({ status: "error", message }, { status: 500 });
  }
}
