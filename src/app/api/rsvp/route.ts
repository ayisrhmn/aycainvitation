import { NextRequest, NextResponse } from "next/server";
import { getClientConfig } from "@/lib/clients";
import { getDemoThemeConfig } from "@/lib/themes";
import { supabase } from "@/lib/supabase";
import { RsvpWish } from "@/types";

/**
 * GET /api/rsvp?slug=dipa-icha
 * Mengambil data acara (settings) dan daftar RSVP dari Supabase
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const slug = (searchParams.get("slug") || "").trim().toLowerCase();

    if (!slug) {
      return NextResponse.json(
        { status: "error", message: "Parameter slug diperlukan" },
        { status: 400 }
      );
    }

    // ========================================
    // 1. Ambil Konfigurasi Klien dari Supabase
    // ========================================
    const clientConfig = await getClientConfig(slug);

    if (!clientConfig) {
      // Cek apakah ini tema demo yang valid
      const demoTheme = await getDemoThemeConfig(slug);
      if (demoTheme) {
        // Return simulated data dengan dummy wishes untuk mode demo
        const dummyWishes: RsvpWish[] = [
          {
            timestamp: new Date(Date.now() - 3600000).toISOString(),
            name: "Ahmad & Keluarga",
            attendance: "Hadir",
            guestsCount: 2,
            wish: "Selamat menempuh hidup baru! Semoga menjadi keluarga yang sakinah, mawaddah, dan warahmah. Aamiin.",
          },
          {
            timestamp: new Date(Date.now() - 7200000).toISOString(),
            name: "Sarah Wijaya",
            attendance: "Hadir",
            guestsCount: 1,
            wish: "Happy wedding ya! So happy for you guys, langgeng sampai kakek nenek!",
          },
          {
            timestamp: new Date(Date.now() - 86400000).toISOString(),
            name: "Rian & Partner",
            attendance: "Tidak Hadir",
            guestsCount: 0,
            wish: "Selamat berbahagia! Mohon maaf belum bisa hadir secara langsung.",
          },
        ];

        return NextResponse.json({
          status: "success",
          data: dummyWishes,
          settings: demoTheme.settings,
          isDemo: true,
        });
      }

      return NextResponse.json(
        {
          status: "error",
          message: `Klien dengan slug "${slug}" tidak ditemukan.`,
        },
        { status: 404 }
      );
    }

    // Klien berstatus Pending — belum aktif (menunggu pembayaran)
    if (clientConfig.status === "Pending") {
      return NextResponse.json({
        status: "pending",
        message: "Undangan Anda sedang disiapkan dan menunggu pembayaran.",
        settings: {
          groom_nickname: clientConfig.settings?.groom_nickname || "Pengantin",
          bride_nickname: clientConfig.settings?.bride_nickname || "Pengantin",
          wedding_date:
            clientConfig.settings?.wedding_date || new Date().toISOString(),
        },
        data: [],
      });
    }

    // ========================================
    // 2. Ambil Daftar RSVP dari Supabase
    // ========================================
    const { data: rsvps, error: rsvpError } = await supabase
      .from("rsvps")
      .select("name, attendance, guests_count, wish, created_at")
      .eq("client_slug", slug)
      .order("created_at", { ascending: false });

    if (rsvpError) {
      console.error("Error fetching RSVPs:", rsvpError);
      throw new Error("Gagal mengambil data RSVP");
    }

    // Konversi ke format RsvpWish
    const wishes: RsvpWish[] = (rsvps || []).map((rsvp) => ({
      name: rsvp.name,
      attendance: rsvp.attendance,
      guestsCount: rsvp.guests_count,
      wish: rsvp.wish,
      timestamp: rsvp.created_at,
    }));

    // ========================================
    // 3. Return Data Acara & RSVP
    // ========================================
    return NextResponse.json({
      status: "success",
      data: wishes,
      settings: clientConfig.settings,
    });
  } catch (error) {
    console.error("Error in GET /api/rsvp:", error);
    const message =
      error instanceof Error ? error.message : "Gagal mengambil data";
    return NextResponse.json({ status: "error", message }, { status: 500 });
  }
}

/**
 * POST /api/rsvp
 * Submit RSVP baru ke Supabase
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { clientSlug, name, attendance, guestsCount, wish } = body;
    const slug = (clientSlug || "").trim().toLowerCase();

    // ========================================
    // 1. Validasi Input
    // ========================================
    if (!slug || !name || !attendance) {
      return NextResponse.json(
        {
          status: "error",
          message: "Slug, Nama, dan Konfirmasi Kehadiran wajib diisi",
        },
        { status: 400 }
      );
    }

    if (!["Hadir", "Tidak Hadir"].includes(attendance)) {
      return NextResponse.json(
        {
          status: "error",
          message: 'Kehadiran harus "Hadir" atau "Tidak Hadir"',
        },
        { status: 400 }
      );
    }

    // ========================================
    // 2. Verifikasi Klien Exists & Active
    // ========================================
    const clientConfig = await getClientConfig(slug);
    if (!clientConfig) {
      // Cek apakah ini tema demo yang valid
      const demoTheme = await getDemoThemeConfig(slug);
      if (demoTheme) {
        // Jika ini tema demo, return simulated success
        return NextResponse.json({
          status: "success",
          message: "Terima kasih! Konfirmasi kehadiran Anda telah dicatat (Demo Mode).",
        });
      }

      return NextResponse.json(
        { status: "error", message: `Klien "${slug}" tidak ditemukan.` },
        { status: 404 }
      );
    }

    if (clientConfig.status === "Pending") {
      return NextResponse.json(
        { status: "error", message: "Undangan belum diaktifkan." },
        { status: 403 }
      );
    }

    // ========================================
    // 3. Cek Duplikasi (Optional — bisa di-disable)
    // ========================================
    const { data: existingRsvps } = await supabase
      .from("rsvps")
      .select("name")
      .eq("client_slug", slug);

    const isDuplicate = (existingRsvps || []).some(
      (rsvp) => rsvp.name.toLowerCase().trim() === name.toLowerCase().trim()
    );

    if (isDuplicate) {
      return NextResponse.json({
        status: "success",
        message: "Konfirmasi kehadiran Anda sudah terdaftar sebelumnya.",
        alreadySubmitted: true,
      });
    }

    // ========================================
    // 4. Insert RSVP Baru ke Supabase
    // ========================================
    const { error: insertError } = await supabase.from("rsvps").insert({
      client_slug: slug,
      name: name.trim(),
      attendance,
      guests_count: parseInt(guestsCount, 10) || 1,
      wish: (wish || "").trim(),
    });

    if (insertError) {
      console.error("Error inserting RSVP:", insertError);
      throw new Error("Gagal menyimpan RSVP");
    }

    // ========================================
    // 5. Return Sukses
    // ========================================
    return NextResponse.json({
      status: "success",
      message: "Terima kasih! Konfirmasi kehadiran Anda telah dicatat.",
    });
  } catch (error) {
    console.error("Error in POST /api/rsvp:", error);
    const message =
      error instanceof Error ? error.message : "Gagal menyimpan RSVP";
    return NextResponse.json({ status: "error", message }, { status: 500 });
  }
}
