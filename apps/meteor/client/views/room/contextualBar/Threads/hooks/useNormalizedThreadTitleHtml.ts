import { type IThreadMainMessage } from '@yaschat/core-typings';
import { MessageTypes } from '@yaschat/message-types';
import { escapeHTML } from '@yaschat/tools';
import { useUser, useSetting } from '@yaschat/ui-contexts';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { MentionsParser } from '../../../../../../lib/MentionsParser';
import { filterMarkdown } from '../../../../../../lib/markdown/parser/filtered/filtered';
import { emojiParser } from '../../../../../lib/emoji/emojiParser';

export const useNormalizedThreadTitleHtml = (mainMessage: IThreadMainMessage) => {
	const { t } = useTranslation();
	const me = useUser()?.username || '';
	const pattern = useSetting('UTF8_User_Names_Validation', '[0-9a-zA-Z-_.]+');
	const useRealName = useSetting('UI_Use_Real_Name', false);

	return useMemo((): string => {
		const message = { ...mainMessage };
		const messageType = MessageTypes.getType(message);

		if (message.msg) {
			const filteredMessage = filterMarkdown(escapeHTML(message.msg));
			if (!message.channels && !message.mentions) {
				return filteredMessage;
			}

			const instance = new MentionsParser({
				pattern: () => pattern,
				useRealName: () => useRealName,
				me: () => me,
				userTemplate: ({ label }) => ` ${label} `,
				roomTemplate: ({ prefix, mention }) => `${prefix} ${mention} `,
			});
			const html = emojiParser(filteredMessage);
			return instance.parse({ ...message, msg: filteredMessage, html }).html ?? '';
		}

		if (message.attachments) {
			const attachment = message.attachments.find((attachment) => attachment.title || attachment.description);

			if (attachment?.description) {
				return escapeHTML(attachment.description);
			}

			if (attachment?.title) {
				return escapeHTML(attachment.title);
			}
		}

		if (message.t && messageType) {
			return escapeHTML(messageType.text(t, message, { capitalize: true }));
		}

		return '';
	}, [mainMessage, me, pattern, useRealName, t]);
};
