import { NextRequest } from "next/server";
import { configureBot } from "@/lib/telegram";
import { initDb } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 30;

function formatBaseUrl(url: string): string {
  const trimmed = url.trim();
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

export async function POST(request: NextRequest) {
  const setupSecret = process.env.BOT_SETUP_SECRET;
  if (!setupSecret) {
    return Response.json(
      { error: "BOT_SETUP_SECRET is not configured" },
      { status: 500 }
    );
  }

  const supplied = request.headers.get("x-bot-setup-secret");
  if (supplied !== setupSecret) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const rawUrl =
    process.env.NEXT_PUBLIC_APP_URL || process.env.VERCEL_URL || "";
  if (!rawUrl) {
    return Response.json(
      { error: "NEXT_PUBLIC_APP_URL or VERCEL_URL is required" },
      { status: 500 }
    );
  }

  try {
    const baseUrl = formatBaseUrl(rawUrl);
    await initDb();
    const webhookUrl = await configureBot(baseUrl);

    return Response.json({ ok: true, webhookUrl });
  } catch (error: any) {
    console.error("Telegram Setup Error:", error);
    return Response.json(
      {
        ok: false,
        error: error.message || "Failed to configure Telegram webhook",
      },
      { status: 500 }
    );
  }
}
