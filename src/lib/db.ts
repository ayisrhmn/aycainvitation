import postgres from "postgres";

// ============================================================================
// Koneksi Postgres langsung — SERVER-ONLY.
// Jangan import file ini dari client component.
// Semua value diambil dari ENV — tidak ada fallback default.
// ============================================================================

const DATABASE_URL = process.env.DATABASE_URL;
// Schema tempat tabel aplikasi ini berada di shared DB (mis. "aycainvitation").
// Dipasang sebagai search_path sehingga query cukup menulis nama tabel saja.
const DB_SCHEMA = process.env.DB_SCHEMA;

if (!DATABASE_URL) {
  throw new Error("Missing database config. Set DATABASE_URL in .env");
}

// Simpan di globalThis agar hot reload di dev tidak membuka koneksi baru terus-menerus
const globalForDb = globalThis as unknown as { sql?: postgres.Sql };

export const sql =
  globalForDb.sql ??
  postgres(DATABASE_URL, {
    // Shared DB: batasi koneksi per instance agar tidak menghabiskan max_connections
    max: 3,
    idle_timeout: 20,
    ...(DB_SCHEMA && { connection: { search_path: DB_SCHEMA } }),
  });

if (process.env.NODE_ENV !== "production") {
  globalForDb.sql = sql;
}

/**
 * Bungkus object menjadi parameter JSONB untuk kolom settings/colors.
 */
export function json(value: object | null) {
  return sql.json(value as postgres.JSONValue);
}
