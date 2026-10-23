import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

export async function GET() {
  try {
    const data = await sql`
      SELECT slug, name, tagline, description, colors, is_coming_soon
      FROM demo_themes
      ORDER BY created_at ASC
    `;

    return NextResponse.json({
      status: "success",
      data,
    });
  } catch (error) {
    console.error("Error in GET /api/demo-themes:", error);
    const message =
      error instanceof Error ? error.message : "Gagal mengambil data tema demo";
    return NextResponse.json({ status: "error", message }, { status: 500 });
  }
}
