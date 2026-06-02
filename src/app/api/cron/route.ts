import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

/**
 * GET /api/cron
 * Keep-alive endpoint to prevent Supabase auto-pause after 7 days of inactivity
 * Called daily by Vercel Cron Jobs (protected by CRON_SECRET)
 */
export async function GET(request: NextRequest) {
  try {
    // ========================================
    // 1. Validate CRON_SECRET
    // ========================================
    const cronSecret = process.env.CRON_SECRET;
    if (!cronSecret) {
      console.error("CRON_SECRET not configured");
      return NextResponse.json(
        { status: "error", message: "CRON_SECRET not configured" },
        { status: 500 }
      );
    }

    const authHeader = request.headers.get("authorization");
    if (!authHeader || authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json(
        { status: "error", message: "Unauthorized" },
        { status: 401 }
      );
    }

    // ========================================
    // 2. Execute Minimal Query to Keep DB Alive
    // ========================================
    const startTime = Date.now();

    const { count, error } = await supabase
      .from("clients")
      .select("*", { count: "exact", head: true });

    const queryTime = Date.now() - startTime;

    if (error) {
      console.error("Cron query error:", error);
      return NextResponse.json(
        {
          status: "error",
          message: "Database query failed",
          error: error.message,
        },
        { status: 500 }
      );
    }

    // ========================================
    // 3. Log Success
    // ========================================
    const successMessage = `[CRON] Keep-alive executed successfully. Query time: ${queryTime}ms. Client count: ${count}`;
    console.log(successMessage);

    return NextResponse.json({
      status: "success",
      message: successMessage,
      timestamp: new Date().toISOString(),
      queryTimeMs: queryTime,
      clientCount: count,
    });
  } catch (error) {
    console.error("Error in GET /api/cron:", error);
    const message =
      error instanceof Error ? error.message : "Unknown error occurred";
    return NextResponse.json({ status: "error", message }, { status: 500 });
  }
}
