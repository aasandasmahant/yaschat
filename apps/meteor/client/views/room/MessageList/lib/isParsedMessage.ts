import type { Root } from '@yas chat/message-parser';

export const isParsedMessage = (text: string | Root): text is Root => Array.isArray(text) && text.length > 0;
