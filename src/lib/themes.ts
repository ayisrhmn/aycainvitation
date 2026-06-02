import { ensureSupabaseAdmin } from "./supabase";
import { WeddingConfig } from "@/types";

export interface DemoThemeConfig {
  slug: string;
  name: string;
  settings: WeddingConfig;
}

/**
 * Mendapatkan konfigurasi default tema untuk preview/demo dari database Supabase.
 * Digunakan jika slug bukan merupakan klien yang terdaftar di tabel clients.
 */
export async function getDemoThemeConfig(
  slug: string
): Promise<DemoThemeConfig | null> {
  try {
    const normalizedSlug = slug.toLowerCase().trim();
    const supabaseAdmin = ensureSupabaseAdmin();

    const { data, error } = await supabaseAdmin
      .from("demo_themes")
      .select("slug, name, settings")
      .eq("slug", normalizedSlug)
      .single();

    if (error || !data) {
      return null;
    }

    return {
      slug: data.slug,
      name: data.name,
      settings: (data.settings || {}) as WeddingConfig,
    };
  } catch (error) {
    console.error(`Error fetching demo theme config for slug "${slug}":`, error);
    return null;
  }
}

/**
 * Mendapatkan semua tema demo dari database Supabase untuk ditampilkan di Landing Page.
 */
export async function getDemoThemes() {
  try {
    const supabaseAdmin = ensureSupabaseAdmin();
    const { data, error } = await supabaseAdmin
      .from("demo_themes")
      .select("slug, name, tagline, description, colors, is_coming_soon")
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Error fetching demo themes:", error);
      return [];
    }

    return (data || []).map((theme) => ({
      slug: theme.slug,
      name: theme.name,
      tagline: theme.tagline,
      description: theme.description,
      colors: (theme.colors || []) as Array<{ name: string; hex: string }>,
      is_coming_soon: theme.is_coming_soon,
    }));
  } catch (error) {
    console.error("Error in getDemoThemes:", error);
    return [];
  }
}


