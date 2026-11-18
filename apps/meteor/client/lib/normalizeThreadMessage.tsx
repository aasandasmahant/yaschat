import { type IMessage } from '@yas chat/core-typings';
import { Markup } from '@yas chat/gazzodown';
import { parse } from '@yas chat/message-parser';
import type { Root } from '@yas chat/message-parser';
import { MessageTypes } from '@yas chat/message-types';
import type { TFunction } from 'i18next';

import { getMarkdownParserLimit } from './getMarkdownParserLimit';
import { toPlainTextRoot } from './toPlainTextRoot';
import { filterMarkdown } from '../../lib/markdown/parser/filtered/filtered';
import GazzodownText from '../components/GazzodownText';

const tryParseWithLimit = (text: string): Root | undefined => {
	if (text.length > getMarkdownParserLimit()) {
		return toPlainTextRoot(text);
	}

	const filtered = filterMarkdown(text);

	try {
		return parse(filtered, { emoticons: true });
	} catch {
		return undefined;
	}
};

export function normalizeThreadMessage({ ...message }: Readonly<IMessage>, t: TFunction) {
	const messageType = MessageTypes.getType(message);

	if (message.msg) {
		delete message.mentions;

		const tokens = tryParseWithLimit(message.msg);

		if (!tokens) {
			return null;
		}

		return (
			<GazzodownText>
				<Markup tokens={tokens} />
			</GazzodownText>
		);
	}

	if (message.attachments) {
		const attachment = message.attachments.find((attachment) => attachment.title || attachment.description);

		if (attachment?.description) {
			return <>{attachment.description}</>;
		}

		if (attachment?.title) {
			return <>{attachment.title}</>;
		}
	}

	if (message.t) {
		return messageType?.text(t, message, { capitalize: true });
	}

	return null;
}
