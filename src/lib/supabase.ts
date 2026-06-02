import { createClient } from "@supabase/supabase-js";

// ============================================================================
// SECURITY: Jangan ubah order atau hardcode values di sini
// Semua value diambil dari ENV — tidak ada fallback default
// ============================================================================

// 1. Public anon client — dipakai dari browser & server untuk read data public
// Environment variables dengan prefix NEXT_PUBLIC_ aman di-expose ke browser
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// 2. Server-only service role client — dipakai hanya di server-side APIs
// SUPABASE_SERVICE_ROLE_KEY TIDAK boleh punya prefix NEXT_PUBLIC_
// Hanya tersedia di server — JANGAN expose ke browser
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

// ============================================================================
// Validation
// ============================================================================

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error(
    "Missing Supabase public config. Set NEXT_PUBLIC_SUPABASE_URL dan NEXT_PUBLIC_SUPABASE_ANON_KEY in .env"
  );
}

if (typeof window === "undefined" && !SUPABASE_SERVICE_ROLE_KEY) {
  console.warn(
    "SUPABASE_SERVICE_ROLE_KEY not set. Server-side mutations (create/update/delete) will fail."
  );
}

// ============================================================================
// Public client — safe untuk browser
// ============================================================================

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: false, // No auth needed untuk wedding invitation
  },
  db: {
    schema: "public",
  },
  global: {
    headers: {
      "x-my-custom-header": "wedding-invitation",
    },
  },
});

// ============================================================================
// Server-only admin client — untuk backend operations
// Gunakan hanya di server-side (API routes, Server Actions)
// ============================================================================

export const supabaseAdmin = SUPABASE_SERVICE_ROLE_KEY
  ? createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
      auth: {
        persistSession: false,
      },
      db: {
        schema: "public",
      },
      global: {
        headers: {
          "x-my-custom-header": "wedding-invitation-admin",
        },
      },
    })
  : null;

/**
 * Ensure service role key exists — gunakan di awal function server-side yang butuh admin access
 */
export function ensureSupabaseAdmin() {
  if (!supabaseAdmin) {
    throw new Error(
      "SUPABASE_SERVICE_ROLE_KEY not configured. Cannot perform admin operations."
    );
  }
  return supabaseAdmin;
}

// ============================================================================
// Type inference untuk database
// ============================================================================

export type Database = {
  public: {
    Tables: {
      clients: {
        Row: {
          id: string;
          slug: string;
          email: string;
          phone: string;
          theme: string;
          status: "Active" | "Pending";
          settings: Record<string, any>;
          created_at: string;
        };
        Insert: {
          slug: string;
          email: string;
          phone: string;
          theme?: string;
          status?: "Active" | "Pending";
          settings?: Record<string, any>;
        };
        Update: {
          status?: "Active" | "Pending";
          settings?: Record<string, any>;
          phone?: string;
          email?: string;
        };
      };
      rsvps: {
        Row: {
          id: string;
          client_slug: string;
          name: string;
          attendance: "Hadir" | "Tidak Hadir";
          guests_count: number;
          wish: string;
          created_at: string;
        };
        Insert: {
          client_slug: string;
          name: string;
          attendance: "Hadir" | "Tidak Hadir";
          guests_count?: number;
          wish?: string;
        };
        Update: never;
      };
      demo_themes: {
        Row: {
          id: string;
          slug: string;
          name: string;
          tagline: string;
          description: string;
          colors: any; // JSONB
          is_coming_soon: boolean;
          settings: Record<string, any> | null;
          created_at: string;
        };
        Insert: {
          slug: string;
          name: string;
          tagline?: string;
          description?: string;
          colors?: any;
          is_coming_soon?: boolean;
          settings?: Record<string, any> | null;
        };
        Update: {
          name?: string;
          tagline?: string;
          description?: string;
          colors?: any;
          is_coming_soon?: boolean;
          settings?: Record<string, any> | null;
        };
      };
    };
  };
};
