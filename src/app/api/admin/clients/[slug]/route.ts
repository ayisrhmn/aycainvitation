import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";

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

    const [client] = await sql`
      SELECT slug, email, phone, theme, status, settings, created_at
      FROM clients
      WHERE slug = ${slug.toLowerCase()}
      LIMIT 1
    `;

    if (!client) {
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

    const [updated] = await sql`
      UPDATE clients
      SET status = ${status}
      WHERE slug = ${slug.toLowerCase()}
      RETURNING slug, email, phone, theme, status, settings, created_at
    `;

    if (!updated) {
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
    const normalizedSlug = slug.toLowerCase();

    // Hapus RSVP lalu klien dalam satu transaksi
    await sql.begin(async (tx) => {
      await tx`DELETE FROM rsvps WHERE client_slug = ${normalizedSlug}`;
      await tx`DELETE FROM clients WHERE slug = ${normalizedSlug}`;
    });

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
