import { NextResponse } from "next/server";
import { getDashboardStats } from "@/lib/db";
import { pingDb } from "@/lib/mongodb";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const [stats, dbConnected] = await Promise.all([
      getDashboardStats(),
      pingDb(),
    ]);

    return NextResponse.json(
      { ...stats, dbConnected },
      {
        headers: {
          "Cache-Control": "no-store, max-age=0",
        },
      }
    );
  } catch (error) {
    console.error("Dashboard Stats Route Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch dashboard statistics", dbConnected: false },
      { status: 500 }
    );
  }
}
