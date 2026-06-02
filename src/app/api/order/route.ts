import { NextRequest, NextResponse } from "next/server";
import { ensureSupabaseAdmin } from "@/lib/supabase";
import { WeddingConfig } from "@/types";

const ADMIN_PHONE = process.env.NEXT_PUBLIC_ADMIN_PHONE;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // ========================================
    // 1. Ekstraksi Data dari Payload Form
    // ========================================
    const {
      // Kontak Klien
      clientName,
      clientEmail,
      clientPhone,
      clientSlug,
      theme,

      // Detail Mempelai
      groom_nickname,
      groom_fullname,
      groom_father,
      groom_mother,
      bride_nickname,
      bride_fullname,
      bride_father,
      bride_mother,

      // Detail Acara
      wedding_date,
      akad_date,
      akad_start_time,
      akad_end_time,
      akad_location,
      akad_maps_url,
      resepsi_date,
      resepsi_start_time,
      resepsi_end_time,
      resepsi_location,
      resepsi_maps_url,

      // Gift/Kado Digital
      bank_name_1,
      bank_account_1,
      bank_holder_1,
      bank_name_2,
      bank_account_2,
      bank_holder_2,
      quote,
      quote_reference,
      couple_order,
      music_title,
      music_url,
    } = body;

    // ========================================
    // 2. Validasi Input Dasar
    // ========================================
    if (!clientName || !clientEmail || !clientPhone || !clientSlug || !theme) {
      return NextResponse.json(
        { status: "error", message: "Data pendaftaran klien tidak lengkap." },
        { status: 400 }
      );
    }

    if (!groom_nickname || !bride_nickname || !wedding_date) {
      return NextResponse.json(
        {
          status: "error",
          message: "Data pengantin dan tanggal pernikahan wajib diisi.",
        },
        { status: 400 }
      );
    }

    // ========================================
    // 3. Normalisasi & Validasi Slug
    // ========================================
    const cleanSlug = clientSlug
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9_-]/g, "");

    if (!cleanSlug || cleanSlug.length < 3) {
      return NextResponse.json(
        {
          status: "error",
          message:
            "Alamat web kustom (slug) minimal 3 karakter, hanya a-z, 0-9, -, _",
        },
        { status: 400 }
      );
    }

    // ========================================
    // 4. Periksa Slug Belum Terpakai (Active maupun Pending)
    // ========================================
    const supabaseAdmin = ensureSupabaseAdmin();

    const { data: existingClient } = await supabaseAdmin
      .from("clients")
      .select("slug")
      .eq("slug", cleanSlug)
      .maybeSingle();

    if (existingClient) {
      return NextResponse.json(
        {
          status: "error",
          message: `Alamat web /${cleanSlug} sudah terdaftar (aktif atau dalam proses aktivasi). Silakan cari alamat lain.`,
        },
        { status: 409 }
      );
    }

    // ========================================
    // 5. Persiapan Settings Data untuk Supabase
    // ========================================
    const settingsData: WeddingConfig = {
      groom_nickname,
      groom_fullname,
      groom_father,
      groom_mother,
      bride_nickname,
      bride_fullname,
      bride_father,
      bride_mother,
      wedding_date,
      akad_date: akad_date || wedding_date.split("T")[0],
      akad_start_time: akad_start_time || "09:00",
      akad_end_time: akad_end_time || "10:30",
      akad_location: akad_location || "",
      akad_maps_url: akad_maps_url || "",
      resepsi_date: resepsi_date || wedding_date.split("T")[0],
      resepsi_start_time: resepsi_start_time || "11:00",
      resepsi_end_time: resepsi_end_time || "Selesai",
      resepsi_location: resepsi_location || "",
      resepsi_maps_url: resepsi_maps_url || "",
      bank_name_1: bank_name_1 || "",
      bank_account_1: bank_account_1 || "",
      bank_holder_1: bank_holder_1 || "",
      bank_name_2: bank_name_2 || "",
      bank_account_2: bank_account_2 || "",
      bank_holder_2: bank_holder_2 || "",
      quote: quote || "",
      quote_reference: quote_reference || "",
      music_title: music_title || "",
      music_url: music_url || "",
      couple_order: couple_order || "groom_first",
    };

    // ========================================
    // 6. Insert Client Baru ke Supabase
    // ========================================
    const { data, error } = await supabaseAdmin
      .from("clients")
      .insert({
        slug: cleanSlug,
        email: clientEmail,
        phone: clientPhone,
        theme: theme,
        status: "Pending",
        settings: settingsData,
      })
      .select("slug, created_at")
      .single();

    if (error || !data) {
      console.error("Supabase insert error:", error);
      if (error?.code === "23505") {
        throw new Error(
          `Alamat web /${cleanSlug} sudah terdaftar (aktif atau dalam proses aktivasi). Silakan cari alamat lain.`
        );
      }
      throw new Error("Gagal menyimpan data pemesanan. Silakan coba kembali.");
    }

    // ========================================
    // 7. Buat Pesan WhatsApp Notifikasi
    // ========================================
    const clientPageUrl = `${process.env.NEXT_PUBLIC_APP_URL}/${cleanSlug}?to=Nama+Tamu`;

    const waMessage =
      `*Aycainvitation - Pemesanan Undangan Baru*\n\n` +
      `*Klien:* ${clientName}\n` +
      `*Email:* ${clientEmail}\n` +
      `*Telepon:* ${clientPhone}\n` +
      `*Slug:* ${cleanSlug}\n` +
      `*Tema:* ${theme}\n\n` +
      `*Pengantin:* ${groom_nickname} & ${bride_nickname}\n` +
      `*Tanggal Pernikahan:* ${wedding_date}\n\n` +
      `Preview Undangan: ${clientPageUrl}\n\n` +
      `Status: Pending (menunggu pembayaran)\n\n` +
      `Segera proses pemesanan agar bisa lihat preview undangan. Terima kasih!`;

    const redirectUrl = `https://wa.me/${ADMIN_PHONE}?text=${encodeURIComponent(waMessage)}`;

    // ========================================
    // 8. Return Sukses ke Client
    // ========================================
    return NextResponse.json({
      status: "success",
      message:
        "Pemesanan berhasil! Silakan hubungi WhatsApp admin untuk konfirmasi pembayaran.",
      slug: cleanSlug,
      clientPageUrl,
      redirectUrl,
    });
  } catch (error: unknown) {
    console.error("Error processing client order:", error);
    const message =
      error instanceof Error
        ? error.message
        : "Terjadi kesalahan sistem internal";
    return NextResponse.json({ status: "error", message }, { status: 500 });
  }
}
