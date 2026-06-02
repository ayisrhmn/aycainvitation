# Migration Plan: Google Sheets → Supabase

## Overview

Mengganti semua integrasi Google Sheets (service account, OAuth2) dengan **Supabase (PostgreSQL)** sebagai satu-satunya backend. Arsitektur tetap serverless — Vercel untuk hosting, Supabase untuk data.

---

## Yang Dihapus

| Sekarang                        | Alasan dihapus                      |
| ------------------------------- | ----------------------------------- |
| `src/lib/google-sheets.ts`      | Seluruh logika Google Sheets API    |
| `src/lib/clients.ts`            | Diganti dengan query Supabase       |
| `GOOGLE_SERVICE_ACCOUNT_EMAIL`  | Tidak dipakai lagi                  |
| `GOOGLE_PRIVATE_KEY`            | Tidak dipakai lagi                  |
| `GOOGLE_ADMIN_SHEET_ID`         | Diganti tabel `clients` di Supabase |
| `GOOGLE_OAUTH_CLIENT_ID`        | Tidak dipakai lagi                  |
| `GOOGLE_OAUTH_CLIENT_SECRET`    | Tidak dipakai lagi                  |
| `GOOGLE_OAUTH_REFRESH_TOKEN`    | Tidak dipakai lagi                  |
| `GOOGLE_TEMPLATE_SHEET_ID`      | Tidak dipakai lagi                  |
| `GOOGLE_DRIVE_PARENT_FOLDER_ID` | Tidak dipakai lagi                  |
| `GOOGLE_SHEET_GAS_URL`          | Tidak dipakai lagi                  |

---

## ENV Baru (Clean)

```env
# App
NEXT_PUBLIC_APP_URL=http://localhost:2931

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key

# Hanya untuk operasi server-side (admin: create/update/delete)
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Admin page — HTTP Basic Auth
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your_strong_password_here

# Cron job secret — proteksi endpoint /api/cron
# Generate dengan: openssl rand -hex 32
CRON_SECRET=your_cron_secret_here

# WhatsApp notifikasi order
NEXT_PUBLIC_ADMIN_PHONE=628123456789
```

---

## Database Schema (Supabase)

### Tabel `clients`

```sql
CREATE TABLE clients (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug        TEXT UNIQUE NOT NULL,
  email       TEXT NOT NULL,
  phone       TEXT NOT NULL,
  theme       TEXT NOT NULL DEFAULT 'creamy-sage',
  status      TEXT NOT NULL DEFAULT 'Pending' CHECK (status IN ('Active', 'Pending')),
  settings    JSONB NOT NULL DEFAULT '{}',
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

Kolom `settings` menyimpan seluruh `WeddingConfig` sebagai JSON — tidak perlu migrasi schema kalau ada field baru.

Contoh isi `settings`:

```json
{
  "groom_nickname": "Arya",
  "bride_nickname": "Nabila",
  "wedding_date": "2026-09-12T09:00:00",
  "akad_location": "Masjid Al-Azhar",
  ...
}
```

### Tabel `rsvps`

```sql
CREATE TABLE rsvps (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_slug   TEXT NOT NULL REFERENCES clients(slug) ON DELETE CASCADE,
  name          TEXT NOT NULL,
  attendance    TEXT NOT NULL CHECK (attendance IN ('Hadir', 'Tidak Hadir')),
  guests_count  INT NOT NULL DEFAULT 1,
  wish          TEXT NOT NULL DEFAULT '',
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_rsvps_client_slug ON rsvps(client_slug);
```

### Row Level Security (RLS)

```sql
-- clients: hanya service_role yang bisa write
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read active clients"
  ON clients FOR SELECT
  USING (status = 'Active');

-- rsvps: semua bisa baca, semua bisa insert, tidak bisa update/delete
ALTER TABLE rsvps ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read rsvps"
  ON rsvps FOR SELECT USING (true);
CREATE POLICY "Public insert rsvps"
  ON rsvps FOR INSERT WITH CHECK (true);
```

---

## Struktur File Baru

```
src/
  lib/
    supabase.ts           # Supabase client (anon + service role)
    clients.ts            # Query clients dari Supabase (ganti dari google-sheets)
  middleware.ts           # HTTP Basic Auth guard untuk route /admin/*
  app/
    api/
      order/route.ts      # Simpan client baru ke Supabase (ganti Google Sheets)
      rsvp/route.ts       # GET + POST RSVP dari Supabase
      cron/
        route.ts          # Keep-alive ping ke Supabase (dipanggil Vercel Cron)
    admin/
      page.tsx            # Admin page: list semua order, toggle Active/Pending
      [slug]/
        page.tsx          # Detail client + edit settings
    [clientSlug]/
      rsvp/
        page.tsx          # Halaman RSVP untuk client (baca-only)
vercel.json               # Konfigurasi Vercel Cron schedule
```

---

## Halaman Baru

### 1. Admin Page — `/admin`

- Protected via **HTTP Basic Auth di middleware Next.js** — browser otomatis tampilkan popup username/password
- Username & password diambil dari ENV: `ADMIN_USERNAME` + `ADMIN_PASSWORD`
- Menampilkan semua client (status Pending & Active)
- Toggle status Active/Pending per client
- Edit settings client (nama, tanggal, lokasi, dll) langsung dari admin page
- Stack: Server Component + Server Action

### 2. Client RSVP Page — `/[clientSlug]/rsvp`

- Halaman khusus untuk client melihat semua RSVP yang masuk
- Akses via link yang dikirim ke client
- Tampilkan: total tamu hadir/tidak hadir, daftar ucapan, export CSV (opsional)
- Stack: Server Component, refresh setiap load

---

## Urutan Implementasi

### Phase 1 — Supabase Setup

- [ ] Install `@supabase/supabase-js`
- [ ] Buat `src/lib/supabase.ts` (anon client + service role client)
- [ ] Buat tabel `clients` dan `rsvps` di Supabase dashboard
- [ ] Setup RLS policies
- [ ] Update `.env` dan `.env.example`

### Phase 2 — Ganti Backend

- [ ] Rewrite `src/lib/clients.ts` → query Supabase
- [ ] Rewrite `src/app/api/order/route.ts` → insert ke Supabase
- [ ] Rewrite `src/app/api/rsvp/route.ts` → query Supabase
- [ ] Hapus `src/lib/google-sheets.ts`
- [ ] Update `src/types/index.ts` jika perlu

### Phase 3 — Admin Page

- [ ] Buat `src/app/admin/page.tsx` — list semua clients
- [ ] Buat `src/app/admin/[slug]/page.tsx` — detail + edit settings client
- [ ] Buat Server Actions untuk toggle status & update settings

### Phase 4 — Client RSVP Page

- [ ] Buat `src/app/[clientSlug]/rsvp/page.tsx`
- [ ] Tampilkan statistik kehadiran + daftar ucapan

### Phase 5 — Keep-Alive Cron

- [ ] Buat `src/app/api/cron/route.ts` — ping query ringan ke Supabase
- [ ] Buat `vercel.json` dengan jadwal cron harian (setiap hari jam 08:00 WIB)
- [ ] Proteksi endpoint cron dengan `CRON_SECRET` agar tidak bisa dipanggil sembarangan

Detail implementasi:

```ts
// src/app/api/cron/route.ts
// Dipanggil Vercel Cron setiap hari → mencegah Supabase auto-pause (7 hari inaktif)
export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response("Unauthorized", { status: 401 });
  }
  // ping ringan ke Supabase
  const { error } = await supabaseAdmin.from("clients").select("id").limit(1);
  return Response.json({ ok: !error, ts: new Date().toISOString() });
}
```

```json
// vercel.json
{
  "crons": [
    {
      "path": "/api/cron",
      "schedule": "0 1 * * *"
    }
  ]
}
```

> Schedule `0 1 * * *` = setiap hari jam 01:00 UTC (08:00 WIB). Jauh lebih sering dari batas 7 hari Supabase.

### Phase 6 — Cleanup

- [ ] Hapus semua file dan ENV terkait Google Sheets
- [ ] Update `docs/GOOGLE_SHEETS_SETUP.md` → arsip atau hapus

---

## Yang Perlu Disiapkan (Oleh Developer)

### Di Supabase Dashboard

1. **Buat akun** di [supabase.com](https://supabase.com) (gratis)
2. **Buat project baru** — catat: Project URL & API Keys
3. **Jalankan SQL** di SQL Editor:
   - Tabel `clients`
   - Tabel `rsvps`
   - RLS policies (copy dari section Database Schema di atas)
4. Ambil dari **Settings → API**:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` key → `SUPABASE_SERVICE_ROLE_KEY` (**jangan expose ke frontend**)

### Di Vercel (nanti saat deploy)

- Tambahkan semua ENV ke Vercel Environment Variables
- Aktifkan Cron Jobs di Vercel dashboard (gratis untuk 1 cron)

---

## Catatan Migrasi ke Railway (Nanti)

Saat ingin pindah ke self-hosted Postgres:

1. Export data dari Supabase: `pg_dump` via Supabase CLI atau Dashboard → Backups
2. Import ke Railway Postgres instance
3. Ganti `NEXT_PUBLIC_SUPABASE_URL` + keys dengan Railway connection string
4. Update `src/lib/supabase.ts` → gunakan `postgres` driver langsung (atau tetap Supabase SDK dengan URL custom)

Schema 100% standard PostgreSQL, tidak ada Supabase-specific features yang lock-in.
