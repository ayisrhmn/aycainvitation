import { sql } from "./db";
import { WeddingConfig } from "@/types";

export interface ClientConfig {
  slug: string;
  email: string;
  phone: string;
  theme: string;
  status: "Active" | "Pending";
  settings: WeddingConfig;
  createdAt: string;
}

interface ClientRow {
  slug: string;
  email: string;
  phone: string;
  theme: string;
  status: "Active" | "Pending";
  settings: WeddingConfig | null;
  created_at: Date;
}

/**
 * Mendapatkan konfigurasi klien dari database berdasarkan slug.
 * Mengembalikan data clients baik berstatus 'Active' maupun 'Pending'.
 * Data settings di-parse dari JSONB.
 */
export async function getClientConfig(
  slug: string
): Promise<ClientConfig | null> {
  try {
    const normalizedSlug = slug.toLowerCase().trim();

    const [data] = await sql<ClientRow[]>`
      SELECT slug, email, phone, theme, status, settings, created_at
      FROM clients
      WHERE slug = ${normalizedSlug}
      LIMIT 1
    `;

    if (!data) {
      return null;
    }

    return {
      slug: data.slug,
      email: data.email,
      phone: data.phone,
      theme: data.theme,
      status: data.status,
      settings: data.settings || ({} as WeddingConfig),
      createdAt: data.created_at.toISOString(),
    };
  } catch (error) {
    console.error(`Error fetching client config for slug "${slug}":`, error);
    return null;
  }
}
