import { bot } from "./telegram";
import { incrementStat } from "./db";

let installed = false;

/**
 * Keeps the application tolerant of older helper options while sending only
 * current Telegram Bot API fields over the wire.
 */
export function installTelegramCompat() {
  if (installed) return;
  installed = true;

  const api = bot.api as any;

  // Patch sendMessage for link_preview_options compatibility
  const originalSendMessage = api.sendMessage.bind(api);
  api.sendMessage = async (chatId: number | string, text: string, options: Record<string, any> = {}) => {
    const { disable_web_page_preview, ...rest } = options || {};
    if (disable_web_page_preview !== undefined && rest.link_preview_options === undefined) {
      rest.link_preview_options = { is_disabled: Boolean(disable_web_page_preview) };
    }
    return originalSendMessage(chatId, text, rest);
  };

  // Patch editMessageCaption to strip invalid properties
  const originalEditMessageCaption = api.editMessageCaption.bind(api);
  api.editMessageCaption = async (chatId: number | string, messageId: number, options: Record<string, any> = {}) => {
    const { link_preview_options, ...rest } = options || {};
    return originalEditMessageCaption(chatId, messageId, rest);
  };

  // Patch sendSticker to handle reply_parameters compatibility
  const originalSendSticker = api.sendSticker.bind(api);
  api.sendSticker = async (chatId: number | string, sticker: string, options: Record<string, any> = {}) => {
    const { reply_to_message_id, ...rest } = options || {};
    if (reply_to_message_id !== undefined && rest.reply_parameters === undefined) {
      rest.reply_parameters = { message_id: reply_to_message_id };
    }
    return originalSendSticker(chatId, sticker, rest);
  };

  // Intercept handleUpdate to increment command stats automatically
  const originalHandleUpdate = bot.handleUpdate.bind(bot);
  (bot as any).handleUpdate = async (update: any, webhookReply?: any) => {
    const message = update?.message;
    if (message?.entities?.some((entity: any) => entity.type === "bot_command" && entity.offset === 0)) {
      await incrementStat("commandsReceived");
    }
    return originalHandleUpdate(update, webhookReply);
  };
}
