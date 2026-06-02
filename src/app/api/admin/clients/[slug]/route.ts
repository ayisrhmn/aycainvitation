import { NextRequest, NextResponse } from "next/server";
import { ensureSupabaseAdmin } from "@/lib/supabase";

/**
 * GET /api/admin/clients/{slug}
 * Fetch single client details (protected by middleware)
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const supabaseAdmin = ensureSupabaseAdmin();

    const { data: client, error } = await supabaseAdmin
      .from("clients")
      .select("slug, email, phone, theme, status, settings, created_at")
      .eq("slug", slug.toLowerCase())
      .single();

    if (error || !client) {
      return NextResponse.json(
        { status: "error", message: "Klien tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      status: "success",
      client,
    });
  } catch (error) {
    console.error("Error fetching client:", error);
    return NextResponse.json(
      { status: "error", message: "Gagal mengambil data klien" },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/admin/clients/{slug}
 * Update client status (protected by middleware)
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const body = await request.json();
    const { status } = body;

    if (!status || !["Active", "Pending"].includes(status)) {
      return NextResponse.json(
        { status: "error", message: "Status tidak valid" },
        { status: 400 }
      );
    }

    const supabaseAdmin = ensureSupabaseAdmin();

    const { data: updated, error } = await supabaseAdmin
      .from("clients")
      .update({ status })
      .eq("slug", slug.toLowerCase())
      .select("slug, email, phone, theme, status, settings, created_at")
      .single();

    if (error || !updated) {
      return NextResponse.json(
        { status: "error", message: "Gagal memperbarui status" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      status: "success",
      client: updated,
    });
  } catch (error) {
    console.error("Error updating client:", error);
    return NextResponse.json(
      { status: "error", message: "Gagal memperbarui klien" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/clients/{slug}
 * Delete client and all associated RSVPs (protected by middleware)
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const supabaseAdmin = ensureSupabaseAdmin();

    // Delete associated RSVPs first
    await supabaseAdmin.from("rsvps").delete().eq("client_slug", slug);

    // Delete client
    const { error } = await supabaseAdmin
      .from("clients")
      .delete()
      .eq("slug", slug.toLowerCase());

    if (error) {
      return NextResponse.json(
        { status: "error", message: "Gagal menghapus klien" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      status: "success",
      message: "Klien berhasil dihapus",
    });
  } catch (error) {
    console.error("Error deleting client:", error);
    return NextResponse.json(
      { status: "error", message: "Gagal menghapus klien" },
      { status: 500 }
    );
  }
}
