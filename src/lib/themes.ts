import { sql } from "./db";
import { WeddingConfig } from "@/types";

export interface DemoThemeConfig {
  slug: string;
  name: string;
  settings: WeddingConfig;
}

interface DemoThemeRow {
  slug: string;
  name: string;
  settings: WeddingConfig | null;
}

interface DemoThemeListRow {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  colors: Array<{ name: string; hex: string }> | null;
  is_coming_soon: boolean;
}

/**
 * Mendapatkan konfigurasi default tema untuk preview/demo dari database.
 * Digunakan jika slug bukan merupakan klien yang terdaftar di tabel clients.
 */
export async function getDemoThemeConfig(
  slug: string
): Promise<DemoThemeConfig | null> {
  try {
    const normalizedSlug = slug.toLowerCase().trim();

    const [data] = await sql<DemoThemeRow[]>`
      SELECT slug, name, settings
      FROM demo_themes
      WHERE slug = ${normalizedSlug}
      LIMIT 1
    `;

    if (!data) {
      return null;
    }

    return {
      slug: data.slug,
      name: data.name,
      settings: data.settings || ({} as WeddingConfig),
    };
  } catch (error) {
    console.error(
      `Error fetching demo theme config for slug "${slug}":`,
      error
    );
    return null;
  }
}

/**
 * Mendapatkan semua tema demo dari database untuk ditampilkan di Landing Page.
 */
export async function getDemoThemes() {
  try {
    const data = await sql<DemoThemeListRow[]>`
      SELECT slug, name, tagline, description, colors, is_coming_soon
      FROM demo_themes
      ORDER BY created_at ASC
    `;

    return data.map((theme) => ({
      slug: theme.slug,
      name: theme.name,
      tagline: theme.tagline,
      description: theme.description,
      colors: theme.colors || [],
      is_coming_soon: theme.is_coming_soon,
    }));
  } catch (error) {
    console.error("Error in getDemoThemes:", error);
    return [];
  }
}
