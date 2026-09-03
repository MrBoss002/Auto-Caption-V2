import { NextRequest } from "next/server";
import { bot, processUpdate } from "@/lib/telegram";
import { installTelegramCompat } from "@/lib/telegram-compat";
import { initDb } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 30;

installTelegramCompat();

async function enforceMustJoin(update: any) {
  const rawRequired = process.env.MUST_JOIN?.trim();
  if (!rawRequired) return true;

  const required = rawRequired.startsWith("@") ? rawRequired.slice(1) : rawRequired;
  const message = update?.message;
  if (!message || message.chat?.type !== "private" || !message.from) return true;

  try {
    const member: any = await bot.api.getChatMember(
      rawRequired.startsWith("@") || rawRequired.startsWith("-") ? rawRequired : `@${rawRequired}`,
      message.from.id
    );

    const allowed =
      member.status === "member" ||
      member.status === "administrator" ||
      member.status === "creator";

    if (allowed) return true;

    let link = rawRequired.match(/^[-]?\d+$/) ? undefined : `https://t.me/${required}`;
    try {
      const chat: any = await bot.api.getChat(
        rawRequired.startsWith("@") || rawRequired.startsWith("-") ? rawRequired : `@${rawRequired}`
      );
      link = chat.invite_link || link;
    } catch {
      // Keep public username link fallback
    }

    await bot.api.sendMessage(
      message.chat.id,
      "You must join <b>the required channel</b> to use me. After joining, try again!",
      {
        parse_mode: "HTML",
        link_preview_options: { is_disabled: true },
        reply_markup: link
          ? { inline_keyboard: [[{ text: "✨ Join Channel ✨", url: link }]] }
          : undefined,
      }
    );
    return false;
  } catch {
    // If membership check cannot be performed, avoid blocking the user
    return true;
  }
}

export async function POST(request: NextRequest) {
  const expected = process.env.TELEGRAM_WEBHOOK_SECRET;
  if (!expected) {
    return Response.json(
      { ok: false, error: "TELEGRAM_WEBHOOK_SECRET is not configured" },
      { status: 500 }
    );
  }

  const supplied = request.headers.get("x-telegram-bot-api-secret-token");
  if (supplied !== expected) {
    return Response.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    await initDb();
    const update = await request.json();

    if (!(await enforceMustJoin(update))) {
      return Response.json({ ok: true, skipped: true });
    }

    await processUpdate(update);
    return Response.json({ ok: true });
  } catch (error) {
    console.error("Telegram webhook error:", error);
    return Response.json({ ok: false }, { status: 500 });
  }
}

export async function GET() {
  return Response.json({ ok: true, service: "auto-caption-v2-telegram-webhook" });
}
